import React from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/useCart';
import CartItem from './CartItem';
import { ShoppingBag, X } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const CartSheet = () => {
  const { cart, isCartOpen, toggleCart, clearCart } = useCart();
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    toast({
        title: "🚧 ¡Proceso de pago no implementado!",
        description: "Esta función aún no está lista, pero puedes solicitar la integración con Stripe en tu próximo mensaje. 🚀",
    });
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
                <span className="font-bold text-xl">${subtotal.toFixed(2)}</span>
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