import { getProductById } from '../../../src/data/products.js';

const isTruthy = (value) => ['1', 'true', 'yes', 'on'].includes(String(value).toLowerCase());

const clampQuantity = (value) => {
  const parsed = Number.parseInt(value, 10);
  if (!Number.isFinite(parsed) || parsed <= 0) return 0;
  return Math.min(parsed, 20);
};

const getRequestOrigin = (req) => {
  const configuredBaseUrl = process.env.PUBLIC_BASE_URL;
  if (configuredBaseUrl) {
    return configuredBaseUrl.replace(/\/$/, '');
  }

  const forwardedHost = req.headers['x-forwarded-host'];
  const host = (Array.isArray(forwardedHost) ? forwardedHost[0] : forwardedHost) || req.headers.host;
  if (!host) return '';

  const forwardedProto = req.headers['x-forwarded-proto'];
  const protocol =
    (Array.isArray(forwardedProto) ? forwardedProto[0] : forwardedProto) ||
    (host.includes('localhost') ? 'http' : 'https');

  return `${protocol}://${host}`;
};

const buildInvoice = () => `NEXUS-${Date.now()}-${Math.floor(Math.random() * 10000)}`;

const buildDescription = (items) => {
  const names = items.slice(0, 3).map(({ product }) => product.name);
  const suffix = items.length > 3 ? ` +${items.length - 3} más` : '';
  return `Compra NexusFriki: ${names.join(', ')}${suffix}`;
};

const buildExtra2 = (items) =>
  items
    .map(({ product, quantity }) => `${product.id}:${quantity}`)
    .join('|')
    .slice(0, 250);

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método no permitido.' });
  }

  const publicKey = process.env.EPAYCO_PUBLIC_KEY;
  if (!publicKey) {
    return res.status(500).json({ message: 'Falta configurar EPAYCO_PUBLIC_KEY.' });
  }

  const cart = Array.isArray(req.body?.cart) ? req.body.cart : [];
  if (cart.length === 0) {
    return res.status(400).json({ message: 'El carrito está vacío.' });
  }

  const normalizedItems = cart
    .map((item) => {
      const product = getProductById(item?.id);
      const quantity = clampQuantity(item?.quantity);
      if (!product || quantity === 0) return null;
      return { product, quantity };
    })
    .filter(Boolean);

  if (normalizedItems.length === 0) {
    return res.status(400).json({ message: 'No hay productos válidos para procesar.' });
  }

  const amount = normalizedItems.reduce((sum, { product, quantity }) => sum + Number(product.price) * quantity, 0);
  if (!Number.isFinite(amount) || amount <= 0) {
    return res.status(400).json({ message: 'No se pudo calcular el total de la orden.' });
  }

  const origin = getRequestOrigin(req);
  if (!origin) {
    return res.status(500).json({ message: 'No fue posible determinar la URL base de la tienda.' });
  }

  const invoice = buildInvoice();
  const testMode = isTruthy(process.env.EPAYCO_TEST_MODE ?? 'true');

  return res.status(200).json({
    publicKey,
    test: testMode,
    paymentData: {
      invoice,
      name: process.env.EPAYCO_CHECKOUT_NAME || 'Compra en NexusFriki Store',
      description: buildDescription(normalizedItems),
      currency: 'cop',
      amount,
      tax_base: '0',
      tax: '0',
      country: 'co',
      lang: 'es',
      external: 'true',
      method: 'POST',
      response: `${origin}/payment-result`,
      confirmation: `${origin}/api/payments/epayco/confirmation`,
      extra1: invoice,
      extra2: buildExtra2(normalizedItems),
    },
  });
}
