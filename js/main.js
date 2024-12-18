const btnAgregar = document.getElementById("btnAgregar");
const btnClear = document.getElementById("btnClear");

const txtName = document.getElementById("Name");
const txtNumber = document.getElementById("Number");


const alertValidaciones = document.getElementById("alertValidaciones");
const alertValidacionesTexto = document.getElementById("alertValidacionesTexto");

const tablaListaCompras = document.getElementById("tablaListaCompras");
const cuerpoTabla = tablaListaCompras.getElementsByTagName("tbody").item(0);

let cont=0;
let costoTotal = 0;
let totalEnProductos = 0;

const contadorProductos = document.getElementById("contadorProductos");
const productosTotal = document.getElementById("productosTotal");
const precioTotal   = document.getElementById("precioTotal");

let datos = new Array();

function validarCantidad(){
        //1. validación de la longitud
        //2. Número
        //3. mayor que 0
    if(txtNumber.value.length<=0){
        return false
    }
    if(isNaN(txtNumber.value)){
        return false
    }
    if(Number(txtNumber.value)<=0){
        return false
    }
    return true
}

function getPrecio(){
    return Math.round((Math.random()*10000))/100;//general un numero entre 0-1 lo multiplica por
    //10000, lo redondea y lo divide entre 100 dejando dos decimales.
}   // retorna un numero al azar

btnAgregar.addEventListener("click", function(event){
    event.preventDefault()
    let isValid = true; // bandera que permite agregar datos a la tabla


    txtName.value = txtName.value.trim();
    txtNumber.value = txtNumber.value.trim();

    txtName.style.border="";
    txtNumber.style.border="";

    alertValidacionesTexto.innerHTML = "";
    alertValidaciones.style.display="none";


    if(txtName.value.length<3){
        //1. mostrar la alerta con el error
        //2. borde de color rojo
        txtName.style.border="solid red medium";
        alertValidacionesTexto.innerHTML = "<strong>El nombre del producto no es correcto.</strong>";
        alertValidaciones.style.display="block";
        isValid = false;
    }//if name<3

    if(!validarCantidad()){
        txtNumber.style.border= "solid red medium";
        alertValidacionesTexto.innerHTML += "<br/><strong>La cantidad no es correcta.</strong>";
        alertValidaciones.style.display="block";
        isValid = false; 
    }// validación de la cantidad

    if(isValid){
        cont++;
        let precio = getPrecio();
        let row= `<tr>
                    <td>${cont}</td>
                    <td>${txtName.value}</td>
                    <td>${txtNumber.value}</td>
                    <td>${precio}</td>
                  </tr>`;
        let elemento = {  "cont": cont, 
                        "nombre": txtName.value, 
                        "cantidad": txtNumber.value, 
                        "precio": precio};
        datos.push(elemento);
        localStorage.setItem("datos", JSON.stringify(datos));

        cuerpoTabla.insertAdjacentHTML("beforeend", row);
        costoTotal += precio*Number(txtNumber.value);
        precioTotal.innerText = "$ " + costoTotal.toFixed(2);
        contadorProductos.innerText = cont;
        totalEnProductos += Number(txtNumber.value)
        productosTotal.innerText = totalEnProductos;

        localStorage.setItem("costoTotal", costoTotal)
        localStorage.setItem("totalEnProductos", totalEnProductos)
        localStorage.setItem("cont", cont)

        txtName.value="";
        txtNumber.value="";
        txtName.focus();
    }



}) // btnAgregar click


btnClear.addEventListener("click", function(event){
    event.preventDefault();

    cont=0;
    costoTotal=0;
    totalEnProductos=0;

    precioTotal.innerText = "$ " + costoTotal.toFixed(2);
    contadorProductos.innerText = cont;
    productosTotal.innerText = totalEnProductos;

    cuerpoTabla.innerHTML = "";

    txtName.value = "";
    txtNumber.value = "";

    txtName.style.border="";
    txtNumber.style.border="";

    alertValidacionesTexto.innerHTML = "";
    alertValidaciones.style.display="none";

})//clear button

window.addEventListener("load", function(event){
    if(this.localStorage.getItem("costoTotal")!=null){// obtiene localstorage "costoTotal"
        costoTotal = Number(this.localStorage.getItem("costoTotal"))//costoTotal
    }
    if(this.localStorage.getItem("totalEnProductos")!=null){
        totalEnProductos = Number(this.localStorage.getItem("totalEnProductos"));
    }
    if(this.localStorage.getItem("cont")!=null){
        cont = Number(this.localStorage.getItem("cont"));
    }

    if(this.localStorage.getItem("datos")!=null){
        datos = JSON.parse(this.localStorage.getItem("datos"));
    }//trae el contador de datos

    datos.forEach((r)=>{
        let row = `<tr>
                    <td>${r.cont}</td>
                    <td>${r.nombre}</td>
                    <td>${r.cantidad}</td>
                    <td>${r.precio}</td>
                  </tr>`;
        cuerpoTabla.insertAdjacentHTML("beforeend", row);

    });//ForEach recorre todos los "" de un algo en este caso 

    precioTotal.innerText = "$ " + costoTotal.toFixed(2);
    contadorProductos.innerText = cont;
    productosTotal.innerText = totalEnProductos;

})//windowload