async function iniciarSesion(email,pass){
    let datos = {};
    datos.correo = email;
    datos.password = pass;
     const request = await fetch('api/usuarios/verificar', {
                    method: 'POST',
                    headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(datos)
            });
            const answer = await request.text();
            if(answer=='nuevo'){
                localStorage.setItem('password', datos.password);
                localStorage.setItem('correo', datos.correo);
                window.location.href = 'cambiarContrasena.html';

            }else if(answer=='viejo'){
                localStorage.setItem('password', datos.password);
                verificarYAsignarRol();
            }else{
                //mostrarAlerta();
                alert("ocurrio un error");
            }
}
async function verificarYAsignarRol(){
        let login = {};
        login.correo = document.getElementById('txtEmail').value;
        login.password = document.getElementById('txtPassword').value;
          const request = await fetch('api/login', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(login)
          });
        const respuesta = await request.json();
        if(respuesta.length!=0){
            localStorage.token = respuesta[0];
            localStorage.email = login.correo;
            localStorage.rol = respuesta[1];
            localStorage.idEmpleado = respuesta[2];
            if(respuesta[1]=='Admin'){
                window.location.href = 'index.html';
            }else{
                if(respuesta[1]=='Conductor'){
                    window.location.href = 'indexConductor.html';
                }else{
                    //mostrarAlerta();
                    alert("error en asignacion de rol");
                }
            }
        }else{
            //mostrarAlerta();
            alert("usuario inexistente");
        }
}
function validarLogin(){
    let datos = {};
    datos.correo = document.getElementById('txtEmail').value;
    datos.password = document.getElementById('txtPassword').value;
    const errorEmail = document.getElementById('lblErrorEmail');
    const errorPass = document.getElementById('lblErrorPass');
        if(datos.correo===''){
            errorEmail.innerHTML="Ingrese correo";
        }else if(!esValidoCorreo(datos.correo)){
            errorEmail.innerHTML="Correo en formato incorrecto";
        }else{
            errorEmail.innerHTML="";
        }
        if(datos.password===''){
            errorPass.innerHTML="Ingrese contrasena";
        }else if(datos.password.length<6){
            errorPass.innerHTML="Contrasena errorea";
        }else{
            errorPass.innerHTML="";
        }
        if(errorEmail.innerHTML === "" && errorPass.innerHTML === ""){
            iniciarSesion(datos.correo,datos.password);
        }
}
function esValidoCorreo(email){
    const patron = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    return patron.test(String(email));
}
function esValidaLaContrasena(pass) {
    //const expresion = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const expresion = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#(){}[\]^\\/\|<>,.:;_-])[A-Za-z\d@$!%*?&#(){}[\]^\\/\|<>,.:;_-]{8,}$/;
    return expresion.test(String(pass));
}
function validarContrasena(){
        const email=localStorage.getItem('correo');
        const passActual=localStorage.getItem('password');

        const actual=document.getElementById('txtactualpass');
        const nueva = document.getElementById('txtnuevapass');
        const repetirnueva = document.getElementById('txtrepetirpass');
        const errorActual=document.getElementById('lblError1');
        const errorNueva=document.getElementById('lblError2');
        const errorRepetir=document.getElementById('lblError3');

        if(actual.value===''){
            errorActual.innerHTML="Ingrese su pass actual";
        }else if(actual.value!==passActual){
            errorActual.innerHTML="pass actual invalida";
        }else{
            errorActual.innerHTML = "";
        }

        if(nueva.value===''){
            errorNueva.innerHTML="Ingrese su pass nueva";
        }else if(!esValidaLaContrasena(nueva.value)){
            errorNueva.innerHTML="La contraseña debe ser >= 8 digitos. Al menos tener 1 letra mayuscula, 1 miniscula, 1 numero y 1 caracter especial";
        }else if(nueva.value.length<8){
            errorNueva.innerHTML="no debe ser menor a 8 digitos";
        }else{
            errorNueva.innerHTML="";
        }

        if(repetirnueva.value===''){
            errorRepetir.innerHTML="Este campo no puede estar vacio";
        }else if(repetirnueva.value!==nueva.value){
            errorRepetir.innerHTML="las pass no coinciden";
        }else{
            errorRepetir.innerHTML="";
        }

        if (errorActual.innerHTML === "" && errorNueva.innerHTML === "" && errorRepetir.innerHTML === "") {
            agregarPassBD(email,nueva.value);
        }
}
async function agregarPassBD(correo,passs){
    let datos = {};
        datos.correo = correo;
        datos.password = passs;
         const request = await fetch('api/usuarios/password', {
                        method: 'POST',
                        headers: {
                          'Accept': 'application/json',
                          'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(datos)
                });
                const answer = await request.text();
                alert(answer);
                if(answer=='exito'){
                    window.location.href = 'login.html';

                }else if(answer=='fail'){
                    alert("fallo algo, revisar");
                }else{
                    alert("respodio otra cosa");
                }
}
function correoEsValido(){
    const email = document.getElementById('txtemail').value
    const errorEmail = document.getElementById('lblErrorEmail');
    if(email===''){
        errorEmail.innerHTML="Ingrese correo";
    }else if(!esValidoCorreo(email)){
        errorEmail.innerHTML="Correo en formato incorrecto";
    }else{
        errorEmail.innerHTML="";
    }
    if(errorEmail.innerHTML===""){
        existeCorreo(email);
    }
}
async function existeCorreo(email){
    const botonEnviar = document.getElementById('enviarCorreo');
    botonEnviar.disabled = true;
    botonEnviar.textContent = 'Espere unos segundos...';

    const errorEmail = document.getElementById('lblErrorEmail');
    const requestData = { email: email };
    const request = await fetch('api/usuarios/verificarEmail', {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(requestData)
    });
    const answer = await request.text();
    botonEnviar.disabled = false;
    botonEnviar.textContent = 'Cambiar Contraseña';
    if(answer=='existe'){
        errorEmail.innerHTML="Revisa tu correo, te enviamos un link";
    }else if(answer=='fail'){
        errorEmail.innerHTML="El correo no esta registrado en la Base de Datos";
    }else{
        errorEmail.innerHTML="algo raro paso!";
    }
}

function validarContrasenaCorreo(){

        const nueva = document.getElementById('txtnuevapass');
        const repetirnueva = document.getElementById('txtrepetirpass');
        const errorNueva=document.getElementById('lblError2');
        const errorRepetir=document.getElementById('lblError3');

        if(nueva.value===''){
            errorNueva.innerHTML="Ingrese su pass nueva";
        }else if(!esValidaLaContrasena(nueva.value)){
            errorNueva.innerHTML="La contraseña debe ser >= 8 digitos. Al menos tener 1 letra mayuscula, 1 miniscula, 1 numero y 1 caracter especial";
        }else if(nueva.value.length<8){
            errorNueva.innerHTML="no debe ser menor a 8 digitos";
        }else{
            errorNueva.innerHTML="";
        }

        if(repetirnueva.value===''){
            errorRepetir.innerHTML="Este campo no puede estar vacio";
        }else if(repetirnueva.value!==nueva.value){
            errorRepetir.innerHTML="las pass no coinciden";
        }else{
            errorRepetir.innerHTML="";
        }

        if (errorNueva.innerHTML === "" && errorRepetir.innerHTML === "") {
            agregarPassBDCorreo(nueva.value);//aqui revisar como obtener el correo
        }
}
async function agregarPassBDCorreo(passs){
    const urlActual = window.location.href;
    const url = new URL(urlActual);
    const correo = url.searchParams.get("email");
    let datos = {};
        datos.correo = correo;
        datos.password = passs;
         const request = await fetch('api/usuarios/passwordXcorreo', {
                        method: 'POST',
                        headers: {
                          'Accept': 'application/json',
                          'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(datos)
                });
                const answer = await request.text();
                if(answer=='exito'){
                    window.location.href = 'login.html';

                }else if(answer=='fail'){
                    alert("fallo algo, revisar");
                }else{
                    alert("respodio otra cosa");
                }
}