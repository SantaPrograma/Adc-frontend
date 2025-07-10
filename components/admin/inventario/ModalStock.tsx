"use client";

import { useState } from "react";

interface Producto {
  id: number;
  nombre: string;
  cantidad_ahora: number | null;
  unidad_medida: {
    id: number;
    nombre: string;
  };
}

interface ModalStockProps {
  productos: Producto[];
  onClose: () => void;
  onGuardar: (id: number, cantidad: number) => void;
}

export default function ModalStock({ productos, onClose, onGuardar }: ModalStockProps) {
  const [cantidades, setCantidades] = useState<Record<number, number>>({});

  const handleChange = (id: number, valor: string) => {
    const cantidad = parseFloat(valor);
    setCantidades({ ...cantidades, [id]: isNaN(cantidad) ? 0 : cantidad });
  };

  const handleGuardarTodo = () => {
    for (const id in cantidades) {
      const cantidad = cantidades[+id];
      onGuardar(+id, cantidad);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl w-full">
        <h2 className="text-xl font-semibold mb-4 text-center">Registrar stock</h2>

        <div className="max-h-[400px] overflow-y-auto">
          {productos.map((p) => (
            <div key={p.id} className="mb-3">
              <label className="block text-sm font-medium text-gray-700">
                {p.nombre} ({p.unidad_medida.nombre})
              </label>
              <input
                type="number"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                placeholder="Nueva cantidad"
                defaultValue={p.cantidad_ahora ?? ""}
                onChange={(e) => handleChange(p.id, e.target.value)}
              />
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
          >
            Cancelar
          </button>
          <button
            onClick={handleGuardarTodo}
            className="px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700"
          >
            Guardar stock
          </button>
        </div>
      </div>
    </div>
  );
}