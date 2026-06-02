import React from 'react';
import { motion } from 'framer-motion';
import { Shirt, ShoppingCart, Phone } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/useCart';
import CartSheet from '@/components/cart/CartSheet';
import Tooltip from '@/components/ui/tooltip';

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
          {/* Logo */}
          <NavLink to="/" className="flex items-center space-x-3 group">
            <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-red-500 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
              <Shirt className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white uppercase">Nexus Friki</h2>
            </div>
          </NavLink>
          
          {/* Navegación */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink to="/" className={({ isActive }) => `text-white hover:text-pink-400 transition-colors ${isActive ? 'text-pink-400 font-semibold' : ''}`}>
              Inicio
            </NavLink>
            <NavLink to="/products" className={({ isActive }) => `text-white hover:text-pink-400 transition-colors ${isActive ? 'text-pink-400 font-semibold' : ''}`}>
              Productos
            </NavLink>
          </div>
          
          {/* Botones de acción con tooltips */}
          <div className="flex items-center space-x-4">
            {/* WhatsApp con tooltip */}
            <Tooltip content="Contactar por WhatsApp" position="bottom">
              <a 
                href="https://wa.me/3136294045"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded-full flex items-center space-x-2 transition-all duration-300 shadow-lg hover:shadow-green-500/50"
              >
                <Phone className="w-4 h-4" />
                <span className="hidden sm:inline">WhatsApp</span>
              </a>
            </Tooltip>

            {/* Carrito con tooltip */}
            <Tooltip content={`Ver carrito (${itemCount} items)`} position="bottom">
              <Button
                onClick={toggleCart}
                className="relative bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white font-semibold px-6 py-2 rounded-full shadow-lg hover:shadow-pink-500/50 transition-all duration-300"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                <span className="hidden sm:inline">Carrito</span>
                {itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-white text-pink-500 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </Button>
            </Tooltip>
          </div>
        </div>

        {/* Navegación Mobile */}
        <div className="md:hidden flex justify-center space-x-6 mt-4 pt-4 border-t border-white/10">
          <NavLink to="/" className={({ isActive }) => `text-white hover:text-pink-400 transition-colors ${isActive ? 'text-pink-400 font-semibold' : ''}`}>
            Inicio
          </NavLink>
          <NavLink to="/products" className={({ isActive }) => `text-white hover:text-pink-400 transition-colors ${isActive ? 'text-pink-400 font-semibold' : ''}`}>
            Productos
          </NavLink>
        </div>
      </nav>
      <CartSheet />
    </motion.header>
  );
};

export default Header;