
//----------------------//

let $contenedorCart = document.querySelector('.Cart-produt');
let $productosAdd = document.querySelector('#productosAdd');
let allProductos = [];

function iniciar() {
    crearTarjetasDePlantas();
}


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


        $botton.addEventListener('click', () => addToCarClick(planta));
    });

    $main.appendChild($section);
    document.body.appendChild($main);
}

// controlar la cantidad de plantitas en las cartas---
function addToCarClick(planta) {
    let productoEnCarrito = allProductos.find(item => item.id === planta.id);

    if (productoEnCarrito) {

        if (productoEnCarrito.cantidad < planta.stock) {
            productoEnCarrito.cantidad++;
        } else {
            alert(`!!!oyeee¡¡¡  no tenemos mas :(  ${planta.nombre}.`);
        }
    } else {

        allProductos.push({
            ...planta,
            cantidad: 1
        });
    }

    // Mostrar el carrito 
    showCart();
    totalCompra();
    actualizarCantidadProductos();
}
$contenedorCart.innerHTML = ""; //esto es para limpiar el carrito (eliminar los ejemplos del html)

function showCart() {


    $contenedorCart.innerHTML = "";// aqui tambien para limpiar y no repetir codigos 

    allProductos.forEach(product => {
        let $cartProduct = document.createElement('div');
        $cartProduct.classList.add('productos-item');
        let precioTotalProducto = product.precio * product.cantidad;
        $cartProduct.innerHTML = `
            <div class="contenedorCart">
                <p class="nombre-productos">${product.nombre}</p>
                <div class="cantitdad">
                    <i class="fa-solid fa-plus add"></i>
                    <span class="cantidad-productos">${product.cantidad}</span>
                    <i class="fa-solid fa-minus less"></i>
                </div>
                <span class="precio-productos">${precioTotalProducto}$</span>
                <i class="fa-solid fa-trash cerrar"></i>
            </div>
        `;


        $cartProduct.querySelector('.cerrar').addEventListener('click', () => {
            allProductos = allProductos.filter(item => item.id !== product.id);
            showCart();
            actualizarCantidadProductos();
            totalCompra();
        });

        // 
        $cartProduct.querySelector('.add').addEventListener('click', () => {
            if (product.cantidad < product.stock) {
              
                product.cantidad++;

                showCart();
                totalCompra();
            } else {
                alert(`No puedes agregar más unidades de ${product.nombre}. Stock máximo alcanzado.`);
            }
        });

        // boton para eliminar
        $cartProduct.querySelector('.less').addEventListener('click', () => {
            if (product.cantidad > 1) {
                
                product.cantidad--;

                showCart();
                totalCompra();
            } else {
                // eliminar los item con el boton
                allProductos = allProductos.filter(item => item.id !== product.id);
                showCart();
                actualizarCantidadProductos();
                totalCompra();
                // totalitem ()
            }



          


          
        });

        $contenedorCart.appendChild($cartProduct);
    });

    actualizarCantidadProductos();
}



function actualizarCantidadProductos() {
    let totalCantidad = allProductos.reduce((acc, producto) => acc + producto.cantidad, 0);
    $productosAdd.textContent = totalCantidad;
 

}


function totalCompra() {
    let total = allProductos.reduce((acc, producto) => acc + producto.precio * producto.cantidad, 0);
    let $TotalCompra = document.querySelector('.price-total');
    $TotalCompra.textContent = `$${total.toFixed(2)}`;
}


document.querySelector('.abrirModal').addEventListener('click', () => {
    let $abrirVentana = document.querySelector('.contenedor-cart');
    $abrirVentana.style.display = $abrirVentana.style.display !== 'flex' ? 'flex' : 'none';
});


let $btnTotalPagar = document.querySelector('.pagar');
let $productosAddTotal = document.querySelector('#productosAdd');

$btnTotalPagar.addEventListener('click', () => {
    if (parseInt($productosAddTotal.textContent) === 0) {
        alert('!!!oyeeeee¡¡¡ el carrito está vacío.');
    } else {
        alert('Gracias por comprar. Procesando pago...');
    }
});










document.addEventListener('DOMContentLoaded', iniciar);
