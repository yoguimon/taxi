var meses = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
function verTodosLosConductorew(){
    cargarConductoresFrecuencia();
}
async function cargarConductoresFrecuencia(){
    const request = await fetch('api/multados', {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
    });
    const conductores= await request.json();

    let listadoHtml = '';
            let cont = 0;
          for(let conductor of conductores){
                cont=cont+1;
                let botonAgregarFrecuencia = '<a href="#" class="btn btn-primary" onclick="agregarFrecuencia(' + conductor[0] + ', \'' + conductor[1] + '\',\'' + conductor[2] + '\')"><i class="fas fa-plus"></i>  Frecuencia</a>';
                let botonVerFrecuencias = '<a href="#" class="btn btn-primary" onclick="verFrecuencias('+conductor[0]+', \'' + conductor[2] + '\')"><i class="fas fa-eye"></i>  Frecuencias</a>';
                let conductorHtml =  '<tr><td>'+cont+'</td><td>'+conductor[1]+'</td><td>'+conductor[2]+'</td><td>'+botonAgregarFrecuencia+'</td><td>'+botonVerFrecuencias+'</td></tr>';
                listadoHtml+=conductorHtml;
          }
          document.querySelector('#listaConductoresFrecuencia tbody').outerHTML=listadoHtml;
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
    const request = await fetch('api/multados/nombre/'+nombreC, {
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
            //para agragar usuarios de json
            let cont = 0;
          for(let conductor of conductores){
                cont=cont+1;
                let botonAgregarFrecuencia = '<a href="#" class="btn btn-primary" onclick="agregarFrecuencia(' + conductor[0] + ', \'' + conductor[1] + '\',\'' + conductor[2] + '\')">Agregar Frecuencia</a>';
                let botonVerFrecuencias = '<a href="#" class="btn btn-warning" onclick="verFrecuencia('+conductor[0]+', \'' + conductor[2] + '\')">Ver Frecuencias</a>';
                let conductorHtml =  '<tr><td>'+cont+'</td><td>'+conductor[1]+'</td><td>'+conductor[2]+'</td><td>'+botonAgregarFrecuencia+'</td><td>'+botonVerFrecuencias+'</td></tr>';
                listadoHtml+=conductorHtml;
          }
          document.querySelector('#listaConductoresFrecuencia tbody').outerHTML=listadoHtml;
    }
}
function agregarFrecuencia(id,nombre,placa){
    $('#formFrecuencia').modal('show');
    document.getElementById('txtnombre').value=nombre;
    document.getElementById('txtplaca').value=placa;

    let btnFrecuenciaDiaria='<button type="button" class="btn btn-primary btn-user btn-block" onclick="frecuenciaDiaria(' + id + ', \'' + nombre + '\',\'' + placa + '\')">Diario</button>';
    let btnFrecuenciaSemanal='<button type="button" class="btn btn-primary btn-user btn-block" onclick="frecuenciaSemanal(' + id + ', \'' + nombre + '\',\'' + placa + '\')">Semanal</button>';
    let btnCancel = '<button type="button" class="btn btn-danger btn-user btn-block" data-dismiss="modal">Cancelar</button>';

    document.getElementById('btnDiario').innerHTML = btnFrecuenciaDiaria;
    document.getElementById('btnSemanal').innerHTML = btnFrecuenciaSemanal;
    document.getElementById('btnCancel').innerHTML = btnCancel;

}
function frecuenciaDiaria(id,nombre,placa){
    $('#formFrecuencia').modal('hide');
    var date = new Date();
    $("#modalFrecuenciaAdquirida .modal-body").text("Esta seguro de asignar frecuencia DIARIA a: "+nombre+" con placa: "+placa+" para la fecha: "+date.getDate()+" "+meses[date.getMonth()]+" del "+date.getFullYear()+"?");
    $('#modalFrecuenciaAdquirida').modal('show');
    var costo=10;
    let btnAgregar='<button type="button" class="btn btn-primary btn-user btn-block" onclick="agregarFrecuenciaABD(' + id + ',\'' + placa + '\',\'' + costo + '\',\'' + date.toISOString() + '\',\'' + date.toISOString() + '\')">Si</button>';
    let btnCancel = '<button type="button" class="btn btn-primary btn-user btn-block" data-dismiss="modal">No</button>';
    document.getElementById('btnAgregarFrecuencia').innerHTML = btnAgregar;
    document.getElementById('btnCancelarFrecuencia').innerHTML = btnCancel;
}
function frecuenciaSemanal(id,nombre,placa){
    $('#formFrecuencia').modal('hide');
    var fechaInicio = new Date();
    var fechaFin = new Date();
    fechaFin.setDate(fechaFin.getDate() + 7);
    $("#modalFrecuenciaAdquirida .modal-body").text("Esta seguro de asignar frecuencia SEMANAL a: "+nombre+" con placa: "+placa+" desde la fecha : "+fechaInicio.getDate()+" "+meses[fechaInicio.getMonth()]+" del "+fechaInicio.getFullYear()+" hasta la fecha : "+fechaFin.getDate()+" "+meses[fechaFin.getMonth()]+" del "+fechaFin.getFullYear()+"?");
    $('#modalFrecuenciaAdquirida').modal('show');
    var costo=70;
    let btnAgregar='<button type="button" class="btn btn-primary btn-user btn-block" onclick="agregarFrecuenciaABD(' + id + ',\'' + placa + '\',\'' + costo + '\',\'' + fechaInicio.toISOString() + '\',\'' + fechaFin.toISOString() + '\')">Si</button>';
    let btnCancel = '<button type="button" class="btn btn-primary btn-user btn-block" data-dismiss="modal">No</button>';
    document.getElementById('btnAgregarFrecuencia').innerHTML = btnAgregar;
    document.getElementById('btnCancelarFrecuencia').innerHTML = btnCancel;
}
async function agregarFrecuenciaABD(id,placa,costo,fechaInicio,fechaFin){

    let frecuencia={};
    frecuencia.idConductor=id;
    frecuencia.nombre='frecuencia';
    frecuencia.costo=costo;
    if(parseInt(costo)===70){
        frecuencia.tipo='frecuencia semanal';
    }else{
        frecuencia.tipo='frecuencia diaria';
    }
    frecuencia.placa=placa;
    frecuencia.fechaInicio=new Date(fechaInicio).toISOString().split('T')[0];
    frecuencia.fechaFin=new Date(fechaFin).toISOString().split('T')[0];
        const request = await fetch('api/frecuencias', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(frecuencia)
        });
    $('#modalFrecuenciaAdquirida').modal('hide');
}
function verFrecuencias(id, placa) {
    // Convierte el ID y la placa a cadenas de texto
    const idComoCadena = id.toString();
    const placaCodificada = encodeURIComponent(placa);

    // Codifica los valores para asegurarte de que sean seguros en una URL
    const idCodificado = encodeURIComponent(idComoCadena);

    // Redirige a la página "listaLugares.html" con el ID y la placa en la URL
    window.location.href = `listaFrecuenciasConductor.html?id=${idCodificado}&placa=${placaCodificada}`;
}