"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import DatosNinoFormRenov from "./DatosNinoFormRenov";
import DatosPadreFormRenov from "./DatosPadreFormRenov";
import DatosMadreFormRenov from "./DatosMadreFormRenov";
import DatosApoderadoFormRenov from "./DatosApoderadoFormRenov";

const secciones = [
  "Datos del Niño",
  "Datos de la Madre",
  "Datos del Padre",
  "Datos del Apoderado",
];

export default function MatriculaSecciones() {
  const router = useRouter();
  const [paso, setPaso] = useState(0);
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");
  const [mensajeBusqueda, setMensajeBusqueda] = useState("");
  const [esErrorBusqueda, setEsErrorBusqueda] = useState(false);
  const [formData, setFormData] = useState({
    nino: {
      nombres: "", apellidos: "", fechaNacimiento: "", edad: "", tipoDocumento: "", numeroDocumento: "",
      direccion: "", sexo: "", tipoSangre: "", tomaBiberon: "", usaPanal: "", alergias: "", discapacidad: "",
      seguroSalud: "", detalleSeguro: "", copiaDni: null as File | null, partidaNacimiento: null as File | null
    },
    madre: {
      nombres: "", apellidos: "", tipoDocumento: "", numeroDocumento: "", fechaNacimiento: "",
      telefono: "", correo: "", direccion: ""
    },
    padre: {
      nombres: "", apellidos: "", tipoDocumento: "", numeroDocumento: "", fechaNacimiento: "",
      telefono: "", correo: "", direccion: ""
    },
    apoderado: {
      tipoApoderado: "", parentesco: "", nombres: "", apellidos: "", tipoDocumento: "", numeroDocumento: "",
      fechaNacimiento: "", telefono: "", correo: "", direccion: ""
    }
  });
  const [tiempoInicio] = useState(Date.now());

  useEffect(() => {
  const handleBuscar = async (e: Event) => {
    const numeroDocumento = (e as CustomEvent).detail;
    const token = sessionStorage.getItem("authToken");

    try {
      const res = await fetch(`http://localhost:3001/api/matricula/buscar/${numeroDocumento}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();

      if (!res.ok) {
        setMensajeBusqueda(data.error || "No se encontraron datos");
        setEsErrorBusqueda(true);
        return;
      }

      // Determinar tipo de apoderado
      const tipoApoderado = data.apoderado?.es_padre
        ? data.apoderado.padre_id === data.madre?.id
          ? "madre"
          : "padre"
        : "otro";

      setFormData({
        nino: {
          ...data.nino,
          alergias: data.nino.alergias || "",
          discapacidad: data.nino.discapacidad || "",
          tipoDocumento: data.nino.tipoDocumento || "",
          sexo: data.nino.sexo || "",
          tipoSangre: data.nino.tipoSangre || "",
          tomaBiberon: data.nino.tomaBiberon || "",
          usaPanal: data.nino.usaPanal || "",
          seguroSalud: data.nino.seguroSalud || "",
          detalleSeguro: data.nino.detalleSeguro || "",
          copiaDni: null,
          partidaNacimiento: null,
          copiaDniUrl: data.nino.copiaDniUrl || "",
          partidaNacimientoUrl: data.nino.partidaNacimientoUrl || "",
        },
        madre: {
          ...data.madre,
          tipoDocumento: data.madre?.tipoDocumento || "",
          telefono: data.madre?.telefono || "",
          correo: data.madre?.correo || "",
          direccion: data.madre?.direccion || "",
        },
        padre: {
          ...data.padre,
          tipoDocumento: data.padre?.tipoDocumento || "",
          telefono: data.padre?.telefono || "",
          correo: data.padre?.correo || "",
          direccion: data.padre?.direccion || "",
        },
        apoderado: {
          tipoApoderado,
          parentesco: tipoApoderado === "otro" ? data.apoderado?.parentesco || "" : "",
          nombres: data.apoderado?.nombres || "",
          apellidos: data.apoderado?.apellidos || "",
          tipoDocumento: data.apoderado?.tipoDocumento || "",
          numeroDocumento: data.apoderado?.numeroDocumento || "",
          fechaNacimiento: data.apoderado?.fechaNacimiento || "",
          telefono: data.apoderado?.telefono || "",
          correo: data.apoderado?.correo || "",
          direccion: data.apoderado?.direccion || "",
        },
      });

      setMensajeBusqueda("Datos encontrados correctamente");
      setEsErrorBusqueda(false);
    } catch (err) {
      console.error("Error en handleBuscar:", err);
      setMensajeBusqueda("Error al buscar datos");
      setEsErrorBusqueda(true);
    }
  };

  window.addEventListener("buscarNino", handleBuscar as EventListener);

  return () => {
    window.removeEventListener("buscarNino", handleBuscar as EventListener);
  };
}, []);

  useEffect(() => {
    if (mensajeBusqueda) {
      const timer = setTimeout(() => {
        setMensajeBusqueda("");
        setEsErrorBusqueda(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [mensajeBusqueda]);

  const actualizarSeccion = (seccion: keyof typeof formData, nuevosDatos: any) => {
    setFormData(prev => ({
      ...prev,
      [seccion]: { ...prev[seccion], ...nuevosDatos }
    }));
  };

  const siguiente = () => setPaso((prev) => Math.min(prev + 1, secciones.length - 1));

  const handleGuardar = async () => {
    try {
      const tiempoFin = Date.now();
      const duracionMinutos = Math.round((tiempoFin - tiempoInicio) / 60000);

      const token = sessionStorage.getItem("authToken");
      const form = new FormData();

      // Añadir objetos como strings JSON
      form.append("nino", JSON.stringify(formData.nino));
      form.append("madre", JSON.stringify(formData.madre));
      form.append("padre", JSON.stringify(formData.padre));
      form.append("apoderado", JSON.stringify(formData.apoderado));

      // Añadir duración
      form.append("duracionMatricula", duracionMinutos.toString());

      // Añadir archivos (si existen)
      if (formData.nino.copiaDni instanceof File) {
        form.append("copiaDni", formData.nino.copiaDni);
      }
      if (formData.nino.partidaNacimiento instanceof File) {
        form.append("partidaNacimiento", formData.nino.partidaNacimiento);
      }

      const response = await fetch("http://localhost:3001/api/matricula/registrar", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: form
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Error al registrar la matrícula");
        setMensaje("");
        return;
      }

      setMensaje("Matrícula registrada correctamente");
      setError("");

      setTimeout(() => {
        router.push("/homeClient");
      }, 2000);
    } catch (error: any) {
      console.error("Error al guardar:", error);
      alert(`Error: ${error.message}`);
    }
  };

  const renderFormulario = () => {
    switch (paso) {
      case 0:
        return (
          <DatosNinoFormRenov
            datos={formData.nino}
            onChange={(data) => actualizarSeccion("nino", data)}
            onNext={siguiente}
            mensajeBusqueda={mensajeBusqueda}
            esErrorBusqueda={esErrorBusqueda}
          />
        );
      case 1:
        return (
          <DatosMadreFormRenov
            datos={formData.madre}
            onChange={(data) => actualizarSeccion("madre", data)}
            onNext={siguiente}
          />
        );
      case 2:
        return (
          <DatosPadreFormRenov
            datos={formData.padre}
            onChange={(data) => actualizarSeccion("padre", data)}
            onNext={siguiente}
          />
        );
      case 3:
        return (
          <DatosApoderadoFormRenov
            datos={formData.apoderado}
            onChange={(data) => actualizarSeccion("apoderado", data)}
            onNext={handleGuardar}
            mensaje={mensaje}
            error={error}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <aside className="w-1/4 bg-white shadow-lg p-4 flex flex-col sticky top-0 h-screen overflow-y-auto">
        {/* Parte superior: títulos */}
        <div className="flex-1">
          <ul className="space-y-2 pb-4">
            {secciones.map((titulo, idx) => (
              <li key={idx}>
                <button
                  onClick={() => setPaso(idx)}
                  className={`w-full text-left px-4 py-2 rounded ${paso === idx
                    ? "bg-emerald-500 text-white"
                    : "bg-gray-100"
                    }`}
                >
                  {titulo}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Parte inferior: botón cancelar */}
        <div className="pt-4">
          <button
            onClick={() => router.push("/homeClient")}
            className="w-full bg-red-500/10 hover:bg-red-500/20 text-red-700 font-semibold py-2 rounded transition duration-300"
          >
            Cancelar
          </button>
        </div>
      </aside>

      <main className="flex-1 p-6 overflow-y-auto">{renderFormulario()}</main>
    </div>
  );
}