"use client";
import { useState, useEffect } from "react";

export default function AboutUs() {
  const [tab, setTab] = useState("nosotros");
  const [visible, setVisible] = useState(false); // Inicialmente oculto

  // Mostrar contenido al cargar la página
  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleTabChange = (newTab: string) => {
    if (newTab === tab) return;
    setVisible(false);
    setTimeout(() => {
      setTab(newTab);
      setVisible(true);
    }, 300);
  };

  return (
    <section className="bg-white py-16 px-6 md:px-12 lg:px-24">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        {/* Tabs */}
        <div className="flex flex-col">
          <div className="flex space-x-4 mb-6">
            <button
              onClick={() => handleTabChange("nosotros")}
              className={`px-6 py-2 font-semibold rounded-full transition-all duration-300 ${
                tab === "nosotros"
                  ? "bg-green-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Nosotros
            </button>
            <button
              onClick={() => handleTabChange("vm")}
              className={`px-6 py-2 font-semibold rounded-full transition-all duration-300 ${
                tab === "vm"
                  ? "bg-green-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Visión y Misión
            </button>
            <button
              onClick={() => handleTabChange("historia")}
              className={`px-6 py-2 font-semibold rounded-full transition-all duration-300 ${
                tab === "historia"
                  ? "bg-green-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Historia
            </button>
          </div>

          {/* Contenido con animación */}
          <div
            className={`min-h-[400px] transition-opacity duration-300 ${
              visible ? "opacity-100" : "opacity-0"
            }`}
          >
            {tab === "nosotros" && (
              <>
                <h2 className="text-3xl md:text-4xl font-bold text-green-700 mb-4">
                  ¿Quiénes Somos?
                </h2>
                <p className="text-gray-700 text-lg leading-relaxed">
                  En "Angelitos del Carmelo", brindamos una educación integral y personalizada,
                  enfocada en el desarrollo emocional, cognitivo y social de cada niño.
                  Creemos que la infancia es la etapa más importante para sembrar las bases
                  del aprendizaje y los valores que los acompañarán toda la vida.
                </p>
              </>
            )}

            {tab === "vm" && (
              <>
                <h2 className="text-3xl font-bold mb-4 text-green-700">Visión</h2>
                <p className="text-gray-700 leading-relaxed mb-6">
                  La I.E.P. “Angelitos del Carmelo” tiene el propósito de formar integralmente a los niños y niñas en los aspectos cognitivos, actitudinales y tecnológicos, inmersos en competencias con enfoque en la práctica de valores, para formar seres útiles a sí mismos, su familia y comunidad. La docente se caracteriza por su liderazgo y compromiso con la comunidad.
                </p>

                <h2 className="text-3xl font-bold mb-4 text-green-700">Misión</h2>
                <p className="text-gray-700 leading-relaxed">
                  Nuestra Institución Educativa Privada visualiza un trabajo en democracia, haciendo de la práctica de valores un proyecto de vida. Buscamos niños y niñas competitivos, responsables, con un currículo innovador y creativo, ajustado a nuestras necesidades y sostenido por una capacitación integral y permanente.
                </p>
              </>
            )}

            {tab === "historia" && (
              <>
                <h2 className="text-4xl font-bold text-green-700 mb-6">Nuestra Historia</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  La Institución Educativa Privada “Angelitos del Carmelo” fue fundada en 1996 por iniciativa de los esposos
                  Moyano Navarro, con el propósito de ofrecer una educación de calidad a la niñez de la comunidad de San
                  Joaquín, en Ica. Ante la necesidad de más centros educativos privados en la zona, el proyecto fue formalizado
                  mediante la Resolución Directoral Departamental N° 00041 el 04 de noviembre de ese mismo año.
                  Desde sus inicios, con el apoyo de los esposos Moyano Rueda, la institución ha funcionado en la urbanización
                  San Joaquín y ha contado con un equipo directivo, docente y administrativo comprometido con brindar una educación
                  con amor, dedicación y responsabilidad. El lema que guía a toda la comunidad educativa es:
                  <span className="font-semibold italic"> “Todo por amor y nada por la fuerza”.</span>
                </p>
              </>
            )}
          </div>
        </div>

        {/* Imagen con animación */}
        <div
          className={`flex justify-center transition-opacity duration-300 ${
            visible ? "opacity-100" : "opacity-0"
          }`}
        >
          {tab === "nosotros" && (
            <img
              src="/nosotrosSrc/profesoras.jpg"
              alt="Niños aprendiendo en el jardín"
              className="w-full h-auto rounded-lg shadow-md object-cover"
            />
          )}
          {tab === "vm" && (
            <img
              src="./nosotrosSrc/mivision.jpg"
              alt="Niños aprendiendo en Angelitos del Carmelo"
              className="w-full h-auto rounded-2xl shadow-lg"
            />
          )}
          {tab === "historia" && (
            <img
              src="./nosotrosSrc/fundadores.jpg"
              alt="Fundadores de Angelitos del Carmelo"
              className="w-full h-auto rounded-2xl shadow-xl transform transition duration-500 hover:scale-105"
            />
          )}
        </div>
      </div>
    </section>
  );
}
