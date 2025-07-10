"use client";

import { motion } from "framer-motion";

export default function Banner() {
    return (
        <section className="relative w-full overflow-hidden min-h-[500px] flex items-center justify-center">
            {/* Gradiente de fondo */}
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/60 to-emerald-800/60 z-10"></div>

            {/* Fondo con efecto de blur y opacidad */}
            <div className="absolute inset-0 z-0 opacity-20">
                <div className="absolute top-20 left-20 w-64 h-64 rounded-full bg-white/30 blur-3xl"></div>
                <div className="absolute bottom-10 right-20 w-80 h-80 rounded-full bg-white/20 blur-3xl"></div>
                <div className="absolute top-40 right-40 w-40 h-40 rounded-full bg-teal-300/30 blur-2xl"></div>
            </div>

            {/* Imagen de fondo con baja opacidad */}
            <img
                alt="Fondo educativo"
                className="absolute inset-0 w-full h-full object-cover object-center opacity-30 z-0"
                src="/nosotrosSrc/banner.png"
            />

            {/* Contenido dentro del gradiente */}
            <motion.div
                initial={{ opacity: 0, scale: 0.2 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="relative z-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
            >
                <h1 className="text-white text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6">
                    Nuestra Esencia
                </h1>
                <p className="text-teal-50 text-lg sm:text-xl max-w-2xl mx-auto">
                    En "Angelitos del Carmelo", nos dedicamos a formar niños y niñas con valores sólidos, un enfoque integral y un aprendizaje que va más allá del aula.
                </p>
            </motion.div>
        </section>
    );
}
