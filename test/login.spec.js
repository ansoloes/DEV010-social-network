/**
 * @jest-environment jsdom
 */
import { fireEvent, getByTestId } from '@testing-library/dom';
import login from '../src/views/login';

// Mocks firebase
jest.mock('firebase/auth');
jest.mock('firebase/firestore');
jest.mock('../src/lib/firebaseConfig.js');
// mock navegacion
const navigateToMock = jest.fn();

describe('login', () => {
  // Mock del DOM

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('inicia sesión correctamente', async () => {
    const signInWithEmailAndPasswordMock = jest.fn();
    const mainElement = login(navigateToMock);
    const inputCorreoElectronico = getByTestId(mainElement, 'login-correo');
    const inputContraseña = getByTestId(mainElement, 'login-contraseña');
    const iniciarSesionButton = getByTestId(mainElement, 'btn-login');
    jest.mock('firebase/auth');
    // Sim credenciales
    fireEvent.input(inputCorreoElectronico, { target: { value: 'correo@example.com' } });
    fireEvent.input(inputContraseña, { target: { value: 'contraseña' } });

    // Sim click "Iniciar Sesión"
    fireEvent(iniciarSesionButton, new MouseEvent('click', {}));

    // * check signInWithEmailAndPassword se llamo con las cosas que corresponden
    expect(signInWithEmailAndPasswordMock).toHaveBeenCalledWith({}, 'correo@example.com', 'contraseña');

    // * check que navegación tiene al feed
    expect(navigateToMock).toHaveBeenCalledWith('/feed');
  });

  // it('muestra una alerta si las credenciales no existen', async () => {
  //   // Mock de signInWithEmailAndPassword para simular un error
  //   const signInWithEmailAndPasswordMock = jest.fn(() => {
  //     throw new Error('Usuario no encontrado');
  //   });
  //   jest.mock('firebase/auth');

  //   // simular campos invalidos
  //   emailInput.value = 'correo@inexistente.com';
  //   passwordInput.value = 'contraseña';

  //   // click "Iniciar Sesión"
  //   const iniciarSesionButton = mainElement.querySelector('.btn-principal');
  //   iniciarSesionButton.click();

  //   // * check que signInWithEmailAndPassword se llamó con las credenciales invalidas
  //   expect(signInWithEmailAndPasswordMock).toHaveBeenCalledWith({},
  // 'correo@inexistente.com', 'contraseña');

  //   // * check muestraa una alerta con el mensaje de error
  //   expect(window.alert).toHaveBeenCalledWith('Usuario no encontrado');
  // });

  // it('muestra una alerta si hay un campo vacío', async () => {
  //   // campo vacío
  //   emailInput.value = '';
  //   passwordInput.value = 'contraseña';

  //   // click "Iniciar Sesión"
  //   const iniciarSesionButton = mainElement.querySelector('.btn-principal');
  //   iniciarSesionButton.click();

  //   // * check signInWithEmailAndPassword no se llamó
  //   expect(window.alert).toHaveBeenCalledWith('Por favor, completa todos los campos.');
  // });
});
