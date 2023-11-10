import { presupuestoPrueba, rubros } from '../constants/constants';

const SERVICES_CONFIG = {
  baseUrl: 'http://localhost',
  port: ':3001',
  path: '/api/rubros',
};

export function getPresupuesto() {
  return Promise.resolve(presupuestoPrueba);
}

export function getRubros() {
  return rubros;
}
export async function getPresupuestoByIdProyecto(idProyecto) {
  //const endpoint = `${SERVICES_CONFIG.baseUrl}${SERVICES_CONFIG.port}${SERVICES_CONFIG.path}`;
  const url = `http://localhost:3001/api/subsidiosAsignados/getTotalSubsidios/${idProyecto}`;
  const response = await fetch(url, {
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

export async function listadetodos() {
  //const endpoint = `${SERVICES_CONFIG.baseUrl}${SERVICES_CONFIG.port}${SERVICES_CONFIG.path}`;
  const url = 'http://localhost:3001/api/rubros/getRubros';
  const response = await fetch(url, {
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
