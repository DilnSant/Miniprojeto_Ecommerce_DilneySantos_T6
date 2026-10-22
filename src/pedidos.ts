// Módulo de finalização e consulta de pedidos

import type { Pedido, ItemPedido } from "./types";
import { buscarProdutoPorId, listarProdutos } from "./produtos";
import { buscarClientePorId } from "./clientes";
import { obterCarrinho, limparCarrinho } from "./carrinho";
import { gerarId, formatarMoeda, obterDataAtual } from "./helper";

// Array que armazena todos os pedidos registrados
const pedidos: Pedido[] = [];

/**
 * Finaliza uma compra, transformando o carrinho em um pedido registrado.
 * 
 * Regras:
 * - Não permite finalizar sem itens no carrinho.
 * - Não permite criar pedidos para clientes inexistentes.
 * - Verifica estoque de TODOS os itens antes de registrar.
 * - Não registra parcialmente a compra se houver problema em qualquer item.
 * - Reduz o estoque somente após validação completa.
 * - Guarda o preço praticado no momento da compra.
 * - Gera identificador único para o pedido.
 */
function finalizarPedido(clienteId: number): Pedido | null {
  // Verifica se o cliente existe
  const cliente = buscarClientePorId(clienteId);
  if (!cliente) {
    console.log(`❌ Erro: Cliente com ID ${clienteId} não encontrado.`);
    return null;
  }

  // Verifica se há carrinho ativo
  const carrinho = obterCarrinho();
  if (!carrinho) {
    console.log("❌ Erro: Nenhum carrinho ativo para finalizar.");
    return null;
  }

  // Verifica se o carrinho pertence ao cliente
  if (carrinho.clienteId !== clienteId) {
    console.log("❌ Erro: O carrinho ativo não pertence a este cliente.");
    return null;
  }

  // Verifica se o carrinho tem itens
  if (carrinho.itens.length === 0) {
    console.log("❌ Erro: O carrinho está vazio. Não é possível finalizar o pedido.");
    return null;
  }

  // FASE 1: Validação completa de todos os itens antes de qualquer alteração
  const itensPedido: ItemPedido[] = [];
  const produtosParaAtualizar: { id: number; novoEstoque: number }[] = [];

  for (const item of carrinho.itens) {
    const produto = buscarProdutoPorId(item.produtoId);

    if (!produto) {
      console.log(`❌ Erro: Produto com ID ${item.produtoId} não encontrado no catálogo.`);
      console.log("⚠️  Pedido cancelado: nenhum estoque foi alterado.");
      return null;
    }

    if (item.quantidade > produto.estoque) {
      console.log(
        `❌ Erro: Estoque insuficiente para "${produto.nome}". ` +
        `Disponível: ${produto.estoque}, Solicitado: ${item.quantidade}.`
      );
      console.log("⚠️  Pedido cancelado: nenhum estoque foi alterado.");
      return null;
    }

    // Prepara o item do pedido com o preço praticado no momento
    const subtotal = produto.preco * item.quantidade;
    itensPedido.push({
      produtoId: produto.id,
      nomeProduto: produto.nome,
      quantidade: item.quantidade,
      precoUnitario: produto.preco,
      subtotal,
    });

    // Prepara a atualização de estoque
    produtosParaAtualizar.push({
      id: produto.id,
      novoEstoque: produto.estoque - item.quantidade,
    });
  }

  // FASE 2: Todas as validações passaram, agora atualiza o estoque
  const todosProdutos = listarProdutos();
  for (const atualizacao of produtosParaAtualizar) {
    const produto = todosProdutos.find((p) => p.id === atualizacao.id);
    if (produto) {
      produto.estoque = atualizacao.novoEstoque;
    }
  }

  // FASE 3: Cria o pedido
  const totalPedido = itensPedido.reduce((soma, item) => soma + item.subtotal, 0);

  const novoPedido: Pedido = {
    id: gerarId(pedidos),
    clienteId,
    itens: itensPedido,
    total: totalPedido,
    data: obterDataAtual(),
  };

  pedidos.push(novoPedido);

  // Limpa o carrinho após finalização bem-sucedida
  limparCarrinho();

  console.log("\n═══════════════════════════════════════════════════════");
  console.log("              ✅ PEDIDO FINALIZADO COM SUCESSO!         ");
  console.log("═══════════════════════════════════════════════════════");
  console.log(`  📋 Pedido Nº: ${novoPedido.id}`);
  console.log(`  👤 Cliente: ${cliente.nome} (ID: ${cliente.id})`);
  console.log(`  📅 Data: ${novoPedido.data}`);
  console.log("───────────────────────────────────────────────────────");
  novoPedido.itens.forEach((item) => {
    console.log(
      `  📦 ${item.nomeProduto} | Qtd: ${item.quantidade} | ` +
      `Preço unit.: ${formatarMoeda(item.precoUnitario)} | ` +
      `Subtotal: ${formatarMoeda(item.subtotal)}`
    );
  });
  console.log("───────────────────────────────────────────────────────");
  console.log(`  💰 TOTAL DO PEDIDO: ${formatarMoeda(novoPedido.total)}`);
  console.log("═══════════════════════════════════════════════════════\n");

  return novoPedido;
}

/**
 * Retorna todos os pedidos registrados no sistema.
 */
function consultarPedidos(): Pedido[] {
  return pedidos;
}

/**
 * Consulta os pedidos de um cliente específico pelo seu ID.
 */
function consultarPedidosPorCliente(clienteId: number): Pedido[] {
  return pedidos.filter((p) => p.clienteId === clienteId);
}

export { finalizarPedido, consultarPedidos, consultarPedidosPorCliente };
