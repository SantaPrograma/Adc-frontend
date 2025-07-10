"use client";

import { useEffect, useState } from "react";
import { FaPlus, FaTrashAlt } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { Unidad, UnidadModal } from "./ModalUnidadMedida";

export default function RegistrarProductoForm() {
    const [nombre, setNombre] = useState("");
    const [unidadId, setUnidadId] = useState<number | "">("");
    const [unidades, setUnidades] = useState<Unidad[]>([]);
    const [mensaje, setMensaje] = useState("");
    const [esError, setEsError] = useState(false);

    const [modalOpen, setModalOpen] = useState(false);
    const [modoEdicion, setModoEdicion] = useState(false);
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

    useEffect(() => {
        fetchUnidades();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!unidadId) {
            mostrarMensajeTemporal("Debes seleccionar una unidad.", true);
            return;
        }
        try {
            const token = sessionStorage.getItem("authToken");
            const res = await fetch("http://localhost:3001/api/producto/registrar", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    nombre,
                    unidad_medida_id: unidadId,
                }),
            });
            const data = await res.json();
            if (res.ok) {
                mostrarMensajeTemporal("Producto registrado correctamente.", false);
                setNombre("");
                setUnidadId("");
            } else {
                mostrarMensajeTemporal(data.message || "Error al registrar producto.", true);
            }
        } catch {
            mostrarMensajeTemporal("Error en la solicitud.", true);
        }
    };

    const openModal = (modo: "nuevo" | "editar") => {
        setModalOpen(true);
        if (modo === "nuevo") {
            setModoEdicion(false);
            setUnidadEditandoId(null);
        } else {
            setModoEdicion(true);
            setUnidadEditandoId(typeof unidadId === "number" ? unidadId : null);
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

    return (
        <main className="p-6 max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold text-[#15993b] text-center mb-6">
                Registro de Producto
            </h1>

            <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                    <label className="block text-sm font-medium">Nombre del Producto</label>
                    <input
                        type="text"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        required
                        className="mt-1 w-full px-4 py-2 border rounded-md bg-gray-50 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                </div>

                <div className="flex gap-2 items-end">
                    <div className="flex-1">
                        <label className="block text-sm font-medium">Unidad de Medida</label>
                        <div className="mt-1 flex items-center gap-2">
                            <select
                                value={unidadId}
                                onChange={(e) => setUnidadId(Number(e.target.value))}
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
                                className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
                                title="Nueva unidad"
                            >
                                <FaPlus />
                            </button>
                            <button
                                type="button"
                                onClick={() => openModal("editar")}
                                className="p-2 bg-orange-500 hover:bg-orange-600 text-white rounded-md"
                                title="Editar unidad"
                            >
                                <MdEdit />
                            </button>
                            <button
                                type="button"
                                onClick={handleEliminarUnidad}
                                className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-md"
                                title="Eliminar unidad"
                            >
                                <FaTrashAlt />
                            </button>
                        </div>
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full bg-emerald-600 text-white py-2 rounded-md hover:bg-emerald-700 transition-colors"
                >
                    Registrar
                </button>
            </form>

            {mensaje && (
                <p className={`mt-4 text-center text-sm ${esError ? "text-red-600" : "text-emerald-600"}`}>
                    {mensaje}
                </p>
            )}

            <UnidadModal
                abierto={modalOpen}
                modoEdicion={modoEdicion}
                unidadIdEditando={unidadEditandoId}
                unidades={unidades}
                onCerrar={closeModal}
                onGuardado={fetchUnidades}
            />
        </main>
    );
}
