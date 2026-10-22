// Módulo de cadastro e consulta de clientes

import type { Cliente } from "./types";
import { validaTexto, gerarId } from "./helper";

// Array de clientes com pelo menos 3 cadastros iniciais para testes
const clientes: Cliente[] = [
  { id: 1, nome: "Maria Silva", email: "maria.silva@email.com" },
  { id: 2, nome: "João Santos", email: "joao.santos@email.com" },
  { id: 3, nome: "Ana Oliveira", email: "ana.oliveira@email.com" },
];

/**
 * Cadastra um novo cliente no sistema.
 * Regras:
 * - O ID é gerado automaticamente e deve ser único.
 * - O nome não pode estar vazio.
 * - O email não pode estar vazio.
 * - Não permite cadastro com email já utilizado.
 */
function cadastrarCliente(nome: string, email: string): Cliente | null {
  // Validação do nome
  if (!validaTexto(nome)) {
    console.log("❌ Erro: O nome do cliente não pode estar vazio.");
    return null;
  }

  // Validação do email
  if (!validaTexto(email)) {
    console.log("❌ Erro: O e-mail do cliente não pode estar vazio.");
    return null;
  }

  // Verifica se o email já está em uso
  const emailExistente = clientes.find(
    (c) => c.email.toLowerCase() === email.toLowerCase().trim()
  );
  if (emailExistente) {
    console.log(`❌ Erro: O e-mail "${email}" já está cadastrado para o cliente "${emailExistente.nome}".`);
    return null;
  }

  const novoCliente: Cliente = {
    id: gerarId(clientes),
    nome: nome.trim(),
    email: email.trim().toLowerCase(),
  };

  clientes.push(novoCliente);
  console.log(`✅ Cliente "${novoCliente.nome}" cadastrado com sucesso! (ID: ${novoCliente.id})`);
  return novoCliente;
}

/**
 * Retorna todos os clientes cadastrados.
 */
function listarClientes(): Cliente[] {
  return clientes;
}

/**
 * Busca um cliente pelo seu identificador único.
 */
function buscarClientePorId(id: number): Cliente | undefined {
  return clientes.find((c) => c.id === id);
}

export { cadastrarCliente, listarClientes, buscarClientePorId };