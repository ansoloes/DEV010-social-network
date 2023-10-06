// file registerPassword.js
function registerPassword(navigateTo) {
  const mainElement = document.createElement('main');
  mainElement.className = 'main-4';

  // Contenedor de logo principal
  const contenedorIlustracionContraseña = document.createElement('div');
  contenedorIlustracionContraseña.className = 'contenedor-ilustracion-contraseña';

  // Form información de mascota y fecha
  const formFecha = document.createElement('form');
  formFecha.className = 'form-fecha';

  const inputNombreMascota = document.createElement('input');
  inputNombreMascota.type = 'text';
  inputNombreMascota.id = 'nombre-mascota';
  inputNombreMascota.placeholder = 'Nombre de tu mascota';

  const labelFecha = document.createElement('label');
  labelFecha.textContent = 'Fecha de nacimiento o de adopción de la mascota';

  const contenedorFecha = document.createElement('div');
  contenedorFecha.className = 'contenedor-fecha';

  const inputDia = document.createElement('input');
  inputDia.type = 'text';
  inputDia.id = 'dia';
  inputDia.placeholder = 'Día';

  const inputMes = document.createElement('input');
  inputMes.type = 'text';
  inputMes.id = 'mes';
  inputMes.placeholder = 'Mes';

  const inputAnho = document.createElement('input');
  inputAnho.type = 'text';
  inputAnho.id = 'anho';
  inputAnho.placeholder = 'Año';

  contenedorFecha.appendChild(inputDia);
  contenedorFecha.appendChild(inputMes);
  contenedorFecha.appendChild(inputAnho);

  formFecha.appendChild(inputNombreMascota);
  formFecha.appendChild(labelFecha);
  formFecha.appendChild(contenedorFecha);

  // Selección mascota
  const articleSeleccionMascota = document.createElement('article');
  articleSeleccionMascota.className = 'contenedor-seleccion-mascota';

  const divSeleccionMascota = document.createElement('div');
  divSeleccionMascota.className = 'seleccion-mascota';

  const divSeleccionPerro = document.createElement('div');
  divSeleccionPerro.className = 'seleccion-perro';

  const divSeleccion = document.createElement('div');
  divSeleccion.className = 'seleccion';

  const inputPerro = document.createElement('input');
  inputPerro.type = 'radio';
  inputPerro.id = 'perro';
  inputPerro.name = 'mascota';

  const labelPerro = document.createElement('label');
  labelPerro.for = 'perro';
  labelPerro.textContent = 'Perro';

  const divSeleccionMascota2 = document.createElement('div');
  divSeleccionMascota2.className = 'seleccion-mascota';

  const divSeleccionGato = document.createElement('div');
  divSeleccionGato.className = 'seleccion-gato';

  const divSeleccion2 = document.createElement('div');
  divSeleccion2.className = 'seleccion';

  const inputGato = document.createElement('input');
  inputGato.type = 'radio';
  inputGato.id = 'gato';
  inputGato.name = 'mascota';

  const labelGato = document.createElement('label');
  labelGato.for = 'gato';
  labelGato.textContent = 'Gato';

  articleSeleccionMascota.appendChild(divSeleccionMascota);
  divSeleccionMascota.appendChild(divSeleccionPerro);
  divSeleccionMascota.appendChild(divSeleccion);
  divSeleccion.appendChild(inputPerro);
  divSeleccion.appendChild(labelPerro);

  articleSeleccionMascota.appendChild(divSeleccionMascota2);
  divSeleccionMascota2.appendChild(divSeleccionGato);
  divSeleccionMascota2.appendChild(divSeleccion2);
  divSeleccion2.appendChild(inputGato);
  divSeleccion2.appendChild(labelGato);

  // Contenedor de botones
  const contenedorBtn = document.createElement('div');
  contenedorBtn.className = 'contenedor-btn';

  const btnRegistrarse = document.createElement('button');
  btnRegistrarse.className = 'btn-principal';
  btnRegistrarse.textContent = 'Registrarse';

  btnRegistrarse.addEventListener('click', () => {
    navigateTo('/feed');
  });

  contenedorBtn.appendChild(btnRegistrarse);

  mainElement.appendChild(contenedorIlustracionContraseña);
  mainElement.appendChild(formFecha);
  mainElement.appendChild(articleSeleccionMascota);
  mainElement.appendChild(contenedorBtn);

  return mainElement;
  // // Agregar la vista al body
  // document.body.appendChild(mainElement);
}

export default registerPassword;
