$(document).ready(function() {
    cargarConductores();
    $('#listaConductores').DataTable();
  });
  async function cargarConductores(){
    const request = await fetch('api/conductores', {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
    });
    const conductores = await request.json();

    let listadoHtml = '';
            //para agragar usuarios de json
            let cont = 0;
          for(let conductor of conductores){
                cont=cont+1;
                let botonVehiculos = '<a href="#" class="btn btn-primary" onclick="mostrarVehiculos('+conductor[0]+')">Vehiculos</a>';
                let botonEditar = '<a href="#" class="btn btn-warning" onclick="mostrarConductor('+conductor[0]+')">Editar</a>';
                let botonEliminar = '<a href="#" class="btn btn-danger" onclick="eliminarConductor('+conductor[0]+')">Eliminar</a>';
                let conductorHtml =  '<tr><td>'+cont+'</td><td>'+conductor[1]+'</td><td>'+conductor[2]+'</td><td>'+conductor[3]+'</td><td>'+conductor[4]+'</td><td>'+conductor[5]+'</td><td>'+botonVehiculos+'</td><td>'+botonEditar+'</td><td>'+botonEliminar+'</td></tr>';
                listadoHtml+=conductorHtml;
          }
          document.querySelector('#listaConductores tbody').outerHTML=listadoHtml;
}

function mostrarVehiculos(id){
    // Convierte el ID y el nombre a cadenas de texto
        const idComoCadena = id.toString();

        // Codifica los valores para asegurarte de que sean seguros en una URL
        const idCodificado = encodeURIComponent(idComoCadena);

        // Redirige a la página "listaLugares.html" con el ID y el nombre en la URL
        window.location.href = `listaVehiculos.html?id=${idCodificado}`;
}