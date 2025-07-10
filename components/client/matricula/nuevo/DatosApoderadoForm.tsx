"use client";

import TerminosModal from "../TerminosModal";
import { useState } from "react";

interface Props {
  datos: any;
  onChange: (data: any) => void;
  onNext: () => void;
  mensaje?: string;
  error?: string;
}

export default function DatosApoderadoForm({ datos, onChange, onNext, mensaje, error }: Props) {
  const esOtro = datos.tipoApoderado === "otro";
  const camposDeshabilitados = !esOtro;
  const [aceptaTerminos, setAceptaTerminos] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === "tipoApoderado" && value !== "otro") {
      onChange({
        tipoApoderado: value,
        parentesco: "",
        nombres: "",
        apellidos: "",
        tipoDocumento: "",
        numeroDocumento: "",
        fechaNacimiento: "",
        telefono: "",
        correo: "",
        direccion: "",
      });
    } else {
      onChange({ [name]: value });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Datos del apoderado:", datos);
    onNext();
  };

  const inputClass = (disabled: boolean) =>
    `w-full border rounded p-2 ${disabled ? "bg-gray-100 cursor-not-allowed" : ""}`;

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-emerald-700">Datos del Apoderado</h2>

      <div className="mb-4">
        <label className="block font-medium mb-1">¿Quién es el apoderado?</label>
        <select
          name="tipoApoderado"
          value={datos.tipoApoderado}
          onChange={handleChange}
          required
          className="w-full border rounded p-2"
        >
          <option value="" disabled hidden>Seleccione</option>
          <option value="madre">La Madre</option>
          <option value="padre">El Padre</option>
          <option value="otro">Otro</option>
        </select>
      </div>

      <div>
        <label className="block font-medium mb-1">Parentesco</label>
        <input
          type="text"
          name="parentesco"
          value={datos.parentesco}
          onChange={handleChange}
          disabled={!esOtro}
          required={esOtro}
          className={inputClass(!esOtro)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block font-medium mb-1">Nombres</label>
          <input
            type="text"
            name="nombres"
            value={datos.nombres}
            onChange={handleChange}
            disabled={camposDeshabilitados}
            className={inputClass(camposDeshabilitados)}
            required={!camposDeshabilitados}
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Apellidos</label>
          <input
            type="text"
            name="apellidos"
            value={datos.apellidos}
            onChange={handleChange}
            disabled={camposDeshabilitados}
            className={inputClass(camposDeshabilitados)}
            required={!camposDeshabilitados}
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Tipo de Documento</label>
          <select
            name="tipoDocumento"
            value={datos.tipoDocumento}
            onChange={handleChange}
            disabled={camposDeshabilitados}
            className={inputClass(camposDeshabilitados)}
            required={!camposDeshabilitados}
          >
            <option value="" disabled hidden>Seleccione</option>
            <option value="DNI">DNI</option>
            <option value="CE">Carnet de Extranjería</option>
            <option value="Pasaporte">Pasaporte</option>
            <option value="Otro">Otro</option>
          </select>
        </div>

        <div>
          <label className="block font-medium mb-1">Número de Documento</label>
          <input
            type="text"
            name="numeroDocumento"
            value={datos.numeroDocumento}
            onChange={(e) => {
              const regex = /^[0-9]*$/;
              if (regex.test(e.target.value)) {
                handleChange(e);
              }
            }}
            disabled={camposDeshabilitados}
            maxLength={datos.tipoDocumento === "DNI" ? 8 : 15}
            className={inputClass(camposDeshabilitados)}
            required={!camposDeshabilitados}
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Fecha de Nacimiento</label>
          <input
            type="date"
            name="fechaNacimiento"
            value={datos.fechaNacimiento}
            onChange={handleChange}
            disabled={camposDeshabilitados}
            className={inputClass(camposDeshabilitados)}
            required={!camposDeshabilitados}
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Teléfono</label>
          <input
            type="tel"
            name="telefono"
            value={datos.telefono}
            onChange={handleChange}
            disabled={camposDeshabilitados}
            className={inputClass(camposDeshabilitados)}
            required={!camposDeshabilitados}
          />
        </div>

        <div className="md:col-span-2">
          <label className="block font-medium mb-1">Correo Electrónico</label>
          <input
            type="email"
            name="correo"
            value={datos.correo}
            onChange={handleChange}
            disabled={camposDeshabilitados}
            className={inputClass(camposDeshabilitados)}
            required={!camposDeshabilitados}
          />
        </div>

        <div className="md:col-span-2">
          <label className="block font-medium mb-1">Dirección</label>
          <input
            type="text"
            name="direccion"
            value={datos.direccion}
            onChange={handleChange}
            disabled={camposDeshabilitados}
            className={inputClass(camposDeshabilitados)}
            required={!camposDeshabilitados}
          />
        </div>

        <div className="flex items-center gap-1 md:col-span-2">
          <input
            type="checkbox"
            checked={aceptaTerminos}
            onChange={(e) => setAceptaTerminos(e.target.checked)}
            className="mr-2"
            id="terminos"
          />
          <label htmlFor="terminos" className="text-sm">
            Acepto los
          </label>
          <TerminosModal />
        </div>
      </div>

      <div className="text-right">
        <button
          type="submit"
          disabled={!aceptaTerminos}
          className={`px-6 py-2 rounded transition ${aceptaTerminos
              ? "bg-emerald-600 text-white hover:bg-emerald-700"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
        >
          Guardar
        </button>

        {error && (
          <p className="text-red-600 text-sm mt-2 text-right">{error}</p>
        )}
      </div>
    </form>
  );
}
