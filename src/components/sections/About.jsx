import React from 'react';
import { motion } from 'framer-motion';
import { Users, ShieldCheck, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

const About = () => {
    const handleActionClick = () => {
        toast({
            title: "¡Acción no implementada!",
            description: "🚧 Esta función aún no está implementada—¡pero no te preocupes! ¡Puedes solicitarla en tu próximo mensaje! 🚀",
        });
    };

    return (
        <section id="nosotros" className="py-20 px-6">
            <div className="container mx-auto">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ x: -100, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <img 
                            alt="Equipo de la Cooperativa Divemotor trabajando juntos"
                            class="w-full h-96 object-cover rounded-2xl shadow-2xl"
                         src="https://images.unsplash.com/photo-1598223181630-8a5814045768" />
                    </motion.div>

                    <motion.div
                        initial={{ x: 100, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="space-y-8"
                    >
                        <div>
                            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                                Creada por y <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-500">para los Empleados</span>
                            </h2>
                            <p className="text-xl text-gray-300 leading-relaxed mb-6">
                                La Cooperativa Divemotor nació del deseo de fortalecer el bienestar financiero de nuestros socios. Somos una familia que se apoya mutuamente para alcanzar grandes metas.
                            </p>
                            <p className="text-lg text-gray-400 leading-relaxed">
                                Nuestra misión es ofrecer servicios financieros justos, transparentes y accesibles, impulsando el crecimiento personal y profesional de cada miembro.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
                                <Users className="w-8 h-8 text-cyan-400 mb-3" />
                                <h4 className="text-lg font-semibold text-white mb-2">Comunidad Unida</h4>
                                <p className="text-gray-400 text-sm">Más que una cooperativa, somos una comunidad de apoyo.</p>
                            </div>
                            <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
                                <ShieldCheck className="w-8 h-8 text-cyan-400 mb-3" />
                                <h4 className="text-lg font-semibold text-white mb-2">Seguridad y Confianza</h4>
                                <p className="text-gray-400 text-sm">Tus ahorros y datos están protegidos con los más altos estándares.</p>
                            </div>
                            <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 col-span-1 md:col-span-2">
                                <TrendingUp className="w-8 h-8 text-cyan-400 mb-3" />
                                <h4 className="text-lg font-semibold text-white mb-2">Crecimiento para Todos</h4>
                                <p className="text-gray-400 text-sm">Ofrecemos las herramientas para que alcances tu máximo potencial financiero.</p>
                            </div>
                        </div>

                        <Button
                            onClick={handleActionClick}
                            size="lg"
                            className="bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 text-white font-semibold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                        >
                            Hazte Socio
                        </Button>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default About;