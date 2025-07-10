"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function Banner() {
  const router = useRouter();
  return (
    <div className="relative w-full h-80 md:h-[425px] overflow-hidden">
      {/* Imagen de fondo con opacidad */}
      <img
        src="/homeSrc/colegio.jpg"
        alt="Banner"
        className="absolute inset-0 w-full h-full object-cover opacity-80"
      />

      {/* Gradiente sobre la imagen */}
      <div className="absolute inset-0 bg-blue-200/60 z-10"></div>

      {/* Contenido sobre el gradiente */}
      <motion.div
        initial={{ opacity: 0, scale: 0.2 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.3 }}
        className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-6"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#0028ae]">
          ¡Inscribe a tu hijo en Angelitos del Carmelo hoy mismo!
        </h2>
        <p className="text-lg md:text-xl max-w-xl">
          Conoce nuestro enfoque educativo, visita nuestras instalaciones y asegura un lugar para tu hijo en nuestra gran familia.<br /> ¡Únete a nosotros en esta maravillosa aventura de aprendizaje!
        </p>
        <button
          onClick={() => router.push("/login")}
          className="matriculate mt-6">
          Matriculate
        </button>
      </motion.div>

    </div>
  );
};