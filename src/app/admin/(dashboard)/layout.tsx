import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/admin/ProtectedRoute";
import { AdminLayout } from "@/components/admin/AdminLayout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard | Upmark",
  description: "Upmark internal administration panel.",
  robots: "noindex, nofollow",
};

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <ProtectedRoute>
        <AdminLayout>{children}</AdminLayout>
      </ProtectedRoute>
    </AuthProvider>
  );
}
