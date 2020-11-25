import React, { Suspense } from 'react';
import logo from './logo.svg';
import './App.scss';
import DesktopLayout from './components/WebDesktop/DesktopLayout';
import { createBrowserNavigation, lazy, mount, route } from 'navi'
import { Router, View } from 'react-navi'
import { createBrowserHistory } from 'history';
import { Clientes } from './view/clientes/Clientes';
import { Cargar } from './view/clientes/Cargar';
import { PagoFacil } from './view/pagofacil/PagofacilView';
import { listUsersSegment, listRegistros } from './business/transactionBusiness';
import { Registros } from './view/clientes/Registros';
import ReporteRetenciones from './view/retenciones/ReporteRetenciones';
import Activacion from './view/activacion/Activacion';
import { VerifyInfo } from './view/verifyRegister/VeritfyRegister';
import { PushNotification } from './view/pushNotification/PushNotificacionView';
import { LoginUnified } from './view/loginUnified/LoginUnified';
import { RegisterAdmin } from './view/loginUnified/registerAdmin';
import { UtilidadesCajero } from './view/UtilidadesCajero';
import { LosgAppsView } from './view/logsApps/LogsAppsView';
import { PaymentInfo } from './view/paymentClient/PaymentInfo';

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
    '/listPagoFacil': route(async req => {
      let { type } = req.params;
      return {
        title: 'PagoFácil',
        view: <PagoFacil type={type} />,
      };
    }),
    '/sendPush': route(async req => {
      let { type } = req.params;
      return {
        title: 'Enviar Notificaciones',
        view: <PushNotification type={type} />,
      };
    }),
    '/verifyInfo': route(async req => {
      let { type } = req.params;
      return {
        title: 'Verificar Info',
        view: <VerifyInfo type={type} />,
      };
    }),
    '/unifiedLogin': route(async req => {
      let { type } = req.params;
      return {
        title: 'Login Unificado',
        view: <LoginUnified type={type} />,
      };
    }),
    '/setAdminUser': route(async req => {
      let { type } = req.params;
      return {
        title: 'Login Unificado',
        view: <RegisterAdmin type={type} />,
      };
    }),
    '/logsApps': route(async req => {
      let { type } = req.params;
      return {
        title: 'Login Unificado',
        view: <LosgAppsView type={type} />,
      };
    }),
    '/paymentInfo': route(async req => {
      let { type } = req.params;
      return {
        title: 'Login Unificado',
        view: <PaymentInfo type={type} />,
      };
    }),
    '/utils': route(async req => {
      let { type } = req.params;
      return {
        title: 'Utilidades Cajero',
        view: <UtilidadesCajero type={type} />,
      };
    })
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