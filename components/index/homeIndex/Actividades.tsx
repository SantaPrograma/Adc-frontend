"use client";

import { motion } from "framer-motion";

export default function Actividades() {
  return (
    <section className="py-12 bg-gray-100">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-[#15993b] mb-8">
        Además, contamos con
      </h2>
      {[
        {
          title: "Áreas desinfectadas y esterilizadas",
          text: "Nuestras instalaciones cuentan con un riguroso proceso de limpieza y desinfección.",
          img: "/homeSrc/desinfeccion.jpg",
          color: "#6000B2",
        },
        {
          title: "Actuaciones y celebraciones especiales",
          text: "Festejamos fechas especiales como el Día del Padre, la Madre, el Perú, entre otros.",
          img: "/homeSrc/actuacion.jpg",
          color: "#047857",
          reverse: true,
        },
        {
          title: "Salidas educativas",
          text: "Nuestros niños exploran el mundo que los rodea a través de excursiones educativas.",
          img: "/homeSrc/señorluren.jpg",
          color: "#6000B2",
        },
        {
          title: "Simulacros de seguridad",
          text: "Practicamos la prevención con simulacros regulares, preparando a nuestros niños.",
          img: "/homeSrc/simulacro.jpg",
          color: "#047857",
          reverse: true,
        },

      ].map(({ title, text, img, color, reverse }, idx) => {
        const zigzagClass =
          idx % 2 === 0
            ? "md:-translate-x-24"
            : "md:translate-x-24";
        return (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: reverse ? 100 : -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
            className={`bg-[#f2fdff] rounded-xl m-4 shadow-lg overflow-hidden flex flex-col md:flex-row ${reverse ? "md:flex-row-reverse" : ""
              } max-w-4xl mx-auto transform ${zigzagClass}`}
            style={{ height: "280px" }}
          >
            <div className="md:w-1/2 flex items-center justify-center px-4 text-center">
              <div>
                <h3
                  className="text-xl md:text-2xl font-bold mb-2"
                  style={{ color: color }}
                >
                  {title}
                </h3>
                <p className="text-sm md:text-base text-black">{text}</p>
              </div>
            </div>
            <div className="md:w-1/2 h-full">
              <img
                src={img}
                alt={title}
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        );
      })}
    </section>
  );
}
