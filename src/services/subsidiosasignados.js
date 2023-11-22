import getEnvironment from '../utils/environment';
const SERVICES_CONFIG = getEnvironment();

export async function getTotalSubsidio(idProyecto) {
  const url = `${SERVICES_CONFIG}/subsidiosAsignados/getTotalSubsidios/${idProyecto}`;
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

export async function getSubsidios(idProyecto) {
  const url = `${SERVICES_CONFIG}/subsidiosAsignados/getSubsidios/${idProyecto}`;
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

export async function getSubsidioXProyectoXRubro(idProyecto, idRubro) {
  const EXTRA_PATH = '/subsidiosAsignados/xproyectoxrubro/';
  const endpoint = `${SERVICES_CONFIG}${EXTRA_PATH}${idProyecto}/${idRubro}`;
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
