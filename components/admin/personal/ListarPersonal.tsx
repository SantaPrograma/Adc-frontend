"use client";

import { useEffect, useState } from "react";
import { FaCheck, FaTimes, FaTrashAlt } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { useRouter } from 'next/navigation';

interface Cargo {
  id: number;
  nombre: string;
}

interface Personal {
  id: number;
  nombres: string;
  apellidos: string;
  sexo: string;
  dni: string;
  telefono: string;
  email: string;
  direccion: string;
  cargo_id: number;
  cargo?: Cargo;
  estado: "Activo" | "Inactivo";
  fecha_registro: string;
}

export function ListarPersonal() {
  const router = useRouter();

  const [personal, setPersonal] = useState<Personal[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const size = 10;

  const token = sessionStorage.getItem("authToken");

  const fetchPersonal = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `http://localhost:3001/api/personal/listar?page=${page}`,
        { headers: { Authorization: `Bearer ${token}`! } }
      );
      if (!res.ok) throw new Error("Error al cargar personal");
      const data = await res.json();
      setPersonal(data.personal);
      setTotalPages(data.totalPages);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Error de servidor");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPersonal();
  }, [page]);

  const handleToggleEstado = async (id: number) => {
    try {
      const res = await fetch(
        `http://localhost:3001/api/personal/alternar/${id}`,
        {
          method: "PATCH",
          headers: { Authorization: `Bearer ${token}`! },
        }
      );
      if (!res.ok) throw new Error("No se pudo cambiar el estado");
      await fetchPersonal();
    } catch (err) {
      console.error(err);
      setError("Error al cambiar estado");
    }
  };

  const handleEliminar = async (id: number) => {
    try {
      const res = await fetch(
        `http://localhost:3001/api/personal/eliminar/${id}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}`! },
        }
      );
      if (!res.ok) throw new Error("No se pudo eliminar");
      await fetchPersonal();
    } catch (err) {
      console.error(err);
      setError("Error al eliminar personal");
    }
  };

  return (
    <div className="p-8 flex flex-col items-center">
      <h1 className="text-3xl text-[#15993b] font-bold mb-6">
        Lista de personal registrado
      </h1>

      {error && <div className="mb-4 text-red-600">{error}</div>}

      {loading ? (
        <p>Cargando datos...</p>
      ) : (
        <div className="overflow-x-auto w-full max-w-6xl">
          <table className="w-full bg-white shadow-md rounded-lg border">
            <thead>
              <tr className="bg-gray-100 text-gray-700 uppercase text-sm">
                <th className="py-3 px-4 text-left">ID</th>
                <th className="py-3 px-4 text-left">Nombres</th>
                <th className="py-3 px-4 text-left">Apellidos</th>
                <th className="py-3 px-4 text-left">Sexo</th>
                <th className="py-3 px-4 text-left">DNI</th>
                <th className="py-3 px-4 text-left">Teléfono</th>
                <th className="py-3 px-4 text-left">Email</th>
                <th className="py-3 px-4 text-left">Dirección</th>
                <th className="py-3 px-4 text-left">Cargo</th>
                <th className="py-3 px-4 text-left">Estado</th>
                <th className="py-3 px-4 text-left">Fecha Registro</th>
                <th className="py-3 px-4 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {personal.map((p) => (
                <tr key={p.id} className="border-t hover:bg-gray-50">
                  <td className="py-3 px-4">{p.id}</td>
                  <td className="py-3 px-4">{p.nombres}</td>
                  <td className="py-3 px-4">{p.apellidos}</td>
                  <td className="py-3 px-4">{p.sexo}</td>
                  <td className="py-3 px-4">{p.dni}</td>
                  <td className="py-3 px-4">{p.telefono}</td>
                  <td className="py-3 px-4">{p.email}</td>
                  <td className="py-3 px-4">{p.direccion}</td>
                  <td className="py-3 px-4">{p.cargo?.nombre || "-"}</td>
                  <td
                    className={`py-3 px-4 font-semibold ${p.estado === "Inactivo" ? "text-red-600" : "text-black"
                      }`}
                  >
                    {p.estado}
                  </td>
                  <td className="py-3 px-4">
                    {new Date(p.fecha_registro).toLocaleString("es-PE", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                  <td className="py-3 px-4 flex flex-col items-center space-y-2">
                    <button
                      onClick={() => router.push(`/administrativo/personal/editar/${p.id}`)}
                      className="w-26 flex items-center space-x-2 px-3 py-1 rounded-md text-sm bg-blue-600 hover:bg-blue-700 text-white transition"
                    >
                      <MdEdit />
                      <span>Editar</span>
                    </button>

                    <button
                      onClick={() => handleToggleEstado(p.id)}
                      className={`w-26 flex items-center space-x-2 px-3 py-1 rounded-md text-sm transition ${p.estado === "Inactivo"
                        ? "bg-green-600 hover:bg-green-700 text-white"
                        : "bg-orange-400 hover:bg-orange-500 text-white"
                        }`}
                    >
                      {p.estado === "Inactivo" ? <FaCheck /> : <FaTimes />}
                      <span>
                        {p.estado === "Inactivo" ? "Activar" : "Inactivar"}
                      </span>
                    </button>

                    <button
                      onClick={() => handleEliminar(p.id)}
                      className="w-26 flex items-center space-x-2 px-3 py-1 rounded-md text-sm bg-red-600 hover:bg-red-700 text-white transition"
                    >
                      <FaTrashAlt />
                      <span>Eliminar</span>
                    </button>
                  </td>
                </tr>
              ))}
              {personal.length === 0 && (
                <tr>
                  <td colSpan={12} className="text-center py-6 text-gray-400">
                    No hay registros de personal.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

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
