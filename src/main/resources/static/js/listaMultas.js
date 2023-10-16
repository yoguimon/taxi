$(document).ready(function() {
    verMultas(obtenerIdDeUrl());
  });
function obtenerIdDeUrl() {
     parametrosDeConsulta = new URLSearchParams(window.location.search);
     const id = parametrosDeConsulta.get('id');
     return id;
}
 async function verMultas(idConductor){
     const request = await fetch('api/multas/'+idConductor, {
             method: 'GET',
             headers: {
               'Accept': 'application/json',
               'Content-Type': 'application/json'
             }
     });
     const multas = await request.json();//realizar los cambio correcpondientes
     if(!multas || multas.length === 0){
            document.getElementById('mensaje').innerHTML = "Este Conductor no tiene multas registradas!";
        return;
     }

     let listadoHtml = '';
             let cont = 0;
           for(let multa of multas){
                 cont=cont+1;
                 let botonEditar = '<a href="#" class="btn btn-warning" onclick="mostrarVehiculo('+multa.idServicio+')">Editar</a>';
                 let botonEliminar = '<a href="#" class="btn btn-danger" onclick="eliminarVehiculo('+multa.idServicio+')">Eliminar</a>';
                 let multaHtml =  '<tr><td>'+cont+'</td><td>'+multa.tipo+'</td><td>'+multa.costo+"Bs."+'</td><td>'+multa.fechaCreacion+'</td><td>'+botonEditar+'</td><td>'+botonEliminar+'</td></tr>';
                 listadoHtml+=multaHtml;
           }
           document.querySelector('#listaMultas tbody').outerHTML=listadoHtml;
 }