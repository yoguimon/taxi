
function verTodosLosMultados(){
    cargarMultados();
}
async function cargarMultados(){
    const request = await fetch('api/multados', {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
    });
    const multados= await request.json();

    let listadoHtml = '';
            let cont = 0;
          for(let multado of multados){
                cont=cont+1;
                let botonAgregarMultas = '<a href="#" class="btn btn-primary" onclick="agregarMulta(' + multado[0] + ', \'' + multado[1] + '\',\'' + multado[2] + '\')">Agregar Multa</a>';
                let botonVerMultas = '<a href="#" class="btn btn-warning" onclick="verMultas('+multado[0]+', \'' + multado[2] + '\')">Ver Multas</a>';
                let multadoHtml =  '<tr><td>'+cont+'</td><td>'+multado[1]+'</td><td>'+multado[2]+'</td><td>'+botonAgregarMultas+'</td><td>'+botonVerMultas+'</td></tr>';
                listadoHtml+=multadoHtml;
          }
          document.querySelector('#listaMultados tbody').outerHTML=listadoHtml;
}
function agregarMulta(id,nombre,placa){
    $('#formMulta').modal('show');
    document.getElementById('txtnombre').value=nombre;
    document.getElementById('txtplaca').value=placa;

    let btnSaveChanges='<button type="button" class="btn btn-primary btn-user btn-block" onclick="validarMulta(' + id + ', \'' + nombre + '\',\'' + placa + '\')">Agregar</button>';
    let btnCancel = '<button type="button" class="btn btn-primary btn-user btn-block" data-dismiss="modal">Cancelar</button>';

    document.getElementById('btnSaveChanges').innerHTML = btnSaveChanges;
    document.getElementById('btnCancel').innerHTML = btnCancel;

}
 function ponerCosto() {
     var combo = document.getElementById("cbxmulta");
     var index = combo.selectedIndex;
     var precio=document.getElementById("txtcosto");
     var divOtraMulta=document.getElementById('otraMultaDiv');
     divOtraMulta.style.display = 'none';
     switch(index){
        case 1: precio.value=40;break;
        case 2: precio.value=15;break;
        case 3: precio.value=5;break;
        case 4: precio.value=20;break;
        case 5: divOtraMulta.style.display = 'block';
                precio.disabled = false;
                precio.value = '';
                break;
        default:
     }
 }
 function validarMulta(id,nombre,placa){
    var combo = document.getElementById("cbxmulta");
    var index = combo.selectedIndex;
    //alert(index);
    let multa={};
    multa.idConductor=id;
    multa.nombre="multa";
    multa.costo=document.getElementById('txtcosto').value;
    multa.tipo=document.getElementById('cbxmulta').value;
    multa.placa=placa;
    const errorTipoMulta = document.getElementById("lblErrorTipoMulta");
    const errorCosto = document.getElementById("lblErrorCosto");
    const errorOtraMulta =document.getElementById('lblErrorOtraMulta');
    var otraMulta= document.getElementById('txtotraMulta').value
    var divOtraMulta=document.getElementById('otraMultaDiv');
    if(index===0){
        errorTipoMulta.innerHTML="Seleccione tipo de multa!!!";
    }else if(index===5){
        errorTipoMulta.innerHTML="";
        errorOtraMulta.innerHTML=validarMultaConductor(otraMulta);
        errorCosto.innerHTML=validarCosto(multa.costo);
    }else{
        errorTipoMulta.innerHTML="";
        errorOtraMulta.innerHTML="";
        errorCosto.innerHTML="";
    }

    if(errorTipoMulta.innerHTML==="" && errorOtraMulta.innerHTML==="" && errorCosto.innerHTML===""){
        if(index===5){
            multa.tipo=otraMulta;
        }
        crearMulta(multa);
    }
 }
 async function crearMulta(multa){
         const request = await fetch('api/multados', {
                 method: 'POST',
                 headers: {
                   'Accept': 'application/json',
                   'Content-Type': 'application/json'
                 },
                 body: JSON.stringify(multa)
         });
         $('#formMulta').modal('hide');
 }
 function verMultas(id,placa){
    // Convierte el ID y el nombre a cadenas de texto
        const idComoCadena = id.toString();
        const placaCodificada = encodeURIComponent(placa);
        // Codifica los valores para asegurarte de que sean seguros en una URL
        const idCodificado = encodeURIComponent(idComoCadena);

        // Redirige a la página "listaLugares.html" con el ID y el nombre en la URL
        window.location.href = `listaMultas.html?id=${idCodificado}&placa=${placaCodificada}`;
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
                let botonAgregarMultas = '<a href="#" class="btn btn-primary" onclick="agregarMulta(' + conductor[0] + ', \'' + conductor[1] + '\',\'' + conductor[2] + '\')">Agregar Multa</a>';
                let botonVerMultas = '<a href="#" class="btn btn-warning" onclick="verMultas('+conductor[0]+', \'' + conductor[2] + '\')">Ver Multas</a>';
                let multadoHtml =  '<tr><td>'+cont+'</td><td>'+conductor[1]+'</td><td>'+conductor[2]+'</td><td>'+botonAgregarMultas+'</td><td>'+botonVerMultas+'</td></tr>';
                listadoHtml+=multadoHtml;
          }
          document.querySelector('#listaMultados tbody').outerHTML=listadoHtml;
    }
}
