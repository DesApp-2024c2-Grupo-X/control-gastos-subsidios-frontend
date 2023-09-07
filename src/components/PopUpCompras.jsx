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
} from '@material-ui/core';
import { postCompra, getGastosPorRubro } from '../services/compras.js';
import { getPresupuesto, getRubros } from '../services/presupuestos.js';
import { validateField, validateMonto } from '../utils/validaciones';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { GetApp, KeyboardArrowDown } from '@material-ui/icons';
import { postProveedor,getAllProveedores } from '../services/proveedores.js';

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
    backgroundColor: '#fafafa',
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
  buttonList: {
    display: 'block',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
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

export default function PopUpCompras({
  state,
  idProyecto,
  stateNewCompra,
}) {
  const $ = useStyles();

  const [rubro, setRubro] = useState('');
  const [subrubro, setSubrubro] = useState(null);
  const [fecha, setFecha] = useState(null);
  const [proveedor, setProveedor] = useState('');
  const [monto, setMonto] = useState(0);
  const [nombre, setNombre] = useState('');
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
  const [newProveedorRubro, setNewProveedorRubro] = useState(null);
  const [newProveedorNombre, setNewProveedorNombre] = useState(null);
  const [newProveedorCuit, setNewProveedorCuit] = useState(null);
  const [newProveedorTelefono, setNewProveedorTelefono] = useState(null);

  const [newProveedorEmail, setNewProveedorEmail] = useState(null);
  const [errorEmailNewProveedor, setErrorEmailNewProveedor] = useState(null);
  //Validate form to send
  const availableMoneyForRubro = disponibleRubro > 0;
  const canSubmit =
    rubro &&
    subrubro &&
    monto &&
    fecha &&
    proveedor &&
    availableMoneyForRubro &&
    !errorMonto;
  const canAddProveedor =
    newProveedorRubro &&
    newProveedorNombre &&
    newProveedorCuit &&
    newProveedorTelefono;

  //Consts
  const rubros = getRubros();

  useEffect(() => {
    async function getProveedores(){
      const provedoresResponse = await getAllProveedores();
      
      setProveedores(provedoresResponse.data);
    }
    getProveedores();
  }, []);
  
  //UseEffect when changing "rubros"
  useEffect(() => {
    async function fetchGastos() {
      const gastos = await getGastosPorRubro(rubro, idProyecto);
      const presupuesto = await getPresupuesto();
      
      const dineroDisponible = calcularDineroDisponiblePorRubro(
        presupuesto,
        gastos.totalGastado,
        rubro
      );

      setDisponibleRubro(dineroDisponible);
    }
    try {
      fetchGastos();
    } catch (err) {
      console.log('[PopUpCompras Component] ERROR:' + err.message);
    }
  }, [rubro]);

  const calcularDineroDisponiblePorRubro = (
    presupuestoTotal,
    gastosRubro,
    rubro
  ) => {
    return rubro ? presupuestoTotal[rubro.toLowerCase()] - gastosRubro : 0;
  };

  //POST DATA TO BACKEND
  const submitForm = async () => {
    state(false);
    const data = {
      fecha: fecha,
      rubro: rubro,
      subrubro: subrubro,
      numeroCompra: 80,
      proveedor: proveedor,
      monto: monto,
      estado: 'Pendiente',
      factura: 'factura-054',
      nombre: nombre,
      idProyecto: idProyecto,
    };
    const res = await postCompra(data);
    stateNewCompra(true);
    console.log('[PopUpCompras] submitForm response: ', res);
  };

  const sendDataNewProveedor = async () => {
    const data = {
      cuit: newProveedorCuit,
      nombre: newProveedorNombre,
      telefono: newProveedorTelefono,
      rubro: newProveedorRubro,
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
            {rubros.map((r, idx) => (
              <MenuItem value={r} key={idx}>
                {r}
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
        <h2>Realizar Pedido de Compra</h2>
        <Divider />
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
          {availableMoneyForRubro ? `Cuentas con $${disponibleRubro} para este rubro` : `No cuentas con dinero disponible para este rubro`}
        </Typography>
        <br />
        <Divider className={$.divider} />
        <div className={$.secondRow}>
          <TextField
            label="Fecha"
            onChange={(e) => submitHandle(setFecha, e.target.value)}
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <div className={$.cargarFactura}>
            <TextField
              label="Monto"
              onChange={(e) => submitHandle(setMonto, e.target.value)}
              onBlur={(e) =>
                validateMonto(disponibleRubro, e.target.value, setErrorMonto)
              }
              error={errorMonto}
            />
            <GetApp className={$.uploadIcon} />
          </div>
        </div>
        <div className={$.descripcion}>
          <Typography variant="h5">Descripción</Typography>
          <br />
          <TextField
            label="La compra cuenta con los siguientes objetos/servicios"
            multiline
            rows={6}
            className={$.multiLineInput}
            onChange={(e) => submitHandle(setNombre, e.target.value)}
          />
        </div>
        <div className={$.proveedor}>
          <Autocomplete
            id="proveedores"
            options={proveedores}
            getOptionLabel={(option) => option.nombre}
            style={{ width: 300 }}
            renderInput={(params) => (
              <TextField {...params} label="Proveedores" />
            )}
            onChange={(e, value) => submitHandle(setProveedor, value?.nombre)}
          />
          <Tooltip title="Agregar proveedor">
            <KeyboardArrowDown
              className={$.uploadIcon}
              onClick={handleAddProveedor}
            />
          </Tooltip>
        </div>
        {/* Form para cargar nuevo proveedor */}
        {newProveedor && (
          <div className={$.proveedorForm}>
            <span className={$.label}>Nombre completo</span>
            <TextField
              className={$.inputForm}
              placeholder="Ingrese el Nombre completo"
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
            <span className={$.label}>Teléfono</span>
            <TextField
              className={$.inputForm}
              placeholder="Ingrese el número de teléfono"
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
            <span className={$.label}>Cuit</span>
            <TextField
              className={$.inputForm}
              placeholder="Ingrese el CUIT"
              onChange={(e) =>
                handleNewProveedor(e.target.value, setNewProveedorCuit)
              }
              onBlur={(e) =>
                validateField('cuit', e.target.value, setErrorCuitNewProveedor)
              }
              error={errorCuitNewProveedor}
            />
            <span className={$.label}>Email</span>
            <TextField
              className={$.inputForm}
              placeholder="Ingrese el correo"
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
            <span className={$.label}>Rubro</span>
            <Autocomplete
              id="rubro"
              options={rubros}
              getOptionLabel={(option) => option}
              className={$.inputForm}
              renderInput={(params) => (
                <TextField {...params} label="Seleccione un rubro" />
              )}
              onChange={(e, value) =>
                handleNewProveedor(value, setNewProveedorRubro)
              }
            />
            <Button onClick={sendDataNewProveedor} disabled={!canAddProveedor}>
              Agregar proveedor
            </Button>
          </div>
        )}
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
