$(document).ready(function() {
    cargarDatosConductor();
});
const cargarDatosConductor = async () => {
    var id = localStorage.getItem('idConductor');
    const request = await fetch('api/conductores/'+id, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
    });
    const conductor = await request.json();
    document.getElementById('lblnombre').textContent=conductor.nombre+" "+conductor.primerApellido+" "+conductor.segundoApellido;
    document.getElementById('lblnrolicencia').textContent=conductor.numLicencia;
    localStorage.setItem('idPago',id);
}

function generarQrPago() {
    if(total!=0){
        // Limpia cualquier QR previo antes de generar uno nuevo
        console.log("ingreso")
        $('#qrModal').modal('show');
        var qrCodeContainer = document.getElementById("qrcode");
        qrCodeContainer.innerHTML = "";

        // Genera el QR code
        var qrcode = new QRCode(qrCodeContainer, {
            text: "https://www.example.com",
            width: 420,
            height: 420
        });

        // Limpia el QR code cuando el modal se oculta
        $('#qrModal').on('hidden.bs.modal', function () {
            qrCodeContainer.innerHTML = ""; // Limpiar el QRCode cuando se cierra el modal
        });
    }else{
        Swal.fire({
          title: "Error",
          text: "Debes ingresar al menos un servicio a la tabla para Pagar!",
          icon: "error",
          iconColor: "#365CCD",
          confirmButtonColor: "#365CCD"
        });
    }
}