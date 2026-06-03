const email = document.getElementById("email");
const password = document.getElementById("password");
const btn_sesion = document.getElementById("btn_sesion");

if (localStorage.getItem("sesion") !== null) {
    window.location.href = "index.html";
}

function iniciar_sesion() {
   
    let emailIngresado = email.value.trim().toLowerCase();
    let passIngresada = password.value;

    let textoUsuarios = localStorage.getItem("usuarios_local");
    
    if (textoUsuarios !== null) {
        let usuariosLocales = JSON.parse(textoUsuarios);
  
        for (let i = 0; i < usuariosLocales.length; i++) {
            
            if (usuariosLocales[i].email.toLowerCase() === emailIngresado && usuariosLocales[i].password === passIngresada) {
                

                localStorage.setItem("sesion", JSON.stringify(usuariosLocales[i]));
                
                Swal.fire({
                    icon: "success",
                    title: "¡Bienvenido de nuevo!",
                    text: "Inicio de sesión correcto."
                }).then(function() {
                    window.location.href = "index.html";
                });
                
                return; 
            }
        }
    }
    
    fetch("./public/js/db/usuarios.json")
    .then(function(respuesta) {
        return respuesta.json();
    })
    .then(function(datos_json) {
        let encontradoJSON = false;
        let usuarioMatch = null;

        for (let i = 0; i < datos_json.length; i++) {
            if (datos_json[i].email.toLowerCase() === emailIngresado && datos_json[i].password === passIngresada) {
                encontradoJSON = true;
                usuarioMatch = datos_json[i];
                break;
            }
        }

        if (encontradoJSON === true) {
       
            localStorage.setItem("sesion", JSON.stringify(usuarioMatch));
            
            Swal.fire({
                icon: "success",
                title: "¡Bienvenido!",
                text: "Inicio de sesión correcto."
            }).then(function() {
                window.location.href = "index.html";
            });
            
        } else {
            Swal.fire({
                icon: "warning",
                title: "Error al iniciar sesión!",
                text: "Credenciales de acceso no validas"
            });
        }
    })
    .catch(function(error) {
        console.error("Error al leer el JSON:", error);
    });
}


if (btn_sesion !== null) {
    btn_sesion.addEventListener('click', function () {
        if (email.value === "" || password.value === "") {
            Swal.fire({
                icon: "warning",
                title: "Campos vacíos",
                text: "Por favor ingresa tu correo y contraseña."
            });
            return;
        }
        
        iniciar_sesion();
    });
}
