"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface MatriculaData {
  nombres: string;
  apellidos: string;
  dni: string;
  estado: string;
  observaciones?: string;
  fechaRegistro: string;
  fechaMatricula?: string;
}

export function ConsultaMatricula() {
  const router = useRouter();
  const [dni, setDni] = useState("");
  const [datos, setDatos] = useState<MatriculaData | null>(null);
  const [mensaje, setMensaje] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleConsulta = async (e: React.FormEvent) => {
    e.preventDefault();
    setDatos(null);
    setMensaje(null);

    if (!dni) {
      setMensaje("Ingresa un DNI válido");
      return;
    }

    try {
      setLoading(true);
      const token = sessionStorage.getItem("authToken");
      const res = await fetch(`http://localhost:3001/api/matricula/consulta/${dni}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();

      if (!res.ok) {
        setMensaje(data.error || "No se encontró matrícula");
        return;
      }

      setDatos(data);
    } catch (err) {
      console.error(err);
      setMensaje("Error al consultar matrícula");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-emerald-700">Consulta de Matrícula</h2>

      <form onSubmit={handleConsulta} className="flex items-center gap-3 mb-6">
        <input
          type="text"
          placeholder="Ingresa tu DNI"
          value={dni}
          onChange={(e) => setDni(e.target.value.replace(/[^0-9]/g, ""))}
          className="flex-1 border rounded p-2"
        />
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-[#15993b] text-white rounded hover:bg-[#12732f] disabled:opacity-50"
        >
          {loading ? "Consultando..." : "Consultar"}
        </button>
      </form>

      {mensaje && <p className="text-red-600 mb-4">{mensaje}</p>}

      {datos && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded border">
          <div>
            <p className="font-semibold">Nombres:</p>
            <p>{datos.nombres}</p>
          </div>
          <div>
            <p className="font-semibold">Apellidos:</p>
            <p>{datos.apellidos}</p>
          </div>
          <div>
            <p className="font-semibold">DNI:</p>
            <p>{datos.dni}</p>
          </div>
          <div>
            <p className="font-semibold">Estado:</p>
            <p>{datos.estado}</p>
          </div>

          {datos.estado !== "Matriculado" &&
            datos.observaciones &&
            datos.observaciones.trim() !== "" && (
              <div className="md:col-span-2">
                <p className="font-semibold text-red-600">Observaciones:</p>
                <p>{datos.observaciones}</p>
              </div>
            )}

          <div>
            <p className="font-semibold">Fecha de Registro:</p>
            <p>{new Date(datos.fechaRegistro).toLocaleDateString()}</p>
          </div>

          {datos.fechaMatricula && (
            <div>
              <p className="font-semibold">Fecha de Matrícula:</p>
              <p>{new Date(datos.fechaMatricula).toLocaleDateString()}</p>
            </div>
          )}
        </div>
      )}

      <div className="mt-4">
        <button
          onClick={() => router.push("/homeClient")}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
        >
          Volver
        </button>
      </div>

    </div>
  );
}