// file login.js
function login(NavigateTo) {
    const mainElement = document.createElement("main");
    mainElement.className = "main-5";
  
    // Título "Iniciar Sesión"
    const tituloIniciarSesion = document.createElement("h1");
    tituloIniciarSesion.textContent = "Iniciar Sesión";
  
    // Formulario de datos
    const formDatos = document.createElement("form");
    formDatos.action = "";
    formDatos.className = "form-datos";
  
    const labelCorreoElectronico = document.createElement("label");
    labelCorreoElectronico.textContent = "Ingresa tu correo electrónico:";
    labelCorreoElectronico.htmlFor = "login-correo-electronico";
  
    const inputCorreoElectronico = document.createElement("input");
    inputCorreoElectronico.type = "email";
    inputCorreoElectronico.id = "login-correo-electronico";
  
    const labelContraseña = document.createElement("label");
    labelContraseña.textContent = "Ingresa tu contraseña:";
    labelContraseña.htmlFor = "login-contraseña";
  
    const inputContraseña = document.createElement("input");
    inputContraseña.type = "password";
    inputContraseña.id = "login-contraseña";
  
    formDatos.appendChild(labelCorreoElectronico);
    formDatos.appendChild(inputCorreoElectronico);
    formDatos.appendChild(labelContraseña);
    formDatos.appendChild(inputContraseña);
  
    // Contenedor de botones
    const contenedorBtn = document.createElement("div");
    contenedorBtn.className = "contenedor-btn";
  
    const btnIniciarConGoogle = document.createElement("button");
    btnIniciarConGoogle.className = "btn-google";
    const imgGoogle = document.createElement("img");
    imgGoogle.src = "img/google.png";
    imgGoogle.alt = "ícono Google";
    btnIniciarConGoogle.appendChild(imgGoogle);
    btnIniciarConGoogle.textContent = "Iniciar con Google";
  
    const btnIniciarSesion = document.createElement("button");
    btnIniciarSesion.className = "btn-principal";
    btnIniciarSesion.textContent = "Iniciar Sesión";
  
    const linkOlvidasteContraseña = document.createElement("a");
    linkOlvidasteContraseña.href = "#";
    linkOlvidasteContraseña.textContent = "¿Olvidaste tu contraseña?";
  
    contenedorBtn.appendChild(btnIniciarConGoogle);
    contenedorBtn.appendChild(btnIniciarSesion);
    contenedorBtn.appendChild(linkOlvidasteContraseña);
  
    mainElement.appendChild(tituloIniciarSesion);
    mainElement.appendChild(formDatos);
    mainElement.appendChild(contenedorBtn);
  
    // Agregar la vista al body
    document.body.appendChild(mainElement);
  }
export default login;