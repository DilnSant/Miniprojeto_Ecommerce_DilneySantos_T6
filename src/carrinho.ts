// Módulo de gerenciamento do carrinho de compras

import type { Carrinho, ItemCarrinho } from "./types";
import { buscarProdutoPorId } from "./produtos";
import { formatarMoeda } from "./helper";

// Carrinho ativo do sistema (um carrinho por vez)
let carrinhoAtual: Carrinho | null = null;

/**
 * Cria um novo carrinho para um cliente.
 * Se já existir um carrinho ativo, ele será substituído.
 */
function criarCarrinho(clienteId: number): Carrinho {
  carrinhoAtual = {
    clienteId,
    itens: [],
  };
  console.log(`🛒 Carrinho criado para o cliente ID: ${clienteId}`);
  return carrinhoAtual;
}

/**
 * Retorna o carrinho ativo.
 */
function obterCarrinho(): Carrinho | null {
  return carrinhoAtual;
}

/**
 * Adiciona um produto ao carrinho.
 * Regras:
 * - Não permite quantidades iguais ou menores que zero.
 * - Não permite adicionar produtos inexistentes.
 * - Não permite quantidade superior ao estoque disponível.
 * - Se o produto já estiver no carrinho, atualiza a quantidade (soma).
 */
function adicionarAoCarrinho(produtoId: number, quantidade: number): boolean {
  if (!carrinhoAtual) {
    console.log("❌ Erro: Nenhum carrinho ativo. Crie um carrinho primeiro.");
    return false;
  }

  // Validação de quantidade
  if (quantidade <= 0) {
    console.log("❌ Erro: A quantidade deve ser maior que zero.");
    return false;
  }

  // Verifica se o produto existe
  const produto = buscarProdutoPorId(produtoId);
  if (!produto) {
    console.log(`❌ Erro: Produto com ID ${produtoId} não encontrado.`);
    return false;
  }

  // Verifica o item existente no carrinho para calcular quantidade total
  const itemExistente = carrinhoAtual.itens.find(
    (item) => item.produtoId === produtoId
  );
  const quantidadeAtualNoCarrinho = itemExistente ? itemExistente.quantidade : 0;
  const quantidadeTotal = quantidadeAtualNoCarrinho + quantidade;

  // Verifica se a quantidade total não excede o estoque
  if (quantidadeTotal > produto.estoque) {
    console.log(
      `❌ Erro: Estoque insuficiente para "${produto.nome}". ` +
      `Disponível: ${produto.estoque}, No carrinho: ${quantidadeAtualNoCarrinho}, Solicitado: ${quantidade}.`
    );
    return false;
  }

  // Se o produto já está no carrinho, atualiza a quantidade
  if (itemExistente) {
    itemExistente.quantidade = quantidadeTotal;
    console.log(
      `✅ Quantidade de "${produto.nome}" atualizada no carrinho: ${quantidadeTotal} unidade(s).`
    );
  } else {
    // Caso contrário, adiciona novo item
    carrinhoAtual.itens.push({ produtoId, quantidade });
    console.log(
      `✅ "${produto.nome}" adicionado ao carrinho: ${quantidade} unidade(s).`
    );
  }

  return true;
}

/**
 * Remove um produto do carrinho pelo ID do produto.
 */
function removerDoCarrinho(produtoId: number): boolean {
  if (!carrinhoAtual) {
    console.log("❌ Erro: Nenhum carrinho ativo.");
    return false;
  }

  const indice = carrinhoAtual.itens.findIndex(
    (item) => item.produtoId === produtoId
  );

  if (indice === -1) {
    console.log(`❌ Erro: Produto com ID ${produtoId} não está no carrinho.`);
    return false;
  }

  const produto = buscarProdutoPorId(produtoId);
  carrinhoAtual.itens.splice(indice, 1);
  console.log(`✅ "${produto?.nome ?? "Produto"}" removido do carrinho.`);
  return true;
}

/**
 * Altera a quantidade de um produto no carrinho.
 * Regras:
 * - A nova quantidade deve ser maior que zero.
 * - A nova quantidade não pode exceder o estoque disponível.
 */
function alterarQuantidadeNoCarrinho(
  produtoId: number,
  novaQuantidade: number
): boolean {
  if (!carrinhoAtual) {
    console.log("❌ Erro: Nenhum carrinho ativo.");
    return false;
  }

  if (novaQuantidade <= 0) {
    console.log("❌ Erro: A quantidade deve ser maior que zero.");
    return false;
  }

  const item = carrinhoAtual.itens.find((i) => i.produtoId === produtoId);
  if (!item) {
    console.log(`❌ Erro: Produto com ID ${produtoId} não está no carrinho.`);
    return false;
  }

  const produto = buscarProdutoPorId(produtoId);
  if (!produto) {
    console.log(`❌ Erro: Produto com ID ${produtoId} não encontrado no catálogo.`);
    return false;
  }

  if (novaQuantidade > produto.estoque) {
    console.log(
      `❌ Erro: Estoque insuficiente para "${produto.nome}". ` +
      `Disponível: ${produto.estoque}, Solicitado: ${novaQuantidade}.`
    );
    return false;
  }

  item.quantidade = novaQuantidade;
  console.log(
    `✅ Quantidade de "${produto.nome}" alterada para ${novaQuantidade} unidade(s).`
  );
  return true;
}

/**
 * Lista os itens do carrinho com detalhes (nome, preço, quantidade, subtotal).
 */
function listarCarrinho(): void {
  if (!carrinhoAtual || carrinhoAtual.itens.length === 0) {
    console.log("🛒 O carrinho está vazio.");
    return;
  }

  console.log("\n═══════════════════════════════════════════════════════");
  console.log("                   🛒 CARRINHO DE COMPRAS              ");
  console.log("═══════════════════════════════════════════════════════");

  carrinhoAtual.itens.forEach((item) => {
    const produto = buscarProdutoPorId(item.produtoId);
    if (produto) {
      const subtotal = produto.preco * item.quantidade;
      console.log(
        `  📦 ${produto.nome} | Qtd: ${item.quantidade} | ` +
        `Preço unit.: ${formatarMoeda(produto.preco)} | ` +
        `Subtotal: ${formatarMoeda(subtotal)}`
      );
    }
  });

  console.log("───────────────────────────────────────────────────────");
  console.log(`  💰 TOTAL: ${formatarMoeda(calcularTotalCarrinho())}`);
  console.log("═══════════════════════════════════════════════════════\n");
}

/**
 * Calcula o subtotal de um item específico do carrinho.
 */
function calcularSubtotalItem(item: ItemCarrinho): number {
  const produto = buscarProdutoPorId(item.produtoId);
  if (!produto) return 0;
  return produto.preco * item.quantidade;
}

/**
 * Calcula o valor total de todos os itens do carrinho.
 * O total é a soma dos subtotais de cada item.
 */
function calcularTotalCarrinho(): number {
  if (!carrinhoAtual || carrinhoAtual.itens.length === 0) return 0;

  return carrinhoAtual.itens.reduce((total, item) => {
    return total + calcularSubtotalItem(item);
  }, 0);
}

/**
 * Limpa o carrinho (remove todos os itens).
 */
function limparCarrinho(): void {
  if (carrinhoAtual) {
    carrinhoAtual.itens = [];
  }
}

export {
  criarCarrinho,
  obterCarrinho,
  adicionarAoCarrinho,
  removerDoCarrinho,
  alterarQuantidadeNoCarrinho,
  listarCarrinho,
  calcularSubtotalItem,
  calcularTotalCarrinho,
  limparCarrinho,
};
