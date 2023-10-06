import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../lib/firebaseConfig.js';

const updateName = async (completeUserName) => {
  await updateProfile(auth.currentUser, { displayName: completeUserName });
};

// *file registerData.js
function registerData(navigateTo) {
  const mainElement = document.createElement('main');
  mainElement.className = 'main-3';

  //* Formulario 1: Datos personales
  const formDatos = document.createElement('form');
  formDatos.action = '';
  formDatos.className = 'form-datos';
  formDatos.id = 'nombre-correo';

  const inputNombre = document.createElement('input');
  inputNombre.type = 'text';
  inputNombre.id = 'username';
  inputNombre.placeholder = 'Nombre Completo';

  const inputCorreo = document.createElement('input');
  inputCorreo.type = 'email';
  inputCorreo.id = 'email';
  inputCorreo.placeholder = 'Correo Electrónico';

  formDatos.appendChild(inputNombre);
  formDatos.appendChild(inputCorreo);

  //* Formulario 2: Asignar contraseña y repetir
  const formDatos2 = document.createElement('form');
  formDatos2.action = '';
  formDatos2.className = 'form-datos';
  formDatos2.id = 'contraseña-nueva';

  const inputContraseñaNueva = document.createElement('input');
  inputContraseñaNueva.type = 'password';
  inputContraseñaNueva.id = 'password';
  inputContraseñaNueva.placeholder = 'Nueva Contraseña';

  const inputRepetirContraseña = document.createElement('input');
  inputRepetirContraseña.type = 'password';
  inputRepetirContraseña.id = 'confirmPassword';
  inputRepetirContraseña.placeholder = 'Repetir Contraseña';

  formDatos2.appendChild(inputContraseñaNueva);
  formDatos2.appendChild(inputRepetirContraseña);

  //* Botones
  const contenedorBtn = document.createElement('div');
  contenedorBtn.className = 'contenedor-btn';

  const btnContinuar = document.createElement('button');
  btnContinuar.type = 'submit';
  btnContinuar.id = 'signUp';
  btnContinuar.name = 'signup_submit';
  btnContinuar.innerHTML = 'Continuar';

  btnContinuar.addEventListener('click', () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const username = document.getElementById('username').value;

    if (password !== confirmPassword) {
      alert('Las contraseñas no coinciden. Por favor, inténtalo de nuevo.');
      return; //! Detener la función si las contraseñas no coinciden
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        const userDocRef = doc(db, 'users', user.uid);
        const userData = {
          email,
          username,
          password,
        };

        return setDoc(userDocRef, userData)
          .then(() => updateName(username))
          .then(() => {
            alert('Usuario creado exitosamente.');
          })
          .catch((error) => {
            console.error('Error al almacenar datos en Firestore:', error);
          })
          .finally(() => {
          // Ve a la siguiente vista
            navigateTo('/login');
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // Handle errors
        alert(errorMessage, errorCode);
      });
  });

  const linkIniciarSesion = document.createElement('a');
  linkIniciarSesion.href = '#login-principal';
  linkIniciarSesion.textContent = '¿Ya tienes una cuenta? Inicia Sesión';

  linkIniciarSesion.addEventListener('click', () => {
    navigateTo('/login');
  });

  contenedorBtn.appendChild(btnContinuar);
  contenedorBtn.appendChild(linkIniciarSesion);

  mainElement.appendChild(formDatos);
  mainElement.appendChild(formDatos2);
  mainElement.appendChild(contenedorBtn);

  return mainElement;
}

export default registerData;
