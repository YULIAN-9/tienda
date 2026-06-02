import React from 'react';
import { Helmet } from 'react-helmet';
import ProductCard from '@/components/products/ProductCard';
import { motion } from 'framer-motion';
import { products as allProducts } from '@/data/products';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

const ProductsPage = () => {
  return (
    <>
      <Helmet>
        <title>Nuestra Colección - Nexus Friki</title>
        <meta name="description" content="Explora toda la colección de ropa urbana de Nexus Friki. Encuentra tu estilo único." />
        <meta property="og:title" content="Nuestra Colección - Nexus Friki" />
        <meta property="og:description" content="Explora toda la colección de ropa urbana de Nexus Friki. Encuentra tu estilo único." />
      </Helmet>

      <div className="space-y-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-white">Toda la <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-red-500 text-glow">Colección</span></h1>
          <p className="mt-2 text-lg text-gray-400">Encuentra las piezas que estabas buscando.</p>
        </motion.div>
        
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {allProducts.map(product => (
            <motion.div key={product.id} variants={itemVariants}>
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </>
  );
};

export default ProductsPage;