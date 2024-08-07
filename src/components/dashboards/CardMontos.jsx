import { React } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { montoDisponible, nivelDeEjecucion } from '../../utils/presupuestos';
import { formatPrice } from '../../utils/validaciones';
import { LocalAtm, BarChart, MonetizationOn } from '@material-ui/icons';

export default function CardMontos({ totalGastos, totalPresupuesto }) {
  const $ = useStyles();

  const monto = montoDisponible(totalPresupuesto, totalGastos);
  const ejecucion = nivelDeEjecucion(totalPresupuesto, totalGastos);

  return (
    <div className={$.cardsContainer}>
      <Card className={$.root}>
        <CardContent className={$.content}>
          <Typography variant="h5" component="h2" className={$.typography}>
            <MonetizationOn className={`${$.prepTotal} ${$.icon}`} />
            <div> Presupuesto total</div>
          </Typography>
          <Typography component="span" variant="h5" className={$.typography}>
            {formatPrice(totalPresupuesto)}
          </Typography>
        </CardContent>
      </Card>
      <Card className={$.root1}>
        <CardContent className={$.content}>
          <Typography variant="h5" component="h2" className={$.typography}>
            <MonetizationOn className={`${$.prepTotal} ${$.icon}`} />
            <div>Monto disponible</div>
          </Typography>
          <Typography component="span" variant="h5" className={$.typography}>
            {formatPrice(monto)}
          </Typography>
        </CardContent>
      </Card>
      <Card className={$.root2}>
        <CardContent className={$.content}>
          <Typography variant="body2" component="p" className={$.typography}>
            <BarChart className={`${$.nivelEjec} ${$.icon}`} />
            <div>Nivel de ejecución</div>
          </Typography>
          <Typography component="span" variant="h5" className={$.typography}>
            {ejecucion + ' %'}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}

const useStyles = makeStyles({
  root: {
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'space-between',
    margin: '0.5rem',
    background: '#95b8f6',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
  },
  root1: {
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: '0.5rem',
    background: '#f9d99a',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
  },
  root2: {
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'space-between',
    margin: '0.5rem',
    background: '#fa5f49',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  typography: {
    fontWeight: 'bold',
    fontSize: '1.5rem',
    color: '#ffffff',
  },
  prepTotal: {
    fontSize: '1.5rem',
    color: '#ffffff',
    verticalAlign: 'text-bottom',
  },
  nivelEjec: {
    fontSize: '1.5rem',
    color: '#ffffff',
    verticalAlign: 'text-bottom',
  },
  cardsContainer: {
    display: 'flex',
    flexDirection: 'row', // Cambiamos a dirección horizontal
    justifyContent: 'space-around', // Ajustamos el espacio entre las tarjetas
    margin: '0.5rem',
  },
  icon: {
    fontSize: '2.5rem',
    color: '#ffffff',
    marginBottom: '0.5rem', // Ajusta según sea necesario
    display: 'block', // Añade esta línea
    margin: 'auto', // Añade esta línea
  },
});
