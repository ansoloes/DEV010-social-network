/**
 * @jest-environment jsdom
 */
/* eslint-disable no-unused-vars */
// feed.test.js
import { getAllByAltText, getByTestId } from '@testing-library/dom';
import feed from '../src/views/feed';

// Mock de firebase auth
jest.mock('firebase/auth', () => ({
  signOut: jest.fn(),
  onAuthStateChanged: jest.fn(),
  getAuth: jest.fn(),
}));

// Mock de index
jest.mock('../src/lib/index.js', () => ({
  showPosts: jest.fn(),
  getPosts: jest.fn(),
}));

// Mock de la función de navegación
const navigateToMock = jest.fn();

describe('feed', () => {
  // Mock de elementos del DOM
  let postingArea;

  beforeEach(() => {
    // Crear elementos simulados del DOM
    postingArea = document.createElement('section');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
  it('debería dar bienvenida al usuario con su displayName', () => {
    const user = {
      displayName: 'Usuario Prueba',
      email: 'prueba@gmail.com',
      uid: 'GDuTccfHlHRvDffZM1Ctd1t0wtE2',
    };
    const mainElement = feed(navigateToMock);
    const welcomeMesage = getByTestId(mainElement, 'welcome');

    expect(welcomeMesage.textContent).toContain(user.displayName.value);
  });
});
