"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function HomeClient() {
  const router = useRouter();
  const [mensaje, setMensaje] = useState<string | null>(null);

  const esTiempoDeMatricula = () => {
    const mesActual = new Date().getMonth();
    return mesActual < 12;
  };

  const manejarClick = (ruta: string) => {
    if (!esTiempoDeMatricula()) {
      setMensaje("La matrícula solo está habilitada hasta marzo. Consulta con la institución.");
      setTimeout(() => setMensaje(null), 4000);
    } else {
      router.push(ruta);
    }
  };

  const botones = [
    {
      src: "/matriculaSrc/Matricular.png",
      titulo: "Matricular",
      onClick: () => manejarClick("/homeClient/matricula"),
    },
    {
      src: "/matriculaSrc/Renovar.png",
      titulo: "Renovar",
      onClick: () => manejarClick("/homeClient/renovacion"),
    },
    {
      src: "/matriculaSrc/Salir.png",
      titulo: "Salir",
      onClick: () => {
        sessionStorage.removeItem("authToken");
        router.push("/");
      }
    },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <h1 className="text-2xl font-bold mb-2">Bienvenido</h1>
      <p className="text-gray-600 mb-4 text-center">
        Si es la primera vez que te matriculas, selecciona <strong>Matricular</strong>. <br />
        Si ya eres parte del colegio, selecciona <strong>Renovar</strong>.
      </p>

      {mensaje && (
        <p className="text-red-600 bg-red-100 border border-red-300 px-4 py-2 rounded mb-6 text-center max-w-md">
          {mensaje}
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {botones.map((btn, idx) => (
          <button
            key={idx}
            onClick={btn.onClick}
            className="flex flex-col items-center bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition duration-300"
          >
            <Image src={btn.src} alt={btn.titulo} width={150} height={150} />
            <span className="mt-3 text-lg font-medium text-gray-700">{btn.titulo}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
