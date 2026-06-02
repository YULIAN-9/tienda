import React from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/useCart';
import CartItem from './CartItem';
import { ShoppingBag, X, Send } from 'lucide-react';

// ePayco — activar cuando se tengan las credenciales
// import { openEpaycoCheckout } from '@/lib/epaycoCheckout';

const WHATSAPP_NUMBER = '573136294045';

const formatPrice = (price) => {
  return `$${Number(price).toLocaleString('es-CO')}`;
};

const buildWhatsAppMessage = (cart, subtotal) => {
  const items = cart.map((item, i) =>
    `  ${i + 1}. ${item.name} x${item.quantity} — ${formatPrice(item.price * item.quantity)}`
  ).join('\n');

  return `🛒 *NUEVO PEDIDO — Nexus Friki*

*Productos:*
${items}

💰 *Total: ${formatPrice(subtotal)}*

Por favor confírmame disponibilidad, métodos de pago y tiempo de entrega. ¡Gracias!`;
};

const CartSheet = () => {
  const { cart, isCartOpen, toggleCart, clearCart } = useCart();
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleWhatsAppCheckout = () => {
    if (cart.length === 0) return;
    const message = buildWhatsAppMessage(cart, subtotal);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank');
  };

  // ═══════════════════════════════════════════════════════════════
  // ePayco — descomentar cuando se tengan las credenciales
  // ═══════════════════════════════════════════════════════════════
  // const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  //
  // const handleEpaycoCheckout = async () => {
  //   if (isProcessingPayment || cart.length === 0) return;
  //   setIsProcessingPayment(true);
  //   try {
  //     const response = await fetch('/api/payments/epayco/checkout', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({
  //         cart: cart.map((item) => ({
  //           id: item.id,
  //           quantity: item.quantity,
  //         })),
  //       }),
  //     });
  //     const data = await response.json();
  //     if (!response.ok) {
  //       throw new Error(data?.message || 'No fue posible iniciar el checkout.');
  //     }
  //     await openEpaycoCheckout({
  //       publicKey: data.publicKey,
  //       test: data.test,
  //       paymentData: data.paymentData,
  //       onClose: () => setIsProcessingPayment(false),
  //     });
  //   } catch (error) {
  //     setIsProcessingPayment(false);
  //     toast({
  //       title: '❌ Error iniciando el pago',
  //       description: error.message || 'Intenta nuevamente en unos segundos.',
  //     });
  //   }
  // };

  return (
    <Sheet open={isCartOpen} onOpenChange={toggleCart}>
      <SheetContent className="w-full sm:max-w-lg bg-slate-900 border-l border-white/10 text-white flex flex-col">
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
                onClick={handleWhatsAppCheckout}
                size="lg"
                className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold text-lg py-3 rounded-full shadow-lg hover:shadow-green-500/50 transition-all duration-300"
              >
                <Send className="w-5 h-5 mr-2" />
                Pedir por WhatsApp
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