import React from 'react';
import { Shirt } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { FaInstagram, FaFacebook, FaWhatsapp } from 'react-icons/fa';
import Tooltip from '@/components/ui/tooltip';

const Footer = () => {
  const handleUnimplementedClick = () => {
    toast({
      title: "🚧 ¡Función no implementada!",
      description: "Esta función aún no está implementada, ¡pero puedes solicitarla en tu próximo mensaje! 🚀",
    });
  };

  return (
    <footer className="bg-black/40 backdrop-blur-lg border-t border-white/10 py-12 px-6 mt-20">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-4 gap-8 text-center md:text-left">
          <div className="space-y-4 flex flex-col items-center md:items-start">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-red-500 rounded-full flex items-center justify-center">
                <Shirt className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold text-white uppercase">Yulian Store</span>
            </div>
            <p className="text-gray-400 text-sm">
              Viste con estilo, vive con actitud.
            </p>
          </div>

          <div>
            <span className="text-white font-semibold mb-4 block uppercase">Tienda</span>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><button onClick={handleUnimplementedClick} className="hover:text-pink-400 transition-colors">Gorras</button></li>
              <li><button onClick={handleUnimplementedClick} className="hover:text-pink-400 transition-colors">Buzos</button></li>
              <li><button onClick={handleUnimplementedClick} className="hover:text-pink-400 transition-colors">Bikinis</button></li>
              <li><button onClick={handleUnimplementedClick} className="hover:text-pink-400 transition-colors">Pantalonetas</button></li>
            </ul>
          </div>

          <div>
            <span className="text-white font-semibold mb-4 block uppercase">Legal</span>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><button onClick={handleUnimplementedClick} className="hover:text-pink-400 transition-colors">Términos y Condiciones</button></li>
              <li><button onClick={handleUnimplementedClick} className="hover:text-pink-400 transition-colors">Política de Privacidad</button></li>
              <li><button onClick={handleUnimplementedClick} className="hover:text-pink-400 transition-colors">Envíos y Devoluciones</button></li>
            </ul>
          </div>

          {/* Redes Sociales con Tooltips */}
          <div className="flex flex-col items-center md:items-start">
            <span className="text-white font-semibold mb-4 block uppercase">Síguenos</span>
            <div className="flex justify-center gap-6 text-2xl text-white">
              <Tooltip content="Escríbenos por WhatsApp" position="top">
                <a 
                  href="https://wa.me/3136294045" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-green-400 transition-colors transform hover:scale-110 duration-300"
                >
                  <FaWhatsapp />
                </a>
              </Tooltip>

              <Tooltip content="Síguenos en Instagram" position="top">
                <a 
                  href="https://www.instagram.com/richard_julian3/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-pink-500 transition-colors transform hover:scale-110 duration-300"
                >
                  <FaInstagram />
                </a>
              </Tooltip>

              <Tooltip content="Síguenos en Facebook" position="top">
                <a 
                  href="https://www.facebook.com/profile.php?id=100012142742320" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-blue-500 transition-colors transform hover:scale-110 duration-300"
                >
                  <FaFacebook />
                </a>
              </Tooltip>
            </div>
            
            {/* Información de contacto */}
            <div className="mt-4 text-center md:text-left">
              <p className="text-gray-400 text-sm mb-2">📧 yulianstore@email.com</p>
              <p className="text-gray-400 text-sm">📍 Bogotá, Colombia</p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2025 Yulian Store. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;