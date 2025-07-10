"use client";

import { useState } from "react";

export default function TerminosModal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="text-emerald-600 underline ml-1"
      >
        términos y condiciones
      </button>

      {isOpen && (
        <div className="fixed inset-0 backdrop-blur-sm bg-white/30 z-50 flex items-center justify-center px-4">
          <div className="bg-white p-4 md:p-6 rounded-lg shadow-lg w-full max-w-2xl relative overflow-hidden max-h-[75vh]">
            <h2 className="text-xl font-semibold mb-3 text-emerald-700">
              Términos y Condiciones de Uso
            </h2>

            <div className="text-xs text-gray-700 space-y-3 overflow-y-auto pr-2 max-h-[48vh]">
              <p>
                Al completar cualquier formulario en nuestra plataforma, ya sea
                de <strong>matrícula</strong> o <strong>contacto</strong>,
                usted declara haber leído y aceptado los siguientes términos y
                condiciones relacionados con el tratamiento de datos personales:
              </p>

              <p>
                <strong>1. Finalidad del tratamiento</strong><br />
                Los datos personales proporcionados serán utilizados para:
              </p>
              <ul className="list-disc list-inside ml-4">
                <li>Gestionar matrículas del estudiante.</li>
                <li>Responder consultas del formulario de contacto.</li>
                <li>Comunicación institucional.</li>
                <li>Registrar y administrar información educativa.</li>
                <li>Cumplir obligaciones legales ante autoridades.</li>
              </ul>

              <p>
                <strong>2. Protección de datos</strong><br />
                La institución garantiza la confidencialidad, seguridad y uso
                responsable de los datos. No serán compartidos sin su
                consentimiento, salvo requerimiento legal.
              </p>

              <p>
                <strong>3. Consentimiento informado</strong><br />
                Usted brinda su consentimiento libre, previo e informado para el
                tratamiento de los datos propios y, de ser el caso, del menor a
                su cargo.
              </p>

              <p>
                <strong>4. Derechos ARCO</strong><br />
                Puede ejercer sus derechos de acceso, rectificación,
                cancelación u oposición comunicándose con nosotros por los
                canales oficiales.
              </p>
            </div>

            <div className="text-right mt-4">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-1.5 bg-emerald-600 text-white text-sm rounded hover:bg-emerald-700 transition"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
