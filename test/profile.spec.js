/**
 * @jest-environment jsdom
 */
import { signOut } from 'firebase/auth';
import profile from '../src/views/profile';
import { getPosts } from '../src/lib/index.js';
import { auth } from '../src/lib/firebaseConfig.js';

// Mock para la función getPosts
jest.mock('../src/lib/index.js', () => ({
  getPosts: jest.fn(),
}));

describe('profile', () => {
  let navigateToMock;

  beforeEach(() => {
    // Establecer mocks y configuración inicial
    jest.clearAllMocks();
    navigateToMock = jest.fn();
    document.body.innerHTML = `
      <div class="profile-image"></div>
      <p class="welcome-message"></p>
    `;
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('debería llamar a navigateTo al hacer clic en el botón "Logout"', async () => {
    const mainElement = profile(navigateToMock);
    document.body.appendChild(mainElement);

    // Simular clic en el botón de logout
    const logoutButton = document.querySelector('.logout-button');
    logoutButton.click();

    // Verificar las interacciones esperadas
    expect(signOut).toHaveBeenCalled();
    expect(navigateToMock).toHaveBeenCalledWith('/login');
  });

  it('debería mostrar los posts del usuario correctamente', async () => {
    const mockPosts = [
      { title: 'Post 1', content: 'Contenido del post 1', userId: 'user123' },
      { title: 'Post 2', content: 'Contenido del post 2', userId: 'user123' },
    ];

    // Simular la llamada a getPosts y proporcionar el mock de posts
    getPosts.mockResolvedValue(mockPosts);

    const mainElement = profile(navigateToMock);
    document.body.appendChild(mainElement);

    // Esperar a que se resuelva la promesa de getPosts
    await Promise.resolve();

    // Verificar que se mostraron los posts en el DOM
    const postingArea = document.querySelector('.posting-area');
    expect(postingArea.children).toHaveLength(mockPosts.length);
  });

  it('debería mostrar el perfil del usuario correctamente', () => {
    const mainElement = profile(navigateToMock);
    document.body.appendChild(mainElement);

    const profileImage = document.querySelector('.profile-image');
    const welcomeMessage = document.querySelector('.welcome-message');

    // Verificar que se muestra correctamente el perfil
    expect(profileImage).toBeTruthy();
    expect(welcomeMessage.textContent).toContain(`Perfil de ${auth.currentUser.displayName}`);
  });

  it('debería llamar a navigateTo al hacer click en el botón "Home" en el navbar', () => {
    const mainElement = profile(navigateToMock);
    document.body.appendChild(mainElement);

    // Simular clic en el botón "Home"
    const homeButton = document.querySelector('.footer-home');
    homeButton.click();

    // Verificar la interacción esperada
    expect(navigateToMock).toHaveBeenCalledWith('/feed');
  });
});
