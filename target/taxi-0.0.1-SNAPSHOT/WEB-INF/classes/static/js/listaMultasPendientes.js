$(document).ready(function() {
    cargarMultasPendientes();
});
async function cargarMultasPendientes(){
    var id = localStorage.getItem('idConductor');
    const request = await fetch('api/multas/pagar/'+id,{
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
    });
    const multas = await request.json();

    let listadoHtml = '';
            //para agragar usuarios de json
            let cont = 0;
          for(let multa of multas){
                cont=cont+1;
                let multaHtml =  '<tr><td>'+cont+'</td><td>'+multa.tipo+'</td><td>'+multa.placa+'</td><td>'+multa.costo+'</td><td>'+multa.fechaCreacion+'</td></tr>';
                listadoHtml+=multaHtml;
          }
          document.querySelector('#listaMultasPendientes tbody').outerHTML=listadoHtml;
}