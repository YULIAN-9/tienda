import crypto from 'node:crypto';

const statusByCode = {
  '1': 'Aceptada',
  '2': 'Rechazada',
  '3': 'Pendiente',
  '4': 'Fallida',
  '6': 'Reversada',
  '7': 'Retenida',
  '9': 'Expirada',
  '10': 'Abandonada',
  '11': 'Cancelada',
};

const asString = (value) => (typeof value === 'string' ? value.trim() : '');

const extractPayload = (req) => {
  if (req.method === 'GET') {
    return req.query || {};
  }

  if (!req.body) {
    return {};
  }

  if (typeof req.body === 'object' && !Buffer.isBuffer(req.body)) {
    return req.body;
  }

  const rawBody = Buffer.isBuffer(req.body) ? req.body.toString('utf8') : String(req.body);
  return Object.fromEntries(new URLSearchParams(rawBody).entries());
};

const buildSignature = ({ customerId, pKey, xRefPayco, transactionId, amount, currencyCode }) =>
  crypto
    .createHash('sha256')
    .update(`${customerId}^${pKey}^${xRefPayco}^${transactionId}^${amount}^${currencyCode}`)
    .digest('hex');

export default function handler(req, res) {
  if (!['GET', 'POST'].includes(req.method)) {
    return res.status(405).send('Method Not Allowed');
  }

  const customerId = process.env.EPAYCO_P_CUST_ID_CLIENTE;
  const pKey = process.env.EPAYCO_P_KEY;

  if (!customerId || !pKey) {
    return res.status(500).send('Missing EPAYCO_P_CUST_ID_CLIENTE or EPAYCO_P_KEY');
  }

  const payload = extractPayload(req);

  const xRefPayco = asString(payload.x_ref_payco);
  const xTransactionId = asString(payload.x_transaction_id);
  const xAmount = asString(payload.x_amount);
  const xCurrencyCode = asString(payload.x_currency_code);
  const xSignature = asString(payload.x_signature).toLowerCase();

  if (!xRefPayco || !xTransactionId || !xAmount || !xCurrencyCode || !xSignature) {
    return res.status(400).send('Missing required fields');
  }

  const computedSignature = buildSignature({
    customerId,
    pKey,
    xRefPayco,
    transactionId: xTransactionId,
    amount: xAmount,
    currencyCode: xCurrencyCode,
  }).toLowerCase();

  if (computedSignature !== xSignature) {
    return res.status(400).send('Invalid signature');
  }

  const responseCode = String(payload.x_cod_response ?? '');
  const normalizedStatus = statusByCode[responseCode] || asString(payload.x_response) || 'Desconocido';

  console.log(
    JSON.stringify({
      source: 'epayco-confirmation',
      invoice: payload.x_id_invoice,
      refPayco: xRefPayco,
      transactionId: xTransactionId,
      amount: xAmount,
      currency: xCurrencyCode,
      status: normalizedStatus,
      responseCode,
      extra1: payload.x_extra1,
      extra2: payload.x_extra2,
    })
  );

  return res.status(200).send('OK');
}
