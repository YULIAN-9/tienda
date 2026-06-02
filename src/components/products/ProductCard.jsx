import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Eye } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { toast } from '@/components/ui/use-toast';
import ProductModal from './ProductModal';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState(
    product.colors ? product.colors[0] : { name: 'Default', hex: '#6B7280' }
  );
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Cambiar color al hacer hover
  const handleColorHover = (color) => {
    setSelectedColor(color);
    setCurrentImageIndex(0); // Reiniciar a la primera imagen del color
  };

  const handleAddToCart = () => {
    addToCart(product);
    toast({
      title: "✅ ¡Añadido al carrito!",
      description: `${product.name} ha sido agregado a tu carrito.`,
    });
  };

  const handleQuickView = () => {
    setIsModalOpen(true);
  };

  // Obtener imágenes del color seleccionado
  const currentImages = selectedColor.images || product.images || [product.imageUrl];
  const currentImage = currentImages[currentImageIndex];

  return (
    <>
      <motion.div
        whileHover={{ y: -8 }}
        transition={{ type: 'spring', stiffness: 300 }}
        className="bg-slate-800 rounded-lg overflow-hidden group border border-white/10 shadow-lg"
      >
        {/* Imagen del producto */}
        <div className="overflow-hidden relative">
          <img 
            src={currentImage} 
            alt={product.name} 
            className="w-full h-80 object-cover transition-all duration-500"
          />
          
          {/* Selector de colores tipo Gap */}
          {product.colors && product.colors.length > 1 && (
            <div className="absolute bottom-3 left-3 right-3">
              <div className="flex justify-center space-x-2 bg-black/70 backdrop-blur-sm rounded-full p-2">
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    onMouseEnter={() => handleColorHover(color)}
                    onClick={() => handleColorHover(color)}
                    className={`w-6 h-6 rounded-full border-2 transition-all duration-200 ${
                      selectedColor.name === color.name 
                        ? 'border-white scale-110' 
                        : 'border-transparent hover:scale-105'
                    }`}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Botón de vista rápida */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
            <Button
              size="sm"
              className="bg-white/90 hover:bg-white text-slate-900 rounded-full"
              onClick={handleQuickView}
            >
              <Eye className="w-4 h-4 mr-2" />
              Vista Rápida
            </Button>
          </div>

          {/* Badge de oferta */}
          {product.onSale && (
          <div className="absolute top-2 left-2">
            <span className="bg-pink-500 text-white px-2 py-1 rounded-full text-xs font-bold">
              OFERTA
            </span>
          </div>
          )}

          {/* Indicador de múltiples imágenes */}
          {currentImages.length > 1 && (
            <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-full">
              {currentImageIndex + 1}/{currentImages.length}
            </div>
          )}
        </div>

        {/* Información del producto */}
        <div className="p-4">
          <p className="text-sm text-pink-400 font-semibold">{product.category}</p>
          <h3 className="text-lg font-bold text-white truncate">{product.name}</h3>
          
          {/* Color seleccionado */}
          {product.colors && (
            <p className="text-xs text-gray-400 mt-1">
              Color: {selectedColor.name}
            </p>
          )}

          <div className="flex justify-between items-center mt-4">
            <div>
              <p className="text-xl font-extrabold text-white">${product.price.toLocaleString('es-ES')}</p>
              {product.onSale && product.originalPrice && (
                <p className="text-sm text-gray-400 line-through">${product.originalPrice.toLocaleString('es-ES')}</p>
              )}
            </div>
            <div className="flex space-x-2">
              <Button
                size="sm"
                onClick={handleQuickView}
                className="bg-transparent border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white rounded-full"
              >
                <Eye className="w-4 h-4" />
              </Button>
              <Button
                size="sm"
                onClick={handleAddToCart}
                className="bg-transparent border-2 border-pink-500 text-pink-500 hover:bg-pink-500 hover:text-white rounded-full"
              >
                <ShoppingCart className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Modal de producto */}
      <ProductModal
        product={product}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default ProductCard;