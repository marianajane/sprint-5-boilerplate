var api = {
  url: 'http://examen-laboratoria-sprint-5.herokuapp.com/topics'
};

$('.modal').modal();

var $temas = $("#temas");
var $filtrar = $("#filtrar");
var arregloTopics = [];

var cargarPagina = function(){
  cargarTopics();
  $("#guardar").click(agregarTopic);
  $("#add-form").submit(agregarTopic);
  $(document).on("click", $filtrar, filtrarTopic);
  $("#form-search").submit(filtrarTopic);

};

var cargarTopics = function () {
  $.getJSON(api.url, function (topics) {
    arregloTopics= topics;
    //console.log(arregloTopics);
    topics.forEach(crearTopic);
    //console.log(topics);
  });
}

var crearTopic = function (topic) {
  var contenido = topic.content;
  var autor = topic.author_name;
  var id = topic.id;
  var responses = topic.responses_count;
  var plantillaNueva = plantilla.replace("__content__",contenido).replace("__autor__",autor).replace("__respuestas__",responses).replace("__id__",id);
  $temas.prepend(plantillaNueva);

};

var agregarTopic = function (e) {
  e.preventDefault();
  var autor = $("#autor").val();
  var mensaje = $("#mensaje").val();
  
  $.post(api.url, {
    author_name : autor,
    content : mensaje,
  }, 
 
  function (topic) {
    topic.responses_count=0;
    crearTopic(topic);
    $("#crear").modal("close");
  });

};

var plantilla = '<tr>' +
                    '<td><a href="verTopic.html?topic_id=__id__">__content__</a></td>' + 
                    '<td>__autor__</td>' +
                    '<td>__respuestas__</td>' +
                 '</tr>';

var filtrarTopic = function (e) {
e.preventDefault();
//alert("Filtrando tema");
  var $filtro = $("#filtro").val().toLowerCase();
  console.log($filtro); 

  var topicsFiltrados = arregloTopics.filter(function(topics){
    //console.log(topics.content);
    return topics.content.toLowerCase().indexOf($filtro)>=0;
    });
  $temas.html("");
  topicsFiltrados.forEach(crearTopic);

};


$(document).ready(cargarPagina);
