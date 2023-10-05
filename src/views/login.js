// file login.js
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from "../lib/firebaseConfig.js";

function login(navigateTo) {
  const mainElement = document.createElement("main");
  mainElement.className = "main-5";

  // Título "Iniciar Sesión"
  const tituloIniciarSesion = document.createElement("h1");
  tituloIniciarSesion.textContent = "Iniciar Sesión";

  // Formulario de datos
  const formDatos = document.createElement("form");
  formDatos.action = "";
  formDatos.className = "form-datos";

  const labelCorreoElectronico = document.createElement("label");
  labelCorreoElectronico.textContent = "Ingresa tu correo electrónico:";
  labelCorreoElectronico.htmlFor = "login-correo-electronico";

  const inputCorreoElectronico = document.createElement("input");
  inputCorreoElectronico.type = "text";
  inputCorreoElectronico.name = "correo"
  inputCorreoElectronico.id = "correo";

  const labelContraseña = document.createElement("label");
  labelContraseña.textContent = "Ingresa tu contraseña:";
  labelContraseña.htmlFor = "login-contraseña";

  const inputContraseña = document.createElement("input");
  inputContraseña.type = "password";
  inputContraseña.name = "contraseña"
  inputContraseña.id = "contraseña";

  formDatos.appendChild(labelCorreoElectronico);
  formDatos.appendChild(inputCorreoElectronico);
  formDatos.appendChild(labelContraseña);
  formDatos.appendChild(inputContraseña);

  // Contenedor de botones
  const contenedorBtn = document.createElement("div");
  contenedorBtn.className = "contenedor-btn";

  const btnIniciarConGoogle = document.createElement("button");
  btnIniciarConGoogle.className = "btn-google";
  const imgGoogle = document.createElement("img");
  imgGoogle.src = "../img/google.png";
  imgGoogle.alt = "ícono Google";
  const googleP = document.createElement('p');
  googleP.textContent = 'Iniciar con Google';

  btnIniciarConGoogle.appendChild(imgGoogle);
  btnIniciarConGoogle.appendChild(googleP);

  btnIniciarConGoogle.addEventListener("click", () => {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then((userCredential) => {
        const user = userCredential.user;

        // Redirige a la página de feed
        navigateTo("/feed");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        alert(errorMessage);
      });
  });

  const btnIniciarSesion = document.createElement("button");
  btnIniciarSesion.className = "btn-principal";
  btnIniciarSesion.textContent = "Iniciar Sesión";

  btnIniciarSesion.addEventListener('click', () => {
    const email = document.getElementById('correo').value;
    const password = document.getElementById('contraseña').value;

    // Obtén el nombre de usuario desde el correo electrónico
    const username = email.split('@')[0];

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        // Almacena el nombre de usuario en el Local Storage
        localStorage.setItem('username', username);

        // Redirige a la página de feed
        navigateTo('/feed');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
      });
  });

  const linkOlvidasteContraseña = document.createElement("a");
  linkOlvidasteContraseña.href = "#";
  linkOlvidasteContraseña.textContent = "¿Olvidaste tu contraseña?";

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