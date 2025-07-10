"use client";

import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import { motion } from "framer-motion";

export function WelcomeSection() {
  return (
    <div className="lg:w-1/2 w-full bg-gradient-to-br from-emerald-600 via-emerald-500 to-green-700 flex flex-col items-center justify-center p-8 relative overflow-hidden">
      <div className="relative z-10 text-center">
        <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">¡Bienvenido!</h1>
        <p className="text-white/90 text-lg mb-8 max-w-md">
          Accede a tu cuenta para gestionar tus recursos y servicios
        </p>
        <motion.img
          src="/loginSrc/login.png"
          alt="Inicio de sesión"
          className="w-64 lg:w-80 h-auto mx-auto"
          animate={{ y: ["0%", "-10%", "0%"] }}
          transition={{ repeat: Infinity, duration: 4, ease: 'linear' }}
        />
      </div>

      <Link
        href="/"
        className="absolute top-4 left-4 flex items-center gap-2 text-sm font-medium text-black hover:text-emerald-400 bg-white px-3 py-2 rounded-full shadow-md hover:scale-105 transition-all duration-300"
      >
        <FaArrowLeft size={16} />
        Regresar
      </Link>

    </div>
  );
}