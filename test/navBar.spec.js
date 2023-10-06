import navBar from '../src/views/navBar';

describe('navBar', () => {
  let navigateToMock;
  let postingArea;

  beforeEach(() => {
    // Enviroment de prueba
    navigateToMock = jest.fn();
    postingArea = document.createElement('div');
  });

  afterEach(() => {
    // Limpiar el enviroment
    document.body.innerHTML = '';
  });

  it('debería llamar a navigateTo al hacer clic en el botón Home', () => {
    const footerElement = navBar(navigateToMock, postingArea);
    document.body.appendChild(footerElement);

    const homeButton = document.querySelector('.footer-home');
    homeButton.click();

    expect(navigateToMock).toHaveBeenCalledWith('/feed');
  });

  it('debería mostrar un cuadro de diálogo para publicar un post al hacer clic en el botón de perfil', () => {
    const footerElement = navBar(navigateToMock, postingArea);
    document.body.appendChild(footerElement);

    const pawIcon = document.querySelector('#profile-icon');
    pawIcon.click();

    const dialog = document.querySelector('.dialog-posting');
    expect(dialog).toBeTruthy();
  });

  it('debería agregar un post cuando se hace clic en el botón "Publicar"', () => {
    const footerElement = navBar(navigateToMock, postingArea);
    document.body.appendChild(footerElement);

    const pawIcon = document.querySelector('#profile-icon');
    pawIcon.click();

    const dialog = document.querySelector('.dialog-posting');
    const inputPost = dialog.querySelector('.input-post-textarea');
    const btnSubmitPost = dialog.querySelector('#btn-submit-post');

    inputPost.value = 'Nuevo post de prueba';
    btnSubmitPost.click();

    // simular addPost y check si se llamo
    const addPostSpy = jest.spyOn(window, 'addPost');
    expect(addPostSpy).toHaveBeenCalledWith('Nuevo post de prueba');

    // restaurar funcion normal
    addPostSpy.mockRestore();
  });

  it('debería llamar a navigateTo al hacer clic en el botón Dog', () => {
    const footerElement = navBar(navigateToMock, postingArea);
    document.body.appendChild(footerElement);

    const dogButton = document.querySelector('.footer-button');
    dogButton.click();

    expect(navigateToMock).toHaveBeenCalledWith('/profile');
  });
});
