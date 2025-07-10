"use client";

import { motion } from "framer-motion";

export default function Maps() {
  return (
    <section className="w-full px-4 py-9 flex flex-col items-center text-center space-y-3 bg-gray-100">
      <h2 className="text-2xl md:text-3xl font-semibold text-[#15993b]">
        También puedes visitarnos en...
      </h2>

      <p className="text-lg text-gray-600">
        Urb. San Joaquín E-35 1º etapa, Ica, Perú
      </p>

      <motion.div
        initial={{ opacity: 0, scale: 0.3 }} // inicia pequeño
        whileInView={{ opacity: 1, scale: 1 }} // crece a su tamaño original
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.3 }}
        className="w-full max-w-4xl h-96 md:h-[500px] mt-6 shadow-lg overflow-hidden"
      >
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2372.935647613433!2d-75.74674147505341!3d-14.054938521194291!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9110e3709a93e6d3%3A0x66725a7cb9629cf1!2sCei%20Angelitos%20Del%20Carmelo!5e0!3m2!1ses!2spe!4v1745433825490!5m2!1ses!2spe"
          width="100%"
          height="100%"
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full h-full"
        ></iframe>
      </motion.div>
    </section>
  );
}
