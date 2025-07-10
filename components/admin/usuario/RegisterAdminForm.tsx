"use client";

import { useState } from "react";

export default function RegisterAdminForm() {
  const [usuario, setUsuario] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [confirmarContraseña, setConfirmarContraseña] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState(false);

  const mostrarMensajeTemporal = (texto: string, esError: boolean) => {
    setMensaje(texto);
    setError(esError);
    setTimeout(() => setMensaje(""), 3000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (contraseña !== confirmarContraseña) {
      mostrarMensajeTemporal("Las contraseñas no coinciden.", true);
      return;
    }

    try {
      const token = sessionStorage.getItem("authToken");
      if (!token) {
        mostrarMensajeTemporal("Debes iniciar sesión primero.", true);
        return;
      }

      const res = await fetch("http://localhost:3001/api/usuario/registrar-admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ usuario, contraseña }),
      });


      const data = await res.json();

      if (res.ok) {
        mostrarMensajeTemporal(data.message || "Usuario registrado con éxito.", false);
        setUsuario("");
        setContraseña("");
        setConfirmarContraseña("");
      } else {
        mostrarMensajeTemporal(data.message || "Error al registrar.", true);
      }
    } catch (err) {
      console.error(err);
      mostrarMensajeTemporal("Error en la solicitud.", true);
    }
  };

  return (
    <main>
      <div className="p-6 space-y-6 max-w-md mx-auto">
        <h1 className="text-3xl text-[#15993b] text-center font-bold mb-8">
          Registro de usuarios
        </h1>
        <p className="text-sm text-gray-500 text-center">
          Recuerda registrar solo usuarios confiables con acceso autorizado.
        </p>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="usuario" className="block text-sm font-medium text-gray-700">
              Usuario
            </label>
            <input
              id="usuario"
              type="text"
              placeholder="Ingresa el usuario"
              className="mt-1 block w-full px-4 py-2 border rounded-md bg-gray-50 focus:ring-emerald-500 focus:border-emerald-500"
              required
              value={usuario}
              onChange={e => setUsuario(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="contraseña" className="block text-sm font-medium text-gray-700">
              Contraseña
            </label>
            <input
              id="contraseña"
              type="password"
              placeholder="Ingresa la contraseña"
              className="mt-1 block w-full px-4 py-2 border rounded-md bg-gray-50 focus:ring-emerald-500 focus:border-emerald-500"
              required
              value={contraseña}
              onChange={e => setContraseña(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="confirmar-contraseña" className="block text-sm font-medium text-gray-700">
              Confirmar contraseña
            </label>
            <input
              id="confirmar-contraseña"
              type="password"
              placeholder="Vuelve a ingresar la contraseña"
              className="mt-1 block w-full px-4 py-2 border rounded-md bg-gray-50 focus:ring-emerald-500 focus:border-emerald-500"
              required
              value={confirmarContraseña}
              onChange={e => setConfirmarContraseña(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-emerald-600 text-white py-2 px-4 rounded-md hover:bg-emerald-700 transition-colors"
          >
            Registrar
          </button>
        </form>

        {mensaje && (
          <p className={`text-center text-sm ${error ? "text-red-600" : "text-emerald-600"}`}>
            {mensaje}
          </p>
        )}
      </div>
    </main>
  );
}
