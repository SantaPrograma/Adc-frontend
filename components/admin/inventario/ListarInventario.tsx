"use client";

import { useEffect, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { useRouter } from "next/navigation";
import ModalStock from "./ModalStock";


interface Producto {
  id: number;
  nombre: string;
  cantidad_antes: number | null;
  cantidad_ahora: number | null;
  fecha_actualizacion: string | null;
  actualizado_por: string | null;
  unidad_medida: {
    id: number;
    nombre: string;
  };
}

export default function Productos() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [mostrarModal, setMostrarModal] = useState(false);

  const fetchProductos = async () => {
    try {
      const token = sessionStorage.getItem("authToken");
      const res = await fetch("http://localhost:3001/api/producto/listar", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Error al obtener productos");
      const data = await res.json();
      setProductos(data.productos);
    } catch (err) {
      console.error(err);
      setError("No se pudieron cargar los productos.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  const handleEliminar = async (id: number) => {
    try {
      const token = sessionStorage.getItem("authToken");
      const res = await fetch(`http://localhost:3001/api/producto/eliminar/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Error al eliminar el producto.");
        return;
      }

      fetchProductos();
    } catch (error) {
      console.error("Error eliminando producto:", error);
      alert("Ocurrió un error al eliminar el producto.");
    }
  };

  const handleGuardarStock = async (id: number, cantidad: number) => {
    try {
      const token = sessionStorage.getItem("authToken");
      const usuario = sessionStorage.getItem("nombreUsuario") || "admin";

      const res = await fetch(`http://localhost:3001/api/producto/inventario/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ nuevaCantidad: cantidad, usuario }),
      });

      const data = await res.json();
      if (!res.ok) {
        alert(data.message || "Error al actualizar inventario");
      }
    } catch (err) {
      console.error("Error al actualizar:", err);
      alert("Error al actualizar inventario");
    }

    fetchProductos();
  };

  return (
    <div className="p-8 flex flex-col items-center">
      <h1 className="text-3xl text-[#15993b] font-bold mb-6">Lista de productos registrados</h1>

      {error && <div className="mb-4 text-red-600">{error}</div>}

      {/* Botón Registrar Stock */}
      <div className="w-full max-w-6xl mb-4 flex justify-start">
        <button
          className="px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700 transition"
          onClick={() => setMostrarModal(true)}
        >
          Registrar Stock
        </button>
      </div>

      {loading ? (
        <p>Cargando datos...</p>
      ) : (
        <div className="overflow-x-auto w-full max-w-6xl">
          <table className="w-full bg-white shadow-md rounded-lg border">
            <thead>
              <tr className="bg-gray-100 text-gray-700 uppercase text-sm">
                <th className="py-3 px-4 text-left">ID</th>
                <th className="py-3 px-4 text-left">Nombre</th>
                <th className="py-3 px-4 text-left">Unidad</th>
                <th className="py-3 px-4 text-left">Cantidad Antes</th>
                <th className="py-3 px-4 text-left">Cantidad Ahora</th>
                <th className="py-3 px-4 text-left">Fecha Actualización</th>
                <th className="py-3 px-4 text-left">Actualizado por</th>
                <th className="py-3 px-4 text-left">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {productos.map((p) => (
                <tr key={p.id} className="border-t hover:bg-gray-50">
                  <td className="py-3 px-4">{p.id}</td>
                  <td className="py-3 px-4">{p.nombre}</td>
                  <td className="py-3 px-4">{p.unidad_medida?.nombre || "-"}</td>
                  <td className="py-3 px-4">{p.cantidad_antes ?? "-"}</td>
                  <td className="py-3 px-4">{p.cantidad_ahora ?? "-"}</td>
                  <td className="py-3 px-4">
                    {p.fecha_actualizacion
                      ? new Date(p.fecha_actualizacion).toLocaleString("es-PE", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                      : "-"}
                  </td>
                  <td className="py-3 px-4">{p.actualizado_por ?? "-"}</td>
                  <td className="py-3 px-4 flex flex-col items-center space-y-2">
                    <button
                      onClick={() => router.push(`/administrativo/inventario/editar/${p.id}`)}
                      className="w-24 flex items-center space-x-2 px-3 py-1 rounded-md text-sm bg-orange-500 hover:bg-orange-600 text-white transition"
                    >
                      <MdEdit />
                      <span>Editar</span>
                    </button>

                    <button
                      onClick={() => handleEliminar(p.id)}
                      className="w-24 flex items-center space-x-2 px-3 py-1 rounded-md text-sm bg-red-500 hover:bg-red-600 text-white transition"
                    >
                      <FaTrashAlt />
                      <span>Eliminar</span>
                    </button>
                  </td>
                </tr>
              ))}
              {productos.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center py-6 text-gray-400">
                    No hay productos registrados.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
      {mostrarModal && (
        <ModalStock
          productos={productos}
          onClose={() => setMostrarModal(false)}
          onGuardar={handleGuardarStock}
        />
      )}
    </div>
  );
}
