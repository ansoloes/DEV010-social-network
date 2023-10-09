/**
 * @jest-environment jsdom
 */

import error from '../src/views/error';

describe('Función error', () => {
  test('debería ser una función', () => {
    expect(typeof error).toBe('function');
  });

  test('debería generar el contenido HTML correcto', () => {
    const mainElement = error();
    expect(mainElement.tagName).toBe('MAIN');
    expect(mainElement.className).toBe('main-7');
    const contenedorPerrito404 = mainElement.querySelector('.contenedor-perrito-404');
    expect(contenedorPerrito404.tagName).toBe('DIV');
    const contenedorTexto404 = mainElement.querySelector('.contenedor-texto-404');
    expect(contenedorTexto404.tagName).toBe('ARTICLE');
    const titulo404 = contenedorTexto404.querySelector('h1');
    expect(titulo404.tagName).toBe('H1');
    expect(titulo404.textContent).toBe('Error 404');
    const subtitulo404 = contenedorTexto404.querySelector('h2');
    expect(subtitulo404.tagName).toBe('H2');
    expect(subtitulo404.textContent).toBe('No puedo encontrar tu página en este zapato');
  });
});
