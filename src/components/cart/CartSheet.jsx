import React from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/useCart';
import CartItem from './CartItem';
import { ShoppingBag, X } from 'lucide-react';

// Función para formatear precios en formato colombiano
const formatPrice = (price) => {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price);
};

const CartSheet = () => {
  const { cart, isCartOpen, toggleCart, clearCart } = useCart();
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    const whatsappNumber = '3136294045';

    const productList = cart.map(item => 
      `• ${item.name} x${item.quantity} - ${formatPrice(item.price * item.quantity)}`
    ).join('\n');

    const message = encodeURIComponent(
      `Hola, quiero completar la compra de los siguientes productos:\n\n${productList}\n\nSubtotal: ${formatPrice(subtotal)}`
    );

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <Sheet open={isCartOpen} onOpenChange={toggleCart}>
      <SheetContent className="w-[400px] sm:w-[540px] bg-slate-900 border-l border-white/10 text-white flex flex-col">
        <SheetHeader className="p-6 border-b border-white/10">
          <SheetTitle className="text-2xl font-bold flex items-center gap-2">
            <ShoppingBag className="text-pink-400" />
            Tu Carrito de Compras
          </SheetTitle>
        </SheetHeader>
        <div className="flex-grow overflow-y-auto p-6 space-y-4">
          {cart.length === 0 ? (
            <div className="text-center text-gray-400 h-full flex flex-col justify-center items-center">
              <ShoppingBag className="w-16 h-16 mb-4 text-gray-600" />
              <p className="text-xl font-semibold">Tu carrito está vacío</p>
              <p>¡Añade algunos productos para empezar!</p>
            </div>
          ) : (
            cart.map(item => <CartItem key={item.id} item={item} />)
          )}
        </div>
        {cart.length > 0 && (
          <SheetFooter className="p-6 bg-slate-800/50 border-t border-white/10">
            <div className="w-full space-y-4">
              <div className="flex justify-between items-center text-lg">
                <span className="font-semibold">Subtotal:</span>
                <span className="font-bold text-xl">{formatPrice(subtotal)}</span>
              </div>
              <Button
                onClick={handleCheckout}
                size="lg"
                className="w-full bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white font-bold text-lg py-3 rounded-full shadow-lg hover:shadow-pink-500/50 transition-all duration-300"
              >
                Proceder al Pago
              </Button>
              <Button
                onClick={clearCart}
                variant="ghost"
                className="w-full text-gray-400 hover:bg-slate-700 hover:text-white"
              >
                <X className="w-4 h-4 mr-2" />
                Vaciar Carrito
              </Button>
            </div>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartSheet;