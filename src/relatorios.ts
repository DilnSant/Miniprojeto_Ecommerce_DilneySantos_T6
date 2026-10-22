// Módulo de relatórios - Consolidação e apresentação dos resultados

import type { Pedido } from "./types";
import { listarProdutos } from "./produtos";
import { listarClientes, buscarClientePorId } from "./clientes";
import { consultarPedidos } from "./pedidos";
import { formatarMoeda } from "./helper";

/**
 * Exibe um relatório geral de produtos cadastrados no sistema.
 * Mostra ID, nome, categoria, preço e estoque atual.
 */
function relatorioProdutos(): void {
  const produtos = listarProdutos();

  console.log("\n╔═══════════════════════════════════════════════════════╗");
  console.log("║           📦 RELATÓRIO DE PRODUTOS                   ║");
  console.log("╠═══════════════════════════════════════════════════════╣");

  if (produtos.length === 0) {
    console.log("║  Nenhum produto cadastrado.                          ║");
  } else {
    produtos.forEach((p) => {
      console.log(
        `  ID: ${p.id} | ${p.nome} | Cat: ${p.categoria} | ` +
        `Preço: ${formatarMoeda(p.preco)} | Estoque: ${p.estoque}`
      );
    });
  }

  console.log(`\n  Total de produtos cadastrados: ${produtos.length}`);
  console.log("╚═══════════════════════════════════════════════════════╝\n");
}

/**
 * Exibe um relatório geral dos clientes cadastrados no sistema.
 */
function relatorioClientes(): void {
  const clientes = listarClientes();

  console.log("\n╔═══════════════════════════════════════════════════════╗");
  console.log("║           👥 RELATÓRIO DE CLIENTES                    ║");
  console.log("╠═══════════════════════════════════════════════════════╣");

  if (clientes.length === 0) {
    console.log("║  Nenhum cliente cadastrado.                          ║");
  } else {
    clientes.forEach((c) => {
      console.log(`  ID: ${c.id} | ${c.nome} | E-mail: ${c.email}`);
    });
  }

  console.log(`\n  Total de clientes cadastrados: ${clientes.length}`);
  console.log("╚═══════════════════════════════════════════════════════╝\n");
}

/**
 * Exibe um relatório detalhado de todos os pedidos registrados.
 */
function relatorioPedidos(): void {
  const pedidos = consultarPedidos();

  console.log("\n╔═══════════════════════════════════════════════════════╗");
  console.log("║           📋 RELATÓRIO DE PEDIDOS                     ║");
  console.log("╠═══════════════════════════════════════════════════════╣");

  if (pedidos.length === 0) {
    console.log("  Nenhum pedido registrado.");
  } else {
    pedidos.forEach((pedido) => {
      const cliente = buscarClientePorId(pedido.clienteId);
      console.log(`\n  ─── Pedido Nº ${pedido.id} ───`);
      console.log(`  👤 Cliente: ${cliente?.nome ?? "Desconhecido"} (ID: ${pedido.clienteId})`);
      console.log(`  📅 Data: ${pedido.data}`);
      pedido.itens.forEach((item) => {
        console.log(
          `    📦 ${item.nomeProduto} | Qtd: ${item.quantidade} | ` +
          `Preço unit.: ${formatarMoeda(item.precoUnitario)} | ` +
          `Subtotal: ${formatarMoeda(item.subtotal)}`
        );
      });
      console.log(`  💰 Total: ${formatarMoeda(pedido.total)}`);
    });
  }

  console.log(`\n  Total de pedidos registrados: ${pedidos.length}`);
  console.log("╚═══════════════════════════════════════════════════════╝\n");
}

/**
 * Exibe um resumo consolidado de vendas.
 * Mostra o total de pedidos, receita total e ticket médio.
 */
function relatorioResumoVendas(): void {
  const pedidos = consultarPedidos();

  console.log("\n╔═══════════════════════════════════════════════════════╗");
  console.log("║           💰 RESUMO DE VENDAS                        ║");
  console.log("╠═══════════════════════════════════════════════════════╣");

  if (pedidos.length === 0) {
    console.log("  Nenhuma venda registrada.");
    console.log("╚═══════════════════════════════════════════════════════╝\n");
    return;
  }

  const receitaTotal = pedidos.reduce((soma, p) => soma + p.total, 0);
  const ticketMedio = receitaTotal / pedidos.length;

  // Quantidade total de itens vendidos
  const totalItensVendidos = pedidos.reduce((soma, p) => {
    return soma + p.itens.reduce((s, item) => s + item.quantidade, 0);
  }, 0);

  // Produto mais vendido (por quantidade)
  const vendasPorProduto: Record<string, number> = {};
  pedidos.forEach((pedido) => {
    pedido.itens.forEach((item) => {
      const chave = item.nomeProduto;
      vendasPorProduto[chave] = (vendasPorProduto[chave] ?? 0) + item.quantidade;
    });
  });

  let produtoMaisVendido = "";
  let maiorQuantidade = 0;
  for (const [nome, qtd] of Object.entries(vendasPorProduto)) {
    if (qtd > maiorQuantidade) {
      maiorQuantidade = qtd;
      produtoMaisVendido = nome;
    }
  }

  console.log(`  📊 Total de pedidos: ${pedidos.length}`);
  console.log(`  📦 Total de itens vendidos: ${totalItensVendidos}`);
  console.log(`  💵 Receita total: ${formatarMoeda(receitaTotal)}`);
  console.log(`  🎯 Ticket médio: ${formatarMoeda(ticketMedio)}`);

  if (produtoMaisVendido) {
    console.log(`  🏆 Produto mais vendido: ${produtoMaisVendido} (${maiorQuantidade} unidades)`);
  }

  console.log("╚═══════════════════════════════════════════════════════╝\n");
}

/**
 * Exibe os pedidos de um cliente específico.
 */
function relatorioPedidosPorCliente(clienteId: number): void {
  const cliente = buscarClientePorId(clienteId);

  if (!cliente) {
    console.log(`❌ Erro: Cliente com ID ${clienteId} não encontrado.`);
    return;
  }

  const pedidos = consultarPedidos().filter((p) => p.clienteId === clienteId);

  console.log("\n╔═══════════════════════════════════════════════════════╗");
  console.log(`║  📋 PEDIDOS DO CLIENTE: ${cliente.nome.padEnd(30)}║`);
  console.log("╠═══════════════════════════════════════════════════════╣");

  if (pedidos.length === 0) {
    console.log("  Nenhum pedido encontrado para este cliente.");
  } else {
    pedidos.forEach((pedido) => {
      console.log(`\n  ─── Pedido Nº ${pedido.id} ───`);
      console.log(`  📅 Data: ${pedido.data}`);
      pedido.itens.forEach((item) => {
        console.log(
          `    📦 ${item.nomeProduto} | Qtd: ${item.quantidade} | ` +
          `Subtotal: ${formatarMoeda(item.subtotal)}`
        );
      });
      console.log(`  💰 Total: ${formatarMoeda(pedido.total)}`);
    });

    const totalGasto = pedidos.reduce((soma, p) => soma + p.total, 0);
    console.log(`\n  📊 Total de pedidos: ${pedidos.length}`);
    console.log(`  💵 Total gasto: ${formatarMoeda(totalGasto)}`);
  }

  console.log("╚═══════════════════════════════════════════════════════╝\n");
}

export {
  relatorioProdutos,
  relatorioClientes,
  relatorioPedidos,
  relatorioResumoVendas,
  relatorioPedidosPorCliente,
};
