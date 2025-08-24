import React from 'react';
import { motion } from 'framer-motion';
import { Shirt, ShoppingCart } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/useCart';
import CartSheet from '@/components/cart/CartSheet';

const Header = () => {
  const { cart, toggleCart } = useCart();
  const itemCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="sticky top-0 w-full z-50 bg-black/50 backdrop-blur-lg border-b border-white/10"
    >
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <NavLink to="/" className="flex items-center space-x-3 group">
            <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-red-500 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
              <Shirt className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white uppercase">Friki Store</h2>
            </div>
          </NavLink>
          
          <div className="hidden md:flex items-center space-x-8">
            <NavLink to="/" className={({ isActive }) => `text-white hover:text-pink-400 transition-colors ${isActive ? 'text-pink-400 font-semibold' : ''}`}>Inicio</NavLink>
            <NavLink to="/products" className={({ isActive }) => `text-white hover:text-pink-400 transition-colors ${isActive ? 'text-pink-400 font-semibold' : ''}`}>Productos</NavLink>
          </div>
          
          <Button
            onClick={toggleCart}
            className="relative bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white font-semibold px-6 py-2 rounded-full shadow-lg hover:shadow-pink-500/50 transition-all duration-300"
          >
            <ShoppingCart className="w-5 h-5 mr-2" />
            Carrito
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-white text-pink-500 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </Button>
        </div>
      </nav>
      <CartSheet />
    </motion.header>
  );
};

export default Header;