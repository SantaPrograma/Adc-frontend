"use client";

import React from "react";

interface Props {
  abierto: boolean;
  onCerrar: () => void;
  datos: any;
}

const Campo = ({ label, valor }: { label: string; valor: any }) =>
  valor ? (
    <p>
      <strong>{label}:</strong> {valor}
    </p>
  ) : null;

export default function ModalDetalleMatricula({ abierto, onCerrar, datos }: Props) {
  if (!abierto || !datos) return null;

  const { nino, madre, padre, apoderado, estado, duracion, creadaEn } = datos;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-lg">
        <h2 className="text-xl text-[#15993b] font-bold mb-4">Detalle de Matrícula</h2>

        {/* Niño */}
        <section className="mb-4">
          <h3 className="font-semibold text-lg text-[#15993b] mb-1">Niño</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
            <Campo label="Nombres" valor={nino?.nombres} />
            <Campo label="Apellidos" valor={nino?.apellidos} />
            <Campo label="Fecha Nacimiento" valor={nino?.fechaNacimiento} />
            <Campo label="Edad" valor={nino?.edad} />
            <Campo label="Tipo Documento" valor={nino?.tipoDocumento} />
            <Campo label="Número Documento" valor={nino?.numeroDocumento} />
            <Campo label="Dirección" valor={nino?.direccion} />
            <Campo label="Sexo" valor={nino?.sexo} />
            <Campo label="Tipo Sangre" valor={nino?.tipoSangre} />
            <Campo label="Toma Biberón" valor={nino?.tomaBiberon} />
            <Campo label="Usa Pañal" valor={nino?.usaPanal} />
            <Campo label="Alergias" valor={nino?.alergias} />
            <Campo label="Discapacidad" valor={nino?.discapacidad} />
            <Campo label="Seguro Salud" valor={nino?.seguroSalud} />
            <Campo label="Detalle Seguro" valor={nino?.detalleSeguro} />
            {nino?.copiaDniUrl && (
              <Campo
                label="Copia DNI"
                valor={
                  <a
                    href={nino.copiaDniUrl}
                    target="_blank"
                    className="text-blue-600 underline"
                  >
                    Ver PDF
                  </a>
                }
              />
            )}
            {nino?.partidaNacimientoUrl && (
              <Campo
                label="Partida Nacimiento"
                valor={
                  <a
                    href={nino.partidaNacimientoUrl}
                    target="_blank"
                    className="text-blue-600 underline"
                  >
                    Ver PDF
                  </a>
                }
              />
            )}
          </div>
        </section>

        {/* Madre */}
        <section className="mb-4">
          <h3 className="font-semibold text-lg text-[#15993b] mb-1">Madre</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
            <Campo label="Nombres" valor={madre?.nombres} />
            <Campo label="Apellidos" valor={madre?.apellidos} />
            <Campo label="Fecha Nacimiento" valor={madre?.fechaNacimiento} />
            <Campo label="Tipo Documento" valor={madre?.tipoDocumento} />
            <Campo label="Número Documento" valor={madre?.numeroDocumento} />
            <Campo label="Teléfono" valor={madre?.telefono} />
            <Campo label="Correo" valor={madre?.correo} />
            <Campo label="Dirección" valor={madre?.direccion} />
          </div>
        </section>

        {/* Padre */}
        <section className="mb-4">
          <h3 className="font-semibold text-lg text-[#15993b] mb-1">Padre</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
            <Campo label="Nombres" valor={padre?.nombres} />
            <Campo label="Apellidos" valor={padre?.apellidos} />
            <Campo label="Fecha Nacimiento" valor={padre?.fechaNacimiento} />
            <Campo label="Tipo Documento" valor={padre?.tipoDocumento} />
            <Campo label="Número Documento" valor={padre?.numeroDocumento} />
            <Campo label="Teléfono" valor={padre?.telefono} />
            <Campo label="Correo" valor={padre?.correo} />
            <Campo label="Dirección" valor={padre?.direccion} />
          </div>
        </section>

        {/* Apoderado */}
        <section className="mb-4">
          <h3 className="font-semibold text-lg text-[#15993b] mb-1">Apoderado</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
            <Campo label="Es padre" valor={apoderado?.es_padre ? "Sí" : "No"} />
            <Campo label="Parentesco" valor={apoderado?.parentesco} />
            <Campo label="Nombres" valor={apoderado?.nombres} />
            <Campo label="Apellidos" valor={apoderado?.apellidos} />
            <Campo label="Fecha Nacimiento" valor={apoderado?.fechaNacimiento} />
            <Campo label="Tipo Documento" valor={apoderado?.tipoDocumento} />
            <Campo label="Número Documento" valor={apoderado?.numeroDocumento} />
            <Campo label="Teléfono" valor={apoderado?.telefono} />
            <Campo label="Correo" valor={apoderado?.correo} />
            <Campo label="Dirección" valor={apoderado?.direccion} />
          </div>
        </section>

        {/* Matrícula */}
        <section className="mb-4">
          <h3 className="font-semibold text-lg text-[#15993b] mb-1">Matrícula</h3>
          <Campo label="Estado" valor={estado} />
          <Campo label="Duración" valor={`${duracion} meses`} />
          <Campo label="Fecha de registro" valor={creadaEn} />
        </section>

        <div className="text-right mt-4">
          <button
            onClick={onCerrar}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}
