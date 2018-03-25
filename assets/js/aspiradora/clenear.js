var clearInterva,
    tipoLimpieza   = 10,
    totalRecorido  = 1,
    totalBasura    = 0,
    rows           = 0,
    columns        = 0,
    contadorClase  = 0,
    claseEliminaImagen = 0,
    numberPercent      = 0,
    arraySucio = [];

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
        calcularPorcentajeSucio();
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
        calcularPorcentajeSucio();
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
        iniciarLimpieza(totalRecorido);
        totalRecorido++;

        if (totalRecorido == arraySucio.length) {
            $("#totalRecorrido").text((columns * rows));
            $("#totalLimpio").text((columns * rows) - totalBasura);
            $("#totalSucio").text(totalBasura);
            $("#myModal").modal("show");
            parar();
        }

    }, value);
}

//Pone basuras en el 20 de la tabla
function calcularPorcentajeSucio() {
    var porcentaje = Math.floor((rows * columns) * (numberPercent/100));

    while(arraySucio.length < porcentaje){
        var randomnumber = Math.floor(Math.random() * Math.floor((rows * columns)) + 1);
        if(arraySucio.indexOf(randomnumber) > -1) {

            continue;
        }
        arraySucio[arraySucio.length] = randomnumber;
    }

    poneSocio();
}

function poneSocio() {
    var iterador;
    for (iterador = 0; iterador <= arraySucio.length; iterador++) {

        $("#bloque" + arraySucio[iterador]).addClass('basura glyphicon glyphicon-trash');
    }
}

// Para el proceso de limpieza
function parar() {
    clearInterval(clearInterva);
}

// Cancela todo el proceso de limpieza
function cancelar() {
    rows           = 0;
    columns        = 0;
    clearInterva;
    tipoLimpieza   = 1000;
    totalRecorido  = 0;
    totalBasura    = 0;
    contadorClase  = 0;
    claseEliminaImagen = 0;
    numberPercent      = 0,
    arraySucio         = [];
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
function iniciarLimpieza(indice) {
    var cases = arraySucio[indice];

    //Valida si la matriz tiene basura
    if ($("#bloque" + cases).hasClass("glyphicon-trash")) {

        $("#bloque" + cases).fadeOut(3000, function() {

            $("#bloque" + cases).removeClass("glyphicon-trash");
        });

        $("#bloque" + cases).css('color', 'red');
        totalBasura++;

        $(".bloque" + claseEliminaImagen).css("visibility", "hidden");
        $(".bloque" + cases).css("visibility", "visible");
    }

    claseEliminaImagen = cases;
}