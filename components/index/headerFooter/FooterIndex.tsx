import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaFacebook, FaTiktok } from "react-icons/fa";

export default function FooterIndex() {
  return (
    <>
      <footer className="footer">
        <div className="footer-container">
          {/* Información */}
          <div className="footer-column">
            <h3>Información</h3>
            <a href="https://maps.app.goo.gl/418S1XydDWJd7LkP9"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2">
              <FaMapMarkerAlt className="text-xl" />
              <span>Urb. San Joaquín E-35 1º etapa, Ica, Perú</span>
            </a>
            <a href="https://api.whatsapp.com/send/?phone=%2B51996293093&text&type=phone_number&app_absent=0"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 mt-2">
              <FaPhoneAlt className="text-xl" />
              <span>+51 989 173 065</span>
            </a>
            <a href="mailto:angelitosdelcarmelo@gmail.com" 
              className="flex items-center space-x-2 mt-2">
              <FaEnvelope className="text-xl" />
              <span>angelitosdelcarmelo@gmail.com</span>
            </a>
          </div>

          {/* Enlaces */}
          <div className="footer-column">
            <h3>Enlaces</h3>
            <ul>
              <li><a href="/">Inicio</a></li>
              <li><a href="/nosotros">Nosotros</a></li>
              <li><a href="/faq">FAQ</a></li>
              <li><a href="/contactanos">Contáctanos</a></li>
            </ul>
          </div>

          {/* Redes sociales */}
          <div className="footer-column">
            <h3>Redes Sociales</h3>
            <div className="social-icons">
              <a href="https://www.facebook.com/angelitosdelcarmeloica" target="_blank" rel="noopener noreferrer">
                <FaFacebook className="text-xl" />
              </a>
              <a href="https://www.tiktok.com/@angelitosdelcarmelo" target="_blank" rel="noopener noreferrer">
                <FaTiktok className="text-xl" />
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Derechos reservados */}
      <div className="copyright">
        <p><strong>&copy; 2025 Angelitos del Carmelo.</strong> Todos los derechos reservados.</p>
      </div>
    </>
  );
}
