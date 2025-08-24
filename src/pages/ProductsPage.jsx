import React from 'react';
import { Helmet } from 'react-helmet';
import ProductCard from '@/components/products/ProductCard';
import { motion } from 'framer-motion';

const allProducts = [
  { id: 1, name: 'Sombreros', price: 25.00, category: 'Gorras', imageUrl: 'https://images.unsplash.com/photo-1529958030586-3aae4ca485ff?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { id: 2, name: 'Buzos', price: 65.00, category: 'Buzos', imageUrl: 'https://leclee.com.co/cdn/shop/files/2416003551.jpg?v=1720212548' },
  { id: 3, name: 'Bikini', price: 45.00, category: 'Ropa de Baño', imageUrl: 'https://fitplanetco.com/cdn/shop/articles/BIKINI_ECO_Y_SOSTENIBLE_HECHO_EN_ESPANA_MADE_IN_SPAIN_FITPLANET-146.jpg?v=1716784697&width=1200' },
  { id: 4, name: 'Pantaloneta', price: 40.00, category: 'Ropa de Baño', imageUrl: 'https://marcacedro.com/cdn/shop/products/pantaloneta_de_ba_o_para_hombre_de_la_marca_cedro_color_azul_claro_hecha_con_procesos_sostenibles.jpg?v=1733332282&width=700' },
  { id: 5, name: 'Gorras', price: 22.00, category: 'Gorras', imageUrl: 'https://cubitt.com.co/cdn/shop/files/CTCAP-1E.webp?v=1753078668&width=600' },
  { id: 6, name: 'Buzo Black"', price: 70.00, category: 'Buzos', imageUrl: 'https://vansco.vteximg.com.br/arquivos/ids/340280-1200-1200/VN0A7TJPBLK-1.jpg?v=638545982599500000' },
  { id: 7, name: 'Bikini "Tropical"', price: 50.00, category: 'Ropa de Baño', imageUrl: 'https://www.gabriola.es/1095-thickbox_default/bikini-estampado-floral-volante-mogan.jpg' },
  { id: 8, name: 'Pantaloneta "Surfer"', price: 42.00, category: 'Ropa de Baño', imageUrl: 'https://leonisa.co/cdn/shop/files/505040_022_1200X1500_1_900x.jpg?v=1743804015' },
];

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
        <title>Nuestra Colección - FRIKI STORE</title>
        <meta name="description" content="Explora toda la colección de ropa urbana de Urban Threads. Encuentra tu estilo único." />
        <meta property="og:title" content="Nuestra Colección - Urban Threads" />
        <meta property="og:description" content="Explora toda la colección de ropa urbana de Urban Threads. Encuentra tu estilo único." />
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