import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Home, ShoppingBag } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <>
      <Helmet>
        <title>Página no encontrada - Nexus Friki</title>
      </Helmet>

      <section className="flex flex-col items-center justify-center py-20 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-8xl md:text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-red-500">
            404
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-white mt-4">
            Página no encontrada
          </h2>
          <p className="text-gray-400 mt-2 max-w-md mx-auto">
            La página que buscas no existe o fue movida. Vuelve al inicio para seguir explorando.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex gap-4 mt-8"
        >
          <Button asChild className="bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white rounded-full">
            <Link to="/">
              <Home className="w-4 h-4 mr-2" />
              Volver al Inicio
            </Link>
          </Button>
          <Button asChild variant="outline" className="border-white/20 text-white hover:bg-white/10 rounded-full">
            <Link to="/products">
              <ShoppingBag className="w-4 h-4 mr-2" />
              Ver Productos
            </Link>
          </Button>
        </motion.div>
      </section>
    </>
  );
};

export default NotFoundPage;
