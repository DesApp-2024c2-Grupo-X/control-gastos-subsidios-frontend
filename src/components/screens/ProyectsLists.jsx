import {
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  withStyles,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { getProyectsForAdmin } from '../../services/proyectos';
import { Link } from 'react-router-dom';
import { formatDate } from '../../utils/validaciones';
import {getTotalSubsidio} from '../../services/subsidiosasignados';
import { calculateTotalExpenses } from '../../utils/presupuestos';
import {getComprasByProyecto} from '../../services/compras'
import {getConvocatoriaById} from '../../services/convocatorias'

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles(() => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: 'theme.palette.action.hover,',
    },
  },
}))(TableRow);

const StyledTableHead = withStyles(() => ({
  root: {
    '&:nth-of-type(odd)': {
      background: '#5AA123',
    },
  },
}))(TableRow);

export const ProyectsList = () => {
  const $ = useStyles();

  const [proyects, setProyects] = useState([]);
  const handleSelectProyect = (id) => {
    sessionStorage.setItem('idProyecto', id);
    //setIdProyecto(id);
  };
  useEffect(() => {
    async function getProjects() {
      try {
        const proyectos = await getProyectsForAdmin();
  
        // Recorrer la lista de proyectos y obtener totalSubsidio para cada uno
        const proyectosConDatosAdicionales = await Promise.all(
          proyectos.map(async (proyecto) => {
            const totalSubsidio = await getTotalSubsidio(proyecto.id);
            proyecto.SubsidiosAsignados = totalSubsidio;
  
            const compras = await getComprasByProyecto(proyecto.id);
            const gastos = calculateTotalExpenses(compras);
            const convocatoria=await getConvocatoriaById(proyecto.idConvocatoria)
            proyecto.convocatoria=convocatoria
  
            // Agregar el campo gastos al proyecto
            proyecto.gastos = gastos;
  
            return proyecto;
          })
        );
  
        setProyects(proyectosConDatosAdicionales);
      } catch (error) {
        // Manejar errores si es necesario
        console.error("Error al obtener proyectos:", error);
      }
    }
  
    getProjects();
  }, []);
  
 
  return (
    <>
      <h1>Proyectos</h1>
      <TableContainer className={$.container} component={Paper}>
        <Table aria-label="customized table">
          <StyledTableHead>
            <StyledTableCell className={$.textColor}>Proyecto</StyledTableCell>
            <StyledTableCell align="center" className={$.textColor}>
              Director
            </StyledTableCell>
            <StyledTableCell align="center" className={$.textColor}>
              Fecha de Inicio
            </StyledTableCell>
            <StyledTableCell align="center" className={$.textColor}>
              Convocatoria
            </StyledTableCell>
            <StyledTableCell align="center" className={$.textColor}>
              Presupuesto total
            </StyledTableCell>
            <StyledTableCell align="center" className={$.textColor}>
              Gastado
            </StyledTableCell>
            <StyledTableCell align="center" className={$.textColor}>
              Remanente
            </StyledTableCell>
          </StyledTableHead>
          <TableBody>
            {proyects.map((proyecto) => (
              <StyledTableRow key={proyecto.id}>
                <StyledTableCell
                  scope="row"
                  onClick={() => handleSelectProyect(proyecto.id)}
                  component={Link}
                  to={'/admin/projectView'}//edit cuando se cree la vista de proyecto singular con compra
                >
                  {proyecto.titulo}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {proyecto.director}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {formatDate(proyecto.fechaInicio)}
                </StyledTableCell>                
                <StyledTableCell align="center">
                  {proyecto.convocatoria.nombre} 
                </StyledTableCell>
                <StyledTableCell align="center">
                  {'$'+proyecto.SubsidiosAsignados}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {'$'+proyecto.gastos}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {'$'+(proyecto.SubsidiosAsignados-proyecto.gastos)}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

const useStyles = makeStyles({
  container: {
    display: 'flex',
    width: '95%',
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
});

export default ProyectsList;