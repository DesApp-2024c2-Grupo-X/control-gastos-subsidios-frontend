/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import { getComprasByProyecto } from '../services/compras.js';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import Divider from '@material-ui/core/Divider';
import { Button, Grid, Modal, Typography } from '@material-ui/core';
import PopUpCompras from './PopUpCompras';
import { Footer } from './Footer';
import { formatPrice, formatDate } from '../utils/validaciones';
import BlockIcon from '@material-ui/icons/Block';

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
      background: 'linear-gradient(to left , #9BC76D, #80B05C ,#5AA123)',
    },
  },
}))(TableRow);

export const Compras = (idProyecto) => {
  //Styles
  const $ = useStyles();

  //States
  const [compras, setCompras] = useState([]); //(null);
  const [open, setOpen] = useState(false);
  const [newCompra, setNewCompra] = useState(true);
  //const idProyecto = sessionStorage.getItem('idProyecto'); //TODO: PASAR A REDUX

  const handleOpen = () => {
    setOpen(true);
  };
  //DELETED Para borrar antes se pasaba por params setIdProyecto a este y al de PoP UP
  //console.log(idProyecto)
  // useEffect(() => {
  //   const id = sessionStorage.getItem('idProyecto');
  //   setIdProyecto(id);
  // }, []);

  const handleClose = () => {
    setOpen(false);
  };

  //API Call
  useEffect(() => {
    async function fetchCompra() {
      try {
        const compras = await getComprasByProyecto(idProyecto.idProyecto); // se Hardcodea(idProyecto);
        setCompras(
          compras.sort(function (a, b) {
            var textA = a.fecha;
            var textB = b.fecha;
            return textA > textB ? -1 : textA < textB ? 1 : 0;
          })
        );
      } catch (err) {
        console.log('ERROR FETCH API [compras]: ' + err);
      }
    }
    if (newCompra) fetchCompra();
    setNewCompra(false);
  }, [newCompra]);

  const loadingRendering = () => {
    return <Alert severity="info">Cargando...</Alert>;
  };

  const totalGastos = () => {
    const compra = compras.map((compra) => Number(compra.monto));
    const suma = compra.reduce((a, b) => a + b, 0);

    return formatPrice(suma);
  };
  const rendering = (compras) => {
    return (
      <>
        {compras.length > 0 ? (
          <TableContainer className={$.container}>
            <Table aria-label="customized table">
              <StyledTableHead>
                <StyledTableCell className={$.textColor}>Fecha</StyledTableCell>
                <StyledTableCell align="left" className={$.textColor}>
                  Nro. Factura
                </StyledTableCell>
                <StyledTableCell align="left" className={$.textColor}>
                  Nro. CAE
                </StyledTableCell>
                <StyledTableCell align="left" className={$.textColor}>
                  Proveedor
                </StyledTableCell>
                <StyledTableCell align="left" className={$.textColor}>
                  Rubro
                </StyledTableCell>

                <StyledTableCell align="left" className={$.textColor}>
                  Estado
                </StyledTableCell>
                <StyledTableCell align="right" className={$.textColor}>
                  Monto
                </StyledTableCell>
              </StyledTableHead>
              <TableBody>
                {compras.map((compra) => (
                  <StyledTableRow key={compra.id}>
                    <StyledTableCell scope="row">
                      {formatDate(compra.fecha)}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {compra.factura}
                    </StyledTableCell>
                    <StyledTableCell align="left">{compra.cae}</StyledTableCell>
                    <StyledTableCell align="left">
                      {compra.Proveedore.nombre}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {compra.SubsidiosAsignado.Rubro.nombre}
                    </StyledTableCell>

                    <StyledTableCell align="left">
                      {compra.estado}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {formatPrice(compra.monto)}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
              <TableBody>
                <StyledTableCell
                  align="right"
                  style={{ fontWeight: 'bold', backgroundColor: '#E5E9F0' }}
                ></StyledTableCell>
                {[0, 1, 2, 3].map((key) => (
                  <StyledTableCell
                    key={key}
                    style={{ backgroundColor: '#E5E9F0' }}
                  />
                ))}
                <StyledTableCell
                  align="left"
                  style={{ fontWeight: 'bold', backgroundColor: '#E5E9F0' }}
                >
                  TOTAL
                </StyledTableCell>
                <StyledTableCell
                  align="right"
                  style={{ fontWeight: 'bold', backgroundColor: '#E5E9F0' }}
                >
                  {totalGastos()}
                </StyledTableCell>
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <div className={$.emptyCompras}>
            <Typography variant="h6">No hay compras realizadas</Typography>
            <BlockIcon fontSize="large" className={$.emptyIcon} />
          </div>
        )}
      </>
    );
  };

  //MAIN Rendering
  return (
    <>
      <Grid className={$.header}>
        <h1 className={$.title}>Compras Realizadas</h1>
        <Button variant="contained" className={$.button} onClick={handleOpen}>
          Nueva Compra
        </Button>
        <Modal open={open} onClose={handleClose}>
          <PopUpCompras
            state={setOpen}
            stateNewCompra={setNewCompra}
            idProyecto={idProyecto.idProyecto}
          />
        </Modal>
      </Grid>
      <Divider />
      <br />
      {compras ? rendering(compras) : loadingRendering}
      <Footer />
    </>
  );
};
const useStyles = makeStyles({
  container: {
    width: '100%',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '98%',
  },
  button: {
    height: '2rem',
    marginTop: '1.5rem',
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
  montoTotal: {
    alignContent: 'right',
  },
  emptyCompras: {
    margin: '10rem auto',
  },
  emptyIcon: {
    marginLeft: '7rem',
  },
});
