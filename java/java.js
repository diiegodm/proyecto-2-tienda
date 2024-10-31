

let plantasArray = [
    {
        id: 1,
        nombre: 'Monstera Deliciosa',
        img: "./imagenes/img.1.jpeg",
        descripción: 'Conocida familiarmente como costilla de Adán o cerimán.',
        precio:  4,
        stock: 4
        

    },
    {
        id: 2,
        nombre: 'Cereus Jamacaru',
        img: "./imagenes/img.2.jpg",
        descripción: 'Son perfectas si no tienes tiempo de regar plantas y quitarles las hojas muertas.',
        precio:  1,
        stock: 5
        
    },
    {
        id: 3,
        nombre: 'Crassula',
        img: "./imagenes/img.3.jpg",
        descripción: 'Son perfectas para adornar espacios pequeños.',
        precio:  3,
        stock: 5
    },
    {
        id: 4,
        nombre: 'Epipremnum',
        img: "./imagenes/img.4.jpeg",
        descripción: 'Son perfectas para colgar en entradas y espacios exteriores.',
        precio:  5,
        stock: 4
    },
    {
        id: 5,
        nombre: 'Rotomiel Colgante',
        img: "./imagenes/img.5.webp",
        descripción: 'Son perfectas para colgar en entradas y espacios exteriores.',
        precio:  5,
        stock: 5
    },
    {
        id: 6,
        nombre: 'Gauchos Oliveros',
        img: "./imagenes/img.6.jpeg",
        descripción: 'Son perfectas para colgar en entradas y espacios exteriores.',
        precio:   5,
        stock: 5
    },
    {
        id: 7,
        nombre: 'Olea Europea',
        img: "./imagenes/img.7.jpg",
        descripción: 'Son perfectas para decoración de jardín.',
        precio:  8,
        stock: 3
    },
    {
        id: 8,
        nombre: 'Sansevieria Trafasciata',
        img: "./imagenes/img.8.jpg",
        descripción: 'Planta popular por su belleza a la hora de decorar exteriores.',
        precio:  8,
        stock: 2
    },
    {
        id: 9,
        nombre: 'Crassula Ovata',
        img: "./imagenes/img.9.jpg",
        descripción: 'Planta popular por su belleza a la hora de decorar exteriores.',
        precio:  5,
        stock: 2
    }
];

// Selección de elementos de la página
let $contenedorCart = document.querySelector('.Cart-produt');
let $productosAdd = document.querySelector('#productosAdd');


// Inicialización de la tienda-----
function iniciar() {
    crearTarjetasDePlantas();
}

// Creación dinámica de tarjetas ------
function crearTarjetasDePlantas() {
    let $main = document.createElement('main');
    let $section = document.createElement('section');
    $section.classList.add('contenido_main');
    $section.id = 'contenido_main';

    plantasArray.forEach(planta => {
        let $divContainer = document.createElement('div');
        $divContainer.classList.add('conten_info');

        let $divImg = document.createElement('div');
        $divImg.classList.add('conten_img');
        let $img = document.createElement('img');
        $img.src = planta.img;
        $divImg.appendChild($img);

        let $divTexto = document.createElement('div');
        $divTexto.classList.add('conten_tex');
        let $h3 = document.createElement('h3');
        $h3.textContent = planta.nombre;
        let $descrip = document.createElement('p');
        $descrip.textContent = planta.descripción;
        let $precio = document.createElement('p');
        $precio.classList.add('price');
        $precio.textContent = planta.precio + '$';

        $divTexto.append($h3, $descrip, $precio);

        let $divBotton = document.createElement('div');
        $divBotton.classList.add('button');
        let $botton = document.createElement('button');
        $botton.classList.add('addCompras');
        $botton.textContent = 'Agregar';
        $divBotton.appendChild($botton);

        $divContainer.append($divImg, $divTexto, $divBotton);
        $section.appendChild($divContainer);

        // Evento para añadir el producto al carrito-----
        $botton.addEventListener('click', () => addToCarClick(planta));
    });

    $main.appendChild($section);
    document.body.appendChild($main);
}


$contenedorCart.innerHTML = "";// se hacew para limpiar y solo agregar uno nuevo

// Agregar producto al carrito----
function addToCarClick(planta) {
    let $cartProduct = document.createElement('div');
    $cartProduct.classList.add('productos-item');
    $cartProduct.innerHTML = `
        <div class="contenedorCart">
            <p class="nombre-productos">${planta.nombre}</p>
            <div class="cantitdad">
                <i class="fa-solid fa-plus add"></i>
                <span class="cantidad-productos">1</span>
                <i class="fa-solid fa-minus less"></i>
            </div>
            <span class="precio-productos">${planta.precio}$</span>
            <i class="fa-solid fa-trash cerrar"></i>
        </div>
    `;

    // Evento para eliminar producto del carrito----
    $cartProduct.querySelector('.cerrar').addEventListener('click', () => {
        $cartProduct.remove();
        actualizarCantidadProductos(-1);
        totalCompra();
    });

    // Evento para aumentar la cantidad del producto----
    $cartProduct.querySelector('.add').addEventListener('click', () => {
        let $cantidadElemento = $cartProduct.querySelector('.cantidad-productos');
        $cantidadElemento.textContent = parseInt($cantidadElemento.textContent) + 1;
        totalCompra();
    });

    //para usar los botones---
    $cartProduct.querySelector('.less').addEventListener('click', () => {
        let $cantidadElemento = $cartProduct.querySelector('.cantidad-productos');
        let cantidad = parseInt($cantidadElemento.textContent);
        if (cantidad > 1) {
            $cantidadElemento.textContent = cantidad - 1;
            totalCompra();
        }
    });

    
    $contenedorCart.appendChild($cartProduct);
    actualizarCantidadProductos(1);
    totalCompra();
}


function actualizarCantidadProductos(cantidad) {
    let cantidadActual = parseInt($productosAdd.textContent) || 0;
    $productosAdd.textContent = cantidadActual + cantidad;
}

// Calcular y actualizar el total de la compra------
function totalCompra() {
    let total = 0;
    let $TotalCompra = document.querySelector('.price-total');
    let itemsCompraTotal = document.querySelectorAll('.productos-item');

    itemsCompraTotal.forEach(item => {
        let precioElemento = item.querySelector('.precio-productos');
        let precio = parseFloat(precioElemento.textContent.replace('$', '')) || 0;
        let cantidadElemento = item.querySelector('.cantidad-productos');
        let cantidad = parseInt(cantidadElemento.textContent) || 0;
        total += precio * cantidad;
    });

    $TotalCompra.textContent = `$${total.toFixed(2)}`;
}

// Evento para mostrar el carrito ---
document.querySelector('.abrirModal').addEventListener('click', () => {
    let $abrirVentana = document.querySelector('.contenedor-cart');
    $abrirVentana.style.display = $abrirVentana.style.display !== 'flex' ? 'flex' : 'none';
});


//seleccionamos el boton de pagar---


// Elementos y referencias principales
let $btnTotalPagar = document.querySelector('.pagar');
let $productosAddTotal = document.querySelector('#productosAdd'); 


$btnTotalPagar.addEventListener('click', btnTotalPagar);


function btnTotalPagar() {
    if (parseInt($productosAddTotal.textContent) === 0) {
        alert('No puedes pagar, el carrito está vacío.');
    } else {
        alert('Gracias por comprar. Procesando pago...');
        
    }
}

document.addEventListener('DOMContentLoaded', iniciar);


























