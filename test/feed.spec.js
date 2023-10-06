/* eslint-disable no-unused-vars */
// feed.test.js
import feed from '../src/views/feed';

// Mock de firebase auth
jest.mock('firebase/auth', () => ({
  signOut: jest.fn(),
  onAuthStateChanged: jest.fn(),
}));

// Mock de index
jest.mock('../lib/index.js', () => ({
  showPosts: jest.fn(),
  getPosts: jest.fn(),
}));

// Mock de la función de navegación
const navigateToMock = jest.fn();

describe('feed', () => {
  // Mock de elementos del DOM
  let mainElement;
  let postingArea;
  let footerElement;

  beforeEach(() => {
    // Crear elementos simulados del DOM
    mainElement = document.createElement('main');
    postingArea = document.createElement('section');
    footerElement = document.createElement('footer');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('debería crear un post cuando se hace clic en el botón de publicar', async () => {
    // mock de onAuthStateChanged para simular un usuario autenticado
    const user = { displayName: 'Usuario de Prueba' };
    // eslint-disable-next-line no-undef
    onAuthStateChanged.mockImplementation((auth, callback) => {
      callback(user);
    });

    // mock de addPost
    const addPostMock = jest.fn();
    jest.mock('../lib/index.js', () => ({
      addPost: addPostMock,
      showPosts: jest.fn(),
      getPosts: jest.fn(),
    }));

    // función feed
    const result = feed(navigateToMock);

    // Simular un click
    const publishButton = result.querySelector('#btn-submit-post');
    const inputPost = result.querySelector('.input-post-textarea');
    inputPost.value = 'Contenido del post de prueba';
    publishButton.click();

    // addPostMock fue llamado con elcontenido correcto
    expect(addPostMock).toHaveBeenCalledWith('Contenido del post de prueba');
  });
});
