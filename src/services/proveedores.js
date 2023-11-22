import getEnvironment from '../utils/environment';
const SERVICES_CONFIG = getEnvironment();

export async function getAllProveedores() {
  const url = `${SERVICES_CONFIG}/proveedores`;
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

export async function postProveedor(body) {
  const url = `${SERVICES_CONFIG}/proveedores`;
  const response = await fetch(url, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
    referrerPolicy: 'no-referrer',
  });
  return response;
}

export async function getProveedorById(idProyecto) {
  const url = `${SERVICES_CONFIG}/proveedores/${idProyecto}`;
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
