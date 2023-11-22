import getEnvironment from '../utils/environment';
const SERVICES_CONFIG = getEnvironment();

export async function getAllRubros() {
  const url = `${SERVICES_CONFIG}/rubros/getAllRubros`;
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
