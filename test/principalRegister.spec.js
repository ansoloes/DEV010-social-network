/**
 * @jest-environment jsdom
 */
import principalRegister from '../src/views/principalRegister';

describe('principalRegister', () => {
  let navigateToMock;
  beforeEach(() => {
    // enviroment
    navigateToMock = jest.fn();
  });
  afterEach(() => {
    // clean despues
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
    const signInWithPopupMock = jest.fn(() => ({
      user: { displayName: 'Usuario de prueba' },
    }));
    jest.spyOn(window, 'signInWithPopup').mockImplementation(signInWithPopupMock);

    const mainElement = principalRegister(navigateToMock);
    document.body.appendChild(mainElement);

    const btnRegistrarseGoogle = document.querySelector('.btn-google');
    btnRegistrarseGoogle.click();

    expect(signInWithPopupMock).toHaveBeenCalled();
    expect(navigateToMock).not.toHaveBeenCalled();
    window.signInWithPopup.mockRestore();
  });

  it('debería llamar a navigateTo al hacer click en el botón "Iniciar Sesión"', () => {
    const mainElement = principalRegister(navigateToMock);
    document.body.appendChild(mainElement);
    const btnIniciarSesion = document.querySelector('.btn-principal');
    btnIniciarSesion.click();
    expect(navigateToMock).toHaveBeenCalledWith('/login');
  });
});
