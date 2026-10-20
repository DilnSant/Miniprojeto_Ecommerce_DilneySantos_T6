import type { Cliente } from './types';

const clientes: Cliente[] = [
];

function cadastrarCliente(cliente: Cliente): boolean {
if (cliente.nome === '' || cliente.idade <= 0) {
    return false;
}
  clientes.push(cliente);
  return true;
}

function listarClientes(): Cliente[] {
  return clientes;
}

export { cadastrarCliente, listarClientes };