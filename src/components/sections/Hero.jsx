import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

const Hero = () => {
  const handleActionClick = (title) => {
    toast({
      title: `¡${title}!`,
      description: "🚧 Esta función aún no está implementada—¡pero no te preocupes! ¡Puedes solicitarla en tu próximo mensaje! 🚀",
    });
  };

  return (
    <section id="inicio" className="pt-32 pb-20 px-6">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <motion.h1 
                className="text-5xl lg:text-7xl font-bold text-white leading-tight"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Tu Bienestar
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-500">
                  es Nuestra Prioridad
                </span>
              </motion.h1>
              
              <motion.p 
                className="text-xl text-gray-300 max-w-lg"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                En la Cooperativa Divemotor te ofrecemos las mejores soluciones de ahorro y crédito para que cumplas tus sueños.
              </motion.p>
            </div>

            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <Button 
                onClick={() => handleActionClick("Solicitar Crédito")}
                size="lg"
                className="bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 text-white font-semibold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                Solicitar Crédito
              </Button>
              <Button 
                onClick={() => handleActionClick("Ahorrar")}
                variant="outline"
                size="lg"
                className="border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-white font-semibold px-8 py-4 rounded-full transition-all duration-300"
              >
                Planes de Ahorro
              </Button>
            </motion.div>

            <motion.div 
              className="flex items-center space-x-8 pt-8"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              <div className="text-center">
                <div className="text-3xl font-bold text-cyan-400">10+</div>
                <div className="text-sm text-gray-400">Años de Confianza</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-cyan-400">2000+</div>
                <div className="text-sm text-gray-400">Socios Felices</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-cyan-400">Tasas</div>
                <div className="text-sm text-gray-400">Preferenciales</div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="relative"
          >
            <div className="relative z-10">
              <img  
                alt="Personas sonriendo y planificando su futuro financiero"
                class="w-full h-96 lg:h-[500px] object-cover rounded-2xl shadow-2xl"
               src="https://images.unsplash.com/photo-1613568574848-405a740af608" />
            </div>
            <div className="absolute -top-4 -right-4 w-full h-full bg-gradient-to-r from-teal-500/20 to-cyan-600/20 rounded-2xl blur-xl"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;