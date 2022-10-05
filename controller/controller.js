const fs = require('fs');
const path = require('path');

class ProductosController {

    constructor(productos) {
        this.productos = productos;
    }

    listar() {
        return this.productos;
    }
    listarPorId(id) {
        return this.productos.filter((producto) => producto.id == id);
    }
    guardar(producto) {
        //escritura en archivo json arrProductos.json
        this.productos.push(producto);
        fs.writeFileSync(path.join(__dirname, '../model/arrProductos.json'), JSON.stringify(this.productos, null, '\t'));
        
    }
    actualizar(id, producto) {
        this.productos = this.productos.map((producto) => {
            if (producto.id == id) {
                producto = producto;
            }
            return producto;
        });
    }
    borrar(id) {
        this.productos = this.productos.filter((producto) => producto.id != id);
    }
}

class MessagesController {
    constructor(messages) {
        this.messages = messages;
    }
    listar() {
        return this.messages;
    }
    guardar(message) {
        this.messages.push(message);
        fs.writeFileSync(path.join(__dirname, '../model/messages.json'), JSON.stringify(this.messages, null, '\t'));
    }
}


module.exports = ProductosController;
module.exports = MessagesController;