// file feed.js
//import {addPost} from "../lib/index";
import { db } from '../lib/firebaseConfig.js';


function feed(navigateTo){
    //console.log('User actual', user);
    // acá traemos info del db, usamos ? para que no falle cuando sea null
    //const userID = user?.uid; 
   // const currentUserName = user?.displayName;
    const mainElement = document.createElement("main");
    mainElement.className = "main-8";
  
    //* Header
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

    //* Posting area
    const postingArea = document.createElement("section");
    postingArea.className = "posting-area";
      // * Crear posts
     // sectionPosts.appendChild(addPost())
    // * La función onSnapshot escucha cambios en una consulta
    // para actualizar el contenido del feed
    //agregar funcion onsnap para poder  actualizar el feed en tiempo real
    //const actual = query(collection(db, 'posts'), orderBy('date', 'desc')); //ordenado por date
    // acá debería ir una función que sea como "postGenerator" que haga el contenido

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

    profileIcon.addEventListener("click", ()=>{
      //Acá debería usar la función AddPost 
      console.log("HEY")
      const dialog = document.createElement("dialog");
      dialog.open = true;
      dialog.className = "dialog-posting"
      
      const btnSalir = document.createElement("i");
      btnSalir.className ="fa-solid fa-xmark";
      btnSalir.id = "exit-buttom"
      btnSalir.addEventListener("click", ()=>{
        dialog.open = false;
      })
      const inputCont = document.createElement("div");
      const inputPost = document.createElement("textarea");
      inputPost.className= "input-post-textarea";
      const btndialog = document.createElement("button");
      btndialog.innerHTML = "Publicar";
      btndialog.className = "btn-principal";
      btndialog.id = "btn-submit-post"

      //El boton publicar debería trigerear la función add post con el contenido
      dialog.appendChild(btnSalir);
      dialog.appendChild(inputCont);
      inputCont.appendChild(inputPost);
      dialog.appendChild(btndialog);
      postingArea.appendChild(dialog);

    })
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