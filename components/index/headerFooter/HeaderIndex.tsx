"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import "@/components/index/headerFooter/headerFooterIndex.css";

export default function HeaderIndex({ scrollDistance = 400 }) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > scrollDistance);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollDistance]);

  return (
    <header className={`header ${isScrolled ? "scrolled" : "transparent"}`}>
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-3">
          <Image
            src="/homeSrc/adc-logo.png"
            alt="Logo"
            width={50}
            height={50}
            className="cursor-pointer"
          />
          <p className="text-white font-bold transition-colors">
            IEP Angelitos <br /> del Carmelo
          </p>
        </Link>

        {/* Navegación */}
        <nav className="hidden md:flex space-x-10">
          <a href="/" className="text-white font-bold px-4">Inicio</a>
          <a href="/nosotros" className="text-white font-bold px-4">Nosotros</a>
          <a href="/faq" className="text-white font-bold px-4">FAQ</a>
          <a href="/contactanos" className="text-white font-bold px-4">Contáctanos</a>
        </nav>
      </div>
    </header>
  );
}
