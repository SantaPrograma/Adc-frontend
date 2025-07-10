import { Geist, Geist_Mono } from "next/font/google";
import "../../globals.css";
import ProtectedRoute from "@/components/provider/ProtectedRoute";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute rolesPermitidos={["admin", "cliente"]}>
      <main>{children}</main>
    </ProtectedRoute>
  );
}
