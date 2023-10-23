$(document).ready(function() {
    verMultas(obtenerIdDeUrl());
  });
function obtenerIdDeUrl() {
     parametrosDeConsulta = new URLSearchParams(window.location.search);
     const id = parametrosDeConsulta.get('id');
     return id;
}
 async function verMultas(idConductor){
     const request = await fetch('api/multas/'+idConductor, {
             method: 'GET',
             headers: {
               'Accept': 'application/json',
               'Content-Type': 'application/json'
             }
     });
     const multas = await request.json();//realizar los cambio correcpondientes
     if(!multas || multas.length === 0){
            document.getElementById('mensaje').innerHTML = "Este Conductor no tiene multas registradas!";
        return;
     }

     let listadoHtml = '';
             let cont = 0;
           for(let multa of multas){
                 cont=cont+1;
                 let botonEditar = '<a href="#" class="btn btn-warning" onclick="mostrarMultas('+multa.idServicio+')">Editar</a>';
                 let botonEliminar = '<a href="#" class="btn btn-danger" onclick="eliminarMulta('+multa.idServicio+')">Eliminar</a>';
                 let multaHtml =  '<tr><td>'+cont+'</td><td>'+multa.tipo+'</td><td>'+multa.costo+"Bs."+'</td><td>'+multa.fechaCreacion+'</td><td>'+botonEditar+'</td><td>'+botonEliminar+'</td></tr>';
                 listadoHtml+=multaHtml;
           }
           document.querySelector('#listaMultas tbody').outerHTML=listadoHtml;
 }
async function mostrarMultas(idSer){
    $('#modalMultaConductor').modal('show');
    const request = await fetch('api/multa/' + idSer, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });
    const multa = await request.json();
    document.getElementById('txtnombreMulta').value = multa.nombre;
    document.getElementById('txtplacaMulta').value = multa.placa;
    document.getElementById('txtcostoMulta').value = multa.costo;

    let btnSaveChanges = '<button type="button" class="btn btn-primary btn-user btn-block" onclick="validarMultaEdicion(' + multa.idServicio + ')">Modificar</button>';
    let btnCancel = '<button type="button" class="btn btn-primary btn-user btn-block" data-dismiss="modal">Cancelar</button>';

    if (optionExists('cbxmultaEdicion', multa.tipo)) {
        document.getElementById('cbxmultaEdicion').value = multa.tipo;
        document.getElementById('otraMultaDiv').style.display = 'none';
        document.getElementById('txtcostoMulta').disabled=true;
    } else {
        document.getElementById('txtotraMulta').value = multa.tipo;
        document.getElementById('otraMultaDiv').style.display = 'block';
        document.getElementById('txtcostoMulta').disabled=false;
    }

    document.getElementById('btnSaveChanges').innerHTML = btnSaveChanges;
    document.getElementById('btnCancel').innerHTML = btnCancel;
}
function optionExists(selectId, value) {
    var options = document.getElementById(selectId).options;
    for (var i = 0; i < options.length; i++) {
        if (options[i].value === value) {
            return true;
        }
    }
    return false;
}
 function ponerCostoMulta() {
     var combo = document.getElementById("cbxmultaEdicion");
     var index = combo.selectedIndex;
     var precio=document.getElementById("txtcostoMulta");
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
 function validarMultaEdicion(id){
     var combo = document.getElementById("cbxmultaEdicion");
     var index = combo.selectedIndex;
     //alert(index);
     let multa={};
     multa.idServicio=id;
     multa.costo=document.getElementById('txtcostoMulta').value;
     multa.tipo=document.getElementById('cbxmultaEdicion').value;
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
         editarMulta(multa);
     }
  }
async function editarMulta(multa){
    const request = await fetch('api/multas',{
                method: 'PUT',
                        headers: {
                          'Accept': 'application/json',
                          'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(multa)
    });
    $('#modalMultaConductor').modal('hide');
    verMultas(obtenerIdDeUrl());
}
async function eliminarMulta(id){
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
        verMultas(obtenerIdDeUrl());
    });
}