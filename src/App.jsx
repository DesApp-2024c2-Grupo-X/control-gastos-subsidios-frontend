import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import NavBar from './components/NavBar';
import { DatosGenerales } from './components/DatosGenerales';
import { MisProyectos } from './components/MisProyectos';
import { Normativas } from './components/Normativas';
import { getProyectoById } from './services/proyectos';
import {
  AssignmentInd,
  Help,
  Home,
  Info,
  PersonAdd,
  NoteAdd,
  ShoppingCart,
  LibraryBooks,
  LocalAtm,
  Receipt,
} from '@material-ui/icons';
import { Error404 } from "./components/ErrorGenerico";
import { Presupuestos } from './components/Presupuestos';
import { Compras } from './components/Compras';
import { Proveedores } from './components/Proveedores';
import Login from './components/Login';
import { useEffect, useState } from 'react';
import CreateProyect from './components/screens/CreateProyect';
import CreateUser from './components/screens/CreateUser';
import ProyectsLists from './components/screens/ProyectsLists';
import { VistaProyecto } from './components/screens/VistaProyecto';
import SolicitudCompra from './components/screens/SolicitudCompras';
import Soporte from './components/screens/Soporte';


export default function App() {
  const $ = useStyles();
  const [loggedIn, setLoggedIn] = useState();
  const [userName, setUserName] = useState();
  const [password, setPassword] = useState();
  const [idProyecto, setIdProyecto] = useState(null);
  const [rol, setRol] = useState();
  const [init, setInit] = useState(false);
  const [proyectoActual, setProyectoActual] = useState(null);

  const userSideBarOptions = [
    { text: 'Proyectos', icon: <Home />, path: '/', canBeDisabled: false },
    {
      text: 'Datos generales',
      icon: <Receipt />,
      path: '/proyectos',
      canBeDisabled: true,
    },
    {
      text: 'Presupuesto',
      icon: <LocalAtm />,
      path: '/proyectos/presupuestos',
      canBeDisabled: true,
    },
    {
      text: 'Proveedores',
      icon: <AssignmentInd />,
      path: '/proyectos/proveedores',
      canBeDisabled: false,
    },
    {
      text: 'Compras',
      icon: <ShoppingCart />,
      path: '/proyectos/compras',
      canBeDisabled: true,
    },
    {
      text: 'Normativas I+D',
      icon: <Info />,
      path: '/normativas',
      canBeDisabled: false,
    },
    { text: 'Soporte', icon: <Help />, path: '/soporte', canBeDisabled: false },
  ];

  const adminSideBarOptions = [
    {
      text: 'Proyectos',
      icon: <LibraryBooks />,
      path: '/admin/projects',
      canBeDisabled: false,
    },
    {
      text: 'Cargar proyecto',
      icon: <NoteAdd />,
      path: '/admin/createProject',
      canBeDisabled: false,
    },
    {
      text: 'Cargar usuario',
      icon: <PersonAdd />,
      path: '/admin/createUser',
      canBeDisabled: false,
    },
  ];

  function handleSetProyect(id) {
    sessionStorage.setItem('proyectoActualId', id);
    setIdProyecto(id);
  }

  function checkLogin() {
    const loggedIn = sessionStorage.getItem('loggedIn');
    const usuario = sessionStorage.getItem('username');
    const role = sessionStorage.getItem('role');
    const proyectoActualId = sessionStorage.getItem('proyectoActualId');
    setRol(role);
    setUserName(usuario);
    setIdProyecto(proyectoActualId);
    loggedIn === 'true' ? setLoggedIn(true) : setLoggedIn(false);
    setInit(true);
  }

  async function fetchProyecto() {
    try {
      const proyecto = await getProyectoById(idProyecto);
      setProyectoActual(proyecto[0]);
    } catch (err) {
      console.log('ERROR FETCH API [proyecto]: ' + err);
    }
  }

  useEffect(() => {
    checkLogin();
    fetchProyecto();
  }, [rol, idProyecto]);

  return (
    init ? (
      <>
        {!loggedIn ? (
          <Login
            userName={userName}
            password={password}
            setPassword={setPassword}
            setUserName={setUserName}
            setLoggedIn={setLoggedIn}
            setRol={setRol}
            setIdProyecto={setIdProyecto}
          />
        ) : rol === 'admin' ? (
          <>
            <Container maxWidth="xl" className={$.root}>
              <Router>
                <NavBar sideBarOptions={adminSideBarOptions} user={userName} />
                <div className={$.container}>
                  <Header setLoggedIn={setLoggedIn} userName={userName} handleSetProyect={handleSetProyect} />
                  <div className={$.content}>
                    <Routes>
                      <Route path="/" element={<ProyectsLists />} />
                      <Route path="/admin/projects" element={<ProyectsLists />} />
                      <Route path="/admin/createProject" element={<CreateProyect />} />
                      <Route path="/admin/createUser" element={<CreateUser />} />
                      <Route path="/admin/projectView" element={<VistaProyecto idProyecto={idProyecto} setIdProyect={setIdProyecto} />} />
                      <Route path="/admin/projectView/compra" element={<SolicitudCompra />} />
                      <Route path="/error" element={<Error404 />} />
                    </Routes>
                  </div>
                </div>
              </Router>
            </Container>
          </>
        ) : (
          <Container maxWidth="xl" className={$.root}>
            <Router>
              <NavBar
                sideBarOptions={userSideBarOptions}
                proyectoActual={proyectoActual}
              />
              <div className={$.container}>
                <Header
                  setLoggedIn={setLoggedIn}
                  userName={userName}
                  rol={rol}
                  proyecto={proyectoActual}
                  handleSetProyect={handleSetProyect}
                />
                <div className={$.content}>
                  <Routes>
                    <Route
                      path="/"
                      element={
                        <MisProyectos
                          userName={userName}
                          handleSetProyect={handleSetProyect}
                          idProyecto={idProyecto}
                        />
                      }
                    />
                    <Route
                      path="/proyectos"
                      element={<DatosGenerales idProyecto={idProyecto} />}
                    />
                    <Route
                      path="/proyectos/presupuestos"
                      element={<Presupuestos idProyecto={idProyecto} />}
                    />
                    <Route
                      path="/proyectos/compras"
                      element={<Compras idProyecto={idProyecto} />}
                    />
                    <Route path="/proyectos/proveedores" element={<Proveedores />} />
                    <Route path="/normativas" element={<Normativas />} />
                    <Route path="/error" element={<Error404 />} />
                    <Route path="/soporte" element={<Soporte />} />
                  </Routes>
                </div>
              </div>
            </Router>
          </Container>
        )}
      </>
    ) : (
      <></>
    )
  );
}

const useStyles = makeStyles(() => ({
  root: {
    marginTop: '1vh',
    display: 'flex',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    height: '100%',
    width: 'calc(100% - 13rem)',
    paddingLeft: '1.5rem',
  },
  content: {
    padding: '0 1rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
}));
