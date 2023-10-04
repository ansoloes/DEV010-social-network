// // file feed.js
import  {addPost, createPostElement, showPosts, getPosts}  from "../lib/index.js";

// // importar firestore components maybe
import {addDoc, collection, Timestamp, getDocs, query, orderBy, onSnapshot} from 'firebase/firestore';
import { auth, db } from "../lib/firebaseConfig.js";


function feed(navigateTo){
    //console.log('User actual', user);
    // acá traemos info del db, usamos ? para que no falle cuando sea null
    //const userID = user?.uid; 
   // const currentUserName = user?.displayName;
    const mainElement = document.createElement("main");
    mainElement.className = "main-8";
    
    const user = auth.currentUser;
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
    welcomeMessage.textContent = "Bienvenido/a, " + user.displayName;
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

    // * Ver los Posts
    getPosts((posts) => {

      showPosts(posts, postingArea);
    });

    //* Footer
    const footerElement = document.createElement("footer");
    footerElement.id = "footer";
    const homeButton = document.createElement("button");
    homeButton.className = "footer-home";
    const homeIcon = document.createElement("i");
    homeIcon.className = "fa-solid fa-house"; 
    // add event home icon to  feed view
    const profileButton = document.createElement("button");
    profileButton.className = "profile-button";
    // add event profile buttom to profile view
    const pawIcon = document.createElement("i");
    pawIcon.className = "fa-solid fa-paw";
    pawIcon.id = "profile-icon";

    pawIcon.addEventListener("click", ()=>{
      //TODO: Acá debería usar la función AddPost 
      const dialog = document.createElement("dialog");
      dialog.show();
      dialog.className = "dialog-posting";

      const inputCont = document.createElement("div");
      const inputPost = document.createElement("textarea");
      inputPost.className= "input-post-textarea";
      const btndialog = document.createElement("button");
      btndialog.innerHTML = "Publicar";
      btndialog.className = "btn-principal";
      btndialog.id = "btn-submit-post"

     //El boton publicar debería trigerear la función add post con el contenido
     //dialog.appendChild(btnSalir);
      dialog.appendChild(inputCont);
      inputCont.appendChild(inputPost);
      dialog.appendChild(btndialog);

      btndialog.addEventListener("click", () => {
        const postContent = inputPost.value.trim(); 
        // Obtén el contenido del textarea
        console.log(inputPost.value)
        if (postContent === "") {
        // Si el textarea está vacío, cierra el diálogo
        console.log("vacío");
        dialog.close();
        console.log(dialog.open)  
        } else {
          console.log("Hay contenido")
        // Si hay contenido, realizar acción 
        addPost(inputPost.value).then(()=>{
        dialog.close();
        // animación cargando 
        })
        // Luego, cierra el diálogo si es necesario.
        
        }
    });
      postingArea.appendChild(dialog);
    })

    const dogButton = document.createElement("button");
    dogButton.className = "footer-button";
  
    const dogIcon = document.createElement("i");
    dogIcon.className = "fa-solid fa-dog";
    // Agregar cosas
    homeButton.appendChild(homeIcon);
    profileButton.appendChild(pawIcon);
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