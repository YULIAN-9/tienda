import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { User, Lock, PiggyBank, CreditCard } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const MemberAreaDialog = ({ isOpen, onOpenChange }) => {
  const handleFeatureClick = (featureName) => {
    toast({
      title: `¡${featureName} próximamente!`,
      description: "🚧 Esta función aún no está implementada—¡pero no te preocupes! ¡Puedes solicitarla en tu próximo mensaje! 🚀",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-gradient-to-br from-slate-800 to-blue-900 text-white border-white/20">
        <DialogHeader>
          <DialogTitle className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-500 text-3xl font-bold">
            Área de Socios
          </DialogTitle>
          <DialogDescription className="text-gray-300 text-lg mt-2">
            ¡Bienvenido a tu espacio exclusivo!
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <p className="text-gray-200 leading-relaxed">
            Aquí podrás gestionar tus ahorros, solicitar créditos, consultar tu estado de cuenta y acceder a beneficios exclusivos.
          </p>
          <div className="space-y-3 mt-4">
            <Button
              className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 rounded-md flex items-center justify-center space-x-2"
              onClick={() => handleFeatureClick("Inicio de Sesión")}
            >
              <User className="w-5 h-5" />
              <span>Iniciar Sesión</span>
            </Button>
            <Button
              className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-3 rounded-md flex items-center justify-center space-x-2"
              onClick={() => handleFeatureClick("Registro")}
            >
              <Lock className="w-5 h-5" />
              <span>Registrarse</span>
            </Button>
          </div>
          <div className="mt-6 border-t border-white/10 pt-4">
            <h4 className="text-lg font-semibold text-white mb-3">Próximamente podrás:</h4>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-center space-x-2">
                <PiggyBank className="w-4 h-4 text-cyan-400" />
                <span>Consultar tus ahorros</span>
              </li>
              <li className="flex items-center space-x-2">
                <CreditCard className="w-4 h-4 text-cyan-400" />
                <span>Gestionar tus créditos</span>
              </li>
              <li className="flex items-center space-x-2">
                <User className="w-4 h-4 text-cyan-400" />
                <span>Actualizar tu perfil</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex justify-end mt-4">
          <Button onClick={() => onOpenChange(false)} className="bg-gray-700 hover:bg-gray-600 text-white">
            Cerrar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MemberAreaDialog;