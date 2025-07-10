"use client";
import { useRouter } from "next/navigation";

export default function MetodosPagoModal({ onClose }: { onClose: () => void }) {
  const router = useRouter();

  const handleAceptar = () => {
    onClose();
    router.push("/homeClient");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-white/30">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4 text-center text-green-600">
          ¡Inscripción registrada satisfactoriamente!
        </h2>

        <p className="mb-4 text-gray-700 text-sm">
          Ahora puedes proceder a realizar el pago mediante cualquiera de los siguientes métodos:
        </p>

        <div className="mb-4">
          <h3 className="font-semibold mb-1">Transferencia BCP</h3>
          <p className="text-sm text-gray-600">Cuenta: <strong>123-45678901-0-12</strong></p>
          <p className="text-sm text-gray-600">CCI: <strong>00212300456789011234</strong></p>
        </div>

        <div className="mb-6">
          <h3 className="font-semibold mb-1">Yape</h3>
          <p className="text-sm text-gray-600">Número: <strong>987 654 321</strong></p>
        </div>

        <button
          onClick={handleAceptar}
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 rounded transition"
        >
          Aceptar
        </button>
      </div>
    </div>
  );
}
