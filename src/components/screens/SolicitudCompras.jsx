import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { formatDate, formatPrice } from '../../utils/validaciones';

import ComprasModal from './ComprasModal';
import { useEffect } from 'react';
import { getCompraByID } from '../../services/compras';
import { getProveedorById } from '../../services/proveedores';
import { useState } from 'react';
import axios from 'axios';
import { Button } from '@material-ui/core';
import { downloadFile, downloadFile2 } from '../../services/usuarios';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const SolicitudCompra = () => {
  const classes = useStyles();

  const StyledTableHead = withStyles(() => ({
    root: {
      '&:nth-of-type(odd)': {
        background: 'linear-gradient(to left , #9BC76D, #80B05C ,#5AA123)',
      },
    },
  }))(TableHead);

  const StyledTableContainer = withStyles(() => ({
    root: {
      maxWidth: '70vw',
      marginBottom: 20,
    },
  }))(TableContainer);

  const StyledState = withStyles(() => ({
    root: {
      backgroundColor: (props) => props.backgroundColor,
      borderRadius: 40,
      color: 'white',
      padding: '6px 15px',
      textAlign: 'center',
      maxWidth: '100px',
    },
  }))(TableContainer);

  const [compra, setCompra] = useState([]);
  const [proveedor, setProveedor] = useState([]);
  const [changeCompra, setChangeCompra] = useState(true);
  const [fileUploaded,setFileUploaded]= useState(true)
  console.log('Compra', compra);
  async function fetchCompra() {
    try {
      const id = sessionStorage.getItem('idCompra');
      const unaCompra = await getCompraByID(id);
      setCompra(unaCompra);
      const proveedor = await getProveedorById(unaCompra.idProveedor);
      setProveedor(proveedor.nombre);
    } catch (err) {
      console.log('ERROR FETCH API [compras]: ' + err);
    }
  }

  async function handleDownload() {
    try {
      const file = await downloadFile(compra.id);
    } catch (err) {
      console.log('No se encontro el archivo: ' + err);
    }
  }

  useEffect(() => {
    if (changeCompra) {
      fetchCompra();
      setChangeCompra(null);
      // downloadFile2(compra.id,setFileUploaded)
      // console.log("SE SUBIO WEON",fileUploaded);
    } else {
      console.log('Not changed');
    }
  }, [changeCompra]);
  return (
    <div>
      <h1>Solicitud de compra</h1>
      <div>
        <StyledTableContainer component={Paper} maxWidht="">
          <Table className={classes.table} aria-label="simple table">
            <StyledTableHead>
              <TableRow>
                <TableCell colSpan={12} align="center">
                  {sessionStorage.getItem('tituloProyecto')}
                </TableCell>
              </TableRow>
            </StyledTableHead>
            <TableRow>
              <TableCell>Número de compra:</TableCell>
              <TableCell>{compra.id}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Factura:</TableCell>
              <TableCell>{compra.factura}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Fecha:</TableCell>
              <TableCell>{compra.fecha && formatDate(compra.fecha)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Nombre de la compra:</TableCell>
              <TableCell>{compra.nombre}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Rubro:</TableCell>
              <TableCell>
                {compra.SubsidiosAsignado &&
                  compra.SubsidiosAsignado.Rubro.nombre}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Subrubro</TableCell>
              <TableCell>{compra.subRubro}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Proveedor:</TableCell>
              <TableCell>{proveedor}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Monto:</TableCell>
              <TableCell>{formatPrice(compra.monto)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Estado:</TableCell>
              <TableCell>
                <StyledState
                  backgroundColor={
                    compra.estado === 'Pendiente'
                      ? '#ffab00'
                      : compra.estado === 'Aprobado'
                      ? '#009673'
                      : '#f50057'
                  }
                >
                  {compra.estado}
                </StyledState>
              </TableCell>
            </TableRow>
            <TableRow>
            {fileUploaded&&
            <TableCell>
              <Button variant="contained" startIcon={<CloudUploadIcon />} onClick={handleDownload} >Descargar factura</Button>
            </TableCell>}
          </TableRow>
          </Table>
        </StyledTableContainer>
        {compra.estado === 'Pendiente' ? (
          <ComprasModal
            idCompra={sessionStorage.getItem('idCompra')}
            changeCompra={setChangeCompra}
          />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default SolicitudCompra;
