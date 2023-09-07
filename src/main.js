// Este es el punto de entrada de tu aplicacion

import { myFunction } from './lib/index.js';
import welcome from './views/welcome.js';
import principalRegister from './views/principalRegister.js';
import login from './views/login.js';

const routes = [
    { path: '/', component: welcome },
    { path: '/login', component: login },
    { path: '/principalRegister', component: principalRegister },
  ];
//Explicación: La variable routes es una matriz que contiene objetos de ruta. Cada objeto de ruta tiene dos propiedades: path y component. El valor de la propiedad path representa la ruta de la URL y el valor de la propiedad component representa el componente asociado a esa ruta.

const defaultRoute = '/';
const root = document.getElementById('root');

function navigateTo(hash) {
    const route = routes.find((routeFound) => routeFound.path === hash);
    // Explicación: La función navigateTo toma un parámetro hash y busca en la matriz de rutas (routes) el objeto de ruta cuya propiedad path sea igual al valor del parámetro hash.
    if (route && route.component) {
      window.history.pushState(
        {},
        route.path,
        window.location.origin + route.path,
      );
     }
     // XplainDev: Si la variable route existe y tiene una propiedad component, entonces se ejecutará el código dentro del bloque if. Este código utiliza el método pushState() del objeto window.history para cambiar la URL actual en el navegador sin recargar la página. Los argumentos de pushState() son un objeto vacío {}, la ruta de la URL y la ruta completa de origen más la ruta.
  }

myFunction();
