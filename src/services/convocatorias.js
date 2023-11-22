import getEnvironment from '../utils/environment';
const SERVICES_CONFIG = getEnvironment();

export async function getAllConvocatorias() {
  const url = `${SERVICES_CONFIG}/convocatorias`;
  const response = await fetch(url, {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    referrerPolicy: 'no-referrer',
  });
  return response.json();
}

export async function getConvocatoriaById(idConvocatoria) {
  const url = `${SERVICES_CONFIG}/convocatorias/${idConvocatoria}`;
  const response = await fetch(url, {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    referrerPolicy: 'no-referrer',
  });
  return response.json();
}
