/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import {
  makeStyles,
  TextField,
  Button,
  Divider,
  Typography,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Tooltip,
  styled,
} from '@material-ui/core';
import { postCompra, getAllGastosPorRubro } from '../services/compras.js';

import {
  getPresupuesto,
  getRubros,
  listadetodos,
} from '../services/presupuestos.js';
import { validateField, validateMonto } from '../utils/validaciones';
import Autocomplete from '@material-ui/lab/Autocomplete';
// import { GetApp, KeyboardArrowDown } from '@material-ui/icons';
import AddIcon from '@material-ui/icons/Add';
import { postProveedor, getAllProveedores } from '../services/proveedores.js';

// funciones GET de subsidiosAsignados
import { getSubsidioXProyectoXRubro } from '../services/subsidiosasignados.js';

import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import esLocale from 'date-fns/locale/es';
import { DatePicker } from '@material-ui/pickers';
import { uploadFile } from '../services/usuarios.js';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';


const useStyles = makeStyles((theme) => ({
  modal: {
    position: 'absolute',
    backgroundColor: 'white',
    width: '50vw',
    height: '80%',
    boxShadow: '0px 0px 5px 1px grey',
    padding: theme.spacing(2, 4, 3),
    top: '55%',
    left: '55%',
    transform: 'translate(-50%,-50%)',
    overflow: 'scroll',
  },
  inputs: {
    width: '100%',
    paddingBottom: '1rem',
    display: 'flex',
  },
  item: {
    paddingLeft: '1rem',
  },
  button: {
    display: 'flex',
    justifyContent: 'right',
    marginTop: '6.5rem',
  },
  secondRow: {
    display: 'grid',
    width: '30%',
  },
  cargarFactura: {
    display: 'flex',
    marginTop: '1rem',
  },
  descripcion: {
    display: 'grid',
    marginTop: '1.5rem',
  },
  multiLineInput: {
    backgroundColor: '#EAEDED',
    borderRadius: '5px',
    width: '90%',
  },
  proveedor: {
    marginTop: '1.5rem',
    display: 'flex',
  },
  uploadIcon: {
    //marginBlock: 'auto',
    //margin: '1rem',
    marginTop: '1.7rem',
    marginLeft: '0.5rem',
    '&:hover': {
      color: '#62B5F6',
    },
  },
  addIcon: {
    //marginBlock: 'auto',
    //margin: '1rem',
    marginTop: '1.5rem',
    marginLeft: '0.5rem',
    '&:hover': {
      color: '#62B5F6',
    },
  },
  buttonList: {
    display: 'block',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    marginLeft: 0,
  },
  subrubro: {
    marginTop: '1.25rem',
  },
  divider: {
    //width: '40rem',
    marginLeft: '0rem',
    marginBottom: '1.5rem',
  },
  proveedorForm: {
    display: 'flex',
    flexDirection: 'column',
    width: '15rem',
    marginTop: '2rem',
  },
  buttonNewProveedor: {
    marginTop: '1rem',
    '&:hover': {
      backgroundColor: '#ffffff',
      color: 'green',
    },
  },
  label: {
    fontSize: '16px',
    fontWeight: 'bold',
  },
  inputForm: {
    marginBottom: '2rem',
  },
}));

export default function PopUpCompras({ state, stateNewCompra, idProyecto }) {
  const $ = useStyles();

  const [rubro, setRubro] = useState('');

  const [subrubro, setSubrubro] = useState(null);
  const [proveedorRazon, setProveedorRazon] = useState(""); 
  const [fecha, setFecha] = useState(null);
  const [idproveedor, setProveedor] = useState('');
  const [monto, setMonto] = useState(0);
  const [cae, setCae] = useState();
  const [nombre, setNombre] = useState('');
  const [nroFactura, setNroFactura] = useState(null);

  const [disponibleRubro, setDisponibleRubro] = useState(0);

  const [newProveedor, setNewProveedor] = useState(null);
  const [proveedores, setProveedores] = useState([]);
  //Errors in fields
  const [errorMonto, setErrorMonto] = useState(false);
  const [errorSubrubro, setErrorSubrubro] = useState(false);
  const [errorNombreNewProveedor, setErrorNombreNewProveedor] = useState(null);
  const [errorCuitNewProveedor, setErrorCuitNewProveedor] = useState(null);
  const [errorTelefonoNewProveedor, setErrorTelefonoNewProveedor] = useState(
    null
  );

  //New proveedor fields
  
  const [newProveedorNombre, setNewProveedorNombre] = useState(null);
  const [newProveedorCuit, setNewProveedorCuit] = useState(null);
  const [newProveedorTelefono, setNewProveedorTelefono] = useState(null);

  const [newProveedorEmail, setNewProveedorEmail] = useState(null);
  const [errorEmailNewProveedor, setErrorEmailNewProveedor] = useState(null);
  //Validate form to send
  const availableMoneyForRubro = disponibleRubro > 0;
  //const availableMoneyForRubro = true;

  //subsidio: es el subsidioasignado que sale del Proyecto en el cual se esta
  //actualmente (idProyecto) y el rubro, que se selecciono (idRubro).
  const [subsidio, setSubsidio] = useState(null);

  const [archivoSubido, setArchivoSubido] = useState(false);

  const canSubmit =
    rubro &&
    nroFactura &&
    cae &&
    monto &&
    fecha &&
    idproveedor &&
    availableMoneyForRubro &&
    nombre &&
    !errorMonto;
  const canAddProveedor = newProveedorNombre && newProveedorCuit && newProveedorTelefono;

    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
      setFile(e.target.files[0]);
      setArchivoSubido(true);
    };

  //Consts
  //const rubros = getRubros();
  //Rubros fetch
  const [rubros, setRubros] = useState([]);
  useEffect(() => {
    async function fetchRubros() {
      try {
        const rubros = await listadetodos();
        //const rubrosJson = await rubros;
        setRubros(rubros);
      } catch (error) {
        console.log('error en el fetch de Rubros : ' + error);
      }
    }
    fetchRubros();
  }, []);

  useEffect(() => {
    async function getProveedores() {
      const provedoresResponse = await getAllProveedores();

      setProveedores(
        provedoresResponse.data.sort(function (a, b) {
          var nombA = a.nombre;
          var nombB = b.nombre;
          return nombA < nombB ? -1 : nombA > nombB ? 1 : 0;
        })
      );
    }
    getProveedores();
    //const id = sessionStorage.getItem('idProyecto');
    //setIdProyecto(id);
  }, [newProveedor]);

  //UseEffect when changing "rubros"
  useEffect(() => {
    async function fetchGastos() {
      //consulta con la API de subsidios, mediante el idProyecto (hardcoderado con 1)
      // y el id del rubro seleccionado, y devuelve el subsidioAsignado.
      const subsidioAsignado = await getSubsidioXProyectoXRubro(
        idProyecto,
        rubro
      );
      
      const totalComprasSubsidio = await getAllGastosPorRubro(idProyecto);
      const totalFilter2 = totalComprasSubsidio.find(
        (a) => a.rubro == subsidioAsignado.Rubro.nombre
      );
      const totalGastos = totalFilter2 ? totalFilter2.gastosAprobados : 0;
      
      
      const dineroDisponible = calcularDineroDisponiblePorRubro(
        subsidioAsignado.montoAsignado,
        totalGastos,
        JSON.stringify(subsidioAsignado.Rubro.nombre)
      );
      setSubsidio(subsidioAsignado);
      setDisponibleRubro(dineroDisponible);
    }
    try {
      fetchGastos();
    } catch (err) {
      console.log('[PopUpCompras Component] ERROR: ' + err.message);
    }
  }, [rubro]);

  const calcularDineroDisponiblePorRubro = (
    presupuestoTotal,
    gastosRubro,
    nombreRubro
  ) => {
    return nombreRubro ? parseInt(presupuestoTotal) - parseInt(gastosRubro) : 0;
  };

  //POST DATA TO BACKEND
  const submitForm = async () => {
    state(false);
    const data = {
      proyecto: idProyecto,
      fecha: fecha,
      monto: monto,
      estado: 'Pendiente',
      factura: nroFactura,
      nombre: nombre,
      subrubro: subrubro,
      idsubsidio: subsidio.id,
      idproveedor: idproveedor,
      cae: cae,
      proveedornota: proveedorRazon
    };
    const res = await postCompra(data);
    uploadFile(file, res.id);
    stateNewCompra(true);
    console.log('[PopUpCompras] submitForm response: ', res);
  };

  const sendDataNewProveedor = async () => {
    const data = {
      nombre: newProveedorNombre,
      telefono: newProveedorTelefono,
      cuit: newProveedorCuit,
      mail: newProveedorEmail,
    };
    const responseBack = await postProveedor(data);
    console.log(
      `[PopUpCompras Component] create proveedor response ${responseBack}`
    );
    handleAddProveedor();
  };

  //HANDLERS
  const submitHandle = (handle, value) => {
    handle(value);
  };

  const handleClose = () => {
    state(false);
  };

  //New proveedor handlers
  const handleAddProveedor = () => {
    setNewProveedor(!newProveedor);
  };
  const handleNewProveedor = (value, setState) => {
    setState(value);
  };

  // handlers rubros
  const RubroSelected = () => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleChange = (event) => {
      setRubro(event.target.value);
    };

    const handleClose = () => {
      setOpen(false);
    };

    const handleOpen = () => {
      setOpen(true);
    };

    return (
      <div>
        <Button className={classes.buttonList} onClick={handleOpen} />
        <FormControl
          className={classes.formControl}
          error={!availableMoneyForRubro}
        >
          <InputLabel id="demo-controlled-open-select-label">Rubro</InputLabel>

          <Select
            labelId="demo-controlled-open-select-label"
            id="demo-controlled-open-select"
            open={open}
            onClose={handleClose}
            onOpen={handleOpen}
            value={rubro}
            onChange={(e) => handleChange(e)}
          >
            {rubros.map((elementoRubro, idx) => (
              <MenuItem value={elementoRubro.id} key={idx}>
                {elementoRubro.nombre}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    );
  };

  

  return (
    <>
      <div className={$.modal}>
        <h2>Ingreso para pedido de compras</h2>
        <Divider class={$.divider} />
        <div className={$.inputs}>
          <RubroSelected />
          <TextField
            label="Subrubro"
            onBlur={(e) =>
              validateField('string', e.target.value, setErrorSubrubro)
            }
            onChange={(e) => submitHandle(setSubrubro, e.target.value)}
            className={$.subrubro}
            error={errorSubrubro}
          />
        </div>
        <Typography>
          {availableMoneyForRubro
            ? `Cuentas con $${disponibleRubro} para este rubro`
            : `No cuentas con dinero disponible para este rubro`}
        </Typography>
        <br />
        <Divider />

        <br />
        <Typography variant="h6">Datos de la compra</Typography>
        <br />
        <div className={$.secondRow}>
          <MuiPickersUtilsProvider utils={DateFnsUtils} locale={esLocale}>
            <DatePicker
              variant="outlined"
              id="date-picker-dialog"
              label="Fecha"
              format="dd/MM/yyyy"
              value={fecha}
              onChange={(e) => submitHandle(setFecha, e)}
              inputVariant="outlined"
              KeyboardButtonProps={{
                'aria-label': 'cambiar fecha',
              }}
            />
          </MuiPickersUtilsProvider>
          <div className={$.cargarFactura}>
            <TextField
              variant="outlined"
              inputVariant="outlined"
              label="Monto factura"
              style={{ width: 300 }}
              onChange={(e) => submitHandle(setMonto, e.target.value)}
              onBlur={(e) =>
                validateMonto(disponibleRubro, e.target.value, setErrorMonto)
              }
              error={errorMonto}
            />
            {/* <GetApp className={$.uploadIcon} /> */}
          </div>
          <div className={$.cargarFactura}>
            <TextField
              label="Nro. Factura"
              style={{ width: 300 }}
              variant="outlined"
              inputVariant="outlined"
              onChange={(e) => submitHandle(setNroFactura, e.target.value)}
              error={''}
            />
          </div>
          <div className={$.cargarFactura}>
            <TextField
              label="Nro. CAE"
              style={{ width: 300 }}
              variant="outlined"
              inputVariant="outlined"
              onChange={(e) => submitHandle(setCae, e.target.value)}
              error={''}
            />
          </div>
        </div>
        <div className={$.proveedor}>
          <Autocomplete
            id="proveedores"
            options={proveedores}
            getOptionLabel={(option) => option.nombre}
            style={{ width: 300 }}
            renderInput={(params) => (
              <TextField
                variant="outlined"
                inputVariant="outlined"
                {...params}
                label="Proveedores"
              />
            )}
            onChange={(e, value) => submitHandle(setProveedor, value?.id)} // idproveedor para la compra
          />
          <Tooltip title="Agregar proveedor">
            <AddIcon className={$.addIcon} onClick={handleAddProveedor} />
          </Tooltip>
          
        </div>
        <div className={$.proveedor}>
          {idproveedor !== "" && !!idproveedor && (
            <TextField
              variant="outlined"
              inputVariant="outlined"
              label="¿Por qué se eligió este proveedor?"
              style={{ width: 300 }}
              onChange={(e) => submitHandle(setProveedorRazon, e.target.value)}
            />
          )}
        </div>
        {/* Form para cargar nuevo proveedor */}
        {newProveedor && (
          <div className={$.proveedorForm}>
            <TextField
              className={$.inputForm}
              label="Nombre: Empresa S.A."
              style={{ width: 300 }}
              onChange={(e) =>
                handleNewProveedor(e.target.value, setNewProveedorNombre)
              }
              onBlur={(e) =>
                validateField(
                  'string',
                  e.target.value,
                  setErrorNombreNewProveedor
                )
              }
              error={errorNombreNewProveedor}
            />

            <TextField
              className={$.inputForm}
              label="Telefono: 1112345678"
              style={{ width: 300 }}
              onChange={(e) =>
                handleNewProveedor(e.target.value, setNewProveedorTelefono)
              }
              onBlur={(e) =>
                validateField(
                  'int',
                  e.target.value,
                  setErrorTelefonoNewProveedor
                )
              }
              error={errorTelefonoNewProveedor}
            />

            <TextField
              className={$.inputForm}
              label="CUIT: 12-12345678-1"
              style={{ width: 300 }}
              onChange={(e) =>
                handleNewProveedor(e.target.value, setNewProveedorCuit)
              }
              onBlur={(e) =>
                validateField('cuit', e.target.value, setErrorCuitNewProveedor)
              }
              error={errorCuitNewProveedor}
            />

            <TextField
              className={$.inputForm}
              label="E-mail: mail@empresa.com.ar"
              style={{ width: 300 }}
              onChange={(e) =>
                handleNewProveedor(e.target.value, setNewProveedorEmail)
              }
              onBlur={(e) =>
                validateField(
                  'email',
                  e.target.value,
                  setErrorEmailNewProveedor
                )
              }
              error={errorEmailNewProveedor}
            />

            <Button onClick={sendDataNewProveedor} disabled={!canAddProveedor}>
              Agregar proveedor
            </Button>
          </div>
        )}
        <div className={$.cargarFactura}>
          <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
              Adjuntar factura
              <input type="file" onChange={handleFileChange} hidden/>
          </Button>
          {archivoSubido 
            ? <Typography variant="h8"  style={{ margin: 10, color: 'green' }}>Archivo cargado exitosamente</Typography>
            : null
          }
        </div>

        <br />
        <br />
        <Divider />

        <div className={$.descripcion}>
          <Typography variant="h6">Descripción</Typography>
          <br />
          <TextField
            label="Enumeracion de items / servicios, comprados"
            multiline
            rows={6}
            className={$.multiLineInput}
            onChange={(e) => submitHandle(setNombre, e.target.value)}
            error={''}
          />
        </div>

        <div className={$.button}>
          <Button color="primary" className={$.botones} onClick={handleClose}>
            Cancelar
          </Button>
          <Button color="primary" disabled={!canSubmit} onClick={submitForm}>
            Finalizar Pedido de Compra
          </Button>
        </div>
      </div>
    </>
  );
}
