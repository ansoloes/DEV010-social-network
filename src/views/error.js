// file error.js
// eslint-disable-next-line no-unused-vars
function error(navigateTo) {
  const mainElement = document.createElement('main');
  mainElement.className = 'main-7';

  // Cont de perrito 404
  const contenedorPerrito404 = document.createElement('div');
  contenedorPerrito404.className = 'contenedor-perrito-404';

  // Cont texto 404
  const contenedorTexto404 = document.createElement('article');
  contenedorTexto404.className = 'contenedor-texto-404';

  const titulo404 = document.createElement('h1');
  titulo404.textContent = 'Error 404';

  const subtitulo404 = document.createElement('h2');
  subtitulo404.textContent = 'No puedo encontrar tu página en este zapato';

  contenedorTexto404.appendChild(titulo404);
  contenedorTexto404.appendChild(subtitulo404);

  mainElement.appendChild(contenedorPerrito404);
  mainElement.appendChild(contenedorTexto404);

  return mainElement;
}

export default error;
