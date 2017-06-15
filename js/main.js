var api = {
  url: 'https://examen-laboratoria-sprint-5.herokuapp.com/topics'
};


$(document).ready(function(){
    $('.modal').modal();
});


var $topicList = $("#topic-list");

var cargarPagina = function () {
    cargarTemas();
    $("#add-form").submit(agregarTema);
};

var cargarTemas = function () {
  $.getJSON(api.url, function (topics) {
    topics.forEach(crearTema);
  });
}

var plantillaTema = '<tr class="topics" data-id="**id**">'+
            '<td>**contenido**</td>'+
            '<td>**autor**</td>'+
            '<td>Respuestas</td>'+
        '</tr>';

var crearTema = function (tema) {
    var id = tema._id;
    var contenido = tema.content
    var autor = tema.author_name;
    var nuevaPlantilla =" ";

        nuevaPlantilla += plantillaTema.replace('**id**',id).replace('**contenido**', contenido).replace('**autor**', autor);
        $topicList.append(nuevaPlantilla);
};

var agregarTema = function(e){
    e.preventDefault();
    var nombreTema = $ ("#nombre-tema").val();
    var autorTema = $("#autor").val();
    $.post(api.url,{
        content:nombreTema,
        author_name: autorTema,
    },  function (response){
        $("#modal1").modal("hide");
        cargarTemas();
    });
};

//Buscar temas

var buscar = function () {
  $("#search-form").submit(filtrarTemas);
};

var filtrarTemas = function (e) {
  e.preventDefault();
  var criterioBusqueda = $("#search").val().toLowerCase();
  var temasFiltrados = contenido.filter(function (tema) {
    return contenido.content.toLowerCase().indexOf(criterioBusqueda) >= 0;
  });
  mostrarTemas(temasFiltrados);
};

var mostrarTemas = function (tema) {
  var plantillaBusqueda = "";
  tema.forEach(function (tema) {
    plantillaBusqueda += plantillaTema.replace("**contenido**", tema.content);
    
  });
  $("#topic-list").html(plantillaBusqueda);

};

$(document).ready(cargarPagina);