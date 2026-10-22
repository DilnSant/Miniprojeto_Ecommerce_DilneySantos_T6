// Módulo de cadastro e gerenciamento de produtos

import type { Produto } from "./types";
import { validaTexto, gerarId } from "./helper";

// Array de produtos com dados iniciais para teste
const produtos: Produto[] = [
  {
    id: 1,
    nome: "Camiseta Básica",
    categoria: "Vestuário",
    preco: 49.9,
    estoque: 100,
  },
  {
    id: 2,
    nome: "Calça Jeans",
    categoria: "Vestuário",
    preco: 129.9,
    estoque: 50,
  },
  {
    id: 3,
    nome: "Tênis Esportivo",
    categoria: "Calçados",
    preco: 259.9,
    estoque: 30,
  },
  {
    id: 4,
    nome: "Mochila Escolar",
    categoria: "Acessórios",
    preco: 89.9,
    estoque: 40,
  },
  {
    id: 5,
    nome: "Boné Aba Reta",
    categoria: "Acessórios",
    preco: 39.9,
    estoque: 60,
  },
  {
    id: 6,
    nome: "Smartphone XZ Pro",
    categoria: "Eletrônicos",
    preco: 2499.9,
    estoque: 15,
  },
  {
    id: 7,
    nome: "Fone de Ouvido Bluetooth",
    categoria: "Eletrônicos",
    preco: 199.9,
    estoque: 25,
  },
];

/**
 * Cadastra um novo produto no catálogo.
 * Regras:
 * - O ID deve ser único.
 * - O nome não pode estar vazio.
 * - O preço deve ser maior que zero.
 * - O estoque não pode ser negativo.
 */
function cadastrarProduto(
  nome: string,
  categoria: string,
  preco: number,
  estoque: number
): Produto | null {
  // Validação do nome
  if (!validaTexto(nome)) {
    console.log("❌ Erro: O nome do produto não pode estar vazio.");
    return null;
  }

  // Validação do preço
  if (preco <= 0) {
    console.log("❌ Erro: O preço deve ser maior que zero.");
    return null;
  }

  // Validação do estoque
  if (estoque < 0) {
    console.log("❌ Erro: O estoque não pode ser negativo.");
    return null;
  }

  // Validação da categoria
  if (!validaTexto(categoria)) {
    console.log("❌ Erro: A categoria não pode estar vazia.");
    return null;
  }

  const novoProduto: Produto = {
    id: gerarId(produtos),
    nome: nome.trim(),
    categoria: categoria.trim(),
    preco,
    estoque,
  };

  produtos.push(novoProduto);
  console.log(`✅ Produto "${novoProduto.nome}" cadastrado com sucesso! (ID: ${novoProduto.id})`);
  return novoProduto;
}

/**
 * Retorna todos os produtos cadastrados.
 */
function listarProdutos(): Produto[] {
  return produtos;
}

/**
 * Busca um produto pelo seu identificador único.
 */
function buscarProdutoPorId(id: number): Produto | undefined {
  return produtos.find((p) => p.id === id);
}

/**
 * Busca produtos pelo nome (busca parcial, case-insensitive).
 */
function buscarProdutosPorNome(nome: string): Produto[] {
  const termoBusca = nome.toLowerCase().trim();
  return produtos.filter((p) => p.nome.toLowerCase().includes(termoBusca));
}

/**
 * Filtra produtos por categoria (case-insensitive).
 */
function filtrarPorCategoria(categoria: string): Produto[] {
  const catBusca = categoria.toLowerCase().trim();
  return produtos.filter((p) => p.categoria.toLowerCase() === catBusca);
}

/**
 * Atualiza informações de um produto cadastrado.
 * Permite atualizar nome, categoria, preço e estoque.
 */
function atualizarProduto(
  id: number,
  dadosAtualizados: Partial<Omit<Produto, "id">>
): Produto | null {
  const produto = produtos.find((p) => p.id === id);

  if (!produto) {
    console.log(`❌ Erro: Produto com ID ${id} não encontrado.`);
    return null;
  }

  // Validações dos dados atualizados
  if (dadosAtualizados.nome !== undefined && !validaTexto(dadosAtualizados.nome)) {
    console.log("❌ Erro: O nome do produto não pode estar vazio.");
    return null;
  }

  if (dadosAtualizados.preco !== undefined && dadosAtualizados.preco <= 0) {
    console.log("❌ Erro: O preço deve ser maior que zero.");
    return null;
  }

  if (dadosAtualizados.estoque !== undefined && dadosAtualizados.estoque < 0) {
    console.log("❌ Erro: O estoque não pode ser negativo.");
    return null;
  }

  // Aplica as atualizações
  if (dadosAtualizados.nome !== undefined) produto.nome = dadosAtualizados.nome.trim();
  if (dadosAtualizados.categoria !== undefined) produto.categoria = dadosAtualizados.categoria.trim();
  if (dadosAtualizados.preco !== undefined) produto.preco = dadosAtualizados.preco;
  if (dadosAtualizados.estoque !== undefined) produto.estoque = dadosAtualizados.estoque;

  console.log(`✅ Produto "${produto.nome}" (ID: ${produto.id}) atualizado com sucesso!`);
  return produto;
}

/**
 * Remove um produto do catálogo pelo ID.
 * Não remove se o produto não for encontrado.
 */
function removerProduto(id: number): boolean {
  const indice = produtos.findIndex((p) => p.id === id);

  if (indice === -1) {
    console.log(`❌ Erro: Produto com ID ${id} não encontrado.`);
    return false;
  }

  const produtoRemovido = produtos.splice(indice, 1)[0];
  console.log(`✅ Produto "${produtoRemovido?.nome}" (ID: ${id}) removido com sucesso!`);
  return true;
}

export {
  cadastrarProduto,
  listarProdutos,
  buscarProdutoPorId,
  buscarProdutosPorNome,
  filtrarPorCategoria,
  atualizarProduto,
  removerProduto,
};