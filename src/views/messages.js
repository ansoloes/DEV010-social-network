//file messages.js
function messages(NavigateTo){
    const title = document.createElement('h2');
    title.textContent = 'Imagina que acá hay mensajes :D';
    const imaginacion = document.createElement('img');
    imaginacion.src = "https://www.latercera.com/resizer/wvCMr6B4HSnbYmlIGtaDQVfuch4=/900x600/smart/arc-anglerfish-arc2-prod-copesa.s3.amazonaws.com/public/OI7WIZAY6NDH7AQHHZ2NLXTCX4.jpg";
    imaginacion.alt = "bobesponja";
    // al body
    document.body.appendChild(title);
    document.body.appendChild(imaginacion);
}
export default messages;