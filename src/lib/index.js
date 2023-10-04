import {
  updateProfile,
} from 'firebase/auth';

import {
  addDoc, collection, Timestamp, getDocs, query, orderBy,
} from 'firebase/firestore';

import { db, auth } from './firebaseConfig.js';

// añadir post a la db
const addPost = async (post) => {
  const user = auth.currentUser;
  if (user) {
    const name = user.displayName;
    const date = Timestamp.now();
    const postsCollection = collection(db, 'posts');
    await addDoc(postsCollection, {
      name,
      post,
      date,
      likes: [],
      likesCount: 0,
    });
  } else {
    console.error('User is not logged in.'); // Handle the case when user is not logged in
  }
};
// obtener posts de la db
function getPosts(callback) {
  const postsCollection = collection(db, 'posts');

  // Querry consulta para obtener todos los documentos en la colección "posts"
  const q = query(postsCollection, orderBy('date', 'desc'))

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
const createPostElement = async (array) => {
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

  const likeButton = document.createElement("div");
  likeButton.className = "like-button";

  const likeButtonInner = document.createElement("button");
  likeButtonInner.className = "action-button";

  const likeIconSolid = document.createElement("i");
  likeIconSolid.className = "fa-solid fa-paw";

  const likeIconCustom = document.createElement("i");
  likeIconCustom.className = "paw";

  likeButtonInner.appendChild(likeIconSolid);
  likeButtonInner.appendChild(likeIconCustom);
  likeButton.appendChild(likeButtonInner);

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

const showPosts = async (array) => {
  // Limpiar el contenedor para evitar los duplicados
  postsContainer.innerHTML = '';
  // Aplica la función de hacer elementos para cada elemento del array generando los elementos de posts y agregandolos al postArea
  array.forEach((post) => {
    const postElement = createPostElement(post); 
    postingArea.appendChild(postElement);
  });
};

const updateDisplayName = async (newDisplayName) => {
  try {
    // Actualiza el nombre de usuario con el current user
    await updateProfile(auth.currentUser, {
      displayName: newDisplayName,
    });

    // Devuelve true si la actualización se realizó correctamente
    return true;
  } catch (error) {
    
    return error.message; 
  }
};




export {
  addPost,
  getPosts,
  createPostElement,
  showPosts,
  updateDisplayName,
};

