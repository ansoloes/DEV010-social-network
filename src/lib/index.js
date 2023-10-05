import {
  updateProfile,
} from 'firebase/auth';

import {
  addDoc, collection, Timestamp, getDoc, query, orderBy,onSnapshot, doc, deleteDoc, updateDoc, arrayUnion, arrayRemove 
} from 'firebase/firestore';

import { db, auth } from './firebaseConfig.js';

// añadir post a la db
const addPost = async (post) => {
  const user = auth.currentUser;
  if (user) {
    const name = user.displayName;
    const userID = user.uid;
    const date = Timestamp.now().toDate().toLocaleString();
    const postsCollection = collection(db, 'posts');
    await addDoc(postsCollection, {
      name,
      date,
      post,
      userID, // Almacenar el ID del usuario para poder reconocer los propios
      like:[], 
    });
  } else {
    
    console.log("no estás autenticado hermano, vete")
    //! Podríamos hacer un dialog que diga "Oops! no estás autorizado Inicia Sesión o Registrate (botones)"
  }
}

// obtener posts de la db
function getPosts(callback) {
  const postsCollection = collection(db, 'posts');

  // Querry consulta para obtener todos los documentos en la colección "posts"
  const q = query(postsCollection, orderBy('date', 'asc'))

  // Utiliza onSnapshot para escuchar cambios en la colección
  onSnapshot(q, (querySnapshot) => {
    const posts = [];

    // Itera a través de los documentos en la colección
    querySnapshot.forEach((doc) => {
      // Obtén los datos de cada documento y agrega a un arreglo
      const postData = doc.data();
      posts.push({
        id: doc.id,
        ...postData,
      });
    });
    // Función callback con los datos de posts
    callback(posts);
  });
}


// generar elementos de los que consta un post
// 
const createPostElement = (post) => {
  const postContainer = document.createElement("div");
  postContainer.className = "post-container";

  const profileContainerPost = document.createElement("div");
  profileContainerPost.className = "profile-container";

  const profileImgPost = document.createElement("img");
  profileImgPost.src = "img/dueña.jpg";
  profileImgPost.alt = "Profile Image";
  profileImgPost.className = "profile-image";

  profileContainerPost.appendChild(profileImgPost);

  const actions = document.createElement("div");
  actions.className = "actions";
  if (post.userID === auth.currentUser.uid) {
    const deleteButton = document.createElement("button");
    deleteButton.className = "action-button";

    const deleteIcon = document.createElement("i");
    deleteIcon.className = "fa-regular fa-trash-can";

    deleteButton.appendChild(deleteIcon);

    const editButton = document.createElement("button");
    editButton.className = "action-button";

    const editIcon = document.createElement("i");
    editIcon.className = "fa-solid fa-pen-to-square";

    editButton.appendChild(editIcon);

    actions.appendChild(deleteButton);
    actions.appendChild(editButton);
  
    // Agrega un evento de clic al botón de edición
    editButton.addEventListener("click", () => {
      const newText = prompt("Edit your post:", post.post);
      if (newText !== null) {
        // Actualiza el contenido del post en Firestore
        const postRef = doc(db, "posts", post.id);
        updateDoc(postRef, { post: newText });
      }
    });
  
    // Agrega un evento de clic al botón de borrado
    deleteButton.addEventListener("click", async () => {
      const confirmDelete = confirm("Are you sure you want to delete this post?");
      if (confirmDelete) {
        // Elimina el post de Firestore
        const postRef = doc(db, "posts", post.id);
        await deleteDoc(postRef);
      }
    });
  }

  const likeButton = document.createElement("div");
  likeButton.className = "like-button";

  const likeButtonInner = document.createElement("button");
  likeButtonInner.className = "action-button";

  const likeIconSolid = document.createElement("i");
  likeIconSolid.className = "fa-solid fa-paw";

  const likeIconRegular = document.createElement("i");
  likeIconRegular.className = "fa-thin fa-paw";

  const likeCount = document.createElement("span");
  likeCount.className = "like-count";
  likeCount.textContent = post.like.length; // conteo likes

  likeButtonInner.addEventListener("click", async () => {
    const postRef = doc(db, "posts", post.id);
    const postSnapshot = await getDoc(postRef);
    const likesArray = postSnapshot.data().like || [];

    if (likesArray.includes(auth.currentUser.uid)) {
      await updateDoc(postRef, { like: arrayRemove(auth.currentUser.uid) });
    } else {
      await updateDoc(postRef, { like: arrayUnion(auth.currentUser.uid) });
    }
  });

  // Verifica si el usuario le ha dado like
  if (post.like.includes(auth.currentUser.uid)) {
    likeButtonInner.appendChild(likeIconSolid);
  } else {
    likeButtonInner.appendChild(likeIconRegular);
  }

  likeButton.appendChild(likeButtonInner);
  likeButton.appendChild(likeCount);

  const postContent = document.createElement("div");
  postContent.className = "post-content";

  const username = document.createElement("h4");
  username.className = "username";
  username.textContent = post.name; 

  const timestamp = document.createElement("p");
  timestamp.className = "timestamp";
  timestamp.textContent = post.date; 

  const postText = document.createElement("p");
  postText.className = "post-text";
  postText.textContent = post.post; 

  postContent.appendChild(username);
  postContent.appendChild(timestamp);
  postContent.appendChild(postText);

  postContainer.appendChild(profileContainerPost);
  postContainer.appendChild(actions);
  postContainer.appendChild(likeButton);
  postContainer.appendChild(postContent);


  return postContainer;
};

// creo que esto hay que usar para el profile custom
const updateDisplayName = async (newDisplayName) => {
  try {
    // Actualiza el nombre de usuario con el current user
    await updateProfile(auth.currentUser, {
      displayName: newDisplayName,
    });
    return true;
  } catch (error) {
    
    return error.message; 
  }
};

const showPosts = async (array, postingArea) => {
  // Limpiar el contenedor para evitar los duplicados
  postingArea.innerHTML = '';
  // Aplica la función de hacer elementos para cada elemento del array generando los elementos de posts y agregandolos al postArea
  array.forEach((post) => {
    const postElement = createPostElement(post); 
    postingArea.appendChild(postElement);
  });
};
const showMyPosts = async (posts, postingArea) => {
  const user = auth.currentUser;

  const myPosts = posts.filter((post) => post.userID === user.uid);
 
  postingArea.innerHTML = '';

  myPosts.forEach((post) => {
    const postElement = createPostElement(post);
    postingArea.appendChild(postElement);
  });
};


export {
  addPost,
  getPosts,
  createPostElement,
  showPosts,
  updateDisplayName,
  showMyPosts
};