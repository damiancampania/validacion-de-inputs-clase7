export function valida(input){
    const tipoDeInput = input.dataset.tipo //tipo es el nombre del input que estoy llamando del html 
    if (validadores[tipoDeInput]){ //como validadores tiene un valor arroja true
        validadores[tipoDeInput](input);
    }
    if (input.validity.valid){    //se llega poniendo en la consola $0.validity poniendo en inspeccionar el input ahi te dice que hay true y que false para completar los valores mas abajo
        input.parentElement.classList.remove("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML ="";
    } 
    else{
        input.parentElement.classList.add("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML =mostrarMensajeDeError(tipoDeInput,input);
    }         
}

const tipoDeErrores= ["valueMissing", "typeMismatch","patternMismatch","customError"];


        const mensajesDeError ={
        nombre: {
            valueMissing: "Este campo nombre no puede estar vacio"},
        email: {
            valueMissing: "Este campo email no puede estar vacio",
            typeMismatch:  "el correo no es valido"
        },

        password: {
            valueMissing: "Este campo password no puede estar vacio",
            patternMismatch: "Al menos 6 caracteres, máximo 12, debe contener una letra minúscula, una letra mayúscula, un número y no puede contener caracteres especiales."

        },
        nacimiento: {
            valueMissing: "Este campo no puede estar vacio",
            customError: "debes tener al menos 18 años de edad"

        },
        numero:{
            valueMissing: "Este campo no puede estar vacio",
            patternMismatch: "ingrse numero de 10 numeros"
        },
        direccion:{
            valueMissing: "Este campo no puede estar vacio",
            patternMismatch: "la direccion debe ser mayor a 10 caracteres"
        },
        ciudad:{
            valueMissing: "Este campo no puede estar vacio",
            patternMismatch: "la ciudad debe ser mayor a 10 caracteres"
        },
        estado:{
            valueMissing: "Este campo no puede estar vacio",
            patternMismatch: "el estado debe ser mayor a 10 caracteres"
        },
    
    }

    const validadores = {
        nacimiento:(input) => validarNacimiento(input), //nacimiento es el nombre del data-tipo
    };

//////////////
function mostrarMensajeDeError(tipoDeInput, input){
    let mensaje =""
    tipoDeErrores.forEach((error) => {
     if(input.validity[error]) {
        console.log (error);
        console.log(input.validity[error]);
        console.log(mensajesDeError[tipoDeInput][error]);
        mensaje = (mensajesDeError[tipoDeInput][error]);
     }  
    });
    return mensaje; 
}
////////////////

/* texto anterior////const inputNacimiento= document.querySelector ("#birth");

inputNacimiento.addEventListener ("blur", (evento) => {
validarNacimiento(evento.target);

});*/

function validarNacimiento (input) {
 const fechaCliente= new Date(input.value); /////la hizo re larga, poniendo arriba inputNacimiento.value llegabas tambien al valor de la fecha
let mensaje= "";
if (!mayorDeEdad(fechaCliente)){
 mensaje = "debes tener al menos 18 años de edad"
}
input.setCustomValidity (mensaje);

}


function mayorDeEdad (fecha) {
 const fechaActual = new Date();
const diferenciaFechas  = new Date(fecha.getUTCFullYear()+ 18, fecha.getUTCMonth(), fecha.getUTCDate())

return (diferenciaFechas <= fechaActual);

}

