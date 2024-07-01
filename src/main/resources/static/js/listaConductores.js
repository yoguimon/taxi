$(document).ready(function() {
    cargarConductores();
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
                let botonVehiculos = '<a href="#" class="btn btn-primary btn-sm" onclick="mostrarVehiculos('+conductor[0]+')"><i class="fas fa-car"></i></a>';
                let botonEditar = '<a href="#" class="btn btn-primary btn-sm" onclick="mostrarConductor('+conductor[0]+')"><i class="fas fa-edit"></i></a>';
                let botonEliminar = '<a href="#" class="btn btn-primary btn-sm" onclick="eliminarConductor('+conductor[0]+')"><i class="fas fa-trash"></i></a>';
                let conductorHtml =  '<tr><td>'+cont+'</td><td>'+conductor[1]+'</td><td>'+conductor[2]+'</td><td>'+conductor[3]+'</td><td>'+conductor[4]+'</td><td>'+conductor[5]+'</td><td><div class="text-center">'+botonVehiculos+'</div></td><td><div class="text-center">'+botonEditar+'</div></td><td><div class="text-center">'+botonEliminar+'</div></td></tr>';
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
async function mostrarConductor(id){
    $('#formEdicion').modal('show');
        const request = await fetch('api/conductores/'+id, {
                method: 'GET',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                }
        });
        const conductor = await request.json();

        document.getElementById('txtnombre').value=conductor.nombre;
        document.getElementById('txtapellidoP').value=conductor.primerApellido;
        document.getElementById('txtapellidoM').value=conductor.segundoApellido;
        document.getElementById('txttelefono').value=conductor.telefono;
        document.getElementById('txtnumLicencia').value=conductor.numLicencia;

        document.getElementById('btnSaveChanges').innerHTML = '';
        document.getElementById('btnCancel').innerHTML = '';

        let btnSaveChanges='<button type="button" class="btn btn-primary btn-user btn-block" onclick="editarConductor('+conductor.idConductor+')">Modificar</button>';
        let btnCancel = '<button type="button" class="btn btn-primary btn-user btn-block" data-dismiss="modal">Cancelar</button>';

        document.getElementById('btnSaveChanges').innerHTML = btnSaveChanges;
        document.getElementById('btnCancel').innerHTML = btnCancel;
}
async function editarConductor(id){

    let conductorEditado={};
    conductorEditado.idConductor=id;
    conductorEditado.nombre = document.getElementById('txtnombre').value;
    conductorEditado.primerApellido = document.getElementById('txtapellidoP').value;
    conductorEditado.segundoApellido = document.getElementById('txtapellidoM').value;
    conductorEditado.telefono = document.getElementById('txttelefono').value;
    conductorEditado.numLicencia = document.getElementById('txtnumLicencia').value;

    const request = await fetch('api/conductores',{
                method: 'PUT',
                        headers: {
                          'Accept': 'application/json',
                          'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(conductorEditado)
    });
    $('#formEdicion').modal('hide');
    cargarConductores();
}
async function eliminarConductor(id){
    $('#formEliminar').modal('show');
    document.getElementById('botonEliminarElemento').addEventListener('click', async function () {
            // Realiza la eliminación utilizando el ID pasado como parámetro
            const request = await fetch('api/conductores/' + id, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            $('#formEliminar').modal('hide');
            // Recarga la página o realiza alguna otra acción después de la eliminación
            location.reload();
        });
}