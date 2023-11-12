import React, { useState } from 'react';
import { Button, makeStyles, MenuItem, Menu } from '@material-ui/core';
import { Person, ExpandMore } from '@material-ui/icons';

export default function Header(props) {
  const $ = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogOut = () => {
    sessionStorage.setItem('loggedIn', false);
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('password');
    sessionStorage.removeItem('role');
    props.setLoggedIn(false);
    window.location.href = '/'
  };

  const openConfig = () => {
    return (
      <div>
        <Button
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={(e) => handleClick(e)}
          endIcon={React.cloneElement(<ExpandMore />)}
        >
          
          <Person className={$.icon} />
          <h5>{props.userName}</h5>
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          className={$.menu}
        >        
          <MenuItem className={$.menuItem} onClick={handleLogOut}>
            Cerrar Sesión
          </MenuItem>
        </Menu>
      </div>
    );
  };
  return (
    <div className={$.header}>
      <div className={$.whiteBar}>{openConfig()}</div>
      <div className={$.greenBar}>
        {(props.rol === 'admin' || props.rol !== undefined) && (
          <>
            {' '}
            <h2 className={$.text}>Proyecto actual</h2>
            <h3 className={$.text}>
              {props.proyecto
                ? props.proyecto.titulo
                : 'No hay proyecto seleccionado puede seleccionar uno de los proyectos en curso de la sección Proyectos.'}
            </h3>
          </>
        )}
      </div>
    </div>
  );
}

const useStyles = makeStyles(() => ({
  header: {
    height: '8.5rem',
    width: '100%',
  },
  menu: {
    marginTop: '2.7rem',
    width: '30rem',
    marginLeft: '0.5rem',
  },
  menuItem: {
    width: '15rem',
  },
  logo: {
    height: '55px',
    width: '216px',
  },
  whiteBar: {
    backgroundColor: '#fafafa',
    width: '100%',
    height: '4rem',
    display: ' flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  greenBar: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    background: 'linear-gradient(to left , #9BC76D, #5AA123)',
    boxShadow: '0 5px 2px -2px gray',
    height: '4.5rem',
    width: '100%',
    alignItems: 'center',
    color: '#fafafa',
    fontSize: '2vh',
  },
  icon: {
    color: '#5AA123',
    marginRight: '0.3rem',
    marginBottom: '0.4rem',
  },
  text: {
    margin: 0,
  },
}));