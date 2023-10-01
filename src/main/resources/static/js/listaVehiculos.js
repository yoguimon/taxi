$(document).ready(function() {
    cargarVehiculos(obtenerIdDeUrl());
    $('#listaConductores').DataTable();
  });
async function cargarVehiculos(id){
    const request = await fetch('api/conductores/vehiculos/'+id, {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
    });
    const vehiculos = await request.json();

    let listadoHtml = '';
            //para agragar usuarios de json
            let cont = 0;
          for(let vehiculo of vehiculos){
                cont=cont+1;
                let botonEditar = '<a href="#" class="btn btn-warning" onclick="mostrarVehiculo('+vehiculo[0]+')">Editar</a>';
                let botonEliminar = '<a href="#" class="btn btn-danger" onclick="eliminarVehiculo('+vehiculo[0]+')">Eliminar</a>';
                let vehiculoHtml =  '<tr><td>'+cont+'</td><td>'+vehiculo[2]+'</td><td>'+vehiculo[3]+'</td><td>'+vehiculo[4]+'</td><td>'+vehiculo[5]+'</td><td>'+botonEditar+'</td><td>'+botonEliminar+'</td></tr>';
                listadoHtml+=vehiculoHtml;
          }
          document.querySelector('#listaVehiculos tbody').outerHTML=listadoHtml;
}
function obtenerIdDeUrl() {
     parametrosDeConsulta = new URLSearchParams(window.location.search);
     const id = parametrosDeConsulta.get('id');
     return id;
}