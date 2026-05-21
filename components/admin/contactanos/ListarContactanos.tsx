"use client";

import { useEffect, useState } from "react";
import DataGrid, {
  Column,
  FilterRow,
  HeaderFilter,
  Scrolling,
  LoadPanel,
  ColumnFixing,
  Export
} from "devextreme-react/data-grid";

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
  const size = 10;

  const token = sessionStorage.getItem("authToken");

  const fetchMensajes = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `http://localhost:3001/api/contactanos/listar?page=1&size=${size}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (!res.ok) throw new Error("Error al cargar mensajes");
      const data = await res.json();
      setMensajes(data.mensajes);
    } catch (err: any) {
      setError(err.message || "Error de servidor");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMensajes();
  }, []);

  const handleToggleEstado = async (id: number) => {
    try {
      const res = await fetch(
        `http://localhost:3001/api/contactanos/alternar/${id}`,
        { method: "PATCH", headers: { Authorization: `Bearer ${token}` } }
      );
      if (!res.ok) throw new Error("No se pudo alternar estado");
      await fetchMensajes();
    } catch (err) {
      setError("Error al alternar estado");
    }
  };

  const handleEliminar = async (id: number) => {
    try {
      const res = await fetch(
        `http://localhost:3001/api/contactanos/eliminar/${id}`,
        { method: "DELETE", headers: { Authorization: `Bearer ${token}` } }
      );
      if (!res.ok) throw new Error("No se pudo eliminar");
      await fetchMensajes();
    } catch (err) {
      setError("Error al eliminar mensaje");
    }
  };

  const onCellPrepared = (e: any) => {
    if (e.rowType === "header") {
      e.cellElement.style.backgroundColor = "#24706c";
      e.cellElement.style.color = "#fff";
    }
  };

  const renderFecha = (data: any) => {
    if (!data.value) return <span>-</span>;
    return (
      <span>
        {new Date(data.value).toLocaleString("es-PE", {
          day: "2-digit", month: "2-digit", year: "numeric",
          hour: "2-digit", minute: "2-digit",
        })}
      </span>
    );
  };

  const renderEstado = (data: any) => (
    <span style={{
      backgroundColor: data.value === "Pendiente" ? "#fb923c" : "#16a34a",
      color: "white",
      fontWeight: 600,
      padding: "2px 10px",
      borderRadius: "999px",
      fontSize: "12px",
    }}>
      {data.value}
    </span>
  );

  const renderAcciones = (data: any) => {
    const m = data.data;
    return (
      <div style={{ display: "flex", gap: "4px" }}>
        <button
          onClick={() => handleToggleEstado(m.id)}
          style={{
            padding: "3px 8px", borderRadius: "4px", fontSize: "12px",
            color: "white", border: "none", cursor: "pointer",
            backgroundColor: m.estado === "Pendiente" ? "#16a34a" : "#fb923c",
          }}
        >
          {m.estado === "Pendiente" ? "Atender" : "Pendiente"}
        </button>
        <button
          onClick={() => handleEliminar(m.id)}
          style={{
            padding: "3px 8px", borderRadius: "4px", fontSize: "12px",
            color: "white", border: "none", cursor: "pointer",
            backgroundColor: "#dc2626",
          }}
        >
          Eliminar
        </button>
      </div>
    );
  };

  return (
    <div className="p-8 flex flex-col items-center">
      <h1 className="text-3xl text-[#15993b] font-bold mb-6">
        Lista de mensajes de Contáctanos
      </h1>

      {error && <div className="mb-4 text-red-600">{error}</div>}

      <div className="w-full max-w-6xl">
        <DataGrid
          dataSource={mensajes}
          keyExpr="id"
          showBorders={true}
          showRowLines={true}
          rowAlternationEnabled={true}
          columnAutoWidth={true}
          allowColumnReordering={true}
          allowColumnResizing={true}
          columnResizingMode="widget"
          onCellPrepared={onCellPrepared}
        >
          <Export enabled={true} />
          <ColumnFixing enabled={true} />
          <LoadPanel enabled={loading} />
          <FilterRow visible={true} />
          <HeaderFilter visible={true} />
          <Scrolling
            mode="virtual"
            rowRenderingMode="virtual"
            useNative={true}
            preloadEnabled={false}
            renderAsync={false}
          />

          <Column dataField="id" caption="ID" width={60} />
          <Column dataField="nombre" caption="Nombre" minWidth={120} />
          <Column dataField="email" caption="Email" minWidth={180} />
          <Column dataField="telefono" caption="Teléfono" minWidth={100} />
          <Column dataField="mensaje" caption="Mensaje" minWidth={200} />
          <Column dataField="fecha_emision" caption="Fecha Emisión" minWidth={160} cellRender={renderFecha} />
          <Column dataField="estado" caption="Estado" minWidth={100} cellRender={renderEstado} />
          <Column dataField="atendido_por" caption="Atendido Por" minWidth={120} />
          <Column dataField="fecha_atencion" caption="Fecha Atención" minWidth={160} cellRender={renderFecha} />
          <Column
            caption="Acciones"
            width={160}
            fixed={true}
            fixedPosition="right"
            allowSorting={false}
            allowFiltering={false}
            cellRender={renderAcciones}
          />
        </DataGrid>
      </div>
    </div>
  );
}