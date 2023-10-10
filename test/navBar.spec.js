/**
 * @jest-environment jsdom
 */
import {
  fireEvent,
  getByTestId,
} from '@testing-library/dom';

import navBar from '../src/views/navBar';
import * as index from '../src/lib/index'

describe('navBar', () => {
  let navigateToMock;
  let postingArea;

  beforeEach(() => {
    // Enviroment de prueba
    navigateToMock = jest.fn();
    postingArea = document.createElement('div');
    window.HTMLDialogElement.prototype.show = jest.fn();
    window.HTMLDialogElement.prototype.close = jest.fn();
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

  it('debería mostrar un cuadro de diálogo para publicar un post al hacer click en el botón paw', () => {
    const footerElement = navBar(navigateToMock, postingArea);
    document.body.appendChild(footerElement);

    const pawIcon = getByTestId(footerElement, 'profile-icon');
    fireEvent.click(pawIcon);

    const dialog = getByTestId(postingArea, 'dialog');

    expect(dialog).toBeTruthy();
  });

  it('debería agregar un post cuando se hace clic en el botón "Publicar"', async () => {
    jest.spyOn(index, 'addPost').mockImplementation((post) => {
      console.log('addPost fue llamado con: ', post);
      return Promise.resolve(post);
    });

    const footerElement = navBar(navigateToMock, postingArea);
    document.body.appendChild(footerElement);

    const pawIcon = getByTestId(footerElement, 'profile-icon');
    fireEvent.click(pawIcon);
    const dialog = getByTestId(postingArea, 'dialog');
    const inputPost = getByTestId(dialog, 'post-textarea');
    const btnSubmitPost = getByTestId(dialog, 'btn-submit-post');

    fireEvent.change(inputPost, { target: { value: 'Nuevo post de prueba' } });
    fireEvent.click(btnSubmitPost);
    await expect(index.addPost).toHaveBeenCalledWith('Nuevo post de prueba');
  });
  it('debería llamar a navigateTo al hacer clic en el botón Dog', () => {
    const footerElement = navBar(navigateToMock, postingArea);
    document.body.appendChild(footerElement);

    const dogButton = document.querySelector('.footer-button');
    dogButton.click();

    expect(navigateToMock).toHaveBeenCalledWith('/profile');
  });
});
