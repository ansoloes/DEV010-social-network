// file login.js
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth, db } from '../lib/firebaseConfig.js';

function login(navigateTo) {
  const mainElement = document.createElement('main');
  mainElement.className = 'main-5';

  // Título "Iniciar Sesión"
  const tituloIniciarSesion = document.createElement('h1');
  tituloIniciarSesion.textContent = 'Iniciar Sesión';

  // Formulario de datos
  const formDatos = document.createElement('form');
  formDatos.action = '';
  formDatos.className = 'form-datos';

  const labelCorreoElectronico = document.createElement('label');
  labelCorreoElectronico.textContent = 'Ingresa tu correo electrónico:';
  labelCorreoElectronico.htmlFor = 'login-correo-electronico';

  const inputCorreoElectronico = document.createElement('input');
  inputCorreoElectronico.type = 'text';
  inputCorreoElectronico.name = 'correo';
  inputCorreoElectronico.id = 'correo';
  inputCorreoElectronico.setAttribute('data-testid', 'login-correo');

  const labelContraseña = document.createElement('label');
  labelContraseña.textContent = 'Ingresa tu contraseña:';
  labelContraseña.htmlFor = 'login-contraseña';

  const inputContraseña = document.createElement('input');
  inputContraseña.type = 'password';
  inputContraseña.name = 'contraseña';
  inputContraseña.id = 'contraseña';
  inputContraseña.setAttribute('data-testid', 'login-contraseña');

  formDatos.appendChild(labelCorreoElectronico);
  formDatos.appendChild(inputCorreoElectronico);
  formDatos.appendChild(labelContraseña);
  formDatos.appendChild(inputContraseña);

  // Contenedor de botones
  const contenedorBtn = document.createElement('div');
  contenedorBtn.className = 'contenedor-btn';

  const btnIniciarConGoogle = document.createElement('button');
  btnIniciarConGoogle.className = 'btn-google';
  const imgGoogle = document.createElement('img');
  imgGoogle.src = '../img/google.png';
  imgGoogle.alt = 'ícono Google';
  const googleP = document.createElement('p');
  googleP.textContent = 'Iniciar con Google';

  btnIniciarConGoogle.appendChild(imgGoogle);
  btnIniciarConGoogle.appendChild(googleP);

  btnIniciarConGoogle.addEventListener('click', () => {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then(() => {
        navigateTo('/feed'); // Cambia "/otra-vista" por la ruta correcta
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        alert(errorMessage, errorCode);
      });
  });

  const btnIniciarSesion = document.createElement('button');
  btnIniciarSesion.className = 'btn-principal';
  btnIniciarSesion.textContent = 'Iniciar Sesión';
  btnIniciarSesion.setAttribute('data-testid', 'btn-login');

  btnIniciarSesion.addEventListener('click', async () => {
    const email = document.getElementById('correo').value;
    const password = document.getElementById('contraseña').value;

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Verificar si el usuario existe
      if (user) {
        const userDocRef = doc(db, 'users', user.uid);

        // Obtener datos existentes
        const userDocActual = await getDoc(userDocRef);
        if (userDocActual.exists()) {
          const userData = userDocActual.data();

          // Actualizar solo el campo last_login
          const dt = new Date();
          userData.last_login = dt;

          // Escribir los datos actualizados
          await setDoc(userDocRef, userData);

          alert('Usuario inició sesión exitosamente.');

          navigateTo('/feed'); // Ir a la siguiente vista
        } else {
          console.error('El documento del usuario no existe en Firestore.');
        }
      } else {
        console.error('Usuario no autenticado');
      }
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;

      alert(errorMessage, '', errorCode);
    }
  });

  const linkOlvidasteContraseña = document.createElement('a');
  linkOlvidasteContraseña.href = '#';
  linkOlvidasteContraseña.textContent = '¿Olvidaste tu contraseña?';

  linkOlvidasteContraseña.addEventListener('click', () => {
    navigateTo('/forgotPassword');
  });

  contenedorBtn.appendChild(btnIniciarConGoogle);
  contenedorBtn.appendChild(btnIniciarSesion);
  contenedorBtn.appendChild(linkOlvidasteContraseña);

  mainElement.appendChild(tituloIniciarSesion);
  mainElement.appendChild(formDatos);
  mainElement.appendChild(contenedorBtn);

  return mainElement;
}
export default login;
