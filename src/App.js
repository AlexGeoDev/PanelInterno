import React, { Suspense } from 'react';
import logo from './logo.svg';
import './App.css';
import DesktopLayout from './components/WebDesktop/DesktopLayout';
import { createBrowserNavigation, lazy, mount, route } from 'navi'
import { Router, View } from 'react-navi'
import { createBrowserHistory } from 'history';
import { Clientes } from './view/clientes/Clientes';
import { Cargar } from './view/clientes/Cargar';
import { listUsersSegment } from './business/transactionBusiness';
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
      getData: ()=> listUsersSegment(),
      view: <Clientes />,
    }),
    '/cargar': route(async req => {
      let { type } = req.params;
      return {
        title: 'Cargar archivo',
        view: <Cargar type={type} />,
      };
    }
    )
    ,
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