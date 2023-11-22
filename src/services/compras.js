import getEnvironment from '../utils/environment';

const SERVICES_CONFIG = getEnvironment();
console.log(SERVICES_CONFIG);
export async function getAllCompras() {
  const endpoint = `${SERVICES_CONFIG}/compras`;
  const response = await fetch(endpoint, {
    method: 'GET',
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
    },
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
  });
  return response.json();
}

export async function getComprasByProyecto(idProyecto) {
  const endpoint = `${SERVICES_CONFIG}/compras/getComprasByProyecto/${idProyecto}`;
  const response = await fetch(endpoint, {
    //method: 'POST',
    method: 'GET',
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
    },
    //body: JSON.stringify({ idProyecto: idProyecto }),
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
  });
  return response.json();
}

export async function postCompra(body) {
  const endpoint = `${SERVICES_CONFIG}/compras`;
  const response = await fetch(endpoint, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
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
    method: 'GET', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
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
    method: 'GET', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
    },
    referrerPolicy: 'no-referrer',
  });
  return response.json();
}

export async function getCompraByID(idCompra) {
  const EXTRA_PATH = '/getCompraById';
  const endpoint = `${SERVICES_CONFIG}/compras${EXTRA_PATH}/${idCompra}`;
  const response = await fetch(endpoint, {
    method: 'GET', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
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
    method: 'PUT', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  return response;
}

export async function getAllGastosPorRubro(idProyecto) {
  const EXTRA_PATH = '/getCompraTotal';
  const endpoint = `${SERVICES_CONFIG}/compras${EXTRA_PATH}/${idProyecto}`;
  const response = await fetch(endpoint, {
    method: 'GET', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
    },
    referrerPolicy: 'no-referrer',
  });
  return response.json();
}
