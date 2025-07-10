"use client";
import "./home.css";
import { motion } from "framer-motion";

export default function Banner() {
  return (
    <section className="relative w-full max-w-full overflow-hidden">
      {/* Fondo del banner */}
      <img
        src="/homeSrc/banner.jpg"
        alt="Banner del jardín"
        className="w-full h-auto max-w-full object-cover"
      />

      {/* Logo y nombre */}
      <motion.div
        className="absolute inset-0 flex justify-center items-center flex-col text-center px-4"
        initial={{ opacity: 0, scale: 0.2 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        {/* Logo */}
        <img
          src="/homeSrc/adc-logo.png"
          alt="Logo del jardín"
          className="w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 xl:w-40 xl:h-40 object-cover rounded-full"
        />

        {/* Nombre */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold text-[#44e773] shadow-text">
          IEP Angelitos <br /> del Carmelo
        </h1>
      </motion.div>

    </section>
  );
}
