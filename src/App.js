import React, { Suspense } from 'react';
import logo from './logo.svg';
import './App.css';
import DesktopLayout from './components/WebDesktop/DesktopLayout';
import { createBrowserNavigation, lazy, mount, route } from 'navi'
import { Router, View } from 'react-navi'
import { createBrowserHistory } from 'history';
import { Clientes } from './view/clientes/Clientes';
import { Cargar } from './view/clientes/Cargar';
import { listUsersSegment, listRegistros } from './business/transactionBusiness';
import { Registros } from './view/clientes/Registros';
import ReporteRetenciones from './view/retenciones/ReporteRetenciones';
import Activacion from './view/activacion/Activacion';
const history = createBrowserHistory();
// Define your routes
const routes =
  mount({
    '/': route({
      title: 'Home',
      view: <div>inicial</div>,
    }),
    '/clientes': route({
      title: 'Clientes',
      getData: () => listUsersSegment(),
      view: <Clientes />,
    }),
    '/registros': route({
      title: 'Registros',
      getData: () => listRegistros(),
      view: <Registros />,
    }),
    '/cargar': route(async req => {
      let { type } = req.params;
      return {
        title: 'Cargar archivo',
        view: <Cargar type={type} />,
      };
    }),
    '/reporte-retenciones': route(async req => {
      let { type } = req.params;
      return {
        title: 'Reporte Retenciones',
        view: <ReporteRetenciones />,
      };
    }),
    '/activar-cliente': route(async req => {
      let { type } = req.params;
      return {
        title: 'Activar Cliente',
        view: <Activacion />
      };
    }),
  })

let navi = createBrowserNavigation({
  routes: routes,
  history: history
})

function App() {
  return (
    <div className="App">
      <DesktopLayout titulo="Asignar merchantcode">
        <Router history={history} navigation={navi}>
          <Suspense fallback={null}>
            <View />
          </Suspense>
        </Router>
      </DesktopLayout>
    </div>
  );
}

export default App;
