const profile = (navigateTo) => {
  const mainElement = document.createElement("main");
  mainElement.className = "main-9";

  // * Vista Header
  const headerElement = document.createElement("header");
    headerElement.id = "header";
    headerElement.className = "vista-8-header";
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
}