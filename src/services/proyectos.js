import { presupuestoPrueba } from '../constants/constants';
import getEnvironment from '../utils/environment';
const SERVICES_CONFIG = getEnvironment();

export async function getProyectsForAdmin() {
  const url = `${SERVICES_CONFIG}/proyectos/findAllConCompra`;
  const response = await fetch(url, {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    json: true,
    referrerPolicy: 'no-referrer',
  });
  return response.json();
}

export async function getProyecto(username) {
  const url = `${SERVICES_CONFIG}/proyectos/${username}`;
  const response = await fetch(url, {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    json: true,
    referrerPolicy: 'no-referrer',
  });
  return response.json();
}

export async function getUserByProyect(idProyecto) {
  const url = `${SERVICES_CONFIG}/usuariosproyectos/getUsuariosIdProyecto/${idProyecto}`;
  const response = await fetch(url, {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    json: true,
    referrerPolicy: 'no-referrer',
  });
  return response.json();
}

export async function getProyectoById(idProyecto) {
  const url = `${SERVICES_CONFIG}/proyectos/findById/${idProyecto}`;
  const response = await fetch(url, {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    json: true,
    referrerPolicy: 'no-referrer',
  });
  return response.json();
}
export function getPresupuesto() {
  return Promise.resolve(presupuestoPrueba);
}

export async function createProyecto(body) {
  const url = `${SERVICES_CONFIG}/proyectos/create`;
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
  return response.json();
}
