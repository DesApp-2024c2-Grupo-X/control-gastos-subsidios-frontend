import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import {Container, Paper} from '@material-ui/core';

const Soporte = ()=>{
  const $ = useStyles();
  return (
    <>
    <div className={$.titleAndButton}>
          <h1>Soporte</h1>
        </div>
    <Container maxWidth="xl" >      
      <Paper style={{ padding: '1%', textAlign: 'center' }}>
        <Typography variant="h2" gutterBottom>
          ¡Soporte Técnico Personalizado a un <a href="mailto:soporte_unahur@gmail.com?subject=Consulta%20-%20Proyecto%20-%20Investigacion">
          Clic! 
                 </a>
        </Typography>
        <Typography paragraph>
          En la Universidad Nacional de Hurlingham, entendemos la importancia de mantener tus
          sistemas en funcionamiento sin problemas. Nuestro equipo de soporte
          técnico está aquí para brindarte asistencia de primera clase a través
          de nuestro servicio exclusivo por correo electrónico.
        </Typography>
        <Typography paragraph>
          <strong>¿Por qué elegir nuestro soporte técnico por email?</strong>
        </Typography>
        <Typography paragraph>
          <strong>1. Respuesta Rápida:</strong> Nuestro compromiso es proporcionar
          respuestas rápidas y soluciones efectivas a tus problemas. Valoramos tu tiempo y 
          sabemos lo crítico que es resolver los problemas de manera eficiente.
        </Typography>
        <Typography paragraph>
          <strong>2. Asistencia Personalizada:</strong> Cada cliente es único, y
          nuestro equipo de soporte técnico se esfuerza por comprender tus
          necesidades específicas. Nos aseguramos de adaptar nuestras respuestas a
          tus circunstancias individuales para ofrecer soluciones que se ajusten
          perfectamente a tu situación.
        </Typography>
        <Typography paragraph>
          <strong>3. Profesionales Altamente Calificados:</strong> Nuestro equipo
          está compuesto por expertos altamente capacitados y dedicados a ofrecerte
          la mejor asistencia técnica. Nos mantenemos actualizados con las últimas
          tendencias y tecnologías para garantizar que recibas la información más
          precisa y actualizada.
        </Typography>
        <Typography paragraph>
          <strong>4. Proceso Sencillo:</strong> Enviar tus consultas o problemas
          técnicos es tan fácil como un clic. Simplemente responde a este correo
          electrónico, y nuestro equipo se pondrá en marcha para proporcionarte la
          ayuda que necesitas.
        </Typography>
        <Typography paragraph>
          <strong>5. Seguimiento Continuo:</strong> No nos detenemos después de
          proporcionar una solución. Nuestro equipo realiza un seguimiento
          constante para asegurarse de que la asistencia que proporcionamos
          satisface completamente tus necesidades y expectativas.
        </Typography>
        <Typography paragraph>
          Estamos comprometidos a hacer que tu experiencia con nuestro soporte
          técnico por email sea excepcional. ¡Confía en nosotros para mantener tu
          tecnología funcionando sin problemas!
        </Typography>
        <Typography variant="subtitle1">
          Atentamente <strong>Soporte Tecnico</strong>
          <br />
          <strong>Contactanos aca: </strong> <a href="mailto:soporte_unahur@gmail.com?subject=Consulta%20-%20Proyecto%20-%20Investigacion">
                soporte_unahur@gmail.com 
                 </a> (Consulta de Proyecto de Investigación)
        </Typography>
      </Paper>
    </Container>
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
    
export default Soporte;