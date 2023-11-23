import { presupuestoPrueba, rubros } from '../constants/constants';
import getEnvironment from '../utils/environment';
const SERVICES_CONFIG = getEnvironment();

export function getPresupuesto() {
  return Promise.resolve(presupuestoPrueba);
}

export function getRubros() {
  return rubros;
}

export async function getPresupuestoByIdProyecto(idProyecto) {
  const url = `${SERVICES_CONFIG}/subsidiosAsignados/getTotalSubsidios/${idProyecto}`;
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

export async function listadetodos() {
  const url = `${SERVICES_CONFIG}/rubros/getRubros`;
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
