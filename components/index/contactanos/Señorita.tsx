"use client";

import React from "react";
import { motion } from "framer-motion";

export default function Señorita() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 150 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.3 }}
      className="w-full md:w-1/2 flex justify-center items-center"
    >
      <img
        src="/contactanosSrc/srta.webp"
        alt="Señorita"
        className="max-w-xs md:max-w-md lg:max-w-lg h-auto"
      />
    </motion.div>
  );
}
