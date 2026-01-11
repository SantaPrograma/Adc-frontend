"use client";

import { useEffect, useState } from "react";
import { FaCheck, FaTimes, FaTrashAlt } from "react-icons/fa";

import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box, Chip } from "@mui/material";

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

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 50 },
    { field: "nombre", headerName: "Nombre", width: 120 },
    { field: "email", headerName: "Email", width: 180 },
    { field: "telefono", headerName: "Teléfono", width: 100 },
    { field: "mensaje", headerName: "Mensaje", width: 200 },
    {
      field: "fecha_emision",
      headerName: "Fecha Emision",
      width: 180,
      renderCell: (params) => {
        if (!params.value) return "-";

        return new Date(params.value as string).toLocaleString("es-PE", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        });
      },
    },
    {
      field: "estado",
      headerName: "Estado",
      width: 100,
      renderCell: (params) =>
        params.value === "Pendiente" ? (
          <Chip label="Pendiente" size="small"
            sx={{
              backgroundColor: "#fb923c",
              color: "white",
              fontWeight: 600,
            }}
          />
        ) : (
          <Chip label="Atendido" color="success" size="small" />
        ),
    },
    {
      field: "atendido_por",
      headerName: "Atendido Por",
      width: 100
    },
    {
      field: "fecha_atencion",
      headerName: "Fecha Atención",
      width: 180,
      renderCell: (params) => {
        if (!params.value) return "-";

        return new Date(params.value as string).toLocaleString("es-PE", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        });
      },
    },
    {
      field: "acciones",
      headerName: "Acciones",
      width: 150,
      sortable: false,
      filterable: false,
      renderCell: (params) => {
        const m = params.row;

        return (
          <div className="flex gap-1">
            <button
              onClick={() => handleToggleEstado(m.id)}
              className={`px-2 py-1 rounded text-xs text-white ${m.estado === "Pendiente"
                ? "bg-green-600 hover:bg-green-700"
                : "bg-orange-400 hover:bg-orange-500"
                }`}
            >
              {m.estado === "Pendiente" ? "Atender" : "Pendiente"}
            </button>

            <button
              onClick={() => handleEliminar(m.id)}
              className="px-2 py-1 rounded text-xs bg-red-600 hover:bg-red-700 text-white"
            >
              Eliminar
            </button>
          </div>
        );
      },
    },
  ];

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
        <div className="w-full max-w-6xl">
          <Box sx={{ height: 600, width: "100%" }}>
            <DataGrid
              rows={mensajes}
              columns={columns}
              loading={loading}
              pageSizeOptions={[10]}
              disableRowSelectionOnClick
            />
          </Box>
        </div>
      )}
    </div>
  );
}