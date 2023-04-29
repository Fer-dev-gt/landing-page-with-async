// La URL de la variable "API" y el Code Snippet la encontré gracias a "RapidAPI"
const API = 'https://youtube-v31.p.rapidapi.com/search?channelId=UCi8wqezBudeAiTdKOX571ug&part=snippet%2Cid&order=date&maxResults=12';         // Al final de este link de la API en "=12" es la cantidad de elementos que quiero solicitar en este caso pedí 12 elementos
const options = {
	method: 'GET',
	headers: {
		'content-type': 'application/octet-stream',
		'X-RapidAPI-Key': '4279f9b442msh90b047eac8e83adp191b3djsn352a911e51e2',           // En la mayoría de casos esta "Key" no la debería mostrar ni compartir, pero para este ejemplo la dejoremos aquí
		'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
	}
};


async function fetchData(urlApi) {                        // Función que aplica "Async/await" para transformar la respuesta de mi API a formato JSON y la retorna en la variable "data"
  const response = await fetch(urlApi, options);          // En la variable "response" guardo el resultado del método "fetch()" que usa "await" (Promesas) y recibe 2 parámetros, la url de la API y el Objeto "options" con la información que me dió RapidAPI
  const data = await response.json();                     // Combertimos "response" a formato JSON para que podamos iterar la información
  return data;                                            // Retornamos los datos
}

const content = null || document.getElementById('content');                         // Hacemos una nueve referencia en la variable "content" la cual usando la lógica de "||" le decimos que puede tener tanto valor "null" o la del elemento HTML "content" con el querySelector


(async () => {                                                                      // Esta funcíon anonima "Arrow Function" se va a INVOCAR a si misma, esto se puede hacer al colocar al final de la definición de la función un par de parentesis (). Tambien usara "Async/Await"
  try {                                                                             // Usamos la lógica de "try/catch" para registra cualquier tipo de error con un "console.log"
    const videos = await fetchData(API);                                            // En la variable constante "videos" guardamos el resultado de la función "fetchData(API)" que devuelve la información de los videos que solicité
    // Voy a crear un "template" que va iterar cada uno de los elementos que esten en la respuesta de "videos" y va a crear una estructura HTML para agregar la información que yo deseo a la página web y mostrar sus elementos
    let view = `                                                                    <!-- El template (estuctura HTML lo guardare´en la variable "view") -->
    ${videos.items.map(video => `                                                   <!-- Accedo a los "items" de la respuesta en "videos" y utilizo el método "map" para que me retorne un nuevo "array" pero con la transformación que le estoy aplicando (En este caso el "template" HTML) a los elementos del array que obtuve, ".map()" me va a retornar un nuevo valor, los guardo en la variable "video" e utilizo de nuevo una Arrow Function-->
      <a href="https://youtube.com/watch?v=${video.id.videoId}" target="_blank">
        <div class="group relative">        
          <div class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-lg overflow-hidden group-hover:opacity-75 lg:aspect-none">
            <img src="${video.snippet.thumbnails.high.url}" alt="${video.snippet.description}" class="w-full">                          <!-- Coloco como fuente de la imagen del video la dirreción que esta definida en mi objeto JSON en "videos" "video.snippet.thumbnails.high.url" y hago algo similar en la descripción del video "video.snippet.description"-->
          </div>
          <div class="mt-4 flex justify-between">
            <h3 class="text-sm text-gray-50">
              <span aria-hidden="true" class="absolute inset-0"></span>
              ${video.snippet.title}                                                <!-- Coloco el titulo del video -->
            </h3>
          </div>
        </div>
      </a>
    `).slice(0,12).join('')}                                                        <!-- Puedo hacer tranformaciones al Array que creé, como definir cuantos "slides" de los videos quiero mostrar y para unirlos uso el método ".join('')" y pasarle un valor vació '' -->
    `;
    content.innerHTML = view;                                                       // Dentro del <div> "content" le voy a insertar el HTML que se encuentra en mi Array ubicado en la variable "view" que contiene cada uno de los elementos (titulo, descripcion, thumbnail) de la API
  } catch (error) {                                                                 // Capturo cualquier tipo de error
    console.log(error);                                                             // Imprimo la información de cualquier tipo de error que surja
    alert("aaaaaaaahhhhh se cayó la páginaaaaaaa!!!! 🙀🙀🙀")                        // Muestro un "alert" si hay un error cuando intento mostrar los videos 
    content.innerHTML = "<h2>Error al cargar</h2>"
  }

})();                                                                               // Al colocar "()" al final de la definición de la función esta se ejecuta a si misma, automaticamente llamarlas






// PENDIENTE: AGREGAR API DE CARTAS CON LAS IMAGENES DE LA COMIDA, la otra API la puedo realizar en otro modúlo y colocar otra etiqueta <script> en el HTML















/* Este bloque de código proviene del "Code Snippet" que me proporcionó RapidAPI para conenctarme a varias APIs
try {
	const response = await fetch(API, options);
	const result = await response.text();
	console.log(result);
} catch (error) {
	console.error(error);
}*/