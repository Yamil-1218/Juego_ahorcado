// ### VARIABLES ###

// Array de palabras
var palabras = [
  ["javascript", "Lenguaje usado en la web"],
  ["html", "Estructura básica de una página web"],
  ["css", "Estilo y diseño de una página"],
  ["react", "Biblioteca de JavaScript para interfaces"],
  ["angular", "Framework de JavaScript de Google"],
  ["bootstrap", "Framework para estilos web"],
  ["node", "Entorno de ejecución para JavaScript"],
  ["jquery", "Biblioteca JavaScript para manipular DOM"],
  ["json", "Formato de intercambio de datos"],
  ["ajax", "Método para cargar datos sin recargar"],
  ["php", "Lenguaje de servidor muy popular"],
  ["sql", "Lenguaje para gestionar bases de datos"],
  ["xml", "Formato de datos similar a HTML"],
  ["dom", "Modelo de objetos del documento"],
  ["vue", "Framework progresivo para interfaces"],
  ["sass", "Preprocesador de CSS"],
  ["webpack", "Herramienta para empaquetar recursos"],
  ["typescript", "Superconjunto de JavaScript"],
  ["rest", "Estilo arquitectónico para APIs"],
  ["django", "Framework de Python para la web"]
];

// Palabra a averiguar
var palabra = "";
// Nº aleatorio
var rand;
// Palabra oculta
var oculta = [];
// Elemento html de la palabra
var hueco = document.getElementById("palabra");
// Contador de intentos
var cont = 6;
// Botones de letras
var buttons = document.getElementsByClassName('letra');
// Boton de reset
var btnInicio = document.getElementById("reset");

// ### FUNCIONES ###

// Escoger palabra al azar
function generaPalabra() {
  rand = (Math.random() * 19).toFixed(0);
  palabra = palabras[rand][0].toUpperCase();
  console.log(palabra);
}

// Funcion para pintar los guiones de la palabra
function pintarGuiones(num) {
  for (var i = 0; i < num; i++) {
    oculta[i] = "_";
  }
  hueco.innerHTML = oculta.join("");
}

function compruebaFin() {
  if (oculta.indexOf("_") == -1) {
    ganar();  // Si no hay más guiones, el jugador ha ganado
  } else if (cont == 0) {
    gameOver();  // Si los intentos se agotan, el jugador ha perdido
  }
}

// Generar abecedario
function generaABC(a, z) {
  document.getElementById("abcdario").innerHTML = "";
  var i = a.charCodeAt(0), j = z.charCodeAt(0);
  var letra = "";
  for (; i <= j; i++) {
    letra = String.fromCharCode(i).toUpperCase();
    document.getElementById("abcdario").innerHTML += "<button value='" + letra + "' onclick='intento(\"" + letra + "\")' class='letra' id='" + letra + "'>" + letra + "</button>";
    if (i == 110) {
      document.getElementById("abcdario").innerHTML += "<button value='Ñ' onclick='intento(\"Ñ\")' class='letra' id='Ñ'>Ñ</button>";
    }
  }
}

// Revisar intento
function intento(letra) {
  document.getElementById(letra).disabled = true;

  if (palabra.indexOf(letra) !== -1) {
    // La letra está en la palabra
    for (let i = 0; i < palabra.length; i++) {
      if (palabra[i] === letra) oculta[i] = letra;
    }
    hueco.innerHTML = oculta.join("");
    document.getElementById("acierto").innerHTML = "¡Bien!";
    document.getElementById("acierto").className += " acierto verde";
  } else {
    // La letra no está en la palabra
    cont--;
    document.getElementById("intentos").innerHTML = cont;

    // Ocultar todas las imágenes ANTES de mostrar la nueva
    for (let i = 0; i <= 6; i++) {
      document.getElementById("image" + i).style.display = "none";
    }

    // Mostrar solo la imagen correspondiente
    if (cont >= 0) {
      document.getElementById("image" + (6 - cont)).style.display = "block";
    }

    document.getElementById("acierto").innerHTML = "¡Fallo!";
    document.getElementById("acierto").className += " acierto rojo";
  }

  compruebaFin();

  setTimeout(() => {
    document.getElementById("acierto").className = "";
  }, 800);
}

// Fin de juego
function gameOver() {
  document.getElementById("msg-final").innerHTML = "¡Perdiste! La palabra era: " + palabra;
  mostrarImagen(6);
  deshabilitarBotones();
}

// Ganar
function ganar() {
  document.getElementById("msg-final").innerHTML = "¡Ganaste!";
  deshabilitarBotones();
}

// Mostrar imagen
function mostrarImagen(n) {
  for (var i = 0; i < 7; i++) {
    document.getElementById("image" + i).classList.remove('fade-in');
  }
  document.getElementById("image" + n).classList.add('fade-in');
}

// Iniciar juego
// Iniciar juego
function inicio() {
  // Resetea el contador de intentos
  cont = 6;
  document.getElementById("intentos").innerHTML = cont;
  
  // Genera una nueva palabra
  generaPalabra();
  pintarGuiones(palabra.length);

  // Limpia los guiones de la palabra
  oculta = [];
  for (var i = 0; i < palabra.length; i++) {
    oculta[i] = "_";
  }
  hueco.innerHTML = oculta.join("");

  // Genera las letras del abecedario
  generaABC("A", "Z");

  // Limpia los mensajes de finalización
  document.getElementById("msg-final").innerHTML = "";
  document.getElementById("acierto").innerHTML = "";

  // Limpia la pista
  document.getElementById("hueco-pista").innerHTML = "";

  // Habilita los botones
  deshabilitarBotones(false);

  // Oculta todas las imágenes del ahorcado
  for (var i = 0; i <= 6; i++) {
    document.getElementById("image" + i).style.display = 'none';
  }

  // Muestra la imagen inicial (vacía)
  document.getElementById("image0").style.display = 'block';
}

// Deshabilitar botones
function deshabilitarBotones(deshabilitar = true) {
  var letras = document.getElementsByClassName('letra');
  for (var i = 0; i < letras.length; i++) {
    letras[i].disabled = deshabilitar;
  }
}

// Pista
function pista() {
  // Verifica si ya se ha dado una pista o si el juego ha terminado
  if (cont > 0 && oculta.includes('_')) {
    var pista = palabras[rand][1];
    document.getElementById("hueco-pista").innerHTML = "Pista: " + pista;
  }
}

// Llamada inicial para arrancar el juego
inicio();
