export const generateView4 = () => {
  const mainElement = document.createElement('main');
  mainElement.className = 'main-4';

  // Contenedor de logo principal
  const contenedorLogoPrincipal = document.createElement('div');
  contenedorLogoPrincipal.className = 'contenedor-logo-principal';

  // Formulario de datos
  const formDatos = document.createElement('form');
  formDatos.action = '';
  formDatos.className = 'form-datos';

  const inputNuevaContraseña = document.createElement('input');
  inputNuevaContraseña.type = 'password';
  inputNuevaContraseña.name = 'new';
  inputNuevaContraseña.placeholder = 'Nueva Contraseña';

  const inputRepetirContraseña = document.createElement('input');
  inputRepetirContraseña.type = 'password';
  inputRepetirContraseña.name = 'repeat';
  inputRepetirContraseña.placeholder = 'Repetir Contraseña';

  formDatos.appendChild(inputNuevaContraseña);
  formDatos.appendChild(inputRepetirContraseña);

  // Contenedor de botones
  const contenedorBtn = document.createElement('div');
  contenedorBtn.className = 'contenedor-btn';

  const btnRegistrarse = document.createElement('button');
  btnRegistrarse.className = 'btn-principal';
  btnRegistrarse.textContent = 'Registrarse';

  contenedorBtn.appendChild(btnRegistrarse);

  mainElement.appendChild(contenedorLogoPrincipal);
  mainElement.appendChild(formDatos);
  mainElement.appendChild(contenedorBtn);

  // Agregar la vista al body
  document.body.appendChild(mainElement);
};
