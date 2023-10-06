import welcome from './views/welcome.js';
import principalRegister from './views/principalRegister.js';
import registerData from './views/registerData.js';
import error from './views/error.js';
import login from './views/login.js';
import feed from './views/feed.js';
import forgotPassword from './views/forgotPassword.js';
import profile from './views/profile.js';

const routes = [
  { path: '/', component: welcome },
  { path: '/principalRegister', component: principalRegister },
  { path: '/registerData', component: registerData },
  { path: '/error', component: error },
  { path: '/login', component: login },
  { path: '/feed', component: feed },
  { path: '/forgotPassword', component: forgotPassword },
  { path: '/profile', component: profile },
];

const defaultRoute = '/';

const root = document.getElementById('root');
console.log(root);

function navigateTo(hash) {
  const route = routes.find((routeFound) => routeFound.path === hash);

  if (route && route.component) {
    window.history.pushState(
      {},
      route.path,
      window.location.origin + route.path,
    );

    if (root.firstChild) {
      root.removeChild(root.firstChild);
    }

    root.appendChild(route.component(navigateTo));
  } else {
    navigateTo('/error');
  }
}

window.onpopstate = () => {
  navigateTo(window.location.pathname);
};

window.onpopstate = () => {
  navigateTo(window.location.pathname);
};

navigateTo(window.location.pathname || defaultRoute);
