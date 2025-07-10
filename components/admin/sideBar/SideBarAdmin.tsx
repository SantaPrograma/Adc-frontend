"use client";
import { useState } from "react";
import Link from "next/link";
import { FaChevronDown } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function SideBarAdmin() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const router = useRouter();

  const toggleMenu = (menu: string) => {
    setOpenMenu((prev) => (prev === menu ? null : menu));
  };

  const isOpen = (menu: string) => openMenu === menu;

  const handleLogout = () => {
    // Eliminar el token de sesión
    sessionStorage.removeItem("authToken");
    
    // Redirigir al login
    router.push("/");
  };

  return (
    <aside className="w-64 h-screen bg-gray-900 text-white fixed left-0 top-0 shadow-lg">
      {/* Título Panel Administrativo que redirige a /administrativo */}
      <div className="p-6 text-xl font-bold border-b border-gray-700">
        <Link href="/administrativo" className="hover:text-emerald-400">
          Panel Administrativo
        </Link>
      </div>
      <nav className="p-4 space-y-4">
        {/* Usuarios */}
        <div className="space-y-2">
          <button
            onClick={() => toggleMenu("usuarios")}
            className="w-full text-left font-semibold py-3 px-4 hover:bg-gray-800 rounded flex justify-between items-center"
          >
            <span>Usuarios</span>
            <FaChevronDown
              className={`transition-transform duration-200 ${isOpen("usuarios") ? "rotate-180" : ""}`}
            />
          </button>
          {isOpen("usuarios") && (
            <ul className="pl-6 text-sm space-y-2 mt-2">
              <li>
                <Link href="/administrativo/usuario/registrar" className="block hover:text-emerald-400">Registrar usuario</Link>
              </li>
              <li>
                <Link href="/administrativo/usuario/listar" className="block hover:text-emerald-400">Listar usuarios</Link>
              </li>
            </ul>
          )}
        </div>

        {/* Contáctanos */}
        <div className="space-y-2">
          <button
            onClick={() => toggleMenu("contactanos")}
            className="w-full text-left font-semibold py-3 px-4 hover:bg-gray-800 rounded flex justify-between items-center"
          >
            <span>Contáctanos</span>
            <FaChevronDown
              className={`transition-transform duration-200 ${isOpen("contactanos") ? "rotate-180" : ""}`}
            />
          </button>
          {isOpen("contactanos") && (
            <ul className="pl-6 text-sm space-y-2 mt-2">
              <li>
                <Link href="/administrativo/contactanos/listar" className="block hover:text-emerald-400">Listar mensajes</Link>
              </li>
            </ul>
          )}
        </div>

        {/* Personal */}
        <div className="space-y-2">
          <button
            onClick={() => toggleMenu("personal")}
            className="w-full text-left font-semibold py-3 px-4 hover:bg-gray-800 rounded flex justify-between items-center"
          >
            <span>Personal</span>
            <FaChevronDown
              className={`transition-transform duration-200 ${isOpen("personal") ? "rotate-180" : ""}`}
            />
          </button>
          {isOpen("personal") && (
            <ul className="pl-6 text-sm space-y-2 mt-2">
              <li>
                <Link href="/administrativo/personal/registrar" className="block hover:text-emerald-400">Registrar personal</Link>
              </li>
              <li>
                <Link href="/administrativo/personal/listar" className="block hover:text-emerald-400">Listar personal</Link>
              </li>
            </ul>
          )}
        </div>

        {/* Inventario */}
        <div className="space-y-2">
          <button
            onClick={() => toggleMenu("inventario")}
            className="w-full text-left font-semibold py-3 px-4 hover:bg-gray-800 rounded flex justify-between items-center"
          >
            <span>Inventario</span>
            <FaChevronDown
              className={`transition-transform duration-200 ${isOpen("inventario") ? "rotate-180" : ""}`}
            />
          </button>
          {isOpen("inventario") && (
            <ul className="pl-6 text-sm space-y-2 mt-2">
              <li>
                <Link href="/administrativo/inventario/registrar" className="block hover:text-emerald-400">Registrar producto</Link>
              </li>
              <li>
                <Link href="/administrativo/inventario/listar" className="block hover:text-emerald-400">Listar inventario</Link>
              </li>
            </ul>
          )}
        </div>
      </nav>

      {/* Cierre de sesión */}
      <div className="absolute bottom-6 w-full px-6">
        <button
          onClick={handleLogout}
          className="w-full text-left font-semibold py-3 px-4 hover:bg-gray-800 rounded flex justify-between items-center text-red-500"
        >
          Cerrar Sesión
        </button>
      </div>
    </aside>
  );
}
