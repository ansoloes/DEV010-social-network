/**
 * @jest-environment jsdom
 */

import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { setDoc } from 'firebase/firestore';
import registerData from '../src/views/registerData';

describe('registerData', () => {
  let navigateToMock;

  beforeEach(() => {
    navigateToMock = jest.fn();
    document.body.innerHTML = `
      <input type="text" id="username">
      <input type="email" id="email">
      <input type="password" id="password">
      <input type="password" id="confirmPassword">
    `;
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('debería registrar un usuario correctamente y redirigir', async () => {
    // simular que llamo createUserWithEmailAndPassword
    jest.spyOn(window, createUserWithEmailAndPassword).mockImplementation(() => Promise.resolve({ user: { uid: 'user123' } }));
    // simularque llamo a setDoc
    jest.spyOn(window, 'setDoc').mockImplementation(() => Promise.resolve());
    // simular que llamo a updateProfile
    jest.spyOn(window, 'updateProfile').mockImplementation(() => Promise.resolve());
    // existen elementos dom
    const mainElement = registerData(navigateToMock);
    document.body.appendChild(mainElement);

    // relleno formulario
    document.getElementById('username').value = 'Usuario de Prueba';
    document.getElementById('email').value = 'test@example.com';
    document.getElementById('password').value = 'password123';
    document.getElementById('confirmPassword').value = 'password123';
    // click
    const btnContinuar = document.getElementById('signUp');
    btnContinuar.click();
    // * check que llamé todas las funciones
    expect(createUserWithEmailAndPassword).toHaveBeenCalled();
    expect(setDoc).toHaveBeenCalled();
    expect(updateProfile).toHaveBeenCalled();
    // * redirigir
    expect(navigateToMock).toHaveBeenCalledWith('/registerPassword');
  });

  it('debería mostrar una alerta si las contraseñas no coinciden', async () => {
    const mainElement = registerData(navigateToMock);
    document.body.appendChild(mainElement);
    // diferentes password
    document.getElementById('username').value = 'Usuario de Prueba';
    document.getElementById('email').value = 'test@example.com';
    document.getElementById('password').value = 'password123';
    document.getElementById('confirmPassword').value = 'differentpassword';

    const btnContinuar = document.getElementById('signUp');
    btnContinuar.click();

    // *check si sale alerta y no se llaman las funciones
    expect(window.alert).toHaveBeenCalledWith('Las contraseñas no coinciden. Por favor, inténtalo de nuevo.');
    expect(createUserWithEmailAndPassword).not.toHaveBeenCalled();
    expect(setDoc).not.toHaveBeenCalled();
    expect(updateProfile).not.toHaveBeenCalled();
    expect(navigateToMock).not.toHaveBeenCalled();
  });

  it('debería mostrar una alerta si el registro falla', async () => {
    // simular que se rechaza la promesa
    jest.spyOn(window, 'createUserWithEmailAndPassword').mockImplementation(() => Promise.reject(new Error('Error de registro')));

    const mainElement = registerData(navigateToMock);
    document.body.appendChild(mainElement);

    // pongo cosas en los campos
    document.getElementById('username').value = 'Usuario de Prueba';
    document.getElementById('email').value = 'test@example.com';
    document.getElementById('password').value = 'password123';
    document.getElementById('confirmPassword').value = 'password123';

    const btnContinuar = document.getElementById('signUp');
    btnContinuar.click();

    // * check si sale la alerta
    expect(window.alert).toHaveBeenCalledWith('Error de registro');
    expect(createUserWithEmailAndPassword).toHaveBeenCalled();
    expect(setDoc).not.toHaveBeenCalled();
    expect(updateProfile).not.toHaveBeenCalled();
    expect(navigateToMock).not.toHaveBeenCalled();
  });
});
