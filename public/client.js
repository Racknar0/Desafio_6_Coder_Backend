const socket = io();

const nombre_producto = document.getElementById('nombre_producto');
const precio_producto = document.getElementById('precio_producto');
const miniatura_producto = document.getElementById('miniatura_producto');
const btn_submit = document.getElementById('btn_submit');
const email_user = document.getElementById('email_user');
const input_msj = document.getElementById('input_msj');
const btn_enviar_msj = document.getElementById('btn_enviar_msj');
const container_msj = document.getElementById('container_msj');

socket.on('datos', (data) => {
    console.log('Datos recibidos del servidor productos', data);

    const container_productos = document.getElementById('container_productos');
    container_productos.style = 'width: 600px; margin: 0 auto;';

    container_productos.innerHTML = '';

        /* crear tabla */
        container_productos.innerHTML += `
        <table class="table table-striped">
            <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Precio</th>
                    <th scope="col">Miniatura</th>
                    <th scope="col">Acciones</th>
                </tr>
            </thead>
            <tbody id="tbody_productos">
            </tbody>
        </table>
        `;

        const tbody_productos = document.getElementById('tbody_productos');

        data.productos.forEach((producto) => {
            tbody_productos.innerHTML += `
            <tr>
                <th scope="row">${producto.id}</th>
                <td>${producto.title}</td>
                <td>${producto.price}</td>
                <td><img src="${producto.thumbnail}" alt="miniatura" width="50px"></td>
                <td>
                    <button type="button" class="btn btn-danger" onclick="borrarProducto(${producto.id})">Borrar</button>
                </td>
            </tr>
            `;
        });


});

btn_submit.addEventListener('click', (e) => {
    e.preventDefault();
    const producto = {
        title: nombre_producto.value,
        price: precio_producto.value,
        thumbnail: miniatura_producto.value,
    }

    socket.emit('producto_creado', producto);
    console.log('Datos enviados al servidor', producto);
});


function borrarProducto(id) {
    socket.emit('borrar_producto', id);
    console.log('Producto borrado', id);
}



btn_enviar_msj.addEventListener('click', (e) => {
    e.preventDefault();

    if ([email_user.value, input_msj.value].includes('')) {
        alert('Todos los campos son obligatorios');
        return;
    }

    const msj = {
        email: email_user.value,
        msj: input_msj.value,
    }

    socket.emit('msj', msj);
    console.log('Datos enviados al servidor', msj);
});

socket.on('messages', (data) => {
    console.log('Datos recibidos del servidor chat', data);

    container_msj.innerHTML = '';

    data.forEach((msj) => {

        container_msj.innerHTML += `
        <div class="d-flex">
            <p style="color: blue; font-weight: bold; margin-right: 5px">${msj.email} </p>
            <p style="margin-right: 5px">[<span style="color: brown; margin-right: 5px">${msj.hora}</span>] :</p>
            <p style="color: green; font-style: italic;">${msj.msj}</p>
        </div>
        `;

    
        
})});