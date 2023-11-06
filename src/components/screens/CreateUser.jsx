/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Paper } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { createUser } from '../../services/usuarios';
import Alert from '@material-ui/lab/Alert';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import moment from 'moment';
import esLocale from 'date-fns/locale/es';

const useStyles = makeStyles(() => ({
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '50%',
    boxShadow: '0 5px 10px -2px #333',
    backgroundColor: '#fafafa',
    padding: '0 1rem 1rem 1rem',
    margin: 'auto',
    borderTop: '1rem solid #5AA123',
    borderRadius: '17px 17px 0 0',
  },
  field: {
    margin: '0.5rem',
  },
  submitButton: {
    margin: '0.5rem',
    backgroundColor: '#5AA123',
  },
  alert: {
    width: '20rem',
    marginLeft: '35rem',
    marginTop: '3rem',
  },
}));

const CreateUser = () => {
  const classes = useStyles();
  const [name, setName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [birthDate, setBirthDate] = useState(null);
  const [role, setRole] = useState(null);
  const [hasChanges, setHasChanges] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const timer = useRef();
  const canSubmit =
    name && lastName && username && password && birthDate && role;

  useEffect(() => {
    function setChanges() {
      timer.current = setTimeout(() => {
        setLoading(false);
      }, 2000);
      setLoading(true);
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
  }, [hasChanges]);

  const clearStates = () => {
    setName('');
    setLastName('');
    setUsername('');
    setPassword('');
    setBirthDate(null);
    setRole('');
  };
  //Handle events
  const handleChange = (event, setState, isAutocomplete = false) => {
    if (isAutocomplete) {
      setState(event);
    } else {
      setState(event.target.value);
    }
  };

  const submitForm = () => {
    const user = {
      nombre: name,
      apellido: lastName,
      rol: role,
      usuario: username,
      contraseña: password,
      fechaNacimiento: birthDate,
      avatar: 'http:g00gle..com',
    };
    if (
      !user.usuario ||
      !user.nombre ||
      !user.rol ||
      !user.contraseña ||
      !user.fechaNacimiento
    ) {
      setHasError(true);
      return;
    }

    createUser(user)
      .then((res) => {
        setHasChanges(true);
        console.log(`Create-new-user-response: ${JSON.stringify(res)}`);
      })
      .catch((err) => {
        setHasError(true);
        console.log(`Create-new-user-ERROR: ${err.message}`);
      });

    clearStates();
  };
  return (
    <div>
      <h1>Cargar usuario</h1>
      <div>
        <Paper className={classes.formContainer}>
          <h2>Cargar datos</h2>
          <TextField
            id="outlined-name"
            label="Nombre"
            value={name}
            onChange={(e) => handleChange(e, setName)}
            variant="outlined"
            className={classes.field}
          />
          <TextField
            id="outlined-name"
            label="Apellido"
            value={lastName}
            onChange={(e) => handleChange(e, setLastName)}
            variant="outlined"
            className={classes.field}
          />
          <TextField
            id="outlined-name"
            label="Usuario"
            value={username}
            onChange={(e) => handleChange(e, setUsername)}
            variant="outlined"
            className={classes.field}
          />
          <TextField
            id="outlined-name"
            label="Contraseña"
            value={password}
            type="password"
            onChange={(e) => handleChange(e, setPassword)}
            variant="outlined"
            className={classes.field}
          />
          <MuiPickersUtilsProvider utils={DateFnsUtils} locale={esLocale}>
            <KeyboardDatePicker
              id="date-picker-dialog"
              label="Fecha nacimiento"
              format="MM/dd/yyyy"
              value={birthDate}
              maxDate={moment()}
              style={{ width: '98%', marginLeft: '0.5rem' }}
              onChange={(e) => handleChange(e, setBirthDate, true)}
              inputVariant="outlined"
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
          </MuiPickersUtilsProvider>
          <Autocomplete
            id="outlined-name"
            options={['admin', 'user']}
            value={role}
            style={{ width: '98%' }}
            onChange={(_, value) => handleChange(value, setRole, true)}
            getOptionLabel={(option) => option}
            getOptionSelected={(option, value) => option === value}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Rol"
                variant="outlined"
                className={classes.field}
              />
            )}
          />

          <Button
            onClick={() => submitForm()}
            color="primary"
            variant="contained"
            className={classes.submitButton}
            disabled={!canSubmit}
          >
            Crear usuario
          </Button>
        </Paper>
        {loading && (
          <Alert className={classes.alert}>Usuario cargado con éxito</Alert>
        )}
        {hasError && (
          <Alert className={classes.alert} severity="error">
            Error al cargar usuario
          </Alert>
        )}
      </div>
    </div>
  );
};

export default CreateUser;
