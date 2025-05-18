$(document).ready(function() {
     cargarFrecuenciasPendientes();
});
async function cargarFrecuenciasPendientes(){
    var id = localStorage.getItem('idConductor');
    const request = await fetch('api/frecuencias/pagar/'+id,{
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
    });
    const frecuencias = await request.json();
    const nroFrecuencias = frecuencias.length;
    //document.getElementById('frecuencias').innerText = ""+nroFrecuencias;
    let listadoHtml = '';
            //para agragar usuarios de json
            let cont = 0;
            let fecha='';
          for(let frecuencia of frecuencias){
                cont=cont+1;
                if(frecuencia.costo===70){
                    fecha= frecuencia.fechaInicio+" a "+frecuencia.fechaFin;
                }else{
                    fecha=frecuencia.fechaInicio;
                }
                let frecuenciaHtml =  '<tr><td>'+cont+'</td><td>'+frecuencia.tipo+'</td><td>'+frecuencia.placa+'</td><td>'+frecuencia.costo+'</td><td>'+fecha+'</td></tr>';
                listadoHtml+=frecuenciaHtml;
          }
          document.querySelector('#listaFrecuenciasPendientes tbody').innerHTML=listadoHtml ? listadoHtml : '';
}