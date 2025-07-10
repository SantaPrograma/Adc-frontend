"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

const images = [
    { src: "/homeSrc/juegos.jpg", alt: "Áreas especializadas" },
    { src: "/homeSrc/aulas.jpg", alt: "Aulas a su medida" },
    { src: "/homeSrc/talleres.jpg", alt: "Talleres variados" },
    { src: "/homeSrc/terapia.jpg", alt: "Terapias infantiles" },
    { src: "/homeSrc/odontologia.jpg", alt: "Servicios odontológicos" },
];

export default function Ofrecemos() {
    const [startIndex, setStartIndex] = useState(0);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        startAutoSlide();
        return () => stopAutoSlide();
    }, []);

    const startAutoSlide = () => {
        stopAutoSlide();
        intervalRef.current = setInterval(() => {
            nextSlide();
        }, 6000);
    };

    const stopAutoSlide = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    };

    const nextSlide = () => {
        setStartIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const prevSlide = () => {
        setStartIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };

    const handleNext = () => {
        nextSlide();
        startAutoSlide();
    };

    const handlePrev = () => {
        prevSlide();
        startAutoSlide();
    };

    const visibleImages = [
        images[startIndex],
        images[(startIndex + 1) % images.length],
        images[(startIndex + 2) % images.length],
    ];

    return (
        <section className="py-12 px-6 md:px-16 lg:px-24">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-[#15993b] mb-8">
                Descubre todo lo que ofrecemos
            </h2>
            <p className="text-lg text-center text-gray-600 mb-6">
                En nuestro centro educativo, ofrecemos una variedad de espacios diseñados para el aprendizaje, el juego y el cuidado integral de los niños.
            </p>
            <motion.div
                className="flex justify-center items-center space-x-8 overflow-hidden"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.5 }}
            >
                {visibleImages.map((image, index) => (
                    <div
                        key={index}
                        className={`rounded-lg shadow-md overflow-hidden flex-shrink-0 transition-transform duration-500 ${index === 1
                            ? "w-60 h-60 md:w-72 md:h-72 lg:w-80 lg:h-80"
                            : "w-44 h-44 md:w-52 md:h-52 lg:w-60 lg:h-60"}`}
                    >
                        <img
                            src={image.src}
                            alt={image.alt}
                            className="w-full h-full object-cover"
                        />
                    </div>
                ))}
            </motion.div>

            <div className="flex justify-center mt-6 space-x-8">
                <button
                    onClick={handlePrev}
                    className="px-6 py-2 bg-white border border-gray-300 shadow-md hover:bg-gray-200 transition-colors"
                >
                    ◀
                </button>
                <button
                    onClick={handleNext}
                    className="px-6 py-2 bg-white border border-gray-300 shadow-md hover:bg-gray-200 transition-colors"
                >
                    ▶
                </button>
            </div>
        </section>
    );
}
