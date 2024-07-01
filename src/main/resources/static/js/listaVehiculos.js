$(document).ready(function() {
    cargarVehiculos(obtenerIdDeUrl());
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
                let botonEditar = '<div class="text-center"><a href="#" class="btn btn-primary btn-sm" onclick="mostrarVehiculo('+vehiculo[0]+')"><i class="fas fa-edit"></i></a></div>';
                let botonEliminar = '<div class="text-center"><a href="#" class="btn btn-primary btn-sm" onclick="eliminarVehiculo('+vehiculo[0]+')"><i class="fas fa-trash"></i></a></div>';
                let vehiculoHtml =  '<tr><td>'+cont+'</td><td>'+vehiculo[2]+'</td><td>'+vehiculo[3]+'</td><td>'+vehiculo[4]+'</td><td>'+vehiculo[5]+'</td><td>'+botonEditar+'</td><td>'+botonEliminar+'</td></tr>';
                listadoHtml+=vehiculoHtml;
          }
          document.querySelector('#listaVehiculos tbody').outerHTML=listadoHtml;
}
async function mostrarVehiculo(id){
    $('#formEdicion').modal('show');
        const request = await fetch('api/vehiculos/'+id, {
                method: 'GET',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                }
        });
        const vehiculo = await request.json();
        document.getElementById('txtplaca').value=vehiculo.placa;
        document.getElementById('txtmarca').value=vehiculo.marca;
        document.getElementById('txtcolor').value=vehiculo.color;
        document.getElementById('cbxtipo').value=vehiculo.tipo;//entonces por que a no se muestra en cbxtipo en el lado de html

        document.getElementById('btnSaveChanges').innerHTML = '';
        document.getElementById('btnCancel').innerHTML = '';

        let btnSaveChanges='<button type="button" class="btn btn-primary btn-user btn-block" onclick="editarConductor('+vehiculo.idVehiculo+')">Modificar</button>';
        let btnCancel = '<button type="button" class="btn btn-primary btn-user btn-block" data-dismiss="modal">Cancelar</button>';

        document.getElementById('btnSaveChanges').innerHTML = btnSaveChanges;
        document.getElementById('btnCancel').innerHTML = btnCancel;
}

async function editarConductor(id){
    const idConductor=obtenerIdDeUrl();
    let vehiculoEditado={};
    vehiculoEditado.idVehiculo=id;
    vehiculoEditado.conductor={idConductor: idConductor};
    vehiculoEditado.placa = document.getElementById('txtplaca').value;
    vehiculoEditado.marca = document.getElementById('txtmarca').value;
    vehiculoEditado.color = document.getElementById('txtcolor').value;
    vehiculoEditado.tipo = document.getElementById('cbxtipo').value;

    const request = await fetch('api/vehiculos',{
                method: 'PUT',
                        headers: {
                          'Accept': 'application/json',
                          'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(vehiculoEditado)
    });
    $('#formEdicion').modal('hide');
    cargarVehiculos(idConductor);
}
async function eliminarVehiculo(id){
    $('#formEliminar').modal('show');
    document.getElementById('botonEliminarElemento').addEventListener('click', async function () {
            // Realiza la eliminación utilizando el ID pasado como parámetro
            const request = await fetch('api/vehiculos/' + id, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            $('#formEliminar').modal('hide');
            // Recarga la página o realiza alguna otra acción después de la eliminación
            cargarVehiculos(obtenerIdDeUrl());
        });
}
function obtenerIdDeUrl() {
     parametrosDeConsulta = new URLSearchParams(window.location.search);
     const id = parametrosDeConsulta.get('id');
     return id;
}
function enviarAFormularioVehiculo(){
    var id = obtenerIdDeUrl();
    window.location.href = `formularioVehiculo.html?id=${id}`;
}
