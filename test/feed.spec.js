/**
 * @jest-environment jsdom
 */
/* eslint-disable no-unused-vars */
// feed.test.js
import { onAuthStateChanged } from 'firebase/auth';
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
});
