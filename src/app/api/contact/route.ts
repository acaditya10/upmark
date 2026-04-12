import { getAdminDb } from "@/lib/firebase-admin";
import { resend, FROM_EMAIL, NOTIFICATION_EMAIL } from "@/lib/resend";
import {
  internalNotificationTemplate,
  autoResponderTemplate,
} from "@/lib/email-templates";
import { FieldValue } from "firebase-admin/firestore";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // ─── 1. Parse & Validate ────────────────────────────────────
    const { name, email, company, service, project } = body;

    if (!name || !email || !service || !project) {
      return Response.json(
        { error: "Missing required fields: name, email, service, project" },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return Response.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    const leadData = {
      name: String(name).trim(),
      email: String(email).trim().toLowerCase(),
      company: String(company || "").trim(),
      service: String(service).trim(),
      projectDetails: String(project).trim(),
    };

    // ─── 2. Save to Firestore ───────────────────────────────────
    const db = getAdminDb();
    await db.collection("leads").add({
      ...leadData,
      createdAt: FieldValue.serverTimestamp(),
    });

    // ─── 3. Send Internal Notification ──────────────────────────
    try {
      await resend.emails.send({
        from: FROM_EMAIL,
        to: NOTIFICATION_EMAIL,
        subject: `🚀 New Lead: ${leadData.name} — ${leadData.service}`,
        html: internalNotificationTemplate(leadData),
      });
    } catch (emailErr) {
      // Log but don't fail the request — the lead is already saved
      console.error("Failed to send internal notification:", emailErr);
    }

    // ─── 4. Send Auto-Responder ─────────────────────────────────
    try {
      await resend.emails.send({
        from: FROM_EMAIL,
        to: leadData.email,
        subject: "We've received your brief — Upmark",
        html: autoResponderTemplate(leadData),
      });
    } catch (emailErr) {
      console.error("Failed to send auto-responder:", emailErr);
    }

    // ─── 5. Success Response ────────────────────────────────────
    return Response.json(
      { success: true, message: "Form submitted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact API Error:", error);
    return Response.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
