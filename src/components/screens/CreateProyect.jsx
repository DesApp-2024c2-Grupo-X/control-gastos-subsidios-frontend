import React, { useEffect, useRef, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Divider, FormControl, Paper, Grid } from '@material-ui/core';
import { createProyecto } from '../../services/proyectos';
import Alert from '@material-ui/lab/Alert';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { validateField, valiString } from '../../utils/validaciones';
import * as moment from 'moment';
//import axios from 'axios';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { getUsuarios } from '../../services/usuarios';
import { getAllConvocatorias } from '../../services/convocatorias';
import { getAllRubros } from '../../services/rubros';
import Rubro from '../dashboards/Rubro.jsx';

const useStyles = makeStyles((theme) => ({
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '60%',
    boxShadow: '0 5px 10px -2px #333',
    backgroundColor: '#fafafa',
    padding: '0 1rem 1rem 1rem',
    margin: 'auto',
    borderTop: '1rem solid #5AA123',
    borderRadius: '17px 17px 0 0',
    minWidth: '17rem',
  },
  field: {
    margin: '0.5rem',
    minWidth: '11rem',
    display: 'flex',
  },
  submitButton: {
    margin: '0.5rem',
    backgroundColor: '#5AA123',
  },
  column: {
    flexDirection: 'column',
  },
  loading: {
    width: '20rem',
    marginLeft: '30rem',
    marginTop: '3rem',
  },
  error: {
    width: '25rem',
    marginLeft: '30rem',
    marginTop: '3rem',
  },
  grid: {
    display: 'grid',
  },
  flex: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '1rem',
    width: '97%',
  },
  width30: {
    width: '30%',
    margin: '0.5rem',
  },
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  textfieldClass: {
    margin: '0.5rem',
    minWidth: '11rem',
    display: 'flex',
    '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
      display: 'none',
    },
    '& input[type=number]': {
      MozAppearance: 'textfield',
    },
  },
}));

const CreateProyect = () => {
  const classes = useStyles();
  const [titulo, setTitulo] = useState(null);
  const [tipo, setTipo] = useState(null);
  const [año, setAño] = useState(null);
  const [organismo, setOrganismo] = useState(null);
  const [lineaFinanciamiento, setLineaFinanciamiento] = useState(null);
  const [unidadAcademica, setUnidadAcademica] = useState(null);
  const [areaTematica, setAreaTematica] = useState(null);
  const [subsidios, setSubsidios] = useState([]); // aca se guardan los el id y el monto de los subsidios por rubros.
  const [fechaInicio, setFechaInicio] = useState(null);
  const [fechaFin, setFechaFin] = useState(null);
  const [numeroExpediente, setNumeroExpediente] = useState(null);
  const [numeroResolucion, setNumeroResolucion] = useState(null);
  const [numeroProyecto, setNumeroProyecto] = useState(null);
  const [director, setDirector] = useState(null);
  const [codirector, setCodirector] = useState(null);
  const [usuario, setUsuario] = useState([]);// acas e guardan los usuarios responsables del proyecto.
  const [hasChanges, setHasChanges] = useState(false);
  const [loadedProject, setLoadedProject] = useState(false);
  const [errorNumeroExpediente, setErrorNumeroExpediente] = useState(false);
  const [errorNumeroResolucion, setErrorNumeroResolucion] = useState(false);
  const [errorNumeroProyecto, setErrorNumeroProyecto] = useState(false);
  const [añoValue, setAñoValue] = useState(); //Fix to datapicker - se meustra un año menos que el valor que tiene el state
  const [hasError, setHasError] = useState(false);
  const [convocatoria, setConvocatoria] = useState(null); // en convocatoria guardo la convocatoria seleccionada en el combo.

  //Campos obligatorios
  const canSubmit = () =>
    titulo &&
    tipo &&
    organismo &&
    lineaFinanciamiento &&
    unidadAcademica &&
    areaTematica &&
    fechaInicio &&
    fechaFin &&
    numeroExpediente &&
    numeroResolucion &&
    numeroProyecto &&
    director &&
    codirector &&
    usuario[0] &&
    !subsidios.map(s => s.error).some(e => e === true) &&
    convocatoria;

  const timer = useRef();

  useEffect(() => {
    function setChanges() {
      timer.current = setTimeout(() => {
        setLoadedProject(false);
      }, 2000);
      setLoadedProject(true);
    }

    if (hasChanges) {
      setChanges();
      setHasChanges(false);
    }
  }, [hasChanges]);

  useEffect(() => {
    function setError() {
      timer.current = setTimeout(() => {
        setHasError(false);
      }, 2000);
      setHasError(true);
    }
    if (hasError) {
      setError();
      setHasChanges(false);
    }
  }, [hasError]);

  //Handle events
  const handleChange = (event, setState, isAutocomplete = false) => {
    if (isAutocomplete) {
      setState(event);
    } else {
      setState(event.target.value);
    }
  };

  const handlePicker = (event, setDate, onlyYear = false) => {
    if (onlyYear) {
      const year = moment(event).format('YYYY');
      const yearToValue = moment(year);

      setDate(year);
      setAñoValue(yearToValue);
    } else {
      const date = moment(event).add(1, 'days').format('YYYY-MM-DD');
      setDate(date);
    }
  };
  const clearStates = () => {
    setTitulo('');
    setTipo('');
    setOrganismo('');
    setLineaFinanciamiento('');
    setUnidadAcademica('');
    setAreaTematica('');
    setSubsidios([]);
    setFechaInicio(null);
    setFechaFin(null);
    setNumeroExpediente('');
    setNumeroResolucion('');
    setNumeroProyecto('');
    setDirector('');
    setCodirector('');
    setUsuario([]);
    setConvocatoria(null);
  };
  const submitForm = async () => {
    const proyecto = {
      titulo,
      tipo,
      año,
      organismo,
      lineaFinanciamiento,
      unidadAcademica,
      areaTematica,
      fechaInicio,
      fechaFin,
      numeroExpediente,
      numeroResolucion,
      numeroProyecto,
      director,
      codirector,
      convocatoria,
      usuario,
      subsidios,
    };

    const objectValidate = Object.values(proyecto);
    if (objectValidate.some((value) => !value)) {
      setHasError(true);
      return;
    } //Checkear que no haya ningun null
    const response = await createProyecto(proyecto);
    setHasChanges(true);
    clearStates();
    console.log(`Create-new-proyect-response: ${JSON.stringify(response)}`);
  };

  //Convocatorias fetch
  const [convocatorias, setConvocatorias] = useState([null]);
  useEffect(() => {
    async function fetchConvocatorias() {
      try {
        const convocatorias = await getAllConvocatorias();
        setConvocatorias(convocatorias);
      } catch (error) {
        console.log('error en el fetch de convocatorias' + error);
      }
    }
    fetchConvocatorias();
  }, []);

  //Usuarios fetch
  const [usuarios, setUsuarios] = useState([]);
  useEffect(() => {
    async function fetchUsuarios() {
      try {
        const usuarios = await getUsuarios();
        const json = await usuarios.data;
        setUsuarios(json);
      } catch (error) {
        console.log('error en el fetch de usuarios' + error);
      }
    }
    fetchUsuarios();
  }, []);

  //actualiza el estado de subsidios
  const handleSubsidio = (newSubsidio) => {
    const index = subsidios.findIndex((item) => item.id === newSubsidio.id);
    if (subsidios[index]) {
      const newSubsidioss = [...subsidios];
      newSubsidioss[index] = newSubsidio;
      setSubsidios(newSubsidioss);
    } else {
      setSubsidios([...subsidios, newSubsidio]);
    }
  };

  //Rubros fetch
  //const [rubros, setRubros] = useState([]);
  useEffect(() => {
    async function fetchRubros() {
      try {
        const rubros = await getAllRubros();
        const json = await rubros.data;
        //setRubros(json);
        setSubsidios(json.map((rubro) => ({ id: rubro.id.toString(), nombre: rubro.nombre, monto: "0", error: false, message: "" })));//setea todos los rubros en 0
      } catch (error) {
        console.log('error en el fetch de rubros' + error);
      }
    }
    fetchRubros();
  }, []);

  const handleCamposErrors = (id, error, message = '') => {
    const index = camposErrors.findIndex((item) => item.id === id);
    const newCamposErrors = [...camposErrors];
    newCamposErrors[index] = { id, error, message };
    setCamposErrors(newCamposErrors);
  };

  const [camposErrors, setCamposErrors] = useState([
    { id: 'titulo', error: false },
    { id: 'tipo', error: false },
    { id: 'organismo', error: false },
    { id: 'lineaFinanciamiento', error: false },
    { id: 'unidadAcademica', error: false },
    { id: 'areaTematica', error: false },
    { id: 'director', error: false },
    { id: 'codirector', error: false },
    { id: 'convocatoria', error: false },
    { id: 'usuario', error: false },
    { id: 'subsidios', error: false }
  ]);

  return (
    <div>
      <h1>Crear proyecto</h1>
      <div>
        <Paper className={classes.formContainer}>
          <h2>Cargar datos</h2>

          <div className={classes.grid}>
            <h3> Informacion general</h3>
            <Divider />
            <div className={classes.grid}>
              <TextField
                id="outlined-name"
                label="Título"
                value={titulo}
                onChange={(e) => {
                  valiString(e.target.value) ? handleChange(e, setTitulo) : setTitulo(null);
                  handleCamposErrors(
                    'titulo',
                    !valiString(e.target.value),
                    !valiString(e.target.value) ? 'solo alfanúmericos' : ''
                  );
                }}

                variant="outlined"
                className={classes.field}
                error={camposErrors[0].error}
                helperText={camposErrors[0].message}
                type="text"

              />
              < TextField
                id="outlined-name"
                label="Tipo"
                value={tipo}
                onChange={(e) => {
                  valiString(e.target.value) ? handleChange(e, setTipo) : setTipo(null);
                  handleCamposErrors(
                    'tipo',
                    !valiString(e.target.value),
                    !valiString(e.target.value) ? 'solo alfanúmericos' : ''
                  );

                }}
                variant="outlined"
                className={classes.field}
                error={camposErrors[1].error}
                helperText={camposErrors[1].message}
                type="text"
              />
              <TextField
                id="outlined-name"
                label="Organismo"
                value={organismo}
                onChange={(e) => {
                  valiString(e.target.value) ? handleChange(e, setOrganismo) : setOrganismo(null);
                  handleCamposErrors(
                    'organismo',
                    !valiString(e.target.value),
                    !valiString(e.target.value) ? 'solo alfanúmericos' : ''
                  );
                }}
                variant="outlined"
                className={classes.field}
                error={camposErrors[2].error}
                helperText={camposErrors[2].message}
                type="text"
              />
              <TextField
                id="outlined-name"
                label="Línea de financiamiento"
                value={lineaFinanciamiento}
                onChange={(e) => {
                  valiString(e.target.value) ? handleChange(e, setLineaFinanciamiento) : setLineaFinanciamiento(null);
                  handleCamposErrors(
                    'lineaFinanciamiento',
                    !valiString(e.target.value),
                    !valiString(e.target.value) ? 'solo alfanúmericos' : ''
                  );
                }}
                variant="outlined"
                className={classes.field}
                error={camposErrors[3].error}
                helperText={camposErrors[3].message}
                type="text"
              />
              <TextField
                id="outlined-name"
                label="Unidad académica"
                value={unidadAcademica}

                onChange={(e) => {
                  valiString(e.target.value) ? handleChange(e, setUnidadAcademica) : setUnidadAcademica(null);
                  handleCamposErrors(
                    'unidadAcademica',
                    !valiString(e.target.value),
                    !valiString(e.target.value) ? 'solo alfanúmericos' : ''
                  );
                }}
                variant="outlined"
                className={classes.field}
                error={camposErrors[4].error}
                helperText={camposErrors[4].message}
                type="text"
              />
              <TextField
                id="outlined-name"
                label="Área temática"
                value={areaTematica}
                onChange={(e) => {
                  valiString(e.target.value) ? handleChange(e, setAreaTematica) : setAreaTematica(null);
                  handleCamposErrors(
                    'areaTematica',
                    !valiString(e.target.value),
                    !valiString(e.target.value) ? 'solo alfanúmericos' : ''
                  );
                }}
                variant="outlined"
                className={classes.field}
                error={camposErrors[5].error}
                helperText={camposErrors[5].message}
                type="text"
              />
              <Divider />
              <h3>Subsidio destinado por rubro</h3>
              <Divider />

              <Grid container spacing={1}>
                {subsidios.map((rubro) => (
                  <Rubro
                    key={rubro.id}
                    rubro={rubro}
                    handleSubsidio={handleSubsidio}
                    //error={rubro.error}
                    //helperText={rubro.message}
                    className={classes.textfieldClass}
                  />

                ))}
              </Grid>
              <Divider />
              <h3>Convocatoria</h3>
              <Divider />
            </div>
            <div className={classes.root}>
              <Grid container spacing={1}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <Grid item xs>
                    <KeyboardDatePicker
                      className={classes.field}
                      variant="outlined"
                      id="date-picker-dialog"
                      label="Fecha inicio"
                      format="dd/MM/yyyy"
                      minDate={moment()}
                      value={fechaInicio}
                      onChange={(e) => handlePicker(e, setFechaInicio)}
                      inputVariant="outlined"
                      KeyboardButtonProps={{
                        'aria-label': 'change date',
                      }}
                    />
                  </Grid>
                  <Grid item xs>
                    <KeyboardDatePicker
                      className={classes.field}
                      minwidth="30%"
                      id="date-picker-dialog"
                      label="Fecha fin"
                      format="dd/MM/yyyy"
                      minDate={moment().add(6, 'month')} //6 meses es el minimo de duracion de un proyecto
                      value={fechaFin}
                      onChange={(e) => handlePicker(e, setFechaFin)}
                      inputVariant="outlined"
                      KeyboardButtonProps={{
                        'aria-label': 'change date',
                      }}
                    />
                  </Grid>
                  <KeyboardDatePicker
                    // margin="normal"
                    id="date-picker-dialog"
                    label="Año"
                    views={['year']}
                    format="yyyy"
                    minDate={moment()}
                    value={añoValue}
                    onChange={(e) => handlePicker(e, setAño, true)}
                    inputVariant="outlined"
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                  />
                  <Grid item xs>
                    <Autocomplete
                      className={classes.field}
                      options={convocatorias}
                      getOptionLabel={(option) => option.nombre}
                      onChange={(event, newValue) => {
                        event = newValue ? newValue : null;
                        setConvocatoria(event);
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Convocatoria"
                          variant="outlined"
                        />
                      )}
                    />
                  </Grid>
                </MuiPickersUtilsProvider>
              </Grid>
              <Divider />
              <h3>Identificadores</h3>
              <Divider />
            </div>
            <div className={classes.root}>
              <Grid container spacing={1}>
                <Grid item xs>
                  <TextField
                    id="outlined-name"
                    label="Número expediente"
                    value={numeroExpediente}
                    onBlur={(e) =>
                      validateField(
                        'int',
                        e.target.value,
                        setErrorNumeroExpediente
                      )
                    }
                    type="number"
                    onChange={(e) => handleChange(e, setNumeroExpediente)}
                    variant="outlined"
                    className={classes.textfieldClass}
                    error={errorNumeroExpediente}
                    helperText={errorNumeroExpediente ? 'Solo números' : ''}
                  />
                </Grid>
                <Grid item xs>
                  <TextField
                    id="outlined-name"
                    label="Número resolución"
                    value={numeroResolucion}
                    onBlur={(e) =>
                      validateField(
                        'int',
                        e.target.value,
                        setErrorNumeroResolucion
                      )
                    }
                    type="number"
                    onChange={(e) => handleChange(e, setNumeroResolucion)}
                    variant="outlined"
                    className={classes.textfieldClass}
                    error={errorNumeroResolucion}
                    helperText={errorNumeroResolucion ? 'Solo números' : ''}
                  />
                </Grid>
                <Grid item xs>
                  <TextField
                    id="outlined-name"
                    label="Número proyecto"
                    value={numeroProyecto}
                    onBlur={(e) =>
                      validateField(
                        'int',
                        e.target.value,
                        setErrorNumeroProyecto
                      )
                    }
                    type="number"
                    onChange={(e) => handleChange(e, setNumeroProyecto)}
                    variant="outlined"
                    className={classes.textfieldClass}
                    error={errorNumeroProyecto}
                    helperText={errorNumeroProyecto ? 'Solo números' : ''}
                  />
                </Grid>
              </Grid>
            </div>
            <Divider />
            <h3>Responsables</h3>
            <Divider />
            <TextField
              id="outlined-name"
              label="Director"
              value={director}
              onChange={(e) => {
                valiString(e.target.value) ? handleChange(e, setDirector) : setDirector(null);
                handleCamposErrors(
                  'director',
                  !valiString(e.target.value),
                  !valiString(e.target.value) ? 'solo alfanúmericos' : ''
                );
              }}
              variant="outlined"
              className={classes.field}
              error={camposErrors[6].error}
              helperText={camposErrors[6].message}
              type="text"
            />
            <TextField
              id="outlined-name"
              label="Codirector"
              value={codirector}
              onChange={(e) => {
                valiString(e.target.value) ? handleChange(e, setCodirector) : setCodirector(null);
                handleCamposErrors(
                  'codirector',
                  !valiString(e.target.value),
                  !valiString(e.target.value) ? 'solo alfanúmericos' : ''
                );
              }}
              variant="outlined"
              className={classes.field}
              error={camposErrors[7].error}
              helperText={camposErrors[7].message}
              type="text"
            />
            <div className={classes.root}>
              <Grid container spacing={1}>
                <Grid item xs>
                  <Autocomplete
                    className={classes.field}
                    multiple
                    id="usuarios-responsables"
                    options={usuarios.filter((user) => user.rol === 'otro')}
                    getOptionLabel={(option) => option.nombre}
                    defaultValue={[]}
                    filterSelectedOptions
                    onChange={(event, newValue) => {
                      event = newValue ? newValue : null;
                      setUsuario(event);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Usuarios responsables"
                        variant="outlined"
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </div>
          </div>
          <Button
            onClick={() => submitForm()}
            color="primary"
            variant="contained"
            className={classes.submitButton}
            disabled={!canSubmit()}
          >
            Cargar proyecto
          </Button>
        </Paper>
        {loadedProject && (
          <Alert className={classes.loading}>Proyecto cargado con exito</Alert>
        )}
        {hasError && (
          <Alert severity="error" className={classes.error}>
            Hubo un problema al procesar su solicitud
          </Alert>
        )}
      </div>
    </div>
  );
};
export default CreateProyect;
