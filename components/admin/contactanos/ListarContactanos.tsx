"use client";

import { useEffect, useState } from "react";
import { FaCheck, FaTimes, FaTrashAlt } from "react-icons/fa";

interface Mensaje {
  id: number;
  nombre: string;
  email: string;
  telefono: string;
  mensaje: string;
  estado: "Pendiente" | "Atendido";
  atendido_por: string | null;
  fecha_emision: string;
  fecha_atencion: string | null;
}

export function ListarContactanos() {
  const [mensajes, setMensajes] = useState<Mensaje[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const size = 10;

  const token = sessionStorage.getItem("authToken");

  const fetchMensajes = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `http://localhost:3001/api/contactanos/listar?page=${page}&size=${size}`,
        { headers: { Authorization: `Bearer ${token}`! } }
      );
      if (!res.ok) throw new Error("Error al cargar mensajes");
      const data = await res.json();
      setMensajes(data.mensajes);
      setTotalPages(data.totalPages);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Error de servidor");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMensajes();
  }, [page]);

  const handleToggleEstado = async (id: number) => {
    try {
      const res = await fetch(
        `http://localhost:3001/api/contactanos/alternar/${id}`,
        {
          method: "PATCH",
          headers: { Authorization: `Bearer ${token}`! },
        }
      );
      if (!res.ok) throw new Error("No se pudo alternar estado");
      await fetchMensajes();
    } catch (err) {
      console.error(err);
      setError("Error al alternar estado");
    }
  };

  const handleEliminar = async (id: number) => {
    try {
      const res = await fetch(
        `http://localhost:3001/api/contactanos/eliminar/${id}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}`! },
        }
      );
      if (!res.ok) throw new Error("No se pudo eliminar");
      await fetchMensajes();
    } catch (err) {
      console.error(err);
      setError("Error al eliminar mensaje");
    }
  };

  return (
    <div className="p-8 flex flex-col items-center">
      <h1 className="text-3xl text-[#15993b] font-bold mb-6">
        Lista de mensajes de Contáctanos
      </h1>

      {error && <div className="mb-4 text-red-600">{error}</div>}

      {loading ? (
        <p>Cargando mensajes...</p>
      ) : (
        <div className="overflow-x-auto w-full max-w-6xl">
          <table className="w-full bg-white shadow-md rounded-lg border">
            <thead>
              <tr className="bg-gray-100 text-gray-700 uppercase text-sm">
                <th className="py-3 px-4 text-left">ID</th>
                <th className="py-3 px-4 text-left">Nombre</th>
                <th className="py-3 px-4 text-left">Email</th>
                <th className="py-3 px-4 text-left">Teléfono</th>
                <th className="py-3 px-4 text-left">Mensaje</th>
                <th className="py-3 px-4 text-left">Fecha</th>
                <th className="py-3 px-4 text-left">Estado</th>
                <th className="py-3 px-4 text-left">Atendido Por</th>
                <th className="py-3 px-4 text-left">Fecha Atención</th>
                <th className="py-3 px-4 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {mensajes.map((m) => (
                <tr key={m.id} className="border-t hover:bg-gray-50">
                  <td className="py-3 px-4">{m.id}</td>
                  <td className="py-3 px-4">{m.nombre}</td>
                  <td className="py-3 px-4">{m.email}</td>
                  <td className="py-3 px-4">{m.telefono}</td>
                  <td className="py-3 px-4">{m.mensaje}</td>
                  <td className="py-3 px-4">
                    {new Date(m.fecha_emision).toLocaleString("es-PE", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                  <td
                    className={`py-3 px-4 font-semibold ${m.estado === "Pendiente" ? "text-red-600" : "text-black"
                      }`}
                  >
                    {m.estado}
                  </td>
                  <td className="py-3 px-4">{m.atendido_por ?? "-"}</td>
                  <td className="py-3 px-4">
                    {m.fecha_atencion
                      ? new Date(m.fecha_atencion).toLocaleString("es-PE", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                      : "-"}
                  </td>
                  <td className="py-3 px-4 flex flex-col justify-center items-center space-y-2">
                    {/* Botón Alternar Estado */}
                    <button
                      onClick={() => handleToggleEstado(m.id)}
                      className={`w-26 flex items-center space-x-2 px-3 py-1 rounded-md text-sm transition ${m.estado === "Pendiente"
                          ? "bg-green-600 hover:bg-green-700 text-white"
                          : "bg-orange-400 hover:bg-orange-500 text-white"
                        }`}
                    >
                      {m.estado === "Pendiente" ? <FaCheck /> : <FaTimes />}
                      <span>
                        {m.estado === "Pendiente" ? "Atender" : "Pendiente"}
                      </span>
                    </button>

                    {/* Botón Eliminar */}
                    <button
                      onClick={() => handleEliminar(m.id)}
                      className="w-26 flex items-center space-x-2 px-3 py-1 rounded-md text-sm bg-red-600 hover:bg-red-700 text-white transition"
                    >
                      <FaTrashAlt />
                      <span>Eliminar</span>
                    </button>
                  </td>
                </tr>
              ))}
              {mensajes.length === 0 && (
                <tr>
                  <td colSpan={9} className="text-center py-6 text-gray-400">
                    No hay mensajes.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Paginación */}
      <div className="flex items-center space-x-2 mt-6">
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          « Anterior
        </button>
        <span>
          Página <strong>{page}</strong> de <strong>{totalPages}</strong>
        </span>
        <button
          onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
          disabled={page === totalPages}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Siguiente »
        </button>
      </div>
    </div>
  );
}
