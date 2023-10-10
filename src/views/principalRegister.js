import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

import { auth } from '../lib/firebaseConfig';
// acá deben traer las partes de firebaseconfig que les sirvan ( en este caso db y auth)
// file principalRegister.js
function principalRegister(navigateTo) {
  const mainElement = document.createElement('main');
  mainElement.className = 'main-2';
  mainElement.id = 'login-principal';

  const contenedorLogoPrincipal = document.createElement('div');
  contenedorLogoPrincipal.className = 'contenedor-logo-principal';

  const contenedorBtnSecundario = document.createElement('div');
  contenedorBtnSecundario.className = 'contenedor-btn-secundario';

  const pElement = document.createElement('p');
  pElement.textContent = 'Únete a la Comunidad #OnlyPaws';

  const btnContraste = document.createElement('button');
  btnContraste.className = 'btn-contraste';
  btnContraste.textContent = 'Registrarse';

  btnContraste.addEventListener('click', () => {
    navigateTo('/registerData');
  });

  const btnGoogle = document.createElement('button');
  btnGoogle.className = 'btn-google';
  const imgGoogle = document.createElement('img');
  imgGoogle.src = '../img/google.png';
  imgGoogle.alt = 'ícono Google';
  const googleP = document.createElement('p');
  googleP.textContent = 'Registrarse con Google';
  btnGoogle.appendChild(imgGoogle);
  btnGoogle.appendChild(googleP);

  btnGoogle.addEventListener('click', async () => {
    const provider = new GoogleAuthProvider();
    // Iniciar sesion
    try {
      const credentials = await signInWithPopup(auth, provider);
      const user = credentials.user;
      console.log(`Usuario autenticado: ${user.displayName}`);
    } catch (error) {
      alert(error.message);
    }
  });

  contenedorBtnSecundario.appendChild(pElement);
  contenedorBtnSecundario.appendChild(btnContraste);
  contenedorBtnSecundario.appendChild(btnGoogle);

  const contenedorBtn = document.createElement('div');
  contenedorBtn.className = 'contenedor-btn';

  const pCuenta = document.createElement('p');
  pCuenta.textContent = '¿Ya tienes una cuenta?';

  const btnIniciarSesion = document.createElement('button');
  btnIniciarSesion.className = 'btn-principal';
  btnIniciarSesion.textContent = 'Iniciar Sesión';

  btnIniciarSesion.addEventListener('click', () => {
    navigateTo('/login');
  });

  contenedorBtn.appendChild(pCuenta);
  contenedorBtn.appendChild(btnIniciarSesion);

  mainElement.appendChild(contenedorLogoPrincipal);
  mainElement.appendChild(contenedorBtnSecundario);
  mainElement.appendChild(contenedorBtn);
  // Agregar la vista al body
  return mainElement;
  // document.body.appendChild(mainElement);
}
export default principalRegister;
