const catalogo = document.getElementById("catalogo");
let peliculasGlobales = []; 

if (localStorage.getItem("sesion") === null) {
    window.location.href = "login.html";
}

fetch("./public/js/db/catalogo.json")
.then(function (datos) {
    return datos.json();
}).then(function (datos_procesados) {
    peliculasGlobales = datos_procesados; 
    mostrar_catalogo(peliculasGlobales);  
});

function mostrar_catalogo(lista) {
    let contenido = "";
    for (let i = 0; i < lista.length; i++) {
        contenido += '<div class="card">' +
            '<h3>' + lista[i].titulo + '</h3>' +
            '<img class="img-responsiva" src="' + lista[i].img + '" alt="">' +
            '<p> <strong> Director(es) :</strong> ' + lista[i].director.join(", ") + '</p>' +
            '<p> <strong>Fecha de estreno :</strong> ' + lista[i].fecha_estreno + '</p>' +
            '<p> <strong>Genero :</strong> ' + lista[i].genero.join(", ") + '</p>' +
            '<p> <strong>Idioma :</strong> ' + lista[i].idioma.join(", ") + '</p>' +
            '<p> <strong>Subtitulos :</strong> ' + lista[i].subtitulos.join(", ") + '</p>' +
            '<p> <strong>Descripción :</strong> ' + lista[i].descripcion + '</p>' +
        '</div>';
    }
    catalogo.innerHTML = contenido;
}

let inputBuscador = document.getElementById("buscador");

if (inputBuscador !== null) {
    inputBuscador.addEventListener("keyup", function() {
        let textoEscrito = inputBuscador.value.toLowerCase();
        let peliculasFiltradas = [];
        for (let i = 0; i < peliculasGlobales.length; i++) {
            
            let tituloPeli = peliculasGlobales[i].titulo.toLowerCase();
            
            let fechaPeli = peliculasGlobales[i].fecha_estreno.toLowerCase();
            
            let directoresPeli = peliculasGlobales[i].director.join(" ").toLowerCase();

            if (tituloPeli.includes(textoEscrito) || fechaPeli.includes(textoEscrito) || directoresPeli.includes(textoEscrito)) {
             
                peliculasFiltradas.push(peliculasGlobales[i]); 
            }
        }
        
        mostrar_catalogo(peliculasFiltradas);
    });
}

let btnLogout = document.getElementById("btn_logout");

if (btnLogout !== null) {
    btnLogout.addEventListener("click", function() {
        localStorage.removeItem("sesion");
        window.location.href = "login.html";
    });
}

let selectCategoria = document.getElementById("filtro_categoria");

if (selectCategoria !== null) {
    selectCategoria.addEventListener("change", function() {

        let categoriaElegida = selectCategoria.value.toLowerCase();
        if (categoriaElegida === "todas") {
            mostrar_catalogo(peliculasGlobales);
            return; 
        }

        let peliculasFiltradas = []; 

        for (let i = 0; i < peliculasGlobales.length; i++) {
            let generosPeli = peliculasGlobales[i].genero.join(" ").toLowerCase();

            if (generosPeli.includes(categoriaElegida)) {
                peliculasFiltradas.push(peliculasGlobales[i]); 
            }
        }
        
        mostrar_catalogo(peliculasFiltradas);
    });
}