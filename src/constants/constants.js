export const getDataFromBackend = false;

export const usuariosFijos = [
  {
    id: 1,
    nombre: 'Juana',
    apellido: 'Molina',
    fechaNacimiento: '1971-04-21',
    edad: 50,
  },
  {
    id: 2,
    nombre: 'China',
    apellido: 'Zorrilla',
    fechaNacimiento: '1929-04-09',
    edad: 92,
  },
  {
    id: 3,
    nombre: 'Nelly',
    apellido: 'Omar',
    fechaNacimiento: '1921-11-17',
    edad: 100,
  },
  {
    id: 4,
    nombre: 'Erica',
    apellido: 'Rivas',
    fechaNacimiento: '1979-10-29',
    avatarUrl:
      'https://static.wikia.nocookie.net/logopedia/images/c/c9/RIVERNORMAL.png',
    edad: 42,
  },
];

export const usuarioPrueba = {
  id: 1,
  nombre: 'Matias',
  apellido: 'Angeli',
  email: 'matiasangeli@gmail.com',
};

export const proyectoPrueba = {
  titulo:
    'Plataforma abierta de gestion de camaras IP y aplicaciones moviles para la seguridad civil ciudadana',
  tipo: 'Proyecto',
  organismo: 'UNAHUR',
  lineaFinanciamiento: 'Programas I+D UNAHUR',
  año: 2020,
  unidadAcademica: 'Instituto de Tecnología e Ingeniería',
  areaTematica: 'Seguridad informática',
  subsidio: 465000.0,
  fechaInicio: '18-09-2020',
  fechaFin: '18-09-2022',
  fechaInicioGastos: '18-12-2020',
  numeroProyecto: 7567,
  numeroExpediente: '1646-9895/20',
  numeroResolucion: 'Nro 31285/20',
  director: 'D amato, Juan Pablo',
  coDirector: 'Dominguez, Leonardo Daniel',
  integrantes: [
    'Perez, Alejandro Julian',
    'Rubiales, Aldo Jose',
    'Dominguez, Leonardo Daniel',
    'D amato, Juan Pablo',
  ],
  resumen: `La inseguridad es un problema que afecta en mayor o menor medida a todas las ciudades 
del mundo. Las ciudades más informatizadas hacen uso de la video-vigilancia para combatirla, montando 
en muchos de los casos centros de monitoreo con cientos de cámaras. En su mayoría, estos centros 
cuentan con grupos de personas para realizar la tarea de observación, sin embargo, este método no es 
suficiente y los organismos públicos deben lidiar un reclamo social por mayor transparencia y 
eficiencia en el accionar ante un delito. En este contexto, es que surge el presente proyecto, una 
plataforma de administración de cámaras y sensores, para apoyar a la gestión integral de la seguridad.
 Esta plataforma complementa técnicas de análisis automatizado de video, junto con una API para 
registrar eventos de tipo alarmas o alertas por parte de la ciudadanía y permitir el acceso a otras 
entidades (policía, bomberos, organizaciones vecinales) a ciertos recursos (los videos). Toda la 
información se centraliza en un sistema georreferenciado, en una arquitectura abierta y escalable, 
organizado en diferentes capas de información, con un sistema de organización de roles de accesos. 
Se presenta una discusión de la estructura ideada, de los algoritmos utilizados para el seguimiento, 
problemas propios que se suceden en este tipo de sistemas y los resultados preliminares obtenidos.`,
};

export const proyectosEnCurso = [
  {
    nombre:
      'Cifrado de secuencias de vídeo e imágenes mediante código OpenCL bajo demanda',
    director: 'Venere, Marcelo Javier',
    fechaInicio: '20-04-2019',
    porcentaje: 98,
  },
  {
    nombre:
      'Generación de mallas de elementos finitos para arterias coronarias a partir de imágenes Ivus',
    director: 'Jonas, Ignacio',
    fechaInicio: '25-11-2020',
    porcentaje: 52,
  },
  {
    nombre:
      'Un metodo eficiente para la sustraccion de fondo en videos usando gpu',
    director: 'Gervasoni, Luciano',
    fechaInicio: '17-12-2020',
    porcentaje: 32,
  },
  {
    nombre:
      'Plataforma de software de código abierto para aplicaciones de segmentación de imágenes médicas',
    director: "D'amato, Juan Pablo",
    fechaInicio: '15-12-2017',
    porcentaje: 47,
  },
];

export const proyectosEnHistoria = [
  {
    nombre:
      'Sistema de Realidad Virtual para el Entrenamiento de Operarios de Excavadoras Hidráulicas',
    director: 'Lazo, Marcos Gonzalo',
    fechaInicio: '16-05-2014',
    porcentaje: 100,
  },
  {
    nombre:
      'Gestión y optimización de escenas tridimensionales para simuladores de realidad virtual',
    director: "D'amato, Juan Pablo",
    fechaInicio: '25-12-2016',
    porcentaje: 100,
  },
  {
    nombre:
      'Aplicación de Viterbi sobre Modelos Ocultos de Markov para la Estimación de Tráfico Vehicular',
    director: 'Perez, Alejandro J.',
    fechaInicio: '14-12-2017',
    porcentaje: 100,
  },
  {
    nombre:
      'A GPU-Accelerated LPR Algorithm on Broad Vision Survillance Cameras',
    director: 'Dominguez, Leonardo Daniel',
    fechaInicio: '24-05-2018',
    porcentaje: 100,
  },
];

// tabla total de presupuesto actualizada
export const presupuestoPrueba = [
  {
    tipo: 'Total Presupuesto',
    fechaInicio: '18-09-2020',
    fechaFin: '18-09-2022',
    insumos: 100000,
    bibliografia: 50000,
    publicaciones: 9000,
    viaticos: 100000,
    equipamiento: 220000,
    tecnico: 100000,
    administracion: 6000,
    total: 585000,
  },
  {
    tipo: 'Reformulacion IR',
    fechaInicio: '18-10-2021',
    insumos: 0,
    bibliografia: 0,
    gastosDePublicacion: 0,
    viajesYViaticos: 20000,
    equipamiento: 0,
    serviciosTecnicos: -20000,
    gastosDeAdministracion: 0,
    total: 0,
  },
];

// tabla total de gastos
export const gastosPrueba = [
  {
    tipo: 'Gastos totales',
    fechaInicio: '18-09-2021',

    insumos: 500,
    bibliografia: 0,
    gastosDePublicacion: 0,
    viajesYViaticos: 32000,
    equipamiento: 180000,
    serviciosTecnicos: 20000,
    gastosDeAdministracion: 0,
    total: 232500,
  },
];

export const pagoAProv = {
  tipo: 'Pago a proveedores',
  fechaInicio: '18-09-2021',

  insumos: 500,
  bibliografia: 0,
  gastosDePublicacion: 0,
  viajesYViaticos: 0,
  equipamiento: 180000,
  serviciosTecnicos: 0,
  gastosDeAdministracion: 0,
  total: 180500,
};

export const rendEsp = {
  tipo: 'Rendiciones Especificas',
  fechaInicio: '18-09-2021',

  insumos: 0,
  bibliografia: 0,
  gastosDePublicacion: 0,
  viajesYViaticos: 32000,
  equipamiento: 0,
  serviciosTecnicos: 0,
  gastosDeAdministracion: 0,
  total: 32000,
};

export const contratos = {
  tipo: 'Contratos',
  fechaInicio: '18-09-2021',
  insumos: 0,
  bibliografia: 0,
  gastosDePublicacion: 0,
  viajesYViaticos: 0,
  equipamiento: 0,
  serviciosTecnicos: 20000,
  gastosDeAdministracion: 0,
  total: 20000,
};

export const proveedoresRegistrados = [
  {
    nombre: 'Libreria Mayorista S.A.',
    rubro: 'Insumos',
    telefono: '4308-6106',
    mail: 'casapaso3@gmail.com',
    cuit: '30-71489822-8',
  },
  {
    nombre: 'Despegar',
    rubro: 'Viajes Y Viaticos',
    telefono: '0810-810-9994',
    mail: 'subscription@alertas.despegar.com',
    cuit: '30-70130711-5',
  },
  {
    nombre: 'Garbarino',
    rubro: 'Equipamiento',
    telefono: '0810-888-7110',
    mail: 'atencion@garbarino.com',
    cuit: '30-54008821-3',
  },
  {
    nombre: 'Lenovo Argentina',
    rubro: 'Equipamiento',
    telefono: '(+5411) 4006-9149',
    mail: 'lenovo@ecomms.lenovo.com',
    cuit: '30-71473138-2',
  },
];

export const rubros = [
  'insumos',
  'bibliografia',
  'publicaciones',
  'viaticos',
  'equipamiento',
  'tecnico',
  'administracion',
];
