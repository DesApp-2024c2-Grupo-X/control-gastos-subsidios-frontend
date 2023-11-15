import { Footer } from './Footer';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import GetAppIcon from '@material-ui/icons/GetApp';
import RCS217_21 from '../assets/Normativas/RCS 217_21 Definición agrupamientos investigación.pdf';
import RCS339_21 from '../assets/Normativas/RCS 339_21 Filiación institucional.pdf';
import RCS101_23 from '../assets/Normativas/RCS.-101-14-06-23-Reglamento-del-Comite-Universitario-de-Bioetica-EXP.-106-19.pdf';
import RCS100_23 from '../assets/Normativas/RCS.-100-14-06-23-Reglamento-de-Proyectos-y-Programas-de-Investigacion-y-Desarrollo-EXP.-490-23.pdf';
import RCS135_23 from '../assets/Normativas/RCS.-135-12-07-2023-Reglamento-de-Becas-de-Formacion-en-ID-EXP.-035-18.pdf';
import Met_Pagos_o_Reintegros from '../assets/Normativas/Metodología para solicitar pagos o reintegros a responsables.pdf';

export const Normativas = () => {
  const $ = useStyles();

  return (
    <>
      <div className={$.root}>
        <div className={$.titleAndButton}>
          <h1>Normativas</h1>
        </div>
        <Card className={$.paper}>
          <h2>Normativas de Investigación + Desarrollo</h2>
          <Typography>
            En esta sección podrá descargar las distintas normativas
            correspondientes a los proyectos de investigación y desarrollo.
            <ul>
              <li>
                <b>
                  RCS N° 217/21 Reglamento de Definición, Creación y evaluación
                  de Agrupamientos de Investigación y Desarrollo, Transferencia
                  e Innovación
                </b>
                <IconButton
                  color="primary"
                  href={RCS217_21}
                  download="RCS217_21"
                >
                  <GetAppIcon />
                </IconButton>
              </li>
              <li>
                <b>
                  RCS N° 339/21 Modificación a la RCS.Nro. 61/19 Filiación
                  Institucional
                </b>
                <IconButton
                  color="primary"
                  href={RCS339_21}
                  download="RCS339_21"
                >
                  <GetAppIcon />
                </IconButton>
              </li>
              <li>
                <b>
                  RCS. 101/23 Reglamento del Comité Universitario de Bioética
                </b>
                <IconButton
                  color="primary"
                  href={RCS101_23}
                  download="RCS101_23"
                >
                  <GetAppIcon />
                </IconButton>
              </li>
              <li>
                <b>
                  RCS. 100/23 Reglamento de Proyectos y Programas de
                  Investigación y Desarrollo
                </b>
                <IconButton
                  color="primary"
                  href={RCS100_23}
                  download="RCS100_23"
                >
                  <GetAppIcon />
                </IconButton>
              </li>
              <li>
                <b>RCS. 135/23 Reglamento de Becas de Formación en I+D</b>
                <IconButton
                  color="primary"
                  href={RCS135_23}
                  download="RCS135_23"
                >
                  <GetAppIcon />
                </IconButton>
              </li>
              <li>
                <b>
                  Metodología para solicitar pagos o reintegros a responsables
                </b>
                <IconButton
                  color="primary"
                  href={Met_Pagos_o_Reintegros}
                  download="Met_Pagos_o_Reintegros"
                >
                  <GetAppIcon />
                </IconButton>
              </li>
            </ul>
          </Typography>
        </Card>
        <Footer />
      </div>
    </>
  );
};

const useStyles = makeStyles(() => ({
  root: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    width: '98%',
  },
  paper: {
    paddingRight: '1rem',
    paddingLeft: '1rem',
  },
  divider: {
    marginTop: '2vh',
    marginBottom: '2vh',
  },
  titleAndButton: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  botonDescarga: {
    height: '3rem',
    width: '10rem',
    marginTop: '1vh',
    backgroundColor: '#DCDCDC',
    color: '#505050',
    '&:hover': {
      color: '#FAFAFA',
      backgroundColor: '#62B5F6',
    },
  },
}));
