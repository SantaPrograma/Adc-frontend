"use client";

import React, { useState } from "react";
import "./contactanos.css";
import TerminosModal from "@/components/client/matricula/TerminosModal";
import { motion } from "framer-motion";

export default function ContactForm() {
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    telefono: "",
    mensaje: "",
  });

  const [aceptaTerminos, setAceptaTerminos] = useState(false);
  const [mensajeError, setMensajeError] = useState("");
  const [mensajeExito, setMensajeExito] = useState("");
  const [enviando, setEnviando] = useState(false);

  const limpiarMensajes = () => {
    setTimeout(() => {
      setMensajeError("");
      setMensajeExito("");
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setMensajeError("");
    setMensajeExito("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { nombre, email, telefono, mensaje } = form;
    if (!nombre || !email || !telefono || !mensaje) {
      setMensajeError("Todos los campos son obligatorios.");
      limpiarMensajes();
      return;
    }

    if (!aceptaTerminos) {
      setMensajeError("Debes aceptar los términos y condiciones.");
      limpiarMensajes();
      return;
    }

    setEnviando(true);
    try {
      const res = await fetch("http://localhost:3001/api/contactanos/registrar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, email, telefono, mensaje }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMensajeError(data.message || "Error al enviar el mensaje.");
        limpiarMensajes();
        return;
      }

      setMensajeExito("Mensaje enviado con éxito.");
      setForm({ nombre: "", email: "", telefono: "", mensaje: "" });
      limpiarMensajes();
    } catch (error) {
      console.error("Error:", error);
      setMensajeError("Error al enviar el mensaje.");
      limpiarMensajes();
    } finally {
      setEnviando(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -150 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.3 }}
      className="w-full md:w-1/2 flex justify-center"
    >
      <div className="w-full max-w-lg border border-gray-300 rounded-xl p-6 shadow-sm">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="nombre"
            placeholder="Nombre"
            value={form.nombre}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <input
            type="text"
            name="telefono"
            placeholder="Teléfono"
            value={form.telefono}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <textarea
            name="mensaje"
            placeholder="Mensaje"
            rows={6}
            value={form.mensaje}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          ></textarea>
          <div className="flex items-center gap-1">
            <input
              type="checkbox"
              checked={aceptaTerminos}
              onChange={(e) => setAceptaTerminos(e.target.checked)}
              className="mr-2"
              id="terminos"
            />
            <label htmlFor="terminos" className="text-sm">
              Acepto los
            </label>
            <TerminosModal />
          </div>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="btnSendMessage disabled:opacity-50"
              disabled={enviando || !aceptaTerminos}
            >
              {enviando ? "Enviando..." : "Enviar Mensaje"}
            </button>
            {mensajeError && (
              <span className="text-red-600 text-sm ml-4">{mensajeError}</span>
            )}
            {mensajeExito && (
              <span className="text-green-600 text-sm ml-4">{mensajeExito}</span>
            )}
          </div>
        </form>
      </div>
    </motion.div>
  );
}
