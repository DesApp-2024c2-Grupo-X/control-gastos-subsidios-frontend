import getEnvironment from '../utils/environment';
const SERVICES_CONFIG = getEnvironment();
//console.log('Url back', SERVICES_CONFIG);
export async function getUsuarios() {
  const url = `${SERVICES_CONFIG}/usuarios`;
  const response = await fetch(url, {
    method: 'GET', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // *no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
    },
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

export async function uploadFile(file, id) {
  const formData = new FormData();
  formData.append('pdf', file);

  fetch(`${SERVICES_CONFIG}/usuarios/upload/${id}`, {
    method: 'POST',
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      console.log('Archivo subido con éxito');
    })
    .catch((error) => {
      console.error('Error al subir el archivo:');
    });
}
export async function downloadFile2(id, funcion) {
  fetch(`${SERVICES_CONFIG}/usuarios/download/${id}`, {
    method: 'GET',
    // Aquí puedes agregar encabezados u otros datos necesarios para tu API
  })
    .then(
      (response) => (response.status == 200 ? funcion(true) : funcion(false)),
      console.log('ENTRE')
    )
    .catch((error) => {
      console.error('Error al descargar el PDF:', error);
    });
}

export async function downloadFile(id) {
  fetch(`${SERVICES_CONFIG}/usuarios/download/${id}`, {
    method: 'GET',
    // Aquí puedes agregar encabezados u otros datos necesarios para tu API
  })
    .then((response) => response.blob()) // Convertir la respuesta a un blob
    .then((blob) => {
      // Crear un objeto URL para el blob
      const url = window.URL.createObjectURL(blob);
      // Crear un elemento <a> para descargar el PDF
      const a = document.createElement('a');
      a.href = url;
      a.download = `factura${id}.pdf`; // Nombre del archivo a descargar
      // Simular clic en el enlace para iniciar la descarga
      a.click();
      // Liberar recursos
      window.URL.revokeObjectURL(url);
    })
    .catch((error) => {
      console.error('Error al descargar el PDF:', error);
    });
}

export async function getUser(user) {
  const url = `${SERVICES_CONFIG}/usuarios/searchUser/${user}`;
  const response = await fetch(url, {
    method: 'GET', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // *no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
    },
    //referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

export async function createUser(user) {
  const url = `${SERVICES_CONFIG}/usuarios/newUser`;
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // *no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
    //referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

export async function setUserActualProject(usuario, projectId) {
  const url = `${SERVICES_CONFIG}/usuarios/setUserProject`;
  const response = await fetch(url, {
    method: 'PUT', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // *no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      nombreUsuario: usuario,
      proyectoId: projectId,
    }), //referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
  });
  return response.json(); // parses JSON response into native JavaScript objects
}
