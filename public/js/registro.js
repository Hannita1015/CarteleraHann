let btnRegistro = document.getElementById("btn_registro");

if (btnRegistro !== null) {
    btnRegistro.addEventListener("click", function() {
        
        let inputNombre = document.getElementById("name").value;
        let inputPaterno = document.getElementById("lastname_p").value;
        let inputMaterno = document.getElementById("lastname_m").value;
        let inputEmail = document.getElementById("email").value;
        let inputPassword = document.getElementById("password").value;

        if (inputNombre === "" || inputPaterno === "" || inputMaterno === "" || inputEmail === "" || inputPassword === "") {
            Swal.fire({
                icon: "warning",
                title: "Campos incompletos",
                text: "Por favor, llena todas las cajas de texto."
            });
            return; 
        }

        let textoUsuarios = localStorage.getItem("usuarios_local");
        let listaUsuarios = []; 

        if (textoUsuarios !== null) {
            listaUsuarios = JSON.parse(textoUsuarios);
        }

        for (let i = 0; i < listaUsuarios.length; i++) {
            if (listaUsuarios[i].email === inputEmail) {
                Swal.fire({
                    icon: "error",
                    title: "Correo duplicado",
                    text: "Este correo ya está registrado. Intenta con otro o inicia sesión."
                });
                return; 
            }
        }

        let nombreCompleto = inputNombre + " " + inputPaterno + " " + inputMaterno;

        let nuevoUsuario = {
            id: Date.now(),
            nombre: nombreCompleto,
            email: inputEmail,
            password: inputPassword,
            rol: "usuario"
        };

        listaUsuarios.push(nuevoUsuario);
        localStorage.setItem("usuarios_local", JSON.stringify(listaUsuarios));

        Swal.fire({
            icon: "success",
            title: "¡Registro Exitoso!",
            text: "Tu cuenta ha sido creada. Ahora puedes iniciar sesión."
        }).then(function() {
            window.location.href = "login.html";
        });

    });
}