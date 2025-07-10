"use client";

import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQCategory {
  title: string;
  items: FAQItem[];
}

const faqData: FAQCategory[] = [
  {
    title: "Sobre Matrícula",
    items: [
      {
        question: "¿Cuáles son los requisitos para la matrícula?",
        answer:
          "Los requisitos incluyen partida de nacimiento, DNI del estudiante y apoderado, y ficha de datos.",
      },
      {
        question: "¿Hasta cuándo puedo matricular a mi hijo?",
        answer:
          "Las matrículas están abiertas hasta el 15 de marzo o hasta agotar vacantes.",
      },
    ],
  },
  {
    title: "Trámites de Documentos",
    items: [
      {
        question: "¿Cómo solicito un certificado de estudios?",
        answer:
          "Debe acercarse a la oficina administrativa con su DNI y realizar el pago correspondiente.",
      },
      {
        question: "¿Cuánto tarda en entregarse un certificado?",
        answer: "El tiempo de entrega es de 5 días hábiles.",
      },
    ],
  },
  {
    title: "Horarios y Clases",
    items: [
      {
        question: "¿Cuál es el horario de clases?",
        answer: "Las clases son de lunes a viernes de 8:00 AM a 1:00 PM.",
      },
      {
        question: "¿Hay clases los sábados?",
        answer: "No, solo en casos excepcionales de recuperación de clases.",
      },
    ],
  },
];

export default function FAQ() {
  const [openCategory, setOpenCategory] = useState<number | null>(null);
  const [openQuestions, setOpenQuestions] = useState<{ [key: number]: number | null }>({});

  const toggleCategory = (index: number) => {
    setOpenCategory(openCategory === index ? null : index);
    setOpenQuestions((prev) => ({ ...prev, [index]: null }));
  };

  const toggleQuestion = (catIndex: number, qIndex: number) => {
    setOpenQuestions((prev) => ({
      ...prev,
      [catIndex]: prev[catIndex] === qIndex ? null : qIndex,
    }));
  };

  return (
    <div className="max-w-3xl mx-auto p-6 mt-8 mb-8">
      <div className="space-y-6">
        {faqData.map((category, catIndex) => (
          <div key={catIndex} className="border rounded-2xl shadow-md bg-white overflow-hidden">
            {/* Categoría */}
            <button
              className="w-full p-5 flex justify-between items-center bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold text-lg rounded-t-2xl transition-all duration-300 hover:brightness-110"
              onClick={() => toggleCategory(catIndex)}
            >
              {category.title}
              {openCategory === catIndex ? (
                <FaChevronUp className="w-5 h-5" />
              ) : (
                <FaChevronDown className="w-5 h-5" />
              )}
            </button>

            {/* Preguntas */}
            {openCategory === catIndex && (
              <div className="p-5 space-y-4">
                {category.items.map((item, qIndex) => (
                  <div key={qIndex} className="transition-all duration-300">
                    <button
                      className="w-full text-left text-lg font-medium text-gray-800 flex justify-between items-center hover:text-blue-600"
                      onClick={() => toggleQuestion(catIndex, qIndex)}
                    >
                      {item.question}
                      {openQuestions[catIndex] === qIndex ? (
                        <FaChevronUp className="w-4 h-4 text-blue-600" />
                      ) : (
                        <FaChevronDown className="w-4 h-4" />
                      )}
                    </button>
                    {openQuestions[catIndex] === qIndex && (
                      <p className="mt-3 text-gray-700 bg-gray-100 p-4 rounded-lg border-l-4 border-blue-500">
                        {item.answer}
                      </p>
                    )}
                    <hr className="my-3 border-gray-300" />
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
