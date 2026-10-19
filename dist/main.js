"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const promptSync = require("prompt-sync");
const clientes_1 = require("./clientes");
const prompt = promptSync({ sigint: true });
const nomeImput = prompt("Digite o nome do cliente: ");
const emailImput = prompt("Digite o email do cliente: ");
const idadeImput = prompt("Digite a idade do cliente: ");
const enderecoImput = prompt("Digite o endereço do cliente: ");
const novoCliente = {
    id: Date.now(),
    nome: nomeImput,
    email: emailImput,
    idade: idadeImput,
    endereco: enderecoImput,
    dataCadastro: new Date()
};
(0, clientes_1.cadastrarCliente)(novoCliente);
console.log("Clientes cadastrados:");
console.log((0, clientes_1.listarClientes)());
//# sourceMappingURL=main.js.map