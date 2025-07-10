"use client";

import { FC, useState, useEffect } from "react";

export interface Cargo {
    id: number;
    nombre: string;
}

interface CargoModalProps {
    abierto: boolean;
    modoEdicion: boolean;
    cargoIdEditando: number | null;
    cargos: Cargo[];
    onCerrar: () => void;
    onGuardado: () => void;
}

export const CargoModal: FC<CargoModalProps> = ({
    abierto,
    modoEdicion,
    cargoIdEditando,
    cargos,
    onCerrar,
    onGuardado,
}) => {
    const [nombre, setNombre] = useState("");

    // Cuando abrimos en modo edición, precargamos el nombre
    useEffect(() => {
        if (modoEdicion && cargoIdEditando != null) {
            const c = cargos.find((x) => x.id === cargoIdEditando);
            setNombre(c?.nombre || "");
        } else {
            setNombre("");
        }
    }, [modoEdicion, cargoIdEditando, cargos]);

    const handleGuardar = async () => {
        if (!nombre.trim()) return;
        const token = sessionStorage.getItem("authToken");
        const url = modoEdicion
            ? `http://localhost:3001/api/cargo/editar/${cargoIdEditando}`
            : `http://localhost:3001/api/cargo/registrar`;
        const method = modoEdicion ? "PUT" : "POST";

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
            console.error("Error guardando cargo");
        }
    };

    if (!abierto) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-10 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg w-80">
                <h2 className="text-lg font-semibold mb-4">
                    {modoEdicion ? "Editar Cargo" : "Nuevo Cargo"}
                </h2>
                <input
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    placeholder="Nombre del cargo"
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
