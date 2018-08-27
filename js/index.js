/*
  Creación de una función personalizada para jQuery que detecta cuando se detiene el scroll en la página
*/
$.fn.scrollEnd = function(callback, timeout) {
  $(this).scroll(function(){
    var $this = $(this);
    if ($this.data('scrollTimeout')) {
      clearTimeout($this.data('scrollTimeout'));
    }
    $this.data('scrollTimeout', setTimeout(callback,timeout));
  });
};
/*
  Función que inicializa el elemento Slider
*/

function inicializarSlider(){
  $("#rangoPrecio").ionRangeSlider({
    type: "double",
    grid: false,
    min: 0,
    max: 100000,
    from: 200,
    to: 80000,
    prefix: "$"
  });
}
/*
  Función que reproduce el video de fondo al hacer scroll, y deteiene la reproducción al detener el scroll
*/
function playVideoOnScroll(){
  var ultimoScroll = 0,
      intervalRewind;
  var video = document.getElementById('vidFondo');
  $(window)
    .scroll((event)=>{
      var scrollActual = $(window).scrollTop();
      if (scrollActual > ultimoScroll){
       video.play();
     } else {
        //this.rewind(1.0, video, intervalRewind);
        video.play();
     }
     ultimoScroll = scrollActual;
    })
    .scrollEnd(()=>{
      video.pause();
    }, 10)
}

inicializarSlider();
playVideoOnScroll();

//////////////////////////////////////////////////////////////////////////////////////////////////////
var strCaja = ' <div class="row card inmueble">' +
              '   <div class="col s3">' +
              '     <img src="img/home.jpg" width= "100%"/>' +
              '   </div>' +
              '   <div class="col s9">' +
              '     <B>:tipo:</B><br>' +
              '     Ciudad:<lu> :ciudad:</lu><br>' +
              '     Dirección:<lu> :direccion:</lu><br>' +
              '     Teléfono:<lu> :telefono:</lu><br>' +
              '     Precio:<lu> :precio:</lu><br>' +
              '   </div>' +
              ' </div><br>';
var strCiudades = [], strTipo = [];

$.ajax({
  url: 'data-1.json',
  dataType: 'json',
  success: function(data) {
    var pos = -1;
    $.each(data, function(key, elemento) {

      // Consultamos las ciudades existentes
      pos = -1;
      pos = strCiudades.find(function(ciudad){
        return ciudad == elemento.Ciudad;
      });
      if (pos == undefined){
        pos = strCiudades.length;
        strCiudades[pos] = elemento.Ciudad;
        $('#selectCiudad').append('<option value="' + elemento.Ciudad + '">' + elemento.Ciudad + '</option>');
      }

      // Consultamos los tipos existentes
      pos = -1;
      pos = strTipo.find(function(tipo){
        return tipo == elemento.Tipo;
      });
      if (pos == undefined){
        pos = strTipo.length;
        strTipo[pos] = elemento.Tipo;
        $('#selectTipo').append('<option value="' + elemento.Tipo + '">' + elemento.Tipo + '</option>');
      }
    });
  },
});

$('#mostrarTodos').click(function() {
  $('.inmueble').remove();
  $.ajax({
    url: 'data-1.json',
    dataType: 'json',
    success: function(data) {
      $.each(data, function(key, elemento) {
        pintarItem(elemento.Tipo, elemento.Ciudad, elemento.Direccion, elemento.Telefono, elemento.Precio);
      });
    },
  }), $('.row').show();
});

function pintarItem(tipo, ciudad, direccion, telefono, precio){
  $('#mostrarTodos').after(strCaja.replace(':tipo:', tipo)
                                  .replace(':ciudad:', ciudad)
                                  .replace(':direccion:', direccion)
                                  .replace(':telefono:', telefono)
                                  .replace(':precio:', precio))
}
