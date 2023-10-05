// file feed.js
import { addPost, createPostElement, showPosts, getPosts } from '../lib/index.js';
import { addDoc, collection, Timestamp, getDocs, query, orderBy, onSnapshot } from 'firebase/firestore';
import navBar from './navBar.js';
import { auth, db } from '../lib/firebaseConfig.js';

function feed(navigateTo) {
  const mainElement = document.createElement('main');
  mainElement.className = 'main-8';

// Header
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

// Lógica para obtener el nombre de usuario almacenado
const storedUsername = localStorage.getItem('username');
const displayName = storedUsername || 'Usuario'; // Usar 'Usuario' si no hay nombre almacenado

// Mensaje de bienvenida con el nombre de usuario
const welcomeMessage = document.createElement('p');
welcomeMessage.className = 'welcome-message';
welcomeMessage.textContent = `Bienvenido/a, ${displayName}`;

const logoutButton = document.createElement('button');
logoutButton.className = 'logout-button';
const logoutIcon = document.createElement('i');
logoutIcon.className = 'fa-solid fa-right-from-bracket';
logoutButton.appendChild(logoutIcon);
profileContainer.appendChild(profileImage);
profileContainer.appendChild(welcomeMessage);
headerElement.appendChild(logoImage);
headerElement.appendChild(profileContainer);
headerElement.appendChild(logoutButton);

// Posting area
const postingArea = document.createElement('section');
postingArea.className = 'posting-area';

// Ver los Posts
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