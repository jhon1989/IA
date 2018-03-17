var contador       = 0,
    contador2      = 0,
    swit           = 0,
    clearInterva,
    swit2          = 0,
    sumaValor      = 2,
    sumaValorIncre = 1,
    numVueltas     = 1,
    tipoLimpieza   = 1000;


$(function () {

    $('#tipoLimpieza').change(function () {
        tipoLimpieza = $('#tipoLimpieza').val();
    });

    $("#createMatriz").click( function () {
        createMatriz();
        ponerSucio();
        removeAttr();
    });

    $("#clean").click( function () {
        cancelar();
    });

    $("#basura").click( function () {
        createMatriz();
        ponerSucio();
    });

    $("#iniciar").click( function () {
        iniciar(tipoLimpieza);
        $("#basura").attr("disabled", "disabled");
    });

    $("#parar").click( function () {
        parar();
    });
});

function removeAttr() {
    $("#clean").removeAttr("disabled");
    $("#iniciar").removeAttr("disabled");
    $("#basura").removeAttr("disabled");
    $("#parar").removeAttr("disabled");
}

//Inicia la limpieza
function iniciar(value) {
    clearInterva = setInterval(function(){
        iniciarLimpieza();
    }, value);
}

//Pne basuras en el 20 de la tabla
function ponerSucio() {
    var iterador,
        clase,
        porcentaje = Math.floor((10*10) * 0.2);

    for (iterador = 0; iterador <= porcentaje; iterador++) {

        clase = Math.floor(Math.random() * (10*10)) - iterador;

        if (clase <= 9) {
            clase = '0' + clase;
        }

        $("#bloque" + clase).css('background-color', 'blue');
        $("#bloque" + clase).addClass('basura');
    }
}

// Para el proceso de limpieza
function parar() {
    clearInterval(clearInterva);
}

// Cancela todo el proceso de limpieza
function cancelar() {
     $("#numberFile").val("");
     $("#numberColumn").val("");
    contador       = 0,
    contador2      = 0,
    swit           = 0,
    clearInterva,
    swit2          = 0,
    sumaValor      = 2,
    sumaValorIncre = 1,
    numVueltas     = 1,
    tipoLimpieza   = 1000;
    parar();
}

function createMatriz() {

    // Crea un elemento <table> y un elemento <tbody>
    var tabla   = document.createElement("table");
    var tblBody = document.createElement("tbody");

    // Crea las celdas
    for (var i = 0; i < 10; i++) {
        // Crea las hileras de la tabla
        var hilera = document.createElement("tr");

        for (var j = 0; j < 10; j++) {
            // Crea un elemento <td> y un nodo de texto, haz que el nodo de
            // texto sea el contenido de <td>, ubica el elemento <td> al final
            // de la hilera de la tabla
            var celda = document.createElement("td");
            var div = document.createElement("div");

            var textoCelda = document.createTextNode("Bloque " + i + j);
            div.appendChild(textoCelda);
            celda.appendChild(div);
            div.setAttribute("id", 'bloque' +i+j);
            hilera.appendChild(celda);
        }

        // agrega la hilera al final de la tabla (al final del elemento tblbody)
        tblBody.appendChild(hilera);
    }

    // posiciona el <tbody> debajo del elemento <table>
    tabla.appendChild(tblBody);
    // Agregamos la tabla a a la pagina
    $("#matriz").empty().html(tabla);
    // modifica el atributo "border" de la tabla y lo fija a "2";
    tabla.setAttribute("border", "2");
    tabla.setAttribute("class", "table table-bordered");
}

//Iniciar recorido
function iniciarLimpieza() {
    var cases;

    if (contador < 10) {
        cases = '0' + contador;
    }

    if (contador2 > 9) {

        if (swit == 0) {
            swit  = 1;
            swit2 = 0;

            if (numVueltas == 1) {

                contador = contador + contador2;
                numVueltas++;
            } else {
                contador = contador + contador2 + 10;
            }

        } else {
            swit2 = 0;
            swit  = 0;
        }

        contador2      = 0;
        sumaValor      = 2;
        sumaValorIncre = 1;
    }

    if (contador > 9) {
        if (swit == 1) {
            if (swit2 == 0) {

                cases = contador - 1;
                swit2  = 1;
            } else {

                cases = contador - sumaValor;
                sumaValor++;
            }

        } else {

            if (swit2 == 0) {
                cases = contador;
                swit2 = 1;
            } else {

                cases = contador + sumaValorIncre;
                sumaValorIncre++;
            }
        }
    }

    $("#bloque" + cases).css('color', 'red');

    contador2++;

    if (contador < 10) {
        contador++;
    }
}