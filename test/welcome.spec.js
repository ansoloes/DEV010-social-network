/**
 * @jest-environment jsdom
 */
import welcome from '../src/views/welcome';

describe('welcome', () => {
  let navigateToMock;

  beforeEach(() => {
    navigateToMock = jest.fn();
  });

  it('debería ser una función', () => {
    expect(typeof welcome).toBe('function');
  });

  it('debería navegar al hacer clic en el botón "Saltar"', () => {
    const mainElement = welcome(navigateToMock);
    document.body.appendChild(mainElement);
    // saltar
    const skipButton = mainElement.querySelector('.btn-principal');
    skipButton.click();
    expect(navigateToMock).toHaveBeenCalledWith('/principalRegister');
  });
});
