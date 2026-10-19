import type { Cliente } from './types.ts';

const clientes: Cliente[] = [];

function cadastrarCliente(cliente: Cliente): void {
  clientes.push(cliente);
}

function listarClientes(): Cliente[] {
  return clientes;
}

export { cadastrarCliente, listarClientes };