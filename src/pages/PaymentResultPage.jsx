import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/useCart';

const statusMap = {
  '1': {
    label: 'Pago Aprobado',
    accent: 'text-emerald-400',
    message: 'Tu pago fue confirmado exitosamente.',
  },
  '2': {
    label: 'Pago Rechazado',
    accent: 'text-red-400',
    message: 'La transacción fue rechazada. Puedes intentarlo con otro método de pago.',
  },
  '3': {
    label: 'Pago Pendiente',
    accent: 'text-amber-400',
    message: 'Tu pago está pendiente de confirmación por la red.',
  },
  '4': {
    label: 'Pago Fallido',
    accent: 'text-red-400',
    message: 'No se pudo completar la transacción.',
  },
};

const formatPrice = (price) => `$${Number(price).toLocaleString('es-CO')}`;

const PaymentResultPage = () => {
  const { search } = useLocation();
  const { clearCart } = useCart();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [transaction, setTransaction] = useState(null);
  const hasClearedCartRef = useRef(false);

  const refPayco = useMemo(() => new URLSearchParams(search).get('ref_payco') || '', [search]);

  useEffect(() => {
    if (!refPayco) {
      setLoading(false);
      setError('No se recibió la referencia de pago.');
      return;
    }

    const controller = new AbortController();

    const fetchReference = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await fetch(`/api/payments/epayco/reference?ref_payco=${encodeURIComponent(refPayco)}`, {
          signal: controller.signal,
        });
        const data = await response.json();

        if (!response.ok || !data?.success || !data?.data) {
          throw new Error(data?.message || 'No se pudo validar la transacción con ePayco.');
        }

        setTransaction(data.data);
      } catch (fetchError) {
        if (fetchError.name !== 'AbortError') {
          setError(fetchError.message || 'Error consultando estado del pago.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchReference();

    return () => controller.abort();
  }, [refPayco]);

  useEffect(() => {
    if (!transaction || hasClearedCartRef.current) return;

    if (String(transaction.x_cod_response) === '1') {
      clearCart();
      hasClearedCartRef.current = true;
    }
  }, [transaction, clearCart]);

  const responseCode = String(transaction?.x_cod_response ?? '');
  const status = statusMap[responseCode] || {
    label: transaction?.x_response || 'Estado no disponible',
    accent: 'text-gray-300',
    message: 'No fue posible mapear el estado de la transacción.',
  };

  return (
    <>
      <Helmet>
        <title>Resultado de Pago - Nexus Friki</title>
      </Helmet>

      <section className="max-w-3xl mx-auto bg-slate-900/70 border border-white/10 rounded-2xl p-6 md:p-10">
        <h1 className="text-3xl md:text-4xl font-bold text-white text-center">Resultado de tu Pago</h1>
        <p className="mt-2 text-center text-gray-400">
          Verificamos el estado directamente con ePayco para darte una respuesta confiable.
        </p>

        {loading && (
          <div className="mt-8 text-center text-gray-300">
            <p>Consultando estado de la transacción...</p>
          </div>
        )}

        {!loading && error && (
          <div className="mt-8 bg-red-500/10 border border-red-500/30 text-red-300 rounded-xl p-4">
            <p className="font-semibold">No fue posible validar el pago</p>
            <p className="text-sm mt-1">{error}</p>
          </div>
        )}

        {!loading && !error && transaction && (
          <div className="mt-8 space-y-4">
            <div className="bg-slate-800 border border-white/10 rounded-xl p-5">
              <p className={`text-2xl font-bold ${status.accent}`}>{status.label}</p>
              <p className="text-gray-300 mt-2">{status.message}</p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 text-sm">
              <div className="bg-slate-800 border border-white/10 rounded-xl p-4">
                <p className="text-gray-400">Factura</p>
                <p className="text-white font-semibold">{transaction.x_id_invoice || '-'}</p>
              </div>
              <div className="bg-slate-800 border border-white/10 rounded-xl p-4">
                <p className="text-gray-400">Referencia ePayco</p>
                <p className="text-white font-semibold">{transaction.x_ref_payco || '-'}</p>
              </div>
              <div className="bg-slate-800 border border-white/10 rounded-xl p-4">
                <p className="text-gray-400">Valor</p>
                <p className="text-white font-semibold">{formatPrice(transaction.x_amount || 0)}</p>
              </div>
              <div className="bg-slate-800 border border-white/10 rounded-xl p-4">
                <p className="text-gray-400">Método</p>
                <p className="text-white font-semibold">{transaction.x_franchise || '-'}</p>
              </div>
            </div>
          </div>
        )}

        <div className="mt-8 flex flex-wrap gap-3 justify-center">
          <Button asChild className="bg-pink-500 hover:bg-pink-600 rounded-full">
            <Link to="/">Volver al Inicio</Link>
          </Button>
          <Button asChild variant="outline" className="border-white/20 text-white hover:bg-white/10 rounded-full">
            <Link to="/products">Seguir Comprando</Link>
          </Button>
        </div>
      </section>
    </>
  );
};

export default PaymentResultPage;
