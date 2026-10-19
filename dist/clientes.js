"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cadastrarCliente = cadastrarCliente;
exports.listarClientes = listarClientes;
const clientes = [];
function cadastrarCliente(cliente) {
    clientes.push(cliente);
}
function listarClientes() {
    return clientes;
}
//# sourceMappingURL=clientes.js.map