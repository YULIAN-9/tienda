const EPAYCO_SCRIPT_SRC = 'https://checkout.epayco.co/checkout-v2.js';

let loadingPromise;

const hasEpaycoLoaded = () =>
  typeof window !== 'undefined' &&
  window.ePayco &&
  window.ePayco.checkout &&
  typeof window.ePayco.checkout.configure === 'function';

export const loadEpaycoScript = () => {
  if (hasEpaycoLoaded()) {
    return Promise.resolve(window.ePayco);
  }

  if (loadingPromise) {
    return loadingPromise;
  }

  loadingPromise = new Promise((resolve, reject) => {
    if (typeof window === 'undefined') {
      reject(new Error('ePayco solo puede cargarse en el navegador.'));
      return;
    }

    const existingScript = document.querySelector(`script[src="${EPAYCO_SCRIPT_SRC}"]`);
    if (existingScript) {
      existingScript.addEventListener('load', () => resolve(window.ePayco));
      existingScript.addEventListener('error', () => reject(new Error('No fue posible cargar checkout-v2.js de ePayco.')));
      return;
    }

    const script = document.createElement('script');
    script.src = EPAYCO_SCRIPT_SRC;
    script.async = true;
    script.onload = () => {
      if (hasEpaycoLoaded()) {
        resolve(window.ePayco);
      } else {
        reject(new Error('ePayco se cargó, pero no expuso la API esperada.'));
      }
    };
    script.onerror = () => reject(new Error('No fue posible cargar checkout-v2.js de ePayco.'));

    document.body.appendChild(script);
  });

  return loadingPromise;
};

export const openEpaycoCheckout = async ({ publicKey, test, paymentData, onClose }) => {
  if (!publicKey) {
    throw new Error('Falta la llave pública de ePayco.');
  }

  const ePayco = await loadEpaycoScript();
  const handler = ePayco.checkout.configure({
    key: publicKey,
    test,
  });

  if (typeof onClose === 'function') {
    handler.onCloseModal = onClose;
  }

  handler.open(paymentData);
};
