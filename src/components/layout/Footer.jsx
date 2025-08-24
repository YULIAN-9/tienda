import React from 'react';
import { Shirt } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

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
              <span className="text-lg font-bold text-white uppercase">Friki Store</span>
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

          <div>
            <span className="text-white font-semibold mb-4 block uppercase">Síguenos</span>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><button onClick={handleUnimplementedClick} className="hover:text-pink-400 transition-colors">Instagram</button></li>
              <li><button onClick={handleUnimplementedClick} className="hover:text-pink-400 transition-colors">Facebook</button></li>
              <li><button onClick={handleUnimplementedClick} className="hover:text-pink-400 transition-colors">TikTok</button></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2025 Friki Store. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;