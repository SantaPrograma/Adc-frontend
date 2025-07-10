"use client";

import { useEffect, useState } from "react";
import { FaPlus, FaTrashAlt } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { Cargo, CargoModal } from "./ModalCargo";

export default function RegistroPersonal() {
    // Estados del formulario Personal
    const [nombres, setNombres] = useState("");
    const [apellidos, setApellidos] = useState("");
    const [sexo, setSexo] = useState<"Masculino" | "Femenino">("Masculino");
    const [dni, setDni] = useState("");
    const [telefono, setTelefono] = useState("");
    const [email, setEmail] = useState("");
    const [direccion, setDireccion] = useState("");
    const [cargoId, setCargoId] = useState<number | "">("");
    const [cargos, setCargos] = useState<Cargo[]>([]);
    const [mensaje, setMensaje] = useState("");
    const [esError, setEsError] = useState(false);

    // Estados del modal de Cargo
    const [modalOpen, setModalOpen] = useState(false);
    const [modoEdicionCargo, setModoEdicionCargo] = useState(false);
    const [cargoEditandoId, setCargoEditandoId] = useState<number | null>(null);

    // Mensaje temporal
    const mostrarMensajeTemporal = (texto: string, error: boolean) => {
        setMensaje(texto);
        setEsError(error);
        setTimeout(() => setMensaje(""), 3000);
    };

    // Fetch Cargos
    const fetchCargos = async () => {
        try {
            const token = sessionStorage.getItem("authToken");
            const res = await fetch("http://localhost:3001/api/cargo/listar", {
                headers: { Authorization: `Bearer ${token}`! },
            });
            if (!res.ok) throw new Error();
            const data = await res.json();
            setCargos(data.cargos);
        } catch {
            mostrarMensajeTemporal("Error al cargar cargos.", true);
        }
    };

    useEffect(() => {
        fetchCargos();
    }, []);

    // Submit Personal
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!cargoId) {
            mostrarMensajeTemporal("Debes seleccionar un cargo.", true);
            return;
        }
        try {
            const token = sessionStorage.getItem("authToken");
            const res = await fetch("http://localhost:3001/api/personal/registrar", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    nombres,
                    apellidos,
                    sexo,
                    dni,
                    telefono,
                    email,
                    direccion,
                    cargo_id: cargoId,
                }),
            });
            const data = await res.json();
            if (res.ok) {
                mostrarMensajeTemporal(data.message || "Personal registrado con éxito.", false);
                setNombres("");
                setApellidos("");
                setSexo("Masculino");
                setDni("");
                setTelefono("");
                setEmail("");
                setDireccion("");
                setCargoId("");
            } else {
                mostrarMensajeTemporal(data.message || "Error al registrar personal, verifique los datos.", true);
            }
        } catch {
            mostrarMensajeTemporal("Error en la solicitud.", true);
        }
    };

    // Abrir modal
    const openModal = (modo: "nuevo" | "editar") => {
        setModalOpen(true);
        if (modo === "nuevo") {
            setModoEdicionCargo(false);
            setCargoEditandoId(null);
        } else {
            setModoEdicionCargo(true);
            setCargoEditandoId(typeof cargoId === "number" ? cargoId : null);
        }
    };
    const closeModal = () => setModalOpen(false);

    // Eliminar cargo
    const handleEliminarCargo = async () => {
        if (!cargoId) return;
        try {
            const token = sessionStorage.getItem("authToken");
            await fetch(`http://localhost:3001/api/cargo/eliminar/${cargoId}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}`! },
            });
            await fetchCargos();
            setCargoId("");
        } catch {
            mostrarMensajeTemporal("Error al eliminar cargo.", true);
        }
    };

    return (
        <main className="p-6 max-w-3xl mx-auto">
            <h1 className="text-3xl text-[#15993b] text-center font-bold mb-6">
                Registro de Personal
            </h1>

            <form className="space-y-4" onSubmit={handleSubmit}>
                {/* Fila 1 */}
                <div className="flex gap-4">
                    <div className="flex-1">
                        <label className="block text-sm font-medium">Nombres</label>
                        <input
                            type="text"
                            value={nombres}
                            onChange={(e) => setNombres(e.target.value)}
                            required
                            className="mt-1 w-full px-4 py-2 border rounded-md bg-gray-50 focus:ring-emerald-500 focus:border-emerald-500"
                        />
                    </div>
                    <div className="flex-1">
                        <label className="block text-sm font-medium">Apellidos</label>
                        <input
                            type="text"
                            value={apellidos}
                            onChange={(e) => setApellidos(e.target.value)}
                            required
                            className="mt-1 w-full px-4 py-2 border rounded-md bg-gray-50 focus:ring-emerald-500 focus:border-emerald-500"
                        />
                    </div>
                </div>

                {/* Fila 2 */}
                <div className="flex gap-4">
                    <div className="flex-1">
                        <label className="block text-sm font-medium">Sexo</label>
                        <select
                            value={sexo}
                            onChange={(e) => setSexo(e.target.value as any)}
                            required
                            className="mt-1 w-full px-4 py-2 border rounded-md bg-gray-50 focus:ring-emerald-500 focus:border-emerald-500"
                        >
                            <option>Masculino</option>
                            <option>Femenino</option>
                        </select>
                    </div>
                    <div className="flex-1">
                        <label className="block text-sm font-medium">DNI</label>
                        <input
                            type="text"
                            value={dni}
                            onChange={(e) => setDni(e.target.value)}
                            required
                            className="mt-1 w-full px-4 py-2 border rounded-md bg-gray-50 focus:ring-emerald-500 focus:border-emerald-500"
                        />
                    </div>
                    <div className="flex-1">
                        <label className="block text-sm font-medium">Teléfono</label>
                        <input
                            type="text"
                            value={telefono}
                            onChange={(e) => setTelefono(e.target.value)}
                            required
                            className="mt-1 w-full px-4 py-2 border rounded-md bg-gray-50 focus:ring-emerald-500 focus:border-emerald-500"
                        />
                    </div>
                </div>

                {/* Fila 3 */}
                <div className="flex gap-4">
                    <div className="flex-1">
                        <label className="block text-sm font-medium">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="mt-1 w-full px-4 py-2 border rounded-md bg-gray-50 focus:ring-emerald-500 focus:border-emerald-500"
                        />
                    </div>
                    <div className="flex-1">
                        <label className="block text-sm font-medium">Dirección</label>
                        <input
                            type="text"
                            value={direccion}
                            onChange={(e) => setDireccion(e.target.value)}
                            required
                            className="mt-1 w-full px-4 py-2 border rounded-md bg-gray-50 focus:ring-emerald-500 focus:border-emerald-500"
                        />
                    </div>
                </div>

                {/* Fila 4 */}
                <div className="flex gap-4 items-end">
                    <div className="flex-1">
                        <label className="block text-sm font-medium">Cargo</label>
                        <div className="mt-1 flex items-center gap-2">
                            <select
                                value={cargoId}
                                onChange={(e) => setCargoId(Number(e.target.value))}
                                required
                                className="flex-1 px-4 py-2 border rounded-md bg-gray-50 focus:ring-emerald-500 focus:border-emerald-500"
                            >
                                <option value="">Selecciona un cargo</option>
                                {cargos.map((c) => (
                                    <option key={c.id} value={c.id}>
                                        {c.nombre}
                                    </option>
                                ))}
                            </select>
                            <button
                                type="button"
                                onClick={() => openModal("nuevo")}
                                className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition"
                                title="Nuevo cargo"
                            >
                                <FaPlus />
                            </button>
                            <button
                                type="button"
                                onClick={() => openModal("editar")}
                                className="p-2 bg-orange-500 hover:bg-orange-600 text-white rounded-md transition"
                                title="Editar cargo"
                            >
                                <MdEdit />
                            </button>
                            <button
                                type="button"
                                onClick={handleEliminarCargo}
                                className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-md transition"
                                title="Eliminar cargo"
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

            {/* Modal de cargo */}
            <CargoModal
                abierto={modalOpen}
                modoEdicion={modoEdicionCargo}
                cargoIdEditando={cargoEditandoId}
                cargos={cargos}
                onCerrar={closeModal}
                onGuardado={fetchCargos}
            />
        </main>
    );
}
