"use client";

import { ChangeEvent, FormEvent } from "react";

interface Props {
  datos: any;
  onChange: (data: any) => void;
  onNext: () => void;
}

export default function DatosPadreForm({ datos, onChange, onNext }: Props) {
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    onChange({ [name]: value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("Datos del Padre:", datos);
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-emerald-700">Datos del Padre</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block font-medium mb-1">Nombres</label>
          <input type="text" name="nombres" value={datos.nombres} onChange={handleChange} required className="w-full border rounded p-2" />
        </div>

        <div>
          <label className="block font-medium mb-1">Apellidos</label>
          <input type="text" name="apellidos" value={datos.apellidos} onChange={handleChange} required className="w-full border rounded p-2" />
        </div>

        <div>
          <label className="block font-medium mb-1">Tipo de Documento</label>
          <select
            name="tipoDocumento"
            value={datos.tipoDocumento}
            onChange={handleChange}
            required
            className="w-full border rounded p-2"
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
            required
            maxLength={datos.tipoDocumento === "DNI" ? 8 : 15}
            className="w-full border rounded p-2"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Fecha de Nacimiento</label>
          <input
            type="date"
            name="fechaNacimiento"
            value={datos.fechaNacimiento}
            onChange={handleChange}
            required
            className="w-full border rounded p-2"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Teléfono</label>
          <input
            type="tel"
            name="telefono"
            value={datos.telefono}
            onChange={handleChange}
            required
            className="w-full border rounded p-2"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block font-medium mb-1">Correo Electrónico</label>
          <input
            type="email"
            name="correo"
            value={datos.correo}
            onChange={handleChange}
            required
            className="w-full border rounded p-2"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block font-medium mb-1">Dirección</label>
          <input
            type="text"
            name="direccion"
            value={datos.direccion}
            onChange={handleChange}
            required
            className="w-full border rounded p-2"
          />
        </div>
      </div>

      <div className="text-right">
        <button
          type="submit"
          className="bg-emerald-600 text-white px-6 py-2 rounded hover:bg-emerald-700 transition"
        >
          Siguiente
        </button>
      </div>
    </form>
  );
}
