'use Strict';
let a = "-50";
let b = "50-";
let c = "50";
console.log(a.split("-"));
console.log(b.split("-"));

console.log(c.split("-"));






var ExpresionCorreo = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
 
function ValidarCorreo(){
    if (ExpresionCorreo.test('pepe@correo.es')){
        console.log('Formato de correo, válido')
        return true;
    } else {
        console.log("El correo no es válido");
        return false;
    }
}
ValidarCorreo();
