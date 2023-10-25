let serviciosAsignados=[];
let costosServicios=[];
let total=0;
let contador=1;
function mostrarMultasXId(){
    $("#modalServicios .modal-title").text("Lista multas adeudadas por el conductor:");
    $('#modalServicios').modal('show');
    cargarMultasAsignacion();
}
function mostrarFrecuenciasXId(){
    $("#modalServicios .modal-title").text("Lista frecuencias adeudadas por el conductor:");
    $('#modalServicios').modal('show');
    cargarFrecuenciasAsignacion();
}
async function cargarFrecuenciasAsignacion(){
    var id = localStorage.getItem('idConductor');
    const request = await fetch('api/frecuencias/pagar/'+id,{
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
    });
    const frecuencias = await request.json();

    let listadoHtml = '';
            //para agragar usuarios de json
            let cont = 0;
            let fecha='';
          for(let frecuencia of frecuencias){
                if (!serviciosAsignados.includes(frecuencia.idServicio)) {
                    cont=cont+1;
                    if(frecuencia.costo===70){
                        fecha= frecuencia.fechaInicio+" a "+frecuencia.fechaFin;
                    }else{
                        fecha=frecuencia.fechaInicio;
                    }
                    let botonCheckBox = '<label><input type="checkbox" name="opciones" value="' + frecuencia.idServicio + '" onclick="agregarATabla(' + frecuencia.idServicio + ', \'' + frecuencia.nombre + '\', \'' + frecuencia.tipo + '\', \'' + frecuencia.costo + '\', \'' + fecha + '\')"></label>';
                    let frecuenciaHtml =  '<tr><td>'+cont+'</td><td>'+frecuencia.nombre+'</td><td>'+frecuencia.tipo+'</td><td>'+frecuencia.costo+'</td><td>'+fecha+'</td><td>'+botonCheckBox+'</td></tr>';
                    listadoHtml+=frecuenciaHtml;
                }
          }
          let listaServiciosAdeudados = document.querySelector('#listaServiciosAdeudados tbody');
          if (!listaServiciosAdeudados) {
            // Si no existe, crea un nuevo elemento y agrégalo al DOM
            listaServiciosAdeudados = document.createElement('tbody');
            document.querySelector('#listaServiciosAdeudados').appendChild(listaServiciosAdeudados);
          }
          if(listadoHtml===''){
            document.querySelector('#listaServiciosAdeudados tbody').outerHTML='<tr><td>No existen frecuencias Pendientes!</td></tr>';
          }else{
            document.querySelector('#listaServiciosAdeudados tbody').outerHTML=listadoHtml;
          }
}
async function cargarMultasAsignacion(){
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
                if (!serviciosAsignados.includes(multa.idServicio)) {
                    cont=cont+1;
                    let fechaCreacion = new Date(multa.fechaCreacion);
                    let fechaFormateada = fechaCreacion.toISOString().split('T')[0];
                    let botonCheckBox = '<label><input type="checkbox" name="opciones" value="' + multa.idServicio + '" onclick="agregarATabla(' + multa.idServicio + ', \'' + multa.nombre + '\', \'' + multa.tipo + '\', \'' + multa.costo + '\', \'' + fechaFormateada + '\')"></label>';
                    let multaHtml =  '<tr><td>'+cont+'</td><td>'+multa.nombre+'</td><td>'+multa.tipo+'</td><td>'+fechaFormateada+'</td><td>'+multa.costo+'</td><td>'+botonCheckBox+'</td></tr>';
                    listadoHtml+=multaHtml;
                }
          }
          // Verifica si el elemento #listaServiciosAdeudados tbody existe en el DOM
            let listaServiciosAdeudados = document.querySelector('#listaServiciosAdeudados tbody');
            if (!listaServiciosAdeudados) {
              // Si no existe, crea un nuevo elemento y agrégalo al DOM
              listaServiciosAdeudados = document.createElement('tbody');
              document.querySelector('#listaServiciosAdeudados').appendChild(listaServiciosAdeudados);
            }
          if(listadoHtml===''){
            document.querySelector('#listaServiciosAdeudados tbody').outerHTML='<tr><td>No existen multas Pendientes!</td></tr>';
          }else{
            document.querySelector('#listaServiciosAdeudados tbody').outerHTML=listadoHtml;//linea del error
          }
}
function agregarATabla(idServicio, nombre, tipo, costo, fecha) {
    if (!serviciosAsignados.includes(idServicio)) {
        // Agregar a la tablaPreAsignacion
        let tablaPreAsignacion = document.getElementById('tablaPreAsignacion');

        let newRow = tablaPreAsignacion.insertRow(-1);
        let newCell0 = newRow.insertCell(0);
        let newCell1 = newRow.insertCell(1);
        let newCell2 = newRow.insertCell(2);
        let newCell3 = newRow.insertCell(3);
        let newCell4 = newRow.insertCell(4);
        let newCell5 = newRow.insertCell(5);

        newCell0.innerHTML = contador;
        newCell1.innerHTML = nombre;
        newCell2.innerHTML = tipo;
        newCell3.innerHTML = fecha;
        newCell4.innerHTML=costo;
        newCell5.innerHTML='<button class="btn btn-danger" onclick="eliminarFila(' + idServicio + ', \'' + nombre + '\', \'' + costo + '\')">Quitar</button>';

        // Eliminar del listado de multas
       let checkbox = document.querySelector('input[name="opciones"][value="' + idServicio + '"]');
       if (checkbox) checkbox.closest('tr').remove();

        total=total+parseInt(costo);
        document.getElementById('total').innerHTML=total;
        contador=contador+1;
        serviciosAsignados.push(idServicio);
        costosServicios.push(costo);
        console.log(serviciosAsignados);
        console.log(costosServicios);

    }
}
function eliminarFila(idServicio,nombre,costo) {
    let tablaPreAsignacion = document.getElementById('tablaPreAsignacion');
    total=total-parseInt(costo);
    document.getElementById('total').innerHTML=total;
    console.log(total);

    let index = serviciosAsignados.indexOf(idServicio);
    tablaPreAsignacion.deleteRow(index + 1); // Se suma 1 porque el encabezado de la tabla se considera una fila
    serviciosAsignados.splice(index, 1);
    costosServicios.splice(index, 1);
    console.log(serviciosAsignados);
    console.log(costosServicios);
}
async function pagarServicios(){
    let json = {
        idConductor:localStorage.getItem('idConductor'),
        idUsuario:localStorage.getItem('idUsuario'),
        servicios:serviciosAsignados,
        costos:costosServicios,
        total:total,
        metodo:''
    };
     const request = await fetch('api/pagar', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(json)
      });
     alert("se guardo pago");
}
