// file registerData.js
function registerData(NavigateTo) {
  const mainElement = document.createElement('main');
  mainElement.className = 'main-3';

  // Formulario 1: Datos personales
  const formDatos = document.createElement('form');
  formDatos.action = '';
  formDatos.className = 'form-datos';

  const inputNombre = document.createElement('input');
  inputNombre.type = 'text';
  inputNombre.placeholder = 'Nombre Completo';

  const inputCorreo = document.createElement('input');
  inputCorreo.type = 'email';
  inputCorreo.placeholder = 'Correo Electrónico';

  const inputNombreMascota = document.createElement('input');
  inputNombreMascota.type = 'text';
  inputNombreMascota.placeholder = 'Nombre de Mascota';

  formDatos.appendChild(inputNombre);
  formDatos.appendChild(inputCorreo);
  formDatos.appendChild(inputNombreMascota);

  // Formulario 2: Fecha de nacimiento o adopción de la mascota
  const formFecha = document.createElement('form');
  formFecha.action = '';
  formFecha.className = 'form-fecha';

  const labelFecha = document.createElement('label');
  labelFecha.textContent = 'Fecha de nacimiento o de adopción de la mascota';

  const contenedorFecha = document.createElement('div');
  contenedorFecha.className = 'contenedor-fecha';

  const inputMes = document.createElement('input');
  inputMes.type = 'text';
  inputMes.placeholder = 'Mes';

  const inputDia = document.createElement('input');
  inputDia.type = 'text';
  inputDia.placeholder = 'Día';

  const inputAnio = document.createElement('input');
  inputAnio.type = 'text';
  inputAnio.placeholder = 'Año';

  contenedorFecha.appendChild(inputMes);
  contenedorFecha.appendChild(inputDia);
  contenedorFecha.appendChild(inputAnio);

  formFecha.appendChild(labelFecha);
  formFecha.appendChild(contenedorFecha);

  // Selección de tipo de mascota
  const contenedorSeleccionMascota = document.createElement('article');
  contenedorSeleccionMascota.className = 'contenedor-seleccion-mascota';

  const seleccionPerro = document.createElement('div');
  seleccionPerro.className = 'seleccion-mascota';

  const divPerro = document.createElement('div');
  divPerro.className = 'seleccion-perro';

  const inputPerro = document.createElement('input');
  inputPerro.type = 'radio';
  inputPerro.name = 'mascota';
  inputPerro.id = 'Perro';

  const labelPerro = document.createElement('label');
  labelPerro.htmlFor = 'Perro';
  labelPerro.textContent = 'Perro';

  divPerro.appendChild(inputPerro);
  divPerro.appendChild(labelPerro);

  seleccionPerro.appendChild(divPerro);

  const seleccionGato = document.createElement('div');
  seleccionGato.className = 'seleccion-mascota';

  const divGato = document.createElement('div');
  divGato.className = 'seleccion-gato';

  const inputGato = document.createElement('input');
  inputGato.type = 'radio';
  inputGato.name = 'mascota';
  inputGato.id = 'Gato';

  const labelGato = document.createElement('label');
  labelGato.htmlFor = 'Gato';
  labelGato.textContent = 'Gato';

  divGato.appendChild(inputGato);
  divGato.appendChild(labelGato);

  seleccionGato.appendChild(divGato);

  contenedorSeleccionMascota.appendChild(seleccionPerro);
  contenedorSeleccionMascota.appendChild(seleccionGato);

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
  mainElement.appendChild(formFecha);
  mainElement.appendChild(contenedorSeleccionMascota);
  mainElement.appendChild(contenedorBtn);

  // Agregar la vista al body
  document.body.appendChild(mainElement);
};

export default registerData;