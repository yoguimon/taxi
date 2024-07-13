$(document).ready(function() {
    verFrecuenciasConductor(obtenerIdDeUrl());
  });
function obtenerIdDeUrl() {
     parametrosDeConsulta = new URLSearchParams(window.location.search);
     const id = parametrosDeConsulta.get('id');
     const placa=parametrosDeConsulta.get('placa');
     let json={};
     json.idConductor=id;
     json.placa=placa;
     return json;
}
 async function verFrecuenciasConductor(json){
     const request = await fetch('api/frecuencias/conductor', {
             method: 'POST',
             headers: {
               'Accept': 'application/json',
               'Content-Type': 'application/json'
             },
             body: JSON.stringify(json)
     });
     const frecuencias = await request.json();//realizar los cambio correcpondientes
     if(!frecuencias || frecuencias.length === 0){
            document.getElementById('mensaje').innerHTML = "Este Conductor no tiene frecuencias registradas!";
        return;
     }

     let listadoHtml = '';
     let cont = 0;
     let fecha='';
     for(let frecuencia of frecuencias){
         cont=cont+1;
         fecha=frecuencia.fechaInicio+" a "+frecuencia.fechaFin;
         let botonEliminar = '<a href="#" class="btn btn-primary btn-sm" onclick="eliminarFrecuencia('+frecuencia.idServicio+')"><i class="fas fa-trash"></i></a>';
         let frecuenciaHtml =  '<tr><td>'+cont+'</td><td>'+frecuencia.tipo+'</td><td>'+frecuencia.costo+"Bs."+'</td><td>'+fecha+'</td><td>'+botonEliminar+'</td></tr>';
         listadoHtml+=frecuenciaHtml;
   }
   document.querySelector('#listaFrecuenciasC tbody').outerHTML=listadoHtml;
 }
async function eliminarFrecuencia(id){
    $('#formEliminar').modal('show');
    document.getElementById('botonEliminarElemento').addEventListener('click', async function () {
        const request = await fetch('api/multas/' + id, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        $('#formEliminar').modal('hide');
        location.reload();
    });
}