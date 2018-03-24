var contador       = 1,
    contador2      = 1,
    swit           = 0,
    clearInterva,
    swit2          = 0,
    sumaValor      = 2,
    sumaValorIncre = 1,
    numVueltas     = 1,
    tipoLimpieza   = 10,
    totalRecorido  = 0,
    totalBasura    = 0,
    rows           = 10,
    columns        = 10,
    contadorClase  = 0,
    claseEliminaImagen = 0,
    numberPercent      = 0;

// Inicia los componentes cuando halla cargado la pagina
$(function () {

    $('#tipoLimpieza').change(function () {
        tipoLimpieza = $('#tipoLimpieza').val();
    });

    $("#createMatriz").click( function () {
        cancelar();

        getValores();

        if (isNaN(rows) || isNaN(columns)) {
            return alerta();
        }

        if (rows != columns) {
            return alerta();
        }

        if (rows < 5 || rows > 20) {
            return alerta();
        }

        if (numberPercent < 10 || numberPercent > 90 || isNaN(numberPercent)) {
            return alertaPorcentage();
        }

        createMatriz();
        ponerSucio();
        removeAttr();
    });

    $("#clean").click( function () {
        cancelar();
        createMatriz();
        removeAttr();
    });

    $("#basura").click( function () {
        cancelar();
        getValores();

        if (isNaN(rows) || isNaN(columns)) {
            return alerta();
        }

        if (rows != columns) {
            return alerta();
        }

        if (rows < 5 || rows > 20) {
            return alerta();
        }

        if (numberPercent < 10 || numberPercent > 90 || isNaN(numberPercent)) {
            return alertaPorcentage();
        }

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

function getValores() {
    rows    = parseInt($("#numberFile").val());
    columns = parseInt($("#numberColumn").val());
    numberPercent = parseInt($("#numberPercent").val());
}

//Habilitar los botones
function removeAttr() {
    $("#iniciar").removeAttr("disabled");
    $("#clean").removeAttr("disabled");
    $("#basura").removeAttr("disabled");
    $("#parar").removeAttr("disabled");
}

function  alerta() {

    alert("Valores no permitidos, Valores permitidos(5*5 hasta 20*20)")
    $("#numberFile").focus();
    return;
}

function  alertaPorcentage() {

    alert("Procentaje no permitido, porcentaje permitido(10 a 90)")
    $("#numberPercent").focus();
    return;
}


//Inicia la limpieza
function iniciar(value) {
    clearInterva = setInterval(function(){
        iniciarLimpieza();
        totalRecorido++;

        if (totalRecorido == rows * columns) {
            $("#totalRecorrido").text(totalRecorido);
            $("#totalLimpio").text(totalRecorido - totalBasura);
            $("#totalSucio").text(totalBasura);
            $("#myModal").modal("show");
            parar();
        }

    }, value);
}

//Pone basuras en el 20 de la tabla
function ponerSucio() {
    var iterador,
        porcentaje = Math.floor((rows * columns) * (numberPercent/100));

    var arr = [];
    while(arr.length < porcentaje){
        var randomnumber = Math.floor(Math.random() * Math.floor((rows * columns)) + 1);
        if(arr.indexOf(randomnumber) > -1) {

            continue;
        }
        arr[arr.length] = randomnumber;
    }

    for (iterador = 0; iterador <= arr.length; iterador++) {

        $("#bloque" + arr[iterador]).addClass('basura glyphicon glyphicon-trash');
    }
}

// Para el proceso de limpieza
function parar() {
    clearInterval(clearInterva);
}

// Cancela todo el proceso de limpieza
function cancelar() {
    rows           = 10;
    columns        = 10;
    contador       = 1;
    contador2      = 1;
    swit           = 0;
    clearInterva;
    swit2          = 0;
    sumaValor      = 2;
    sumaValorIncre = 1;
    numVueltas     = 1;
    tipoLimpieza   = 1000;
    totalRecorido  = 0;
    totalBasura    = 0;
    contadorClase  = 0;
    claseEliminaImagen = 0;
    parar();
}

function createMatriz() {

    // Crea un elemento <table> y un elemento <tbody>
    var tabla   = document.createElement("table");
    var tblBody = document.createElement("tbody");

    // Crea las celdas
    for (var i = 0; i < rows; i++) {
        // Crea las hileras de la tabla
        var hilera = document.createElement("tr");

        for (var j = 0; j < columns; j++) {
            // Crea un elemento <td> y un nodo de texto, haz que el nodo de
            // texto sea el contenido de <td>, ubica el elemento <td> al final
            // de la hilera de la tabla

            contadorClase++;
            var celda = document.createElement("td");
            var div = document.createElement("div");

            var textoCelda = document.createTextNode("");
            div.appendChild(textoCelda);

            var imagen = document.createElement("img");
            imagen.src = 'assets/images/limpiesa.gif';
            imagen.width  = 60;
            imagen.height = 60;
            imagen.setAttribute("class", 'bloque' +contadorClase);
            imagen.style.visibility ="hidden";
            div.appendChild(imagen);

            celda.appendChild(div);
            div.setAttribute("id", 'bloque' +contadorClase);
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
    var cases = contador;

    if (contador2 > columns) {

        if (swit == 0) {
            swit  = 1;
            swit2 = 0;

            if (numVueltas == 1) {
                contador = contador + contador2;
                numVueltas++;
            } else {
                contador = contador + contador2 + columns - 1;
            }

        } else {
            swit2 = 0;
            swit  = 0;
        }

        contador2      = 1;
        sumaValor      = 2;
        sumaValorIncre = 1;
    }

    if (contador > columns) {
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

    //Valida si la matriz tiene basura
    if ($("#bloque" + cases).hasClass("glyphicon-trash")) {

        $("#bloque" + cases).fadeOut(3000, function() {

            $("#bloque" + cases).removeClass("glyphicon-trash");
        });

        $("#bloque" + cases).css('color', 'red');
        totalBasura++;

        $(".bloque" + claseEliminaImagen).css("visibility", "hidden");
        $(".bloque" + cases).css("visibility", "visible");
    } else {
        $(".bloque" + claseEliminaImagen).css("visibility", "hidden");
        $(".bloque" + cases).css("visibility", "visible");

    }


    if (contador > columns) {
        if (swit == 1) {
            claseEliminaImagen = cases;
        } else {
            claseEliminaImagen = cases;
        }
    }

    if (contador < columns) {
        contador++;
    }

    if (contador <= columns) {
        claseEliminaImagen++;
    }

    contador2++;
}