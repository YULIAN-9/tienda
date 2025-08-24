import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

const contactData = [
  {
    icon: Phone,
    title: "Teléfono",
    info: "+1 (555) 987-6543",
    description: "Llámanos de Lunes a Viernes de 8:00 AM a 5:00 PM"
  },
  {
    icon: Mail,
    title: "Email",
    info: "contacto@divemotorcoop.com",
    description: "Escríbenos para consultas, solicitudes o asesorías"
  },
  {
    icon: MapPin,
    title: "Oficina Principal",
    info: "Av. Financiera 456, Ciudad",
    description: "Visítanos para una atención personalizada"
  }
];

const Contact = () => {
    const handleActionClick = () => {
        toast({
            title: "¡Acción no implementada!",
            description: "🚧 Esta función aún no está implementada—¡pero no te preocupes! ¡Puedes solicitarla en tu próximo mensaje! 🚀",
        });
    };

    return (
        <section id="contacto" className="py-20 px-6 bg-black/20">
            <div className="container mx-auto">
                <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-500">Ponte en Contacto</span>
                    </h2>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                        ¿Tienes preguntas? Nuestro equipo está listo para ayudarte a tomar las mejores decisiones financieras.
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {contactData.map((contact, index) => (
                        <motion.div
                            key={index}
                            initial={{ y: 50, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -10, scale: 1.02 }}
                            className="group cursor-pointer"
                            onClick={handleActionClick}
                        >
                            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 hover:border-cyan-400/50 transition-all duration-300 text-center h-full">
                                <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                                    <contact.icon className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-cyan-400 transition-colors">
                                    {contact.title}
                                </h3>
                                <p className="text-xl text-cyan-400 font-semibold mb-4">
                                    {contact.info}
                                </p>
                                <p className="text-gray-300 leading-relaxed">
                                    {contact.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    viewport={{ once: true }}
                    className="text-center mt-16"
                >
                    <Button
                        onClick={handleActionClick}
                        size="lg"
                        className="bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 text-white font-semibold px-12 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                    >
                        Contactar a un Asesor
                    </Button>
                </motion.div>
            </div>
        </section>
    );
};

export default Contact;