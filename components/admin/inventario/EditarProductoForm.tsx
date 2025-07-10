"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Unidad, UnidadModal } from "./ModalUnidadMedida";
import { FaPlus, FaTrashAlt } from "react-icons/fa";
import { MdEdit } from "react-icons/md";

interface EditarProductoFormProps {
    id: string;
}

export default function EditarProductoForm({ id }: EditarProductoFormProps) {
    const router = useRouter();

    const [nombre, setNombre] = useState("");
    const [unidadId, setUnidadId] = useState("");
    const [unidades, setUnidades] = useState<Unidad[]>([]);
    const [mensaje, setMensaje] = useState("");
    const [esError, setEsError] = useState(false);
    const [loading, setLoading] = useState(true);

    const [modalOpen, setModalOpen] = useState(false);
    const [modoEdicionUnidad, setModoEdicionUnidad] = useState(false);
    const [unidadEditandoId, setUnidadEditandoId] = useState<number | null>(null);

    const mostrarMensajeTemporal = (texto: string, error: boolean) => {
        setMensaje(texto);
        setEsError(error);
        setTimeout(() => setMensaje(""), 3000);
    };

    const fetchUnidades = async () => {
        try {
            const token = sessionStorage.getItem("authToken");
            const res = await fetch("http://localhost:3001/api/unidad-medida/listar", {
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await res.json();
            setUnidades(data.unidades);
        } catch {
            mostrarMensajeTemporal("Error al cargar unidades.", true);
        }
    };

    const fetchProducto = async () => {
        try {
            const token = sessionStorage.getItem("authToken");
            const res = await fetch(`http://localhost:3001/api/producto/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            const contentType = res.headers.get("content-type");
            if (!contentType || !contentType.includes("application/json")) {
                mostrarMensajeTemporal("Error: respuesta inesperada del servidor.", true);
                setLoading(false);
                return;
            }

            const data = await res.json();

            if (data.datos) {
                setNombre(data.datos.nombre);
                setUnidadId(String(data.datos.unidad_medida?.id || ""));
            } else {
                mostrarMensajeTemporal("Producto no encontrado.", true);
            }

            setLoading(false);
        } catch (error) {
            mostrarMensajeTemporal("Error al cargar producto.", true);
            setLoading(false);
        }
    };

    useEffect(() => {
        if (id) {
            fetchUnidades();
            fetchProducto();
        }
    }, [id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!unidadId) {
            mostrarMensajeTemporal("Debes seleccionar una unidad.", true);
            return;
        }

        try {
            const token = sessionStorage.getItem("authToken");
            const res = await fetch(`http://localhost:3001/api/producto/editar/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    nombre,
                    unidad_medida_id: Number(unidadId),
                }),
            });

            const data = await res.json();
            if (res.ok) {
                mostrarMensajeTemporal(data.message || "Producto actualizado.", false);
                setTimeout(() => router.push("/administrativo/inventario/listar"), 1500);
            } else {
                mostrarMensajeTemporal(data.message || "Error al actualizar producto.", true);
            }
        } catch {
            mostrarMensajeTemporal("Error en la solicitud.", true);
        }
    };

    const openModal = (modo: "nuevo" | "editar") => {
        setModalOpen(true);
        if (modo === "nuevo") {
            setModoEdicionUnidad(false);
            setUnidadEditandoId(null);
        } else {
            setModoEdicionUnidad(true);
            setUnidadEditandoId(unidadId ? parseInt(unidadId) : null);
        }
    };

    const closeModal = () => setModalOpen(false);

    const handleEliminarUnidad = async () => {
        if (!unidadId) return;
        try {
            const token = sessionStorage.getItem("authToken");
            await fetch(`http://localhost:3001/api/unidad-medida/eliminar/${unidadId}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` },
            });
            await fetchUnidades();
            setUnidadId("");
        } catch {
            mostrarMensajeTemporal("Error al eliminar unidad.", true);
        }
    };

    if (loading) return <p>Cargando...</p>;

    return (
        <main className="p-6 max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold text-center text-[#15993b] mb-6">
                Editar Producto
            </h1>

            <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                    <label className="block text-sm font-medium">Nombre del producto</label>
                    <input
                        type="text"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        required
                        className="mt-1 w-full px-4 py-2 border rounded-md bg-gray-50 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium">Unidad de medida</label>
                    <div className="mt-1 flex items-center gap-2">
                        <select
                            value={unidadId}
                            onChange={(e) => setUnidadId(e.target.value)}
                            required
                            className="flex-1 px-4 py-2 border rounded-md bg-gray-50 focus:ring-emerald-500 focus:border-emerald-500"
                        >
                            <option value="">Selecciona una unidad</option>
                            {unidades.map((u) => (
                                <option key={u.id} value={u.id}>
                                    {u.nombre}
                                </option>
                            ))}
                        </select>
                        <button
                            type="button"
                            onClick={() => openModal("nuevo")}
                            className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                        >
                            <FaPlus />
                        </button>
                        <button
                            type="button"
                            onClick={() => openModal("editar")}
                            className="p-2 bg-orange-500 text-white rounded-md hover:bg-orange-600"
                        >
                            <MdEdit />
                        </button>
                        <button
                            type="button"
                            onClick={handleEliminarUnidad}
                            className="p-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                        >
                            <FaTrashAlt />
                        </button>
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full bg-emerald-600 text-white py-2 rounded-md hover:bg-emerald-700"
                >
                    Guardar Cambios
                </button>
            </form>

            {mensaje && (
                <p className={`mt-4 text-center text-sm ${esError ? "text-red-600" : "text-emerald-600"}`}>
                    {mensaje}
                </p>
            )}

            {/* Modal unidad */}
            <UnidadModal
                abierto={modalOpen}
                modoEdicion={modoEdicionUnidad}
                unidadIdEditando={unidadEditandoId}
                unidades={unidades}
                onCerrar={closeModal}
                onGuardado={fetchUnidades}
            />
        </main>
    );
}
