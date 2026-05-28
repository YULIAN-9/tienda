export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Método no permitido.' });
  }

  const refPayco = typeof req.query.ref_payco === 'string' ? req.query.ref_payco.trim() : '';
  if (!refPayco) {
    return res.status(400).json({ message: 'El parámetro ref_payco es obligatorio.' });
  }

  try {
    const response = await fetch(`https://secure.epayco.co/validation/v1/reference/${encodeURIComponent(refPayco)}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    if (!response.ok) {
      return res.status(502).json({
        message: 'No fue posible consultar la referencia en ePayco.',
        status: response.status,
        data,
      });
    }

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({
      message: 'Error consultando referencia en ePayco.',
      error: error.message,
    });
  }
}
