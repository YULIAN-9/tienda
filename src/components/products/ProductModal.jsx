import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingCart, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/useCart';
import { toast } from '@/components/ui/use-toast';

const ProductModal = ({ product, isOpen, onClose }) => {
  const { addToCart } = useCart();
  const [selectedColor, setSelectedColor] = useState(
    product.colors ? product.colors[0] : { name: 'Default', hex: '#6B7280' }
  );
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Obtener imágenes del color seleccionado
  const currentImages = selectedColor.images || product.images || [product.imageUrl];

  // Cambiar color (como en Gap)
  const handleColorSelect = (color) => {
    setSelectedColor(color);
    setCurrentImageIndex(0); // Siempre empezar con la primera imagen del color
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === currentImages.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? currentImages.length - 1 : prev - 1
    );
  };

  const handleAddToCart = () => {
    const productWithColor = {
      ...product,
      selectedColor: selectedColor.name,
      selectedImage: currentImages[currentImageIndex]
    };
    
    addToCart(productWithColor);
    toast({
      title: "✅ ¡Añadido al carrito!",
      description: `${product.name} (${selectedColor.name}) ha sido agregado.`,
    });
    onClose();
  };

  const whatsappMessage = `¡Hola! Estoy interesado en: ${product.name} - Color: ${selectedColor.name} - Precio: $${product.price}. ¿Podrías darme más información?`;
  const whatsappLink = `https://wa.me/573136294045?text=${encodeURIComponent(whatsappMessage)}`;

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-slate-800 border border-white/10 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex justify-between items-center p-6 border-b border-white/10">
            <h2 className="text-2xl font-bold text-white">{product.name}</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-white hover:bg-white/10 rounded-full"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          <div className="flex flex-col md:flex-row">
            {/* Sección de Imágenes - Estilo Gap */}
            <div className="md:w-1/2 relative">
              <div className="relative h-80 md:h-96 overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentImages[currentImageIndex]}
                    src={currentImages[currentImageIndex]}
                    alt={`${product.name} - ${selectedColor.name}`}
                    className="w-full h-full object-cover"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </AnimatePresence>
                
                {/* Navegación de imágenes */}
                {currentImages.length > 1 && (
                  <>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={prevImage}
                      className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={nextImage}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </>
                )}

                {/* Indicadores */}
                {currentImages.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {currentImages.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-2 h-2 rounded-full transition duration-200 ${
                          index === currentImageIndex ? 'bg-pink-500' : 'bg-white/50'
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Selector de colores - Estilo Gap */}
              {product.colors && product.colors.length > 1 && (
                <div className="p-4 border-t border-white/10">
                  <h3 className="text-white font-semibold mb-3 text-center">Colores disponibles</h3>
                  <div className="flex justify-center space-x-3">
                    {product.colors.map((color) => (
                      <button
                        key={color.name}
                        onClick={() => handleColorSelect(color)}
                        className={`flex flex-col items-center space-y-2 transition-all duration-200 ${
                          selectedColor.name === color.name ? 'scale-110' : 'hover:scale-105'
                        }`}
                      >
                        <div
                          className={`w-10 h-10 rounded-full border-2 transition-all duration-200 ${
                            selectedColor.name === color.name 
                              ? 'border-pink-500 shadow-lg' 
                              : 'border-gray-400 hover:border-white'
                          }`}
                          style={{ backgroundColor: color.hex }}
                        />
                        <span className={`text-xs transition-colors ${
                          selectedColor.name === color.name ? 'text-pink-400 font-bold' : 'text-gray-300'
                        }`}>
                          {color.name}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Miniaturas de imágenes */}
              {currentImages.length > 1 && (
                <div className="flex space-x-2 p-4 overflow-x-auto bg-slate-900/50">
                  {currentImages.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`flex-shrink-0 w-16 h-16 border-2 rounded-lg overflow-hidden transition duration-200 ${
                        index === currentImageIndex ? 'border-pink-500' : 'border-transparent hover:border-white/50'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`Vista ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Información del Producto */}
            <div className="md:w-1/2 p-6">
              <div className="space-y-6">
                {/* Precio */}
                <div>
                  <span className="text-3xl font-bold text-white">${product.price.toLocaleString('es-ES')}</span>
                  <span className="text-lg text-gray-400 line-through ml-2">
                    ${(product.price * 1.2).toLocaleString('es-ES')}
                  </span>
                  <span className="ml-2 bg-pink-500 text-white text-sm px-2 py-1 rounded">
                    OFERTA
                  </span>
                </div>

                {/* Color seleccionado */}
                <div>
                  <h3 className="font-semibold text-white mb-2">
                    Color seleccionado: <span className="text-pink-400">{selectedColor.name}</span>
                  </h3>
                </div>

                {/* Descripción */}
                <div>
                  <h3 className="font-semibold text-white mb-2">Descripción</h3>
                  <p className="text-gray-300 text-sm">
                    {product.description || 'Producto de alta calidad con diseño urbano y materiales premium.'}
                  </p>
                </div>

                {/* Botones de Acción */}
                <div className="space-y-3">
                  <Button
                    onClick={handleAddToCart}
                    className="w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 rounded-lg transition duration-300"
                  >
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Añadir al Carrito
                  </Button>
                  
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 text-center"
                  >
                    💬 Comprar por WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProductModal;