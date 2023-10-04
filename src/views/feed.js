import { auth, db } from '../lib/firebaseConfig.js';
import { addPost, showPosts } from '../lib/index.js';
import { collection, Timestamp, onSnapshot } from 'firebase/firestore';



const iniciarSesion = () => {
  // Lógica para iniciar sesión
  // Después de iniciar sesión exitosamente, llamas a updateWelcomeMessage
  auth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Usuario inició sesión exitosamente
      const user = userCredential.user;
      // Llama a la función para actualizar el mensaje de bienvenida
      updateWelcomeMessage();
      // Otro código que necesites ejecutar después de iniciar sesión
    })
    .catch((error) => {
      console.error('Error al iniciar sesión:', error);
    });
};


function feed(navigateTo) {
  const mainElement = document.createElement('main');
  mainElement.className = 'main-8';

  const postingArea = document.createElement("section");
  postingArea.className = "posting-area";

  const textArea = document.createElement("textarea");
  textArea.placeholder = "Escribe tu post aquí...";
  textArea.className = "post-textarea";

  const sendPostButton = document.createElement("button");
  sendPostButton.textContent = "Publicar";
  sendPostButton.className = "post-button";

  

  sendPostButton.addEventListener('click', () => {
    const postContent = textArea.value;
    if (postContent.trim() !== '') {
      const user = auth.currentUser;
      if (user) {
        const name = user.displayName;
        const date = Timestamp.now();
        const postsCollection = collection(db, 'posts');
        addPost(postContent, name, date, postsCollection).then(() => {
          showPosts(name, postsSection);
          textArea.value = '';
        });
      } else {
        console.error('El usuario no ha iniciado sesión.');
      }
    }
  });
 
  updateWelcomeMessage();
  //* Header

  const updateWelcomeMessage = () => {
    const user = auth.currentUser;
    const welcomeMessage = document.querySelector('.welcome-message');
  
    if (user && welcomeMessage) {
      const displayName = user.displayName || 'Usuario';
      welcomeMessage.textContent = `Bienvenido/a, ${displayName}`;
    } else {
      welcomeMessage.textContent = 'Bienvenido/a, [Nombre de Usuario]';
    }
  };


  const headerElement = document.createElement("header");
  headerElement.id = "header";
  headerElement.className = "vista-8-header";
  const logoImage = document.createElement("img");
  logoImage.src = "img/oplogo.png";
  logoImage.alt = "Logo";
  logoImage.className = "header-logo";
  const profileContainer = document.createElement("div");
  profileContainer.className = "header-profile";
  const profileImage = document.createElement("img");
  profileImage.src = "img/dueña.jpg";
  profileImage.alt = "Profile Picture";
  profileImage.className = "profile-image";
  const welcomeMessage = document.createElement("p");
  welcomeMessage.className = "welcome-message";
  welcomeMessage.textContent = "Bienvenido/a, [Nombre de Usuario]";
  const logoutButton = document.createElement("button");
  logoutButton.className = "logout-button";
  const logoutIcon = document.createElement("i");
  logoutIcon.className = "fa-solid fa-right-from-bracket";
  logoutButton.appendChild(logoutIcon);
  profileContainer.appendChild(profileImage);
  profileContainer.appendChild(welcomeMessage);
  headerElement.appendChild(logoImage);
  headerElement.appendChild(profileContainer);
  headerElement.appendChild(logoutButton);



  

  //* Footer
  const footerElement = document.createElement("footer");
  footerElement.id = "footer";
  const homeButton = document.createElement("button");
  homeButton.className = "footer-home";
  const homeIcon = document.createElement("i");
  homeIcon.className = "fa-solid fa-house"; 
  const profileButton = document.createElement("button");
  profileButton.className = "profile-button";
  const profileIcon = document.createElement("i");
  profileIcon.className = "fa-solid fa-paw";
  profileIcon.id = "profile-icon";

  profileIcon.addEventListener("click", () => {
    // Acá debería usar la función AddPost 
    console.log("HEY")
    const dialog = document.createElement("dialog");
    dialog.open = true;
    dialog.className = "dialog-posting";
    
    const btnSalir = document.createElement("i");
    btnSalir.className ="fa-solid fa-xmark";
    btnSalir.id = "exit-buttom";
    btnSalir.addEventListener("click", () => {
      dialog.open = false;
    });
    const inputCont = document.createElement("div");
    const inputPost = document.createElement("textarea");
    inputPost.className= "input-post-textarea";
    const btndialog = document.createElement("button");
    btndialog.innerHTML = "Publicar";
    btndialog.className = "btn-principal";
    btndialog.id = "btn-submit-post";

    // El boton publicar debería trigerear la función add post con el contenido
    btndialog.addEventListener('click', () => {
      const postContent = inputPost.value;
      if (postContent.trim() !== '') {
        const user = auth.currentUser;
        if (user) {
          const name = user.displayName;
          const date = Timestamp.now();
          const postsCollection = collection(db, 'posts');
          addPost(postContent, name, date, postsCollection).then(() => {
            showPosts(name, postsSection); // Muestra los posts después de agregar uno nuevo
            inputPost.value = ''; // Limpia el área de texto después de la publicación
          });
        } else {
          console.error('User is not logged in.');
        }
      }
    });

    dialog.appendChild(btnSalir);
    dialog.appendChild(inputCont);
    inputCont.appendChild(inputPost);
    dialog.appendChild(btndialog);
    postingArea.appendChild(dialog);
  });

  sendPostButton.addEventListener('click', () => {
    const postContent = textArea.value;
    if (postContent.trim() !== '') {
      const user = auth.currentUser;
      if (user) {
        const name = user.displayName;
        const date = Timestamp.now();
        const postsCollection = collection(db, 'posts');
        addPost(postContent, name, date, postsCollection).then(() => {
          // Después de agregar un post, actualiza la lista de posts
          showPosts(name, postingArea);
          textArea.value = ''; // Limpia el área de texto después de la publicación
        });
      } else {
        console.error('El usuario no ha iniciado sesión.');
      }
    }
  });

  const dogButton = document.createElement("button");
  dogButton.className = "footer-button";
  
  const dogIcon = document.createElement("i");
  dogIcon.className = "fa-solid fa-dog";
  // Agregar cosas
  homeButton.appendChild(homeIcon);
  profileButton.appendChild(profileIcon);
  dogButton.appendChild(dogIcon);

  footerElement.appendChild(homeButton);
  footerElement.appendChild(profileButton);
  footerElement.appendChild(dogButton);

  mainElement.appendChild(headerElement);
  mainElement.appendChild(postingArea);
  mainElement.appendChild(footerElement);

  return mainElement;
}

export default feed;