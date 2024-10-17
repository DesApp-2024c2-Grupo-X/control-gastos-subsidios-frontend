import { React, useEffect, useState } from 'react';
import { Footer } from './Footer';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { proyectosEnHistoria, comprasDeHistoria } from '../constants/constants';
import {
  calculateTotalExpenses,
  nivelDeEjecucion,
} from '../utils/presupuestos';
import { getPresupuestoByIdProyecto } from '../services/presupuestos';
import { getComprasByProyecto } from '../services/compras';
import {
  Box,
  CircularProgress,
  Typography,
  TableHead,
  Button,
} from '@material-ui/core';
import { getProyecto } from '../services/proyectos';
import { formatDate } from '../utils/validaciones';

const StyledTableCell = withStyles(() => ({
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles(() => ({
  root: {
    backgroundColor: 'theme.palette.action.hover,',
  },
}))(TableRow);

const StyledTableHead = withStyles(() => ({
  root: {
    '&:nth-of-type(odd)': {
      background: 'linear-gradient(to left , #9BC76D, #80B05C ,#5AA123)',
    },
  },
}))(TableHead);

const StyledTableHeadTerminados = withStyles(() => ({
  root: {
    '&:nth-of-type(odd)': {
      background: '#DCDCDC',
    },
  },
}))(TableHead);

export const MisProyectos = ({ userName, handleSetProyect, idProyecto }) => {
  const $ = useStyles();
  const [proyectosEnCurso, setProyectosEnCurso] = useState([]);
  const [listaDePresupuestos, setPresupuesto] = useState([]);

  const handleSelect = (id, idProyecto) => {
    if (id == idProyecto) {
      handleSetProyect(null);
    } else {
      handleSetProyect(id);
    }
  };

  const calcularNivelEjecucion = (compras, presupuesto) => {
    const gastos = calculateTotalExpenses(compras);
    const totalPresupuesto = presupuesto;
    const ejecucion = nivelDeEjecucion(totalPresupuesto, gastos);
    return ejecucion;
  };

  const circularProgressWithValue = (index, list) => {
    const nivelEjecucion = calcularNivelEjecucion(
      list[index].compras,
      list[index].presupuesto
    );
    return (
      <Box position="relative" display="inline-flex">
        <CircularProgress variant="determinate" value={nivelEjecucion} />
        <Box
          top={0}
          left={0}
          bottom={0}
          right={0}
          position="absolute"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Typography variant="caption" color="textSecondary">
            {nivelEjecucion}%
          </Typography>
        </Box>
      </Box>
    );
  };

  async function setearPresupuesto(proyectoId) {
    const comprasRealizadas = await getComprasByProyecto(proyectoId);
    const presupuestoProyecto = await getPresupuestoByIdProyecto(proyectoId);
    listaDePresupuestos.push({
      compras: comprasRealizadas,
      presupuesto: presupuestoProyecto,
    });
  }

  async function fetchData(userName) {
    const proyectos = await getProyecto(userName);
    const promises = proyectos.map(async (proyecto) => {
      await setearPresupuesto(proyecto.id);
    });
    await Promise.all(promises);
    setProyectosEnCurso(proyectos);
  }

  useEffect(() => {
    //Cargar proyectos
    fetchData(userName);
  }, [listaDePresupuestos]);

  return (
    <>
      <h1>Proyectos en curso</h1>
      <TableContainer className={$.container} component={Paper}>
        <Table aria-label="customized table">
          <StyledTableHead>
            <StyledTableRow>
              <StyledTableCell className={$.textColor}>
                Proyecto
              </StyledTableCell>
              <StyledTableCell align="center" className={$.textColor}>
                Director
              </StyledTableCell>
              <StyledTableCell align="center" className={$.textColor}>
                Fecha de Inicio
              </StyledTableCell>
              <StyledTableCell align="center" className={$.textColor}>
                Porcentaje
              </StyledTableCell>
              <StyledTableCell align="center" className={$.textColor}>
                Opciones
              </StyledTableCell>
            </StyledTableRow>
          </StyledTableHead>
          <TableBody>
            {proyectosEnCurso.map((proyecto, index) => (
              <StyledTableRow
                key={proyecto.id}
                className={
                  idProyecto !== null &&
                  proyecto.id.toString() === idProyecto.toString()
                    ? $.selectedRow
                    : ''
                }
              >
                <StyledTableCell scope="row">{proyecto.titulo}</StyledTableCell>
                <StyledTableCell align="center">
                  {proyecto.director}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {formatDate(proyecto.fechaInicio)}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {listaDePresupuestos &&
                    circularProgressWithValue(index, listaDePresupuestos)}
                </StyledTableCell>
                <StyledTableCell>
                  <Button
                    variant="contained"
                    className={$.button}
                    onClick={() => handleSelect(proyecto.id, idProyecto)}
                  >
                    {idProyecto !== null &&
                    proyecto.id.toString() === idProyecto.toString()
                      ? 'Ignorar'
                      : 'Investigar'}
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <br></br>
      <h2>Historia</h2>
      <TableContainer className={$.container} component={Paper}>
        <Table aria-label="customized table">
          <StyledTableHeadTerminados>
            <StyledTableRow>
              <StyledTableCell className={$.textColorHistoric}>
                Proyecto
              </StyledTableCell>
              <StyledTableCell align="center" className={$.textColorHistoric}>
                Director
              </StyledTableCell>
              <StyledTableCell align="center" className={$.textColorHistoric}>
                Fecha de Inicio
              </StyledTableCell>
              <StyledTableCell align="center" className={$.textColorHistoric}>
                Porcentaje
              </StyledTableCell>
            </StyledTableRow>
          </StyledTableHeadTerminados>
          <TableBody>
            {proyectosEnHistoria.map((proyectosEnHistoria) => (
              <StyledTableRow key={proyectosEnHistoria.nombre}>
                <StyledTableCell scope="row" className={$.tableCellContent}>
                  {proyectosEnHistoria.nombre}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {proyectosEnHistoria.director}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {formatDate(proyectosEnHistoria.fechaInicio)}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {circularProgressWithValue(0, comprasDeHistoria)}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Footer />
    </>
  );
};

const useStyles = makeStyles({
  container: {
    display: 'flex',
    width: '100%',
  },
  textColor: {
    color: 'white',
    fontWeight: 'bold',
  },
  textColorHistoric: {
    fontWeight: 'bold',
  },
  tableCellContent: {
    maxWidth: '10vw',
  },
  button: {
    height: '2rem',
    margin: '0',
    width: '100%',
  },
  selectedRow: {
    background: 'antiquewhite',
  },
});
