"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";

interface ProtectedRouteProps {
  children: React.ReactNode;
  rolesPermitidos?: string[];
}

interface TokenPayload {
  usuario: string;
  rol: string;
  exp: number;
}

const ProtectedRoute = ({ children, rolesPermitidos }: ProtectedRouteProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = sessionStorage.getItem("authToken");

    if (!token) {
      router.push("/");
      return;
    }

    try {
      const decoded = jwtDecode<TokenPayload>(token);

      if (decoded.exp * 1000 < Date.now()) {
        sessionStorage.removeItem("authToken");
        router.push("/");
        return;
      }

      if (rolesPermitidos && !rolesPermitidos.includes(decoded.rol)) {
        sessionStorage.removeItem("authToken");
        router.push("/");
        return;
      }

      setIsAuthenticated(true);
    } catch (error) {
      console.error("Error al decodificar el token:", error);
      sessionStorage.removeItem("authToken");
      router.push("/");
    } finally {
      setLoading(false);
    }
  }, [router, rolesPermitidos]);

  if (loading || !isAuthenticated) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-white/60">
        <span className="text-gray-700 text-lg font-semibold">Cargando...</span>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
