import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { db } from "./firebase";
import type { CaseStudy, Service, Lead, SiteSettings } from "@/types";

// ─── Settings ───────────────────────────────────────────────

const settingsRef = collection(db, "settings");

export async function getSiteSettings(): Promise<SiteSettings | null> {
  try {
    const docRef = doc(db, "settings", "global");
    const snapshot = await getDoc(docRef);
    if (!snapshot.exists()) return null;
    return snapshot.data() as SiteSettings;
  } catch (error) {
    console.error("Error fetching site settings:", error);
    return null;
  }
}

export async function updateSiteSettings(
  data: Partial<SiteSettings>
): Promise<void> {
  const docRef = doc(db, "settings", "global");
  await setDoc(docRef, {
    ...data,
    updatedAt: serverTimestamp(),
  }, { merge: true });
}

// ─── Case Studies ───────────────────────────────────────────

const caseStudiesRef = collection(db, "case_studies");

export async function getCaseStudies(): Promise<CaseStudy[]> {
  const q = query(caseStudiesRef, orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }) as CaseStudy);
}

export async function getCaseStudyById(
  id: string
): Promise<CaseStudy | null> {
  const docRef = doc(db, "case_studies", id);
  const snapshot = await getDoc(docRef);
  if (!snapshot.exists()) return null;
  return { id: snapshot.id, ...snapshot.data() } as CaseStudy;
}

export async function createCaseStudy(
  data: Omit<CaseStudy, "id" | "createdAt" | "updatedAt">
): Promise<string> {
  const docRef = await addDoc(caseStudiesRef, {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return docRef.id;
}

export async function updateCaseStudy(
  id: string,
  data: Partial<Omit<CaseStudy, "id" | "createdAt">>
): Promise<void> {
  const docRef = doc(db, "case_studies", id);
  await updateDoc(docRef, {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

export async function deleteCaseStudy(id: string): Promise<void> {
  const docRef = doc(db, "case_studies", id);
  await deleteDoc(docRef);
}

// ─── Services ───────────────────────────────────────────────

const servicesRef = collection(db, "services");

export async function getServices(): Promise<Service[]> {
  const q = query(servicesRef, orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }) as Service);
}

export async function getServiceById(id: string): Promise<Service | null> {
  const docRef = doc(db, "services", id);
  const snapshot = await getDoc(docRef);
  if (!snapshot.exists()) return null;
  return { id: snapshot.id, ...snapshot.data() } as Service;
}

export async function createService(
  data: Omit<Service, "id" | "createdAt" | "updatedAt">
): Promise<string> {
  const docRef = await addDoc(servicesRef, {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return docRef.id;
}

export async function updateService(
  id: string,
  data: Partial<Omit<Service, "id" | "createdAt">>
): Promise<void> {
  const docRef = doc(db, "services", id);
  await updateDoc(docRef, {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

export async function deleteService(id: string): Promise<void> {
  const docRef = doc(db, "services", id);
  await deleteDoc(docRef);
}

// ─── Leads (Read-Only) ─────────────────────────────────────

const leadsRef = collection(db, "leads");

export async function getLeads(): Promise<Lead[]> {
  const q = query(leadsRef, orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }) as Lead);
}
