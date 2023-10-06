import login from '../src/views/login';

// Mocks firebase
jest.mock('firebase/auth', () => ({
  signInWithEmailAndPassword: jest.fn(),
  GoogleAuthProvider: {
    PROVIDER_ID: 'google.com',
  },
}));
jest.mock('firebase/firestore', () => ({
  doc: jest.fn(),
  setDoc: jest.fn(),
  getDoc: jest.fn(),
}));
jest.mock('../lib/firebaseConfig.js', () => ({
  auth: {},
  db: {},
}));
// mock navegacion
const navigateToMock = jest.fn();

describe('login', () => {
  // Mock del DOM
  let mainElement;
  let emailInput;
  let passwordInput;

  beforeEach(() => {
    // Crear sim DOM
    mainElement = login(navigateToMock);
    emailInput = mainElement.querySelector('#correo');
    passwordInput = mainElement.querySelector('#contraseña');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('inicia sesión correctamente', async () => {
    const signInWithEmailAndPasswordMock = jest.fn();
    jest.mock('firebase/auth', () => ({
      signInWithEmailAndPassword: signInWithEmailAndPasswordMock,
      GoogleAuthProvider: {
        PROVIDER_ID: 'google.com',
      },
    }));

    // Sim credenciales
    emailInput.value = 'correo@example.com';
    passwordInput.value = 'contraseña';

    // Sim click "Iniciar Sesión"
    const iniciarSesionButton = mainElement.querySelector('.btn-principal');
    iniciarSesionButton.click();

    // * check signInWithEmailAndPassword se llamo con las cosas que corresponden
    expect(signInWithEmailAndPasswordMock).toHaveBeenCalledWith({}, 'correo@example.com', 'contraseña');

    // * check que navegación tiene al feed
    expect(navigateToMock).toHaveBeenCalledWith('/feed');
  });

  it('muestra una alerta si las credenciales no existen', async () => {
    // Mock de signInWithEmailAndPassword para simular un error
    const signInWithEmailAndPasswordMock = jest.fn(() => {
      throw new Error('Usuario no encontrado');
    });
    jest.mock('firebase/auth', () => ({
      signInWithEmailAndPassword: signInWithEmailAndPasswordMock,
      GoogleAuthProvider: {
        PROVIDER_ID: 'google.com',
      },
    }));

    // simular campos invalidos
    emailInput.value = 'correo@inexistente.com';
    passwordInput.value = 'contraseña';

    // click "Iniciar Sesión"
    const iniciarSesionButton = mainElement.querySelector('.btn-principal');
    iniciarSesionButton.click();

    // * check que signInWithEmailAndPassword se llamó con las credenciales invalidas
    expect(signInWithEmailAndPasswordMock).toHaveBeenCalledWith({}, 'correo@inexistente.com', 'contraseña');

    // * check muestraa una alerta con el mensaje de error
    expect(window.alert).toHaveBeenCalledWith('Usuario no encontrado');
  });

  it('muestra una alerta si hay un campo vacío', async () => {
    // campo vacío
    emailInput.value = '';
    passwordInput.value = 'contraseña';

    // click "Iniciar Sesión"
    const iniciarSesionButton = mainElement.querySelector('.btn-principal');
    iniciarSesionButton.click();

    // * check signInWithEmailAndPassword no se llamó
    expect(window.alert).toHaveBeenCalledWith('Por favor, completa todos los campos.');
  });
});
