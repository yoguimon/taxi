let serviciosAsignados=[];
let costosServicios=[];
let total=0;
let contador=1;
let contAux=0;
$(document).ready(function() {
    ocultarMostrar('hidden','#divPagos');
    ocultarMostrar('hidden','#divTotal');
});
async function cargarConductores(){
    if(contAux>0){
        limpiarTabla();
    }
    const request = await fetch('api/conductores',{
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
            let nombre = conductor[1]+' '+conductor[2]+' '+conductor[3]+"";
            let botonPago = '<a class="btn btn-primary" id="btnHabilitar" onclick="habilitarPago('+conductor[0]+', \'' + nombre + '\', \'' + conductor[5] + '\')">Pagar Servicios</a>';
            let conductorHtml =  '<tr id="'+conductor[0]+'"><td>'+cont+'</td><td>'+nombre+'</td><td>'+conductor[4]+'</td><td>'+conductor[5]+'</td><td>'+botonPago+'</td></tr>';
            listadoHtml+=conductorHtml;
      }
      document.querySelector('#listaConductores tbody').outerHTML=listadoHtml;
      contAux=contAux+1;
}
function validarBusquedaConductor(){
    const nombreC = document.getElementById("txtBusquedaConductor").value.toString();
    const errorNombreConductor=document.getElementById("lblerrorBusquedaConductor");
    errorNombreConductor.innerHTML=validarNombreC(nombreC);
    if(errorNombreConductor.innerHTML===''){
        buscarNombreCMultado(nombreC);
    }
}
async function buscarNombreCMultado(nombreC){
    if(contAux>0){
        limpiarTabla();
    }
    const request = await fetch('api/conductores/nombre/'+nombreC, {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
    });
    const conductores = await request.json();
    if(conductores.length === 0){
        document.getElementById("lblerrorBusquedaConductor").innerHTML="Nombre Incorrecto!";
    }else{
          document.getElementById("lblerrorBusquedaConductor").innerHTML="";
          let listadoHtml = '';
          let cont = 0;
          for(let conductor of conductores){
              cont=cont+1;
              let botonPago = '<a class="btn btn-primary" id="btnHabilitar" onclick="habilitarPago('+conductor[0]+', \'' + conductor[1] + '\', \'' + conductor[3] + '\')">Pagar Servicios</a>';
              let conductorHtml =  '<tr id="'+conductor[0]+'"><td>'+cont+'</td><td>'+conductor[1]+'</td><td>'+conductor[2]+'</td><td>'+conductor[3]+'</td><td>'+botonPago+'</td></tr>';
              listadoHtml+=conductorHtml;
          }
          document.querySelector('#listaConductores tbody').outerHTML=listadoHtml;
          contAux=contAux+1;
    }
}
function habilitarPago(id,nombre,nrolicencia){
    const tabla = document.getElementById('listaConductores');
    tabla.style.display = 'none';
    document.getElementById('lblnombre').textContent=nombre;
    document.getElementById('lblnrolicencia').textContent=nrolicencia;
    const divDatos = document.getElementById('divDatos');
    divDatos.style.display='block';
    localStorage.idPago=id;
    ocultarMostrar('visible','#divPagos');
    ocultarMostrar('visible','#divTotal');
}
function ocultarMostrar(opcion,ruta){
    var etiqueta = document.querySelector(ruta);
    etiqueta.style.visibility  = opcion;
}
function limpiarTabla(){
    var id = localStorage.getItem('idPago');
    ocultarMostrar('hidden','#divPagos');
    ocultarMostrar('hidden','#divTotal');
    document.getElementById('total').innerHTML='0';
    const table = document.getElementById('tablaPreAsignacion');
    const rowCount = table.rows.length;

    for (let i = rowCount - 1; i > 0; i--) {
      table.deleteRow(i);
    }
    const tabla = document.getElementById('listaConductores');
    tabla.style.display = 'table';
    const divDatos = document.getElementById('divDatos');
    divDatos.style.display='none';
}
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
    var id = localStorage.getItem('idPago');
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
    var id = localStorage.getItem('idPago');
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
        newCell5.innerHTML='<button class="btn btn-primary" onclick="eliminarFila(' + idServicio + ', \'' + nombre + '\', \'' + costo + '\')">⛌</button>';

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
function mostrarAlertaPago(){
    Swal.fire({
        title: "Pagar Servicios",
        text: "Esta seguro de registrar el Pago?",
        icon: "warning",
        iconColor: "#4C71DE",
        showCancelButton: true,
        cancelButtonText: "No",
        confirmButtonColor: "#4C71DE",
        cancelButtonColor: "#4C71DE",
        confirmButtonText: "Si"
      }).then(async (result) => {
        if (result.isConfirmed) {
            await pagarServicios(); // Llamar a la función generarPdf después de confirmar
        }
      });
}

async function pagarServicios(){
    let json = {
        idConductor:localStorage.getItem('idPago'),
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
      const response = await request.json();
      const numero = parseInt(response);
      localStorage.idPago=numero;

      generarPdf();

    // $('#modalOk').modal('show');
}
async function generarPdf(){
    //$('#modalOk').modal('hide');
    const id = localStorage.getItem('idPago');
    const request = await fetch('api/pagar/reporte/'+id, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      if (request.ok) {
          const response = await request.blob();
          const file = new Blob([response], { type: 'application/pdf' });
          const fileURL = URL.createObjectURL(file);
              window.open(fileURL, '_blank');
              location.reload();
      } else {
          alert("fallo la generacion de reportes...");
      }
}
function validarPago(){
    if (serviciosAsignados.length===0) {
        $("#modalOkError .modal-body").text("No se agrego servicios a la tabla!");
        $('#modalOkError').modal('show');
    }else{
        mostrarAlertaPago();
    }
}