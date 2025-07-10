"use client";

import { useState } from "react";
import { LoginForm } from "@/components/index/login/LoginForm";
import { RegisterClientForm } from "@/components/index/login/RegisterClientForm";
import { WelcomeSection } from "@/components/index/login/Welcome";

export default function LoginPage() {
  const [mostrarRegistro, setMostrarRegistro] = useState(false);

  const alternarFormulario = () => {
    setMostrarRegistro(prev => !prev);
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50">
      <WelcomeSection />

      {mostrarRegistro ? (
        <RegisterClientForm onToggle={alternarFormulario} />
      ) : (
        <LoginForm onToggle={alternarFormulario} />
      )}
    </div>
  );
}
