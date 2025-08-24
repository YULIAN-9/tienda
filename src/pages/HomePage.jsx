import React from 'react';
import { Helmet,} from 'react-helmet';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { NavLink } from 'react-router-dom';
import ProductCard from '@/components/products/ProductCard';

const featuredProducts = [
  {
    id: 1,
    name: 'Gorras',
    price: 25.00,
    category: 'Gorras',
    imageUrl: 'https://images.unsplash.com/photo-1529958030586-3aae4ca485ff?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 2,
    name: 'Buzos',
    price: 65.00,
    category: 'Buzos',
    imageUrl: 'https://leclee.com.co/cdn/shop/files/2416003551.jpg?v=1720212548',
  },
  {
    id: 3,
    name: 'Bikini',
    price: 45.00,
    category: 'Ropa de Baño',
    imageUrl: 'https://fitplanetco.com/cdn/shop/articles/BIKINI_ECO_Y_SOSTENIBLE_HECHO_EN_ESPANA_MADE_IN_SPAIN_FITPLANET-146.jpg?v=1716784697&width=1200',
  },
  {
    id: 4,
    name: 'Pantaloneta',
    price: 40.00,
    category: 'Ropa de Baño',
    imageUrl: 'https://marcacedro.com/cdn/shop/products/pantaloneta_de_ba_o_para_hombre_de_la_marca_cedro_color_azul_claro_hecha_con_procesos_sostenibles.jpg?v=1733332282&width=700',
  },
];


const HomePage = () => {
  return (
    <>
      <Helmet>
        <title>FRIKI STORE - Estilo que te Define</title>
        <meta name="description" content="Descubre las últimas tendencias en moda urbana. Gorras, buzos y más en Urban Threads." />
        <meta property="og:title" content="Urban Threads - Estilo que te Define" />
        <meta property="og:description" content="Descubre las últimas tendencias en moda urbana. Gorras, buzos y más en Urban Threads." />
      </Helmet>
      
      <div className="space-y-20">
        <section className="text-center py-20 relative overflow-hidden rounded-lg">
           <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-black z-0"></div>
           <div className="absolute inset-0 opacity-10">
                <img  alt="Fondo abstracto de tela" class="w-full h-full object-cover" src="https://images.unsplash.com/photo-1653604021351-a6a89b9c44b9" />
           </div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-10"
          >
            <h1 className="text-5xl md:text-7xl font-extrabold text-white text-shadow tracking-tight">
              ESTILO QUE <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-red-500 text-glow">TE DEFINE</span>
            </h1>
            <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto text-gray-300">
              Explora nuestra colección curada de moda urbana y encuentra piezas únicas que cuentan tu historia.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Button asChild size="lg" className="bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white font-bold text-lg py-3 px-8 rounded-full shadow-lg hover:shadow-pink-500/50 transition-all duration-300 transform hover:scale-105">
                <NavLink to="/products">Ver Colección</NavLink>
              </Button>
            </div>
          </motion.div>
        </section>

        <section>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-4xl font-bold text-white mb-2">Productos Destacados</h2>
            <p className="text-gray-400 mb-12">Lo más nuevo y popular de nuestra tienda.</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
};

export default HomePage;