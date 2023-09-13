// file registerData.js
function registerData(navigateTo) {
  const mainElement = document.createElement('main');
  mainElement.className = 'main-3';

  // Formulario 1: Datos personales
  const formDatos = document.createElement('form');
  formDatos.action = '';
  formDatos.className = 'form-datos';
  formDatos.id = 'nombre-correo';

  const inputNombre = document.createElement('input');
  inputNombre.type = 'text';
  inputNombre.placeholder = 'Nombre Completo';

  const inputCorreo = document.createElement('input');
  inputCorreo.type = 'email';
  inputCorreo.placeholder = 'Correo Electrónico';

  formDatos.appendChild(inputNombre);
  formDatos.appendChild(inputCorreo);


  // Formulario 2: Asignar contraseña y repetir
  const formDatos2 = document.createElement('form');
  formDatos2.action = '';
  formDatos2.className = 'form-datos';
  formDatos2.id = 'contraseña-nueva';

  const inputContraseñaNueva = document.createElement('input');
  inputContraseñaNueva.type = 'password';
  inputContraseñaNueva.placeholder = 'Nueva Contraseña';

  const inputRepetirContraseña = document.createElement('input');
  inputRepetirContraseña.type = 'password';
  inputRepetirContraseña.placeholder = 'Repetir Contraseña';

  formDatos2.appendChild(inputContraseñaNueva);
  formDatos2.appendChild(inputRepetirContraseña);

  // Botones
  const contenedorBtn = document.createElement('div');
  contenedorBtn.className = 'contenedor-btn';

  const btnContinuar = document.createElement('button');
  btnContinuar.className = 'btn-principal';
  btnContinuar.textContent = 'Continuar';

  btnContinuar.addEventListener('click', () => {
    navigateTo('/registerPassword');
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
  // mainElement.appendChild(contenedorSeleccionMascota);
  mainElement.appendChild(contenedorBtn);

  return mainElement;
  // // Agregar la vista al body
  // document.body.appendChild(mainElement);
};

export default registerData;