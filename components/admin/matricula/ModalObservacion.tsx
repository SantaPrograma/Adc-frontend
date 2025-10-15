"use client";

import { useEffect, useState } from "react";

interface Props {
  idMatricula: number;
  onClose: () => void;
}

export default function ModalObservacion({ idMatricula, onClose }: Props) {
  const [observacion, setObservacion] = useState("");
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState<{ tipo: "error" | "success"; texto: string } | null>(null);
  const token = sessionStorage.getItem("authToken");

  useEffect(() => {
    const fetchObservacion = async () => {
      try {
        const res = await fetch(
          `http://localhost:3001/api/matricula/observacion/${idMatricula}`,
          { method: "GET", headers: { Authorization: `Bearer ${token}` } }
        );
        if (!res.ok) throw new Error("Error al cargar observación");
        const data = await res.json();
        setObservacion(data.observaciones || "");
      } catch (err) {
        console.error(err);
        setObservacion("");
        setMensaje({ tipo: "error", texto: "No se pudo cargar" });
        setTimeout(() => setMensaje(null), 3000);
      }
    };
    fetchObservacion();
  }, [idMatricula, token]);

  const guardarObservacion = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `http://localhost:3001/api/matricula/observacion/${idMatricula}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          body: JSON.stringify({ observaciones: observacion }),
        }
      );
      if (!res.ok) throw new Error("Error al guardar");
      setMensaje({ tipo: "success", texto: "Guardado" });
      setTimeout(() => onClose(), 1200);
    } catch (err) {
      console.error(err);
      setMensaje({ tipo: "error", texto: "Error al guardar" });
    } finally {
      setLoading(false);
      setTimeout(() => setMensaje(null), 3000);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Observación de matrícula #{idMatricula}
        </h2>

        <textarea
          value={observacion}
          onChange={(e) => setObservacion(e.target.value)}
          className="w-full border rounded-md p-2 h-32 focus:outline-none focus:ring-2 focus:ring-[#15993b]"
          placeholder="Ejemplo: DNI incorrecto, falta documento..."
        />

        <div className="flex items-center justify-between mt-4">
          {mensaje && (
            <span
              className={`text-sm font-medium ${
                mensaje.tipo === "success" ? "text-[#15993b]" : "text-red-600"
              }`}
            >
              {mensaje.texto}
            </span>
          )}

          <div className="flex space-x-3 ml-auto">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
              disabled={loading}
            >
              Cancelar
            </button>
            <button
              onClick={guardarObservacion}
              disabled={loading}
              className="px-4 py-2 bg-[#15993b] text-white rounded-md hover:bg-[#12732f]"
            >
              {loading ? "Guardando..." : "Guardar"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}