// file welcome.js
function welcome(navigateTo) {
  const mainElement = document.createElement('main');
  mainElement.className = 'main-1';

  const sectionElement = document.createElement('section');
  sectionElement.className = 'contenedor-carrusel';

  const articleElement = document.createElement('article');
  articleElement.className = 'carrusel';

  for (let i = 1; i <= 3; i++) {
    const imgElement = document.createElement('img');
    imgElement.src = `img/slide${i}.png`;
    imgElement.alt = `Carrusel ${i}`;
    imgElement.id = `carrusel-${i}`;
    articleElement.appendChild(imgElement);
  }

  const navElement = document.createElement('nav');
  navElement.className = 'nav-carrusel';

  for (let i = 1; i <= 3; i++) {
    const anchorElement = document.createElement('a');
    anchorElement.href = `#carrusel-${i}`;
    navElement.appendChild(anchorElement);
  }

  sectionElement.appendChild(articleElement);
  sectionElement.appendChild(navElement);

  const divElement = document.createElement('div');
  divElement.className = 'contenedor-btn';

  const buttonElement = document.createElement('button');
  buttonElement.className = 'btn-principal';
  buttonElement.textContent = 'Saltar';

  buttonElement.addEventListener('click', () => {
    navigateTo('/principalRegister');
  });

  divElement.appendChild(buttonElement);

  mainElement.appendChild(sectionElement);
  mainElement.appendChild(divElement);
  return mainElement;
  // Agregar la vista al body
  // document.body.appendChild(mainElement);
}
export default welcome;
