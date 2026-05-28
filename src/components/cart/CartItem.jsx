import React from 'react';
import { useCart } from '@/hooks/useCart';
import { Button } from '@/components/ui/button';
import { X, Plus, Minus } from 'lucide-react';

// Función para formatear precios en formato colombiano
const formatPrice = (price) => {
  return `$${Number(price).toLocaleString('es-CO')}`;
};

const CartItem = ({ item }) => {
  const { removeFromCart, updateQuantity } = useCart();

  return (
    <div className="grid grid-cols-[80px_minmax(0,1fr)_auto] items-center gap-3 bg-slate-800 p-4 rounded-lg border border-white/10">
      <img src={item.imageUrl} alt={item.name} className="w-20 h-20 object-cover rounded-md flex-shrink-0" />
      <div className="min-w-0">
        <h4 className="font-bold text-white truncate">{item.name}</h4>
        <p className="text-sm text-gray-400">{formatPrice(item.price)}</p>
        <div className="flex items-center gap-2 mt-2 flex-wrap">
            <Button size="icon" variant="outline" className="h-6 w-6 bg-slate-700 border-slate-600" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                <Minus className="h-4 w-4" />
            </Button>
            <span>{item.quantity}</span>
            <Button size="icon" variant="outline" className="h-6 w-6 bg-slate-700 border-slate-600" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                <Plus className="h-4 w-4" />
            </Button>
        </div>
      </div>
      <div className="flex flex-col items-end gap-2 flex-shrink-0">
        <p className="font-bold text-base sm:text-lg text-white text-right leading-tight whitespace-nowrap">{formatPrice(item.price * item.quantity)}</p>
        <Button size="icon" variant="ghost" className="text-gray-400 hover:text-red-500 hover:bg-red-500/10 h-8 w-8" onClick={() => removeFromCart(item.id)}>
          <X className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
};

export default CartItem;