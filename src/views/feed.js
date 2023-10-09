import { signOut } from 'firebase/auth';
import { showPosts, getPosts } from '../lib/index.js';
import navBar from './navBar.js';
import { auth } from '../lib/firebaseConfig.js';

function feed(navigateTo, user) {
  const mainElement = document.createElement('main');
  mainElement.className = 'main-8';

  //* Header
  const headerElement = document.createElement('header');
  headerElement.id = 'header';
  headerElement.className = 'vista-8-header';
  const logoImage = document.createElement('img');
  logoImage.src = 'img/oplogo.png';
  logoImage.alt = 'Logo';
  logoImage.className = 'header-logo';
  const profileContainer = document.createElement('div');
  profileContainer.className = 'header-profile';
  const profileImage = document.createElement('img');
  profileImage.src = 'img/dueña.jpg';
  profileImage.alt = 'Profile Picture';
  profileImage.className = 'profile-image';
  const welcomeMessage = document.createElement('p');
  welcomeMessage.className = 'welcome-message';
  welcomeMessage.textContent = `Bienvenido/a, ${user.displayName}`;
  welcomeMessage.setAttribute('data-testid', 'welcome');

  profileContainer.appendChild(profileImage);
  profileContainer.appendChild(welcomeMessage);

  // onAuthStateChanged(auth, (user) => {
  //   if (user) {
  //     console.log(user);
  //   }
  // });

  const logoutButton = document.createElement('button');
  logoutButton.className = 'logout-button';
  const logoutIcon = document.createElement('i');
  logoutIcon.className = 'fa-solid fa-right-from-bracket';
  logoutButton.addEventListener('click', async () => {
    try {
      await signOut(auth);
      localStorage.removeItem('user');
      navigateTo('/login');
    } catch (error) {
      alert(error);
    }
  });
  logoutButton.appendChild(logoutIcon);
  profileContainer.appendChild(profileImage);

  headerElement.appendChild(logoImage);
  headerElement.appendChild(profileContainer);
  headerElement.appendChild(logoutButton);

  //* Posting area
  const postingArea = document.createElement('section');
  postingArea.className = 'posting-area';

  // * Ver los Posts
  getPosts((posts) => {
    showPosts(posts, postingArea);
  });

  const footerElement = navBar(navigateTo, postingArea);
  footerElement.id = 'footer';

  mainElement.appendChild(headerElement);
  mainElement.appendChild(postingArea);
  mainElement.appendChild(footerElement);

  return mainElement;
}
export default feed;
