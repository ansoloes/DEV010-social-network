/* eslint-disable no-undef */
/* eslint-disable max-len */
/**
 * @jest-environment jsdom
 */
import forgotPassword from '../src/views/forgotPassword';

// Mock Firebase
jest.mock('firebase/auth', () => ({
  sendPasswordResetEmail: jest.fn(),
}));
jest.mock('../src/lib/firebaseConfig.js');

// Mock navegación
const navigateToMock = jest.fn();

describe('forgotPassword', () => {
  it('es una función', () => {
    expect(typeof forgotPassword).toBe('function');
  });

  it('envía un correo de recuperación correctamente', async () => {
    // mock de sendPasswordResetEmail
    // * Main simulado
    // eslint-disable-next-line no-undef
    const mainElement = forgotPassword(navigateToMock);
    // * correo valido simulado
    const inputCorreoRecuperacion = mainElement.querySelector('#correo-electronico-recuperacion');
    inputCorreoRecuperacion.value = 'correo@example.com';
    // * click en "Enviar Correo" simulado
    const btnEnviarCorreo = mainElement.querySelector('.btn-principal');
    btnEnviarCorreo.click();
    // * check sendPasswordResetEmail se llamó con el correo correcto
    expect(sendPasswordResetEmailMock).toHaveBeenCalledWith({}, 'correo@example.com');
    // * check si redirigió a login
    expect(navigateToMock).toHaveBeenCalledWith('/login');
  });

  it('maneja un correo inválido (sin "@"), muestra una alerta y no llama a sendPasswordResetEmail', async () => {
    // mock de sendPasswordResetEmail
    const sendPasswordResetEmailMock = jest.fn();
    jest.mock('firebase/auth', () => ({
      sendPasswordResetEmail: sendPasswordResetEmailMock,
    }));
    // eslint-disable-next-line no-undef
    const mainElement = forgotPassword(navigateToMock);
    // *correo inválido
    const inputCorreoRecuperacion = mainElement.querySelector('#correo-electronico-recuperacion');
    inputCorreoRecuperacion.value = 'correo.invalido';
    // *click  "Enviar Correo"
    const btnEnviarCorreo = mainElement.querySelector('.btn-principal');
    btnEnviarCorreo.click();
    // *check que sendPasswordResetEmail no se llamó
    expect(sendPasswordResetEmailMock).not.toHaveBeenCalled();
    // * check que se mostró la alerta
    expect(window.alert).toHaveBeenCalledWith(
      'Por favor, ingresa un correo electrónico válido.',
    );
    // * check que la función de navegación no se llamó
    expect(navigateToMock).not.toHaveBeenCalled();
  });

  it('maneja un campo de correo vacío, muestra una alerta y no llama a sendPasswordResetEmail', async () => {
    // Configurar el comportamiento del mock de sendPasswordResetEmail
    const sendPasswordResetEmailMock = jest.fn();
    jest.mock('firebase/auth', () => ({
      sendPasswordResetEmail: sendPasswordResetEmailMock,
    }));
    // eslint-disable-next-line no-undef
    const mainElement = forgotPassword(navigateToMock);

    // * click "Enviar Correo"
    // con el campo vacío (no puse nada arriba)
    const btnEnviarCorreo = mainElement.querySelector('.btn-principal');
    btnEnviarCorreo.click();

    // * check sendPasswordResetEmail no se llamó
    expect(sendPasswordResetEmailMock).not.toHaveBeenCalled();

    // * check que se mostró una alerta
    expect(window.alert).toHaveBeenCalledWith(
      'Por favor, ingresa un correo electrónico válido.',
    );

    // * check que la función de navegación no se llamó
    expect(navigateToMock).not.toHaveBeenCalled();
  });
});
