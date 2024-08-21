const carrito = document.querySelector('#carrito');
const listaProductos = document.querySelector('#lista-1');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');

cargarEventListeners();

function cargarEventListeners() {

    listaProductos.addEventListener('click', agregarProducto);


    carrito.addEventListener('click', eliminarProducto);

    vaciarCarritoBtn.addEventListener('click', vaciarCarrito);

    document.addEventListener('DOMContentLoaded', leerLocalStorage);
}


function agregarProducto(e) {
    e.preventDefault();
    if (e.target.classList.contains('agregar-carrito')) {
        const producto = e.target.parentElement.parentElement;
        leerDatosProducto(producto);
    }
}


function leerDatosProducto(producto) {
    const infoProducto = {
        imagen: producto.querySelector('img').src,
        titulo: producto.querySelector('h3').textContent,
        precio: producto.querySelector('.precio').textContent,
        id: producto.querySelector('a').getAttribute('data-id')
    }
    insertarCarrito(infoProducto);
}


function insertarCarrito(producto) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>
            <img src="${producto.imagen}" width=100>
        </td>
        <td>${producto.titulo}</td>
        <td>${producto.precio}</td>
        <td>
            <a href="#" class="borrar-producto" data-id="${producto.id}">X</a>
        </td>
    `;
    contenedorCarrito.appendChild(row);
    guardarProductoLocalStorage(producto);
}


function eliminarProducto(e) {
    e.preventDefault();

    let producto, productoID;
    if (e.target.classList.contains('borrar-producto')) {
        e.target.parentElement.parentElement.remove();
        producto = e.target.parentElement.parentElement;
        productoID = producto.querySelector('a').getAttribute('data-id');
    }
    eliminarProductoLocalStorage(productoID);
}


function vaciarCarrito() {
    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
    vaciarLocalStorage();
    return false;
}


function guardarProductoLocalStorage(producto) {
    let productos;
    productos = obtenerProductosLocalStorage();
    productos.push(producto);
    localStorage.setItem('productos', JSON.stringify(productos));
}


function obtenerProductosLocalStorage() {
    let productosLS;
    if (localStorage.getItem('productos') === null) {
        productosLS = [];
    } else {
        productosLS = JSON.parse(localStorage.getItem('productos'));
    }
    return productosLS;
}


function eliminarProductoLocalStorage(productoID) {
    let productosLS;
    productosLS = obtenerProductosLocalStorage();
    productosLS.forEach(function(producto, index) {
        if (producto.id === productoID) {
            productosLS.splice(index, 1);
        }
    });
    localStorage.setItem('productos', JSON.stringify(productosLS));
}


function leerLocalStorage() {
    let productosLS;
    productosLS = obtenerProductosLocalStorage();
    productosLS.forEach(function(producto) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${producto.imagen}" width=100>
            </td>
            <td>${producto.titulo}</td>
            <td>${producto.precio}</td>
            <td>
                <a href="#" class="borrar-producto" data-id="${producto.id}">X</a>
            </td>
        `;
        document.querySelector('#lista-carrito tbody').appendChild(row);
    });
}


function vaciarLocalStorage() {
    localStorage.clear();
}




