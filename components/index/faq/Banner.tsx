"use client";

import { motion } from "framer-motion";

export default function Banner() {
    return (
        <section className="relative w-full overflow-hidden min-h-[500px] flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-800/90 to-emerald-600/40 z-10"></div>

            <div className="absolute inset-0 z-0 opacity-20">
                <div className="absolute top-20 left-20 w-64 h-64 rounded-full bg-white/30 blur-3xl"></div>
                <div className="absolute bottom-10 right-20 w-80 h-80 rounded-full bg-white/20 blur-3xl"></div>
                <div className="absolute top-40 right-40 w-40 h-40 rounded-full bg-teal-300/30 blur-2xl"></div>
            </div>

            <img
                alt="Fondo de preguntas frecuentes"
                className="absolute inset-0 w-full h-full object-cover object-center opacity-30 z-0"
                src="/faqSrc/banner.png"
            />

            <motion.div
                initial={{ opacity: 0, scale: 0.2 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="relative z-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
            >
                <h1 className="text-white text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6">
                    Preguntas Frecuentes
                </h1>
                <p className="text-teal-50 text-lg sm:text-xl max-w-2xl mx-auto">
                    Encuentra respuestas a las preguntas más comunes sobre nuestras matrículas, horarios, actividades y el cuidado que brindamos a los más pequeños.
                </p>
            </motion.div>
        </section>
    );
}
