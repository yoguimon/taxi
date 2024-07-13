
async function agregarVehiculo(datos){
      const request = await fetch('/api/vehiculos', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
      });
      enviarIdAListaVehiculos();

}
function obtenerIdDeUrl() {
     parametrosDeConsulta = new URLSearchParams(window.location.search);
     const id = parametrosDeConsulta.get('id');
     return id;
}
function enviarIdAListaVehiculos(){
    var id = obtenerIdDeUrl();
    window.location.href = `listaVehiculos.html?id=${id}`;
}
function validarVehiculo(){
    let datos = {};
    const idCon = parseInt(obtenerIdDeUrl());
    datos.conductor={idConductor: idCon};
    datos.placa = document.getElementById('txtplaca').value;
    datos.marca = document.getElementById('txtmarca').value;
    datos.color = document.getElementById('txtcolor').value;
    datos.tipo = document.getElementById('cbxtipo').value;

    const errorPlaca = document.getElementById('lblErrorPlaca');
    const errorMarca = document.getElementById('lblErrorMarca');
    const errorColor = document.getElementById('lblErrorColor');

    errorPlaca.innerHTML = validarPlaca(datos.placa);
    errorMarca.innerHTML = validarDireccion(datos.marca);
    errorColor.innerHTML = validarNombre(datos.color);

    if(errorPlaca.innerHTML==="" && errorMarca.innerHTML==="" && errorColor.innerHTML===""){
         agregarVehiculo(datos);
    }
}