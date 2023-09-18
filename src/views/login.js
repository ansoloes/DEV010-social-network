// file login.js
import { doc, setDoc} from 'firebase/firestore'
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth, db } from "../lib/firebaseConfig.js";

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
    btnIniciarConGoogle.appendChild(imgGoogle);
    btnIniciarConGoogle.textContent = "Iniciar con Google";

    btnIniciarConGoogle.addEventListener("click", () => {
      const provider = new GoogleAuthProvider();

      signInWithPopup(auth, provider)
        .then((userCredential) => {
          const user = userCredential.user;
        
          navigateTo("/feed"); // Cambia "/otra-vista" por la ruta correcta
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // Handle errors aquí, por ejemplo, mostrar un mensaje de error
          alert(errorMessage);
        });
    });
  
    const btnIniciarSesion = document.createElement("button");
    btnIniciarSesion.className = "btn-principal";
    btnIniciarSesion.textContent = "Iniciar Sesión";

    btnIniciarSesion.addEventListener('click', () => {
      const email = document.getElementById('correo').value;
      const password = document.getElementById('contraseña').value;
  
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          //verificar usuario
          if (user) {
            const userDocRef = doc(db, 'users', user.uid);
            const dt = new Date();
            const userData = {
              last_login: dt,
              // Otras propiedades actualizadas aquí si es necesario
            };
            setDoc(userDocRef, userData)
              .then(() => {
                alert('Usuario inició sesión exitosamente.');
                // ... Realiza cualquier acción adicional después del inicio de sesión
                navigateTo('/feed'); // Ir a la siguiente vista
              })
              .catch((error) => {
                console.error('Error al actualizar datos en Firestore:', error);
              });
          } else {
            console.error('Usuario no autenticado');
          }
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // Maneja los errores aquí, por ejemplo, muestra un mensaje de error
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