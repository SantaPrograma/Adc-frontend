"use client";

import { FiUser, FiLock } from "react-icons/fi";
import { useState } from "react";

export function LoginForm({ onToggle }: { onToggle: () => void }) {
  const [usuario, setUsuario] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [mensaje, setMensaje] = useState<string | null>(null);

  const mostrarMensajeTemporal = (texto: string) => {
    setMensaje(texto);
    setTimeout(() => {
      setMensaje(null);
    }, 3000);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3001/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usuario, contraseña }),
      });

      const data = await res.json();

      if (res.ok) {
        sessionStorage.setItem("authToken", data.token);

        // Redirigir según el rol
        if (data.rol === "admin") {
          window.location.href = "/administrativo";
        } else if (data.rol === "cliente") {
          window.location.href = "/homeClient";
        } else {
          window.location.href = "/";
        }

      } else {
        mostrarMensajeTemporal(data.message || "Credenciales inválidas");
      }
    } catch (err) {
      console.error("Error en el login:", err);
      mostrarMensajeTemporal("Ocurrió un error al iniciar sesión.");
    }
  };

  return (
    <div className="lg:w-1/2 w-full flex flex-col items-center justify-center p-6 relative">
      <div className="bg-white p-8 lg:p-10 rounded-2xl shadow-xl w-full max-w-md border border-gray-100">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
            Iniciar Sesión
          </h2>
          <p className="text-gray-500 mt-2">Ingresa tus credenciales para continuar</p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label htmlFor="usuario" className="block text-sm font-medium text-gray-700">
              Usuario
            </label>
            <div className="relative">
              <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                id="usuario"
                type="text"
                placeholder="Ingresa tu usuario"
                required
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
                className="block w-full pl-10 pr-3 py-2.5 border rounded-lg bg-gray-50"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Contraseña
            </label>
            <div className="relative">
              <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                id="password"
                type="password"
                placeholder="Ingresa tu contraseña"
                required
                value={contraseña}
                onChange={(e) => setContraseña(e.target.value)}
                className="block w-full pl-10 pr-3 py-2.5 border rounded-lg bg-gray-50"
              />
            </div>
          </div>

          {mensaje && <p className="text-red-500 text-center mb-4">{mensaje}</p>}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-emerald-600 to-green-600 text-white py-3 px-4 rounded-lg font-medium hover:opacity-90 focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50 hover:scale-105 transition-all duration-300 disabled:cursor-not-allowed"
          >
            Iniciar Sesión
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            ¿No tienes cuenta?{" "}
            <button
              onClick={onToggle}
              className="text-emerald-600 hover:underline font-medium"
            >
              Regístrate aquí
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}