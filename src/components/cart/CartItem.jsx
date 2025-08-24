import React from 'react';
import { useCart } from '@/hooks/useCart';
import { Button } from '@/components/ui/button';
import { X, Plus, Minus } from 'lucide-react';

const CartItem = ({ item }) => {
  const { removeFromCart, updateQuantity } = useCart();

  return (
    <div className="flex items-center gap-4 bg-slate-800 p-4 rounded-lg border border-white/10">
      <img src={item.imageUrl} alt={item.name} className="w-20 h-20 object-cover rounded-md" />
      <div className="flex-grow">
        <h4 className="font-bold text-white">{item.name}</h4>
        <p className="text-sm text-gray-400">${item.price.toFixed(2)}</p>
        <div className="flex items-center gap-2 mt-2">
            <Button size="icon" variant="outline" className="h-6 w-6 bg-slate-700 border-slate-600" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                <Minus className="h-4 w-4" />
            </Button>
            <span>{item.quantity}</span>
            <Button size="icon" variant="outline" className="h-6 w-6 bg-slate-700 border-slate-600" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                <Plus className="h-4 w-4" />
            </Button>
        </div>
      </div>
      <div className="flex flex-col items-end gap-2">
        <p className="font-bold text-lg text-white">${(item.price * item.quantity).toFixed(2)}</p>
        <Button size="icon" variant="ghost" className="text-gray-400 hover:text-red-500 hover:bg-red-500/10 h-8 w-8" onClick={() => removeFromCart(item.id)}>
          <X className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
};

export default CartItem;