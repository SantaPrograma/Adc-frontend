"use client";

import { useEffect, useState } from "react";
import { FaEye, FaCheck, FaTimes } from "react-icons/fa";
import { useRouter } from "next/navigation";

interface Matricula {
    id: number;
    nombres: string;
    apellidos: string;
    sexo: string;
    fechaNacimiento: string;
    edad: number;
    duracion: number;
    estado: string;
    fechaRegistro: string | null;
    fechaMatricula: string | null;
}

export function ListarMatriculas() {
    const router = useRouter();
    const [matriculas, setMatriculas] = useState<Matricula[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const token = sessionStorage.getItem("authToken");

    const fetchMatriculas = async () => {
        try {
            setLoading(true);
            const res = await fetch(
                `http://localhost:3001/api/matricula/listar?page=${page}&size=10`,
                {
                    headers: { Authorization: `Bearer ${token}`! },
                }
            );
            if (!res.ok) throw new Error("Error al obtener matrículas");
            const data = await res.json();

            const datosTransformados: Matricula[] = data.datos.map((m: any) => ({
                id: m.id,
                nombres: m.nombres,
                apellidos: m.apellidos,
                sexo: m.sexo,
                fechaNacimiento: m.fechaNacimiento,
                edad: m.edad,
                duracion: m.duracion,
                estado: m.estado,
                fechaRegistro: m.fechaRegistro,
                fechaMatricula: m.fechaMatricula ?? m.fecha_matricula ?? null,
            }));

            setMatriculas(datosTransformados);
            setTotalPages(data.totalPaginas);
        } catch (err: any) {
            console.error(err);
            setError(err.message || "Error desconocido");
        } finally {
            setLoading(false);
        }
    };

    const cambiarEstado = async (id: number) => {
        try {
            const res = await fetch(`http://localhost:3001/api/matricula/estado/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!res.ok) throw new Error("Error al cambiar estado");

            const data = await res.json();

            setMatriculas((prev) =>
                prev.map((m) =>
                    m.id === id
                        ? {
                            ...m,
                            estado: data.nuevoEstado,
                            fechaMatricula: data.fecha_matricula ?? null,
                        }
                        : m
                )
            );

        } catch (err) {
            console.error(err);
            alert("Hubo un error al cambiar el estado.");
        }
    };

    useEffect(() => {
        fetchMatriculas();
    }, [page]);

    return (
        <div className="p-8 flex flex-col items-center">
            <h1 className="text-3xl text-[#15993b] font-bold mb-6">
                Lista de matrículas registradas
            </h1>

            {error && <div className="mb-4 text-red-600">{error}</div>}

            {loading ? (
                <p>Cargando matrículas...</p>
            ) : (
                <div className="overflow-x-auto w-full max-w-6xl">
                    <table className="w-full bg-white shadow-md rounded-lg border">
                        <thead>
                            <tr className="bg-gray-100 text-gray-700 uppercase text-sm">
                                <th className="py-3 px-4 text-left">ID</th>
                                <th className="py-3 px-4 text-left">Nombres</th>
                                <th className="py-3 px-4 text-left">Apellidos</th>
                                <th className="py-3 px-4 text-left">Sexo</th>
                                <th className="py-3 px-4 text-left">Fecha Nacimiento</th>
                                <th className="py-3 px-4 text-left">Edad</th>
                                <th className="py-3 px-4 text-left">Duración (min)</th>
                                <th className="py-3 px-4 text-left">Estado</th>
                                <th className="py-3 px-4 text-left">Fecha Registro</th>
                                <th className="py-3 px-4 text-left">Fecha Matrícula</th>
                                <th className="py-3 px-4 text-center">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {matriculas.map((m) => (
                                <tr key={m.id} className="border-t hover:bg-gray-50">
                                    <td className="py-3 px-4">{m.id}</td>
                                    <td className="py-3 px-4">{m.nombres}</td>
                                    <td className="py-3 px-4">{m.apellidos}</td>
                                    <td className="py-3 px-4">
                                        {m.sexo === "Masculino" ? "M" : m.sexo === "Femenino" ? "F" : m.sexo}
                                    </td>
                                    <td className="py-3 px-4">
                                        {m.fechaNacimiento
                                            ? (() => {
                                                const [anio, mes, dia] = m.fechaNacimiento.split("T")[0].split("-");
                                                return `${dia}/${mes}/${anio}`;
                                            })()
                                            : "-"}
                                    </td>
                                    <td className="py-3 px-4">{m.edad}</td>
                                    <td className="py-3 px-4">{m.duracion}</td>
                                    <td
                                        className={`py-3 px-4 font-semibold ${m.estado === "Pendiente"
                                            ? "text-red-600"
                                            : "text-green-700"
                                            }`}
                                    >
                                        {m.estado}
                                    </td>
                                    <td className="py-3 px-4">
                                        {m.fechaRegistro
                                            ? new Date(m.fechaRegistro).toLocaleString("es-PE", {
                                                year: "numeric",
                                                month: "2-digit",
                                                day: "2-digit",
                                                hour: "2-digit",
                                                minute: "2-digit",
                                            })
                                            : "-"}
                                    </td>
                                    <td className="py-3 px-4">
                                        {m.fechaMatricula
                                            ? new Date(m.fechaMatricula).toLocaleString("es-PE", {
                                                year: "numeric",
                                                month: "2-digit",
                                                day: "2-digit",
                                                hour: "2-digit",
                                                minute: "2-digit",
                                            })
                                            : "-"}
                                    </td>
                                    <td className="py-3 px-4 flex flex-col justify-center items-center space-y-2">
                                        <button
                                            onClick={() =>
                                                router.push(`/administrativo/matriculas/ver/${m.id}`)
                                            }
                                            className="inline-flex items-center px-3 py-1 rounded-md text-sm bg-blue-600 hover:bg-blue-700 text-white"
                                        >
                                            <FaEye className="mr-1" />
                                            Ver más
                                        </button>
                                        {m.estado === "Pendiente" ? (
                                            <button
                                                onClick={() => cambiarEstado(m.id)}
                                                className="inline-flex items-center px-2 py-1 rounded-md text-sm bg-green-600 hover:bg-green-700 text-white"
                                            >
                                                <FaCheck className="mr-1" />
                                                Matricular
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() => cambiarEstado(m.id)}
                                                className="inline-flex items-center px-2 py-1 rounded-md text-sm bg-orange-500 hover:bg-orange-600 text-white"
                                            >
                                                <FaTimes className="mr-1" />
                                                Pendiente
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                            {matriculas.length === 0 && (
                                <tr>
                                    <td colSpan={9} className="text-center py-6 text-gray-400">
                                        No se encontraron matrículas.
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
