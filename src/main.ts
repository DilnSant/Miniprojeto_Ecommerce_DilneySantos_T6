import promptSync = require("prompt-sync");
import {cadastrarCliente, listarClientes} from './clientes';
import type { Cliente } from './types';

const prompt = promptSync({sigint: true});

const nomeInput : string = prompt("Digite o nome do cliente: ");
const idadeInput : number = Number("Digite a idade do cliente: ");
const enderecoInput : string = prompt("Digite o endereço do cliente: ");

const novoCliente: Cliente = {
  nome: nomeInput,
  endereco: enderecoInput,
  dataCadastro: new Date()
};

cadastrarCliente(novoCliente);

console.log("Clientes cadastrados:");
console.log(listarClientes());