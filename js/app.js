// #1 - Seleccionan los elementos del DOM
const form = document.querySelector('#formulario');
const tweetList = document.querySelector('#lista-tweets');
// #2 - Revisar la estructura de datos
let tweets = [];

// #3 - Para evitar tener todos los elementos en global scope, event listeners dentro de una función
eventsListeners();

function eventsListeners() {
  //# 4 - Añadimos al evento al formulario
  form.addEventListener('submit', addTweet);
}

// #5 - Creamos una función para añadir tweets a la array, cuando se hace submit
function addTweet(event) {
  // #5.1 - Quitamos el comportamiento por defecto al submit
  event.preventDefault();
  //# 5.2 - Capturamos el valor del input
  const tweet = document.querySelector('#tweet').value;
  // #5.3 - Validación para evitar que viaje el input vacío
  if(tweet === '') {
    // # 5.4 - Funcion para mostrar el mensaje de error
    showErrorMessage('No se puede enviar un tweet vacío');
    return;
  }
  // #5.5 Almacenamos el valor en un objeto con un id
  const tweetObj = {
    tweet,
    id: Date.now()
  }
  // #5.6 Hago una copia fiel de la array, añado el elemento al final y llamos a una función para crear el HTML. Además, de resetear el formulario
  tweets = [...tweets, tweetObj];
  createHTML();
  form.reset();
}

// # 6 - Capturo el mensaje dinámicamente por parámetros
function showErrorMessage(msg) {
  // # 6.1 - Creo el _HTML
  const errorMessage = document.createElement('p');
  errorMessage.textContent = msg;
  errorMessage.classList.add('error');
  const content = document.querySelector('#contenido');
  content.append(errorMessage);
  // # 6.2 - Eliminar después de dos segundos
  setTimeout(() => {
    errorMessage.remove();
  }, 3000)
}

function createHTML() {

  cleanDOM();
  // #7 - Controlo que haya tweets dentro de la array
  if(tweets.length > 0) {
    // #7.1 - Recorro esa array
    tweets.forEach((tweet) => {
      // #7.2 - Crear boton
      const deleteBtn = document.createElement('a');
      deleteBtn.classList.add('borrar-tweet');
      deleteBtn.innerText = 'X';
      deleteBtn.onclick = () => deleteTweet(tweet.id);
      // # 7.3 - Crear el texto
      const li = document.createElement('li');
      li.innerText = tweet.tweet;
      li.append(deleteBtn);
      tweetList.append(li);
    })
  }
}

function cleanDOM() {
  // #8 - Creo función para limpiar la array- Recorro la lista hasta que haya un elemento hijo y lo voy removiendo
  while(tweetList.firstChild) {
    tweetList.removeChild(tweetList.firstChild);
  }
}

function deleteTweet(id) {
  //#9 - Elimino el elemento de la array con su id y vuelvo a recargar el HTML.
  tweets = tweets.filter(tweet => tweet.id !== id);
  createHTML();
}

const students = ['pablo', 'hernan', 'javier', 'hernan'];
const newArray = students.filter(student => student === 'hernan');
