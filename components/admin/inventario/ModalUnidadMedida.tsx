"use client";

import { FC, useEffect, useState } from "react";

export interface Unidad {
    id: number;
    nombre: string;
}

interface UnidadModalProps {
    abierto: boolean;
    modoEdicion: boolean;
    unidadIdEditando: number | null;
    unidades: Unidad[];
    onCerrar: () => void;
    onGuardado: () => void;
}

export const UnidadModal: FC<UnidadModalProps> = ({
    abierto,
    modoEdicion,
    unidadIdEditando,
    unidades,
    onCerrar,
    onGuardado,
}) => {
    const [nombre, setNombre] = useState("");

    useEffect(() => {
        if (modoEdicion && unidadIdEditando != null) {
            const unidad = unidades.find((u) => u.id === unidadIdEditando);
            setNombre(unidad?.nombre || "");
        } else {
            setNombre("");
        }
    }, [modoEdicion, unidadIdEditando, unidades]);

    const handleGuardar = async () => {
        if (!nombre.trim()) return;
        const token = sessionStorage.getItem("authToken");

        const url = modoEdicion
            ? `http://localhost:3001/api/unidad-medida/editar/${unidadIdEditando}`
            : `http://localhost:3001/api/unidad-medida/registrar`;

        const method = modoEdicion ? "PUT" : "POST";

        try {
            const res = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ nombre }),
            });

            if (res.ok) {
                onGuardado();
                onCerrar();
            } else {
                const error = await res.json();
                alert(error.message || "Error al guardar unidad");
            }
        } catch (error) {
            console.error("Error en la solicitud:", error);
        }
    };

    if (!abierto) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-10 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg w-80">
                <h2 className="text-lg font-semibold mb-4">
                    {modoEdicion ? "Editar Unidad" : "Nueva Unidad"}
                </h2>
                <input
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    placeholder="Nombre de la unidad"
                    className="w-full px-4 py-2 border rounded-md mb-4 focus:ring-emerald-500 focus:border-emerald-500"
                />
                <div className="flex justify-end gap-2">
                    <button
                        onClick={onCerrar}
                        className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-md"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={handleGuardar}
                        className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md"
                    >
                        Guardar
                    </button>
                </div>
            </div>
        </div>
    );
};
