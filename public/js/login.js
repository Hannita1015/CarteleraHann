const email = document.getElementById("email");
const password = document.getElementById("password");
const btn_sesion = document.getElementById("btn_sesion");

// --- 1. CANDADO DE SESIÓN ---
// Si ya hay sesión activa, te pasa directo al catálogo
if (localStorage.getItem("sesion") !== null) {
    window.location.href = "index.html";
}

function iniciar_sesion() {
    // Limpiamos los datos: quitamos espacios extra y pasamos el correo a minúsculas
    let emailIngresado = email.value.trim().toLowerCase();
    let passIngresada = password.value;

    // ==========================================
    // PASO 1: BUSCAR EN LOS USUARIOS NUEVOS (LocalStorage)
    // ==========================================
    let textoUsuarios = localStorage.getItem("usuarios_local");
    
    if (textoUsuarios !== null) {
        let usuariosLocales = JSON.parse(textoUsuarios);
        
        // Ciclo for clásico para revisar tu bóveda local
        for (let i = 0; i < usuariosLocales.length; i++) {
            
            // Comparamos asegurándonos de que ambos correos estén en minúsculas
            if (usuariosLocales[i].email.toLowerCase() === emailIngresado && usuariosLocales[i].password === passIngresada) {
                
                // ¡Lo encontró! Guardamos la sesión
                localStorage.setItem("sesion", JSON.stringify(usuariosLocales[i]));
                
                Swal.fire({
                    icon: "success",
                    title: "¡Bienvenido de nuevo!",
                    text: "Inicio de sesión correcto."
                }).then(function() {
                    window.location.href = "index.html";
                });
                
                return; // ⛔ DETENEMOS LA FUNCIÓN AQUÍ PARA QUE NO BUSQUE EN EL JSON
            }
        }
    }

    // ==========================================
    // PASO 2: BUSCAR EN EL ARCHIVO JSON ESTÁTICO 
    // ==========================================
    // (El código solo llega hasta aquí si NO encontró al usuario en el paso 1)
    
    fetch("./public/js/db/usuarios.json")
    .then(function(respuesta) {
        return respuesta.json();
    })
    .then(function(datos_json) {
        let encontradoJSON = false;
        let usuarioMatch = null;

        // Ciclo for clásico para revisar el JSON
        for (let i = 0; i < datos_json.length; i++) {
            if (datos_json[i].email.toLowerCase() === emailIngresado && datos_json[i].password === passIngresada) {
                encontradoJSON = true;
                usuarioMatch = datos_json[i];
                break; // Rompemos el ciclo porque ya lo encontramos
            }
        }

        if (encontradoJSON === true) {
            // Guardamos la sesión
            localStorage.setItem("sesion", JSON.stringify(usuarioMatch));
            
            Swal.fire({
                icon: "success",
                title: "¡Bienvenido!",
                text: "Inicio de sesión correcto."
            }).then(function() {
                window.location.href = "index.html";
            });
            
        } else {
            // Si el código llegó hasta aquí, significa que no estaba en LocalStorage NI en el JSON
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

// --- ESCUCHADOR DEL BOTÓN ---
if (btn_sesion !== null) {
    btn_sesion.addEventListener('click', function () {
        // Pequeña validación para evitar que busque si las cajas están vacías
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