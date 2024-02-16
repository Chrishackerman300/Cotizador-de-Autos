//Constructor Seguro
function Seguro(marca, year, tipo){
    this.marca = marca
    this.year = year
    this.tipo = tipo
}

//Prototype de Seguro
Seguro.prototype.cotizarSeguro = function(){
    let cantidad
    const base = 2000

    //Calculando el porcentahe de acuerdo a la región del auto
    switch(this.marca){
        case '1':
            cantidad = base * 1.15
            break

        case '2':
            cantidad = base * 1.30
            break

        case '3':
            cantidad = base * 1.05
        default:
            break
    }

    //Haciendo la resta del 3% de cada año del auto
    const diferencia = new Date().getFullYear() - this.year

    cantidad -= ((diferencia * 3) * cantidad) / 100

    //Verificando que tipo de seguro tiene para aumentarle ya sea 30% o 50%
    switch(this.tipo){
        case 'basico':
            cantidad *= 1.30
            break

        case 'completo':
            cantidad *= 1.50
            break
        
        default:
            break
    }

    return cantidad
}

//Constructor Interfaz de Usuario UI
function UI(){}

//Prototype de UI
UI.prototype.mostrarFecha = () => {

    //Variables para los años
    const max = new Date().getFullYear()
    const min = max - 24

    for(let i = max; i >= min; i--){
        const fecha = document.createElement('option')
        fecha.value = i
        fecha.textContent = i

        const year = document.querySelector('#year')
        year.appendChild(fecha)
    }
}

UI.prototype.mostrarAlerta = (mensaje, tipo) => {
    const alerta = document.createElement('div')
    alerta.classList.add('alerta')

    if(tipo === 'error'){
        alerta.classList.add('error')
    }
    else{
        alerta.classList.add('correcto')
    }

    alerta.textContent = mensaje

    const formulario = document.querySelector('#formulario')

    formulario.insertBefore(alerta, document.querySelector('#resultado'))

    setTimeout(() => {
        alerta.remove()
    }, 2500);
}

UI.prototype.mostrarResultado = (seguro, total) => {
    
    //Destructuring 
    const {marca, year, tipo} = seguro

    let texto

    switch(marca){
        case '1':
            texto = 'Americano'
            break

        case '2':
            texto = 'Europeo'
            break

        case '3':
            texto = 'Asiatico'
            break

        default:
            break
    }

    const resultados = document.createElement('div')

    resultados.classList.add('show-resultados')
    resultados.innerHTML = `
        <p class="p-title">Resultado de la cotización</p>
        <p class="paragraph">Marca: <span>${texto}</span></p>
        <p class="paragraph">Año: <span>${year}</span></p>
        <p class="paragraph">Seguro: <span>${tipo}</span></p>
        <p class="paragraph">Total: <span>$${total}</span></p>
    `


    const div = document.querySelector('#resultado')
    const spinner = document.querySelector('.spinner')
    spinner.classList.add('show-spinner')

    setTimeout(() => {
        spinner.classList.remove('show-spinner')

        div.appendChild(resultados)
    }, 3000);
    
}

//Instacia de UI
const ui = new UI()

//Events Listeners
document.addEventListener('DOMContentLoaded', () => {
    ui.mostrarFecha()
})

cargarEventos()

function cargarEventos(){
    const formulario = document.querySelector('#formulario')

    formulario.addEventListener('submit', validarFormulario)
}

//Funciones
function validarFormulario(e){
    e.preventDefault()

    //Variables de la validación
    const marca = document.querySelector('#marca').value
    const year = document.querySelector('#year').value
    const tipo = document.querySelector('input[name="tipo"]:checked').value

    //Validación del formulario
    if(marca === '' || year === '' || tipo === ''){
        ui.mostrarAlerta('Faltan mas datos para la cotizacion. Favor de llenarlos todos', 'error')
        return
    }

    ui.mostrarAlerta('Cotizando...', 'correcto')

    //Instancia de Seguro
    const seguro = new Seguro(marca, year, tipo)
    const total = seguro.cotizarSeguro()

    //Eliminando cotizaciones anteriores
    const resultado = document.querySelector('#resultado div')

    if(resultado !== null){
        resultado.remove()
    }

    ui.mostrarResultado(seguro, total)
}