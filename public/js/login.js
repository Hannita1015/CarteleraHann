const email = document.getElementById("email");
const password = document.getElementById("password");
const btn_sesion = document.getElementById("btn_sesion");
let posicion = "";

if (localStorage.getItem("sesion")) {
    window.location = "index.html"
}

function buscar_usuario(datos) {
    for (let i = 0; i < datos.length; i++) {
        if (datos[i].email == email.value) {
            if (datos[i].password == password.value) {
                posicion = i;
                return true;  
            }
        }
    }
    return false;
}

function iniciar_sesion() {
    fetch("./public/js/db/usuarios.json")
    .then(function(datos){
        return datos.json()
    })
    .then(function(datos_json){
        if (buscar_usuario(datos_json)) {
            let datos_usuario = datos_json[posicion];
            
            let cadena = JSON.stringify(datos_usuario);
            localStorage.setItem("sesion", cadena);
            
            Swal.fire({
                icon : "success",
                title : "Inicio de sesión correcto!",
                text : "Todo bien todo correcto y yo que me alegro"
            }).then(function() {
                window.location.href = "index.html";
            });

        } else {
            Swal.fire({
                icon : "warning",
                title : "Error al iniciar sesión!",
                text : "Credenciales de acceso no validas"
            });
        };
    })
}
btn_sesion.addEventListener('click', function () {
    iniciar_sesion()
})