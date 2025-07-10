import ContactForm from "./ContactForm";
import Señorita from "./Señorita";
import TituloContacto from "./Titulo";

export default function ContactSection() {
  return (
    <section className="max-w-6xl mx-auto px-4 mt-10 mb-10">
      <TituloContacto />
      <div className="flex flex-col md:flex-row items-center justify-between gap-8">
        <ContactForm />
        <Señorita />
      </div>
    </section>
  );
}
