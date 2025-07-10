"use client";

import { useEffect, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";

interface Usuario {
  id: number;
  usuario: string;
  creado_por: string;
  fecha_creacion: string;
}

export function ListarUsuarios() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [mensaje, setMensaje] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [usuarioAEliminar, setUsuarioAEliminar] = useState<Usuario | null>(null);

  const token = sessionStorage.getItem("authToken");

  const fetchUsuarios = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:3001/api/usuario/listar", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (res.ok) {
        setUsuarios(data);
      } else {
        mostrarMensajeTemporal(data.message || "Error al listar usuarios");
      }
    } catch (error) {
      console.error("Error al listar usuarios:", error);
      mostrarMensajeTemporal("Error al conectar con el servidor");
    } finally {
      setLoading(false);
    }
  };

  const handleEliminar = async (id: number) => {
    try {
      const res = await fetch(`http://localhost:3001/api/usuario/eliminar/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (res.ok) {
        mostrarMensajeTemporal(data.message || "Usuario eliminado correctamente");
        fetchUsuarios();
      } else {
        mostrarMensajeTemporal(data.message || "Error al eliminar usuario");
      }
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
      mostrarMensajeTemporal("Error al conectar con el servidor");
    } finally {
      setMostrarModal(false);
    }
  };

  const handleConfirmarEliminar = () => {
    if (usuarioAEliminar) {
      handleEliminar(usuarioAEliminar.id);
    }
  };

  const handleMostrarModal = (usuario: Usuario) => {
    setUsuarioAEliminar(usuario);
    setMostrarModal(true);
  };

  const handleCancelarEliminar = () => {
    setUsuarioAEliminar(null);
    setMostrarModal(false);
  };

  const mostrarMensajeTemporal = (mensaje: string) => {
    setMensaje(mensaje);
    setTimeout(() => {
      setMensaje(null);
    }, 3000);
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  return (
    <div className="p-8 flex flex-col items-center">
      <h1 className="text-3xl text-[#15993b] font-bold mb-6">Lista de usuarios</h1>

      {mensaje && <div className="mb-4 text-red-600">{mensaje}</div>}

      {loading ? (
        <p>Cargando usuarios...</p>
      ) : (
        <div className="overflow-x-auto w-full max-w-xl">
          <table className="w-full bg-white shadow-md rounded-lg border">
            <thead>
              <tr className="bg-gray-100 text-gray-700 uppercase text-sm">
                <th className="py-3 px-4 text-left">ID</th>
                <th className="py-3 px-4 text-left">Usuario</th>
                <th className="py-3 px-4 text-left">Creado por</th>
                <th className="py-3 px-4 text-left">Fecha de creación</th>
                <th className="py-3 px-4 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((usuario) => (
                <tr key={usuario.id} className="border-t hover:bg-gray-50">
                  <td className="py-3 px-4">{usuario.id}</td>
                  <td className="py-3 px-4">{usuario.usuario}</td>
                  <td className="py-3 px-4">{usuario.creado_por || "-"}</td>
                  <td className="py-3 px-4">
                    {new Date(usuario.fecha_creacion).toLocaleDateString("es-UY", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                  <td className="py-3 px-4 flex justify-center">
                    <button
                      onClick={() => handleMostrarModal(usuario)}
                      className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md text-sm transition"
                    >
                      <FaTrashAlt />
                      <span>Eliminar</span>
                    </button>
                  </td>
                </tr>
              ))}
              {usuarios.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center py-6 text-gray-400">
                    No hay usuarios registrados.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {mostrarModal && usuarioAEliminar && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-lg font-bold mb-4">Confirmar Eliminación</h2>
            <p className="mb-6">
              ¿Seguro que deseas eliminar al usuario{" "}
              <span className="font-semibold">{usuarioAEliminar.usuario}</span>?
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={handleCancelarEliminar}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-md"
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirmarEliminar}
                className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-md"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
