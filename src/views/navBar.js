import { addPost } from '../lib/index.js';
//* Footer
function navBar(navigateTo, postingArea) {
  const footerElement = document.createElement('footer');
  footerElement.id = 'footer';
  const homeButton = document.createElement('button');
  homeButton.className = 'footer-home';
  const homeIcon = document.createElement('i');
  homeIcon.className = 'fa-solid fa-house';

  homeButton.addEventListener('click', () => {
    navigateTo('/feed');
  });

  const profileButton = document.createElement('button');
  profileButton.className = 'profile-button';

  const pawIcon = document.createElement('i');
  pawIcon.className = 'fa-solid fa-paw';
  pawIcon.id = 'profile-icon';

  pawIcon.addEventListener('click', () => {
    // TODO: Acá debería usar la función AddPost
    const dialog = document.createElement('dialog');
    dialog.show();
    dialog.className = 'dialog-posting';

    const inputCont = document.createElement('div');
    const inputPost = document.createElement('textarea');
    inputPost.className = 'input-post-textarea';
    const btndialog = document.createElement('button');
    btndialog.innerHTML = 'Publicar';
    btndialog.className = 'btn-principal';
    btndialog.id = 'btn-submit-post';

    const btnCloseDialog = document.createElement('button');
    const iconX = document.createElement('i');
    iconX.classList = 'fa-solid fa-x';
    btnCloseDialog.appendChild(iconX);
    dialog.appendChild(btnCloseDialog);

    // El boton publicar debería trigerear la función add post con el contenido
    // dialog.appendChild(btnSalir);
    dialog.appendChild(inputCont);
    inputCont.appendChild(inputPost);
    dialog.appendChild(btndialog);

    btndialog.addEventListener('click', () => {
      const postContent = inputPost.value.trim();
      if (postContent === '') {
        console.log('vacío');
        dialog.close();
        console.log(dialog.open);
      } else {
        console.log('Hay contenido');

        addPost(inputPost.value).then(() => {
          dialog.close();
        });
      }
    });

    btnCloseDialog.addEventListener('click', () => {
      dialog.close();
    });

    postingArea.appendChild(dialog);
  });

  const dogButton = document.createElement('button');
  dogButton.className = 'footer-button';

  const dogIcon = document.createElement('i');
  dogIcon.className = 'fa-solid fa-dog';

  dogButton.addEventListener('click', () => {
    navigateTo('/profile');
  });
  // Agregar cosas
  homeButton.appendChild(homeIcon);
  profileButton.appendChild(pawIcon);
  dogButton.appendChild(dogIcon);

  footerElement.appendChild(homeButton);
  footerElement.appendChild(profileButton);
  footerElement.appendChild(dogButton);

  return footerElement;
}

export default navBar;
