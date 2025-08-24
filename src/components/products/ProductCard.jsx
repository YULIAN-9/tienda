import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { toast } from '@/components/ui/use-toast';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
    toast({
      title: "✅ ¡Añadido al carrito!",
      description: `${product.name} ha sido agregado a tu carrito.`,
    });
  };

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ type: 'spring', stiffness: 300 }}
      className="bg-slate-800 rounded-lg overflow-hidden group border border-white/10 shadow-lg"
    >
      <div className="overflow-hidden">
        <img src={product.imageUrl} alt={product.name} className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300" />
      </div>
      <div className="p-4">
        <p className="text-sm text-pink-400 font-semibold">{product.category}</p>
        <h3 className="text-lg font-bold text-white truncate">{product.name}</h3>
        <div className="flex justify-between items-center mt-4">
          <p className="text-xl font-extrabold text-white">${product.price.toFixed(2)}</p>
          <Button
            size="sm"
            onClick={handleAddToCart}
            className="bg-transparent border-2 border-pink-500 text-pink-500 hover:bg-pink-500 hover:text-white rounded-full"
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Añadir
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;