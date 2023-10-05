// file forgotPassword
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../lib/firebaseConfig.js';

function forgotPassword(navigateTo) {
  const mainElement = document.createElement('main');
  mainElement.className = 'main-6';

  //* Formulario
  const formDatos = document.createElement('form');
  formDatos.action = '';
  formDatos.className = 'form-datos';

  const labelRecuperacionContraseña = document.createElement('label');
  labelRecuperacionContraseña.textContent =
      'Si olvidaste tu contraseña, confirma el correo electrónico con el cual te registraste para enviarte un enlace de recuperación. Procura revisar en la carpeta de Spam si no encuentras nuestro mensaje.';
  labelRecuperacionContraseña.htmlFor = 'correo-electronico-recuperacion';

  const inputCorreoRecuperacion = document.createElement('input');
  inputCorreoRecuperacion.type = 'email';
  inputCorreoRecuperacion.id = 'correo-electronico-recuperacion';

  formDatos.appendChild(labelRecuperacionContraseña);
  formDatos.appendChild(inputCorreoRecuperacion);

  //* Contenedor de botones
  const contenedorPawtita = document.createElement('div');
  contenedorPawtita.className = 'contenedor-pawtita';

  const contenedorBtn = document.createElement('div');
  contenedorBtn.className = 'contenedor-btn';

  const btnEnviarCorreo = document.createElement('button');
  btnEnviarCorreo.className = 'btn-principal';
  btnEnviarCorreo.textContent = 'Enviar Correo';
  btnEnviarCorreo.addEventListener('click', async () => {
    const email = inputCorreoRecuperacion.value;

    try {
      await sendPasswordResetEmail(auth, email);
      alert('Se ha enviado un correo de recuperación. Por favor, revisa tu bandeja de entrada.');
      navigateTo('/login');
    } catch (error) {
      console.error('Error al enviar el correo de recuperación:', error);
      alert('Ocurrió un error al enviar el correo de recuperación. Por favor, inténtalo de nuevo.');
    }
  });

  contenedorBtn.appendChild(btnEnviarCorreo);
  contenedorPawtita.appendChild(contenedorBtn);

  mainElement.appendChild(formDatos);
  mainElement.appendChild(contenedorPawtita);

  return mainElement;
}
export default forgotPassword;
