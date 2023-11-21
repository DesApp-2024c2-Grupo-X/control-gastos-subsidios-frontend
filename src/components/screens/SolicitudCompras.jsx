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

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const SolicitudCompra = () => {
  const classes = useStyles();

  const [pdfContent, setPdfContent] = useState(null);

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

  const handleDownload = () => {
    if (pdfContent) {
      // Crea un objeto Blob con el contenido del PDF
      const pdfBlob = new Blob([pdfContent], { type: 'application/pdf' });

      // Crea una URL de datos a partir del Blob
      const pdfUrl = URL.createObjectURL(pdfBlob);

      // Crea un enlace temporal y simula un clic para iniciar la descarga
      const link = document.createElement('a');
      link.href = pdfUrl;
      link.download = 'documento.pdf';
      link.click();
    }
  };

  useEffect(() => {
    
    const fetchPDF = async () => {
      try {
        // Realiza una solicitud GET al endpoint en el backend que devuelve el PDF
        const response = await axios.get(`http://localhost:3001/api/usuarios/download/${compra.id}`, {
          responseType: 'arraybuffer',
        });
  
        // Convierte el array buffer en una URL de datos
        const blob = new Blob([response.data], { type: 'application/pdf' });
  
        // Establece el contenido del PDF en el estado
        setPdfContent(blob);
        } catch (error) {
          console.error('Error al obtener el PDF:', error);
      }
    };
    fetchPDF();
    if (changeCompra) {
      fetchCompra();
      setChangeCompra(null);
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
            <TableBody></TableBody>
          </Table>
          <Button className={classes.buttonList} onClick={handleDownload} >ACAAAA</Button>
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
