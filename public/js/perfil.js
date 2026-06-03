
let usuario = JSON.parse(localStorage.getItem("sesion"));

if (usuario === null) {
    window.location.href = "login.html";
} else {
    document.getElementById("ver_nombre").value = usuario.nombre;
    document.getElementById("ver_email").value = usuario.email;
    document.getElementById("ver_password").value = usuario.password;
}