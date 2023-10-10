/**
 * @jest-environment jsdom
 */
import { signInWithPopup } from 'firebase/auth';
import principalRegister from '../src/views/principalRegister';

jest.mock('firebase/auth', () => ({
  ...jest.requireActual('firebase/auth'),
  signInWithPopup: jest.fn(),
}));

describe('principalRegister', () => {
  let navigateToMock;

  beforeEach(() => {
    navigateToMock = jest.fn();
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('debería llamar a navigateTo al hacer clic en el botón "Registrarse"', () => {
    const mainElement = principalRegister(navigateToMock);
    document.body.appendChild(mainElement);

    const btnRegistrarse = document.querySelector('.btn-contraste');
    btnRegistrarse.click();

    expect(navigateToMock).toHaveBeenCalledWith('/registerData');
  });

  it('debería llamar a signInWithPopup al hacer click en el botón "Registrarse con Google"', async () => {
    const mainElement = principalRegister(navigateToMock);
    document.body.appendChild(mainElement);

    const btnRegistrarseGoogle = document.querySelector('.btn-google');
    btnRegistrarseGoogle.click();

    expect(signInWithPopup).toHaveBeenCalled();
    expect(navigateToMock).not.toHaveBeenCalled();
  });

  it('debería llamar a navigateTo al hacer click en el botón "Iniciar Sesión"', () => {
    const mainElement = principalRegister(navigateToMock);
    document.body.appendChild(mainElement);

    const btnIniciarSesion = document.querySelector('.btn-principal');
    btnIniciarSesion.click();

    expect(navigateToMock).toHaveBeenCalledWith('/login');
  });
});
