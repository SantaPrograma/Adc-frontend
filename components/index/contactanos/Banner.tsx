"use client";

import { motion } from "framer-motion";

export default function Banner() {
  return (
    <div className="relative w-full h-80 md:h-[500px] overflow-hidden">
      {/* Imagen de fondo con opacidad */}
      <img
        src="/contactanosSrc/banner.webp"
        alt="Banner"
        className="absolute inset-0 w-full h-full object-cover opacity-80"
      />

      {/* Gradiente esmeralda encima de la imagen */}
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/70 to-emerald-800/70 z-10"></div>

      {/* Contenido sobre el gradiente */}
      <motion.div
        className="relative z-20 flex flex-col items-center justify-center h-full text-white text-center px-4"
        initial={{ opacity: 0, scale: 0.2 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <h1 className="text-white text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6">
          Contáctanos Ahora
        </h1>
        <p className="text-teal-50 text-lg sm:text-xl max-w-2xl mx-auto">
          Responderemos tus dudas a la brevedad, envíanos un mensaje con tus consultas.
        </p>
      </motion.div>
    </div>
  );
};
