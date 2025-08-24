import React from 'react';
import { motion } from 'framer-motion';
import { Home, GraduationCap, Briefcase, Landmark, PiggyBank, BarChart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

const servicesData = [
  {
    icon: PiggyBank,
    title: "Ahorro Obligatorio y Voluntario",
    description: "Construye tu futuro con nuestros planes de ahorro flexibles y seguros. Aporta a tu ritmo y mira crecer tu capital.",
    color: "from-green-500 to-emerald-500"
  },
  {
    icon: Landmark,
    title: "Crédito de Libre Inversión",
    description: "Financia tus proyectos personales, viajes o cualquier sueño que tengas con nuestras flexibles líneas de crédito.",
    color: "from-blue-500 to-cyan-500"
  },
  {
    icon: Home,
    title: "Crédito de Vivienda",
    description: "Te ayudamos a alcanzar el sueño de tener casa propia con tasas preferenciales y plazos cómodos.",
    color: "from-purple-500 to-violet-500"
  },
  {
    icon: GraduationCap,
    title: "Crédito Educativo",
    description: "Invierte en tu futuro y el de tu familia. Financiamos estudios de pregrado, posgrado y cursos especializados.",
    color: "from-orange-500 to-red-500"
  },
  {
    icon: Briefcase,
    title: "Compra de Cartera",
    description: "Unifica tus deudas y mejora tu flujo de caja. Te ofrecemos tasas competitivas para consolidar tus obligaciones.",
    color: "from-red-500 to-pink-500"
  },
  {
    icon: BarChart,
    title: "Otros Servicios Financieros",
    description: "Asesorías personalizadas, seguros y convenios especiales para todos nuestros socios.",
    color: "from-indigo-500 to-blue-500"
  }
];

const Services = () => {
  const handleServiceClick = () => {
    toast({
      title: "¡Servicio!",
      description: "🚧 Esta función aún no está implementada—¡pero no te preocupes! ¡Puedes solicitarla en tu próximo mensaje! 🚀",
    });
  };

  return (
    <section id="servicios" className="py-20 px-6 bg-black/20">
      <div className="container mx-auto">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Nuestros <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-500">Servicios Financieros</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Soluciones pensadas para cada etapa de tu vida. Descubre todo lo que podemos hacer por ti.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((service, index) => (
            <motion.div
              key={index}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group"
            >
              <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 hover:border-cyan-400/50 transition-all duration-300 h-full">
                <div className={`w-16 h-16 bg-gradient-to-r ${service.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <service.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-cyan-400 transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-300 leading-relaxed mb-6">
                  {service.description}
                </p>
                <Button
                  onClick={handleServiceClick}
                  variant="ghost"
                  className="text-cyan-400 hover:text-white hover:bg-cyan-400 transition-all duration-300"
                >
                  Más información →
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;