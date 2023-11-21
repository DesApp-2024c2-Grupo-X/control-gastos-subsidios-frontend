/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { Footer } from '../Footer';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
//import PopUpCompras from './PopUpCompras';
import {
  getComprasByProyecto,
  getTotalxSubsidio,
} from '../../services/compras';
import { getUser, getUsuarios } from '../../services/usuarios';
import { getProyectoById, getUserByProyect } from '../../services/proyectos';
import { formatPrice, formatDate, formatYear } from '../../utils/validaciones';
import { getTotalSubsidio } from '../../services/subsidiosasignados';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  Paper,
  TableRow,
} from '@material-ui/core';
//import { id } from 'date-fns/locale';
//import { Compras } from './Compras';
import { Link } from 'react-router-dom';
import { getConvocatoriaById } from '../../services/convocatorias';

export const VistaProyecto = () => {
  const [proyecto, setProyecto] = useState(null);
  const [usuarioProyecto, setUsuarioProyecto] = useState('');
  const [presupuesto, setPresupuesto] = useState(0);
  const [convocatoria, setConvocatoria] = useState(null);
  const userName = sessionStorage.getItem('username');

  

  //const idProyecto = sessionStorage.getItem("idProyecto");
  //useEffect para traer la proyecto del proyecto de la api.
  //Styles
  const $ = useStyles();
  //States
  const [compras, setCompras] = useState(null);
  //const [open, setOpen] = useState(false);
  const [newCompra, setNewCompra] = useState(true);
  const handleSelectCompras = (id) => {
    sessionStorage.setItem('idCompra', id);
    sessionStorage.setItem('tituloProyecto', proyecto.titulo);
    //setIdProyecto(id);
  };
  //const handleOpen = () => {
  //   setOpen(true);
  //};

  //const handleClose = () => {
  //  setOpen(false);
  //};

  //API Call

  async function fetchPresupuesto() {
    // REVISAR SI HAY UNA FORMA MAS LINDA PARA HACERLO,SEGURAMENTE LA HAYA.
    try {
      const id = sessionStorage.getItem('idProyecto');
      const presupuesto = await getTotalSubsidio(id);
      
      setPresupuesto(presupuesto);
    } catch (err) {
      console.log('Falló fetch presupuesto');
    }
  }

  async function fetchUserLastName() {
    // REVISAR SI HAY UNA FORMA MAS LINDA PARA HACERLO,SEGURAMENTE LA HAYA.
    try {
      const id = sessionStorage.getItem('idProyecto');
      const user = await getUserByProyect(id);
      const usuariosFinales = user.data
        .map((user) => user.apellidoUser + ' ')
        .toString();
      setUsuarioProyecto(usuariosFinales);
    } catch (err) {
      console.log('Fallo fetchUser');
    }
  }

  async function fetchCompra() {
    try {
      const id = sessionStorage.getItem('idProyecto');
      const compras = await getComprasByProyecto(id);
      setCompras(compras);
    } catch (err) {
      console.log('ERROR FETCH API [compras]: ' + err);
    }
  }
  async function fetchUsuarios() {
    try {
      const id = sessionStorage.getItem('idProyecto');
      const proyecto = await getProyectoById(id); //Tiene que ser por ID la busqueda
      setProyecto(proyecto[0]);
    } catch (err) {
      console.log('[DatosGenerales Component] ERROR : ' + err);
    }
  }

  async function fetchConvocatorias() {
    try {
      const id = sessionStorage.getItem('idProyecto');
      const proyecto = await getProyectoById(id); //Tiene que ser por ID la busqueda
      const idConvocatoria = proyecto[0].idConvocatoria;
      const convocatoria = await getConvocatoriaById(idConvocatoria);
      setConvocatoria(convocatoria);
    } catch (err) {
      console.log('[DatosGenerales Component] ERROR : ' + err);
    }
  }

  useEffect(() => {
    const id = sessionStorage.getItem('idProyecto');
    if (id) {
      fetchUsuarios();
    } else {
      window.location.replace('/error');
    }
    fetchPresupuesto();
    fetchUserLastName(); //getComprasByProyecto(id);
    fetchConvocatorias();
    if (newCompra) fetchCompra();
    setNewCompra(false);
  }, [newCompra]);

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

  const loadingRendering = () => {
    return <Alert severity="info">Cargando...</Alert>;
  };

  const StyledTableHead = withStyles(() => ({
    root: {
      '&:nth-of-type(odd)': {
        background: 'linear-gradient(to left , #9BC76D, #80B05C ,#5AA123)',
      },
    },
  }))(TableRow);

  const DatosList = () => {
    return (
      <TableContainer className={$.container} component={Paper}>
        <Table aria-label="customized table">
          <StyledTableHead>
            <StyledTableCell align="center" className={$.textColor}>
              Título
            </StyledTableCell>
            <StyledTableCell align="center" className={$.textColor}>
              Tipo
            </StyledTableCell>
            <StyledTableCell align="center" className={$.textColor}>
              Organismo
            </StyledTableCell>
            <StyledTableCell align="center" className={$.textColor}>
              Línea de Financiamiento
            </StyledTableCell>
            <StyledTableCell align="center" className={$.textColor}>
              Convocatoria
            </StyledTableCell>
            <StyledTableCell align="center" className={$.textColor}>
              Agrupamiento de I+D
            </StyledTableCell>
            <StyledTableCell align="center" className={$.textColor}>
              Área
            </StyledTableCell>
            <StyledTableCell align="center" className={$.textColor}>
              Presupuesto Total
            </StyledTableCell>
            <StyledTableCell align="center" className={$.textColor}>
              Fecha de Inicio
            </StyledTableCell>
            <StyledTableCell align="center" className={$.textColor}>
              Fecha de Fin
            </StyledTableCell>
            <StyledTableCell align="center" className={$.textColor}>
              Usuario
            </StyledTableCell>
          </StyledTableHead>
          <TableBody>
            <StyledTableRow>
              <StyledTableCell scope="row">{proyecto.titulo}</StyledTableCell>
              <StyledTableCell align="left">{proyecto.tipo}</StyledTableCell>
              <StyledTableCell align="center">
                {proyecto.organismo}
              </StyledTableCell>
              <StyledTableCell align="center">
                {proyecto.lineaFinanciamiento}
              </StyledTableCell>
              <StyledTableCell align="center">
                {convocatoria && convocatoria.nombre}
              </StyledTableCell>
              <StyledTableCell align="center">
                {proyecto.unidadAcademica}
              </StyledTableCell>
              <StyledTableCell align="center">
                {proyecto.areaTematica}
              </StyledTableCell>
              <StyledTableCell align="center">
                {formatPrice(presupuesto)}
              </StyledTableCell>
              <StyledTableCell align="center">
                {formatDate(proyecto.fechaInicio)}
              </StyledTableCell>
              <StyledTableCell align="center">
                {formatDate(proyecto.fechaFin)}
              </StyledTableCell>
              <StyledTableCell align="center">
                {usuarioProyecto}
              </StyledTableCell>
            </StyledTableRow>
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  const DatosList1 = () => {
    return (
      <>
        <TableContainer className={$.container} component={Paper}>
          <Table aria-label="customized table">
            <StyledTableHead>
              <StyledTableCell className={$.textColor}>
                N* Factura
              </StyledTableCell>
              <StyledTableCell className={$.textColor}>Fecha</StyledTableCell>
              <StyledTableCell align="left" className={$.textColor}>
                Nombre
              </StyledTableCell>
              <StyledTableCell align="left" className={$.textColor}>
                Monto
              </StyledTableCell>
              <StyledTableCell align="left" className={$.textColor}>
                Estado
              </StyledTableCell>
              <StyledTableCell align="left" className={$.textColor}>
                Rubro
              </StyledTableCell>
            </StyledTableHead>
            <TableBody>
              {compras.map((compras) => (
                <StyledTableRow key={compras.id}>
                  <StyledTableCell
                    scope="row"
                    onClick={() => handleSelectCompras(compras.id)}
                    component={Link}
                    to={'/admin/projectView/compra'} //edit cuando se cree la vista de compra singular
                  >
                    {compras.factura}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {compras.fecha}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {compras.nombre}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {formatPrice(compras.monto)}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {compras.estado}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {compras.SubsidiosAsignado &&
                      compras.SubsidiosAsignado.Rubro.nombre}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </>
    );
  };

  const rendering = () => {
    return (
      <>
        <div className={$.root}>
          <CardContent>
            <DatosList />
          </CardContent>
        </div>
      </>
    );
  };

  const rendering1 = () => {
    return (
      <>
        <div className={$.root}>
          <CardContent>
            <DatosList1 />
          </CardContent>
        </div>
      </>
    );
  };

  return (
    <>
      <h1>Datos Generales</h1>
      <div className={$.root}>
        <Divider className={$.divider} />
        {proyecto ? rendering() : loadingRendering()}
      </div>

      <h1>Solicitudes de Compras</h1>
      <div className={$.container}>
        <Divider className={$.divider} />
        {compras ? rendering1() : loadingRendering()}
      </div>
      <Footer />
    </>
  );
};

const useStyles = makeStyles({
  root: {
    display: 'flex',
    width: '100%',
  },
  container: {
    display: 'flex',
    width: '100%',
    padding: '0',
    margin: '0',
  },
  card: {
    width: '100%',
    display: 'flex',
    margin: '1rem',
    maxHeight: '45rem',
    borderTop: '1rem solid #5AA123',
    borderRadius: '17px 17px 0 0',
  },
  divider: {
    marginBottom: '2rem',
  },
  item: {
    display: 'flex',
  },
  key: {
    fontWeight: 'bolder',
  },
  parrafo: {
    padding: '3rem',
    fontSize: '16px',
    textAlign: 'justify',
  },
  title: {
    fontWeight: 'bold',
    marginLeft: '3rem',
  },
  dropDown: {
    marginRight: '1rem',
    width: '10rem',
  },
  menuItem: {
    marginTop: '46rem',
    marginLeft: '30rem',
  },
  textColor: {
    color: 'black',
    fontWeight: 'bold',
  },

  tableCellContent: {
    maxWidth: '10vw',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '98%',
  },
});

export default VistaProyecto;
