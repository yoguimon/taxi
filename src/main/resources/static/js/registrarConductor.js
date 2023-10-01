async function agregarConductor(datos){
        alert("agregando...");
        const request = await fetch('api/conductores', {
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(datos)
        });
        window.location.href='listaConductores.html';
}
function validarConductor(){
    let jsonInformacion={};
    jsonInformacion.nombre = document.getElementById('txtnombre').value;
    jsonInformacion.primerApellido = document.getElementById('txtapellidoP').value;
    jsonInformacion.segundoApellido=document.getElementById('txtapellidoM').value;
    jsonInformacion.telefono=document.getElementById('txttelefono').value;
    jsonInformacion.numLicencia=document.getElementById('txtnumeroL').value;
    jsonInformacion.rol=document.getElementById('cbxrol').value;
    jsonInformacion.placa=document.getElementById('txtplaca').value;
    jsonInformacion.marca=document.getElementById('txtmarca').value;
    jsonInformacion.color=document.getElementById('txtcolor').value;
    jsonInformacion.tipo=document.getElementById('cbxtipo').value;

    const errorNombre= document.getElementById('lblErrorNombre');
    const errorApellidoP = document.getElementById('lblErrorApellidoP');
    const errorApellidoM = document.getElementById('lblErrorApellidoM');
    const errorTelefono = document.getElementById('lblErrorTelefono');
    const errorNumeroL = document.getElementById('lblErrorNumeroL');
    const errorPlaca = document.getElementById('lblErrorPlaca');
    const errorMarca = document.getElementById('lblErrorMarca');
    const errorColor = document.getElementById('lblErrorColor');

    errorNombre.innerHTML = validarNombre(jsonInformacion.nombre);
    errorApellidoP.innerHTML = validarApellidoP(jsonInformacion.primerApellido);
    errorApellidoM.innerHTML = validarApellidoM(jsonInformacion.segundoApellido);
    errorTelefono.innerHTML = validarTelefono(jsonInformacion.telefono);
    errorNumeroL.innerHTML = validarCarnet(jsonInformacion.numLicencia);
    errorPlaca.innerHTML = validarPlaca(jsonInformacion.placa);
    errorMarca.innerHTML = validarDireccion(jsonInformacion.marca);
    errorColor.innerHTML = validarNombre(jsonInformacion.color);

    if(errorNombre.innerHTML==="" && errorApellidoP.innerHTML==="" && errorApellidoM.innerHTML === "" && errorTelefono.innerHTML===""
            && errorNumeroL.innerHTML==="" && errorPlaca.innerHTML==="" && errorMarca.innerHTML==="" && errorColor.innerHTML==="") {
            agregarConductor(jsonInformacion);
     }
}