import getEnvironment from '../utils/environment';
const SERVICES_CONFIG = getEnvironment();

export async function getAllCompras() {
  const endpoint = `${SERVICES_CONFIG}/compras`;
  const response = await fetch(endpoint, {
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

export async function getComprasByProyecto(idProyecto) {
  const EXTRA_PATH = '/getComprasByProyecto/';
  const endpoint = `${SERVICES_CONFIG}/compras${EXTRA_PATH}${idProyecto}`;
  const response = await fetch(endpoint, {
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

export async function postCompra(body) {
  const endpoint = `${SERVICES_CONFIG}/compras`;
  const response = await fetch(endpoint, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  return response;
}

export async function getGastosPorRubro(rubro, idProyecto) {
  const EXTRA_PATH = '/gastos/findByRubro';
  const endpoint = `${SERVICES_CONFIG}/compras${EXTRA_PATH}?rubro=${rubro}&idProyecto=${idProyecto}`;
  const response = await fetch(endpoint, {
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

export async function getTotalxSubsidio(idSubsidio) {
  const EXTRA_PATH = '/getTotalxSubsidios/';
  const endpoint = `${SERVICES_CONFIG}/compras${EXTRA_PATH}${idSubsidio}`;
  const response = await fetch(endpoint, {
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

export async function getCompraByID(idCompra) {
  const EXTRA_PATH = '/getCompraById/';
  const endpoint = `${SERVICES_CONFIG}/compras${EXTRA_PATH}${idCompra}`;
  const response = await fetch(endpoint, {
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

export async function putCompra(id, body) {
  const endpoint = `${SERVICES_CONFIG}/compras/${id}`;
  const response = await fetch(endpoint, {
    method: 'PUT',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  return response;
}

export async function getAllGastosPorRubro(idProyecto) {
  const EXTRA_PATH = '/getCompraTotal/';
  const endpoint = `${SERVICES_CONFIG}/compras${EXTRA_PATH}${idProyecto}`;
  const response = await fetch(endpoint, {
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
