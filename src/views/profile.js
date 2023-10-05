import { signOut } from 'firebase/auth';
import { getPosts, showMyPosts } from '../lib/index.js';

import navBar from './navBar.js';
import { auth } from '../lib/firebaseConfig.js';

function profile(navigateTo) {
  const user = auth.currentUser;

  const mainElement = document.createElement('main');
  mainElement.className = 'main-9';

  //* Header
  const headerElement = document.createElement('header');
  headerElement.id = 'header';
  headerElement.className = 'vista-8-header';

  const profileContainer = document.createElement('div');
  profileContainer.className = 'header-profile';

  const profileImage = document.createElement('img');
  profileImage.src = 'img/dueña.jpg';
  profileImage.alt = 'Profile Picture';
  profileImage.className = 'profile-image';

  const welcomeMessage = document.createElement('p');
  welcomeMessage.className = 'welcome-message';
  welcomeMessage.textContent = `Perfil de ${user.displayName}`;

  const logoutButton = document.createElement('button');
  logoutButton.className = 'logout-button';

  const logoutIcon = document.createElement('i');
  logoutIcon.className = 'fa-solid fa-right-from-bracket';

  logoutButton.appendChild(logoutIcon);

  logoutButton.addEventListener('click', async () => {
    try {
      await signOut(auth);
      localStorage.removeItem('user');
      navigateTo('/login');
    } catch (error) {
      alert(error);
    }
  });

  profileContainer.appendChild(profileImage);
  profileContainer.appendChild(welcomeMessage);

  headerElement.appendChild(profileContainer);
  headerElement.appendChild(logoutButton);

  //* Mis Posts
  const tituloPosts = document.createElement('h2');
  tituloPosts.className = 'titulo-posts';
  tituloPosts.textContent = 'Mis posts';

  const postingArea = document.createElement('section');
  postingArea.className = 'posting-area';

  getPosts((posts) => {
    showMyPosts(posts, postingArea);
  });

  //* Footer
  const footerElement = navBar(navigateTo, postingArea);
  footerElement.id = 'footer';

  mainElement.appendChild(headerElement);
  mainElement.appendChild(tituloPosts);
  mainElement.appendChild(postingArea);
  mainElement.appendChild(footerElement);

  return mainElement;
}

export default profile;
