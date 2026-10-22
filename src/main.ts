// ============================================================================
// main.ts - Arquivo principal de demonstração do Sistema de E-commerce
// Demonstra todas as funcionalidades obrigatórias e testa situações inválidas.
// ============================================================================

// === Importações dos módulos ===
import {
  cadastrarProduto,
  listarProdutos,
  buscarProdutoPorId,
  buscarProdutosPorNome,
  filtrarPorCategoria,
  atualizarProduto,
  removerProduto,
} from "./produtos";

import {
  cadastrarCliente,
  listarClientes,
  buscarClientePorId,
} from "./clientes";

import {
  criarCarrinho,
  adicionarAoCarrinho,
  removerDoCarrinho,
  alterarQuantidadeNoCarrinho,
  listarCarrinho,
  calcularTotalCarrinho,
} from "./carrinho";

import { finalizarPedido, consultarPedidos, consultarPedidosPorCliente } from "./pedidos";

import {
  relatorioProdutos,
  relatorioClientes,
  relatorioPedidos,
  relatorioResumoVendas,
  relatorioPedidosPorCliente,
} from "./relatorios";

import { formatarMoeda } from "./helper";

// ============================================================================
// DEMONSTRAÇÃO DAS FUNCIONALIDADES DO SISTEMA
// ============================================================================

console.log("╔═════════════════════════════════════════════════════════════╗");
console.log("║                                                           ║");
console.log("║    🛍️  SISTEMA DE GERENCIAMENTO DE E-COMMERCE  🛍️          ║");
console.log("║              Mini-Projeto Avaliativo                      ║");
console.log("║           Módulo 1 - Semana 07 - [T6]                    ║");
console.log("║                                                           ║");
console.log("╚═════════════════════════════════════════════════════════════╝\n");

// ============================================================================
// 1. GERENCIAMENTO DE PRODUTOS
// ============================================================================

console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
console.log("  📦 1. GERENCIAMENTO DE PRODUTOS");
console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");

// 1.1 Listar produtos iniciais
console.log("--- 1.1 Listando produtos iniciais do catálogo ---");
relatorioProdutos();

// 1.2 Cadastrar novos produtos
console.log("--- 1.2 Cadastrando novos produtos ---");
cadastrarProduto("Notebook Gamer", "Eletrônicos", 5499.90, 10);
cadastrarProduto("Mouse Sem Fio", "Eletrônicos", 79.90, 80);

// 1.3 Buscar produto por ID
console.log("\n--- 1.3 Buscando produto por ID ---");
const produtoBuscado = buscarProdutoPorId(1);
if (produtoBuscado) {
  console.log(`  Produto encontrado: ${produtoBuscado.nome} - ${formatarMoeda(produtoBuscado.preco)}`);
}

// 1.4 Buscar produtos por nome (busca parcial)
console.log("\n--- 1.4 Buscando produtos pelo nome (termo: 'fone') ---");
const resultadoBusca = buscarProdutosPorNome("fone");
resultadoBusca.forEach((p) => {
  console.log(`  Encontrado: ${p.nome} - ${formatarMoeda(p.preco)}`);
});

// 1.5 Filtrar produtos por categoria
console.log("\n--- 1.5 Filtrando produtos por categoria ('Eletrônicos') ---");
const eletronicos = filtrarPorCategoria("Eletrônicos");
eletronicos.forEach((p) => {
  console.log(`  ${p.nome} - ${formatarMoeda(p.preco)} | Estoque: ${p.estoque}`);
});

// 1.6 Atualizar um produto
console.log("\n--- 1.6 Atualizando produto (ID 1: novo preço) ---");
atualizarProduto(1, { preco: 59.90 });

// 1.7 Remover um produto
console.log("\n--- 1.7 Removendo produto (ID 5: Boné Aba Reta) ---");
removerProduto(5);

// Verificar catálogo após operações
console.log("\n--- Catálogo atualizado após operações ---");
relatorioProdutos();

// ============================================================================
// 2. CADASTRO E CONSULTA DE CLIENTES
// ============================================================================

console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
console.log("  👥 2. CADASTRO E CONSULTA DE CLIENTES");
console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");

// 2.1 Listar clientes iniciais
console.log("--- 2.1 Listando clientes cadastrados ---");
relatorioClientes();

// 2.2 Cadastrar novos clientes
console.log("--- 2.2 Cadastrando novos clientes ---");
cadastrarCliente("Carlos Pereira", "carlos.pereira@email.com");
cadastrarCliente("Fernanda Lima", "fernanda.lima@email.com");

// 2.3 Buscar cliente por ID
console.log("\n--- 2.3 Buscando cliente por ID ---");
const clienteBuscado = buscarClientePorId(2);
if (clienteBuscado) {
  console.log(`  Cliente encontrado: ${clienteBuscado.nome} - ${clienteBuscado.email}`);
}

// Verificar lista atualizada
console.log("\n--- Clientes após cadastros ---");
relatorioClientes();

// ============================================================================
// 3. GERENCIAMENTO DO CARRINHO DE COMPRAS
// ============================================================================

console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
console.log("  🛒 3. GERENCIAMENTO DO CARRINHO DE COMPRAS");
console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");

// 3.1 Criar carrinho para o cliente 1 (Maria Silva)
console.log("--- 3.1 Criando carrinho para Maria Silva (ID: 1) ---");
criarCarrinho(1);

// 3.2 Adicionar produtos ao carrinho
console.log("\n--- 3.2 Adicionando produtos ao carrinho ---");
adicionarAoCarrinho(1, 3);  // 3 Camisetas Básicas
adicionarAoCarrinho(3, 1);  // 1 Tênis Esportivo
adicionarAoCarrinho(7, 2);  // 2 Fones de Ouvido Bluetooth

// 3.3 Listar carrinho com subtotais
console.log("\n--- 3.3 Listando itens do carrinho ---");
listarCarrinho();

// 3.4 Alterar quantidade de um item
console.log("--- 3.4 Alterando quantidade da Camiseta Básica para 5 ---");
alterarQuantidadeNoCarrinho(1, 5);

// 3.5 Remover um item
console.log("\n--- 3.5 Removendo Fone de Ouvido do carrinho ---");
removerDoCarrinho(7);

// 3.6 Adicionar mesmo produto novamente (deve atualizar quantidade)
console.log("\n--- 3.6 Adicionando mais 2 Tênis Esportivos (deve acumular) ---");
adicionarAoCarrinho(3, 2);

// 3.7 Listar carrinho atualizado
console.log("\n--- 3.7 Carrinho atualizado ---");
listarCarrinho();

// 3.8 Calcular total
console.log(`--- 3.8 Total do carrinho: ${formatarMoeda(calcularTotalCarrinho())} ---`);

// ============================================================================
// 4. FINALIZAÇÃO DE PEDIDOS
// ============================================================================

console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
console.log("  📋 4. FINALIZAÇÃO DE PEDIDOS");
console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");

// 4.1 Finalizar pedido do carrinho atual (Maria Silva)
console.log("--- 4.1 Finalizando pedido para Maria Silva ---");
finalizarPedido(1);

// 4.2 Verificar estoque atualizado após a compra
console.log("--- 4.2 Estoque atualizado após o pedido ---");
const camiseta = buscarProdutoPorId(1);
const tenis = buscarProdutoPorId(3);
if (camiseta) console.log(`  ${camiseta.nome}: estoque = ${camiseta.estoque} (era 100, comprou 5)`);
if (tenis) console.log(`  ${tenis.nome}: estoque = ${tenis.estoque} (era 30, comprou 3)`);

// 4.3 Fazer um segundo pedido (João Santos)
console.log("\n--- 4.3 Novo pedido para João Santos (ID: 2) ---");
criarCarrinho(2);
adicionarAoCarrinho(6, 1);  // 1 Smartphone XZ Pro
adicionarAoCarrinho(4, 2);  // 2 Mochilas Escolares
listarCarrinho();
finalizarPedido(2);

// 4.4 Consultar todos os pedidos
console.log("--- 4.4 Consultando todos os pedidos ---");
relatorioPedidos();

// 4.5 Consultar pedidos por cliente
console.log("--- 4.5 Consultando pedidos da Maria Silva ---");
relatorioPedidosPorCliente(1);

// ============================================================================
// 5. RELATÓRIOS
// ============================================================================

console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
console.log("  📊 5. RELATÓRIOS");
console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");

// 5.1 Relatório geral de produtos
console.log("--- 5.1 Relatório de produtos ---");
relatorioProdutos();

// 5.2 Relatório de clientes
console.log("--- 5.2 Relatório de clientes ---");
relatorioClientes();

// 5.3 Relatório de pedidos
console.log("--- 5.3 Relatório de pedidos ---");
relatorioPedidos();

// 5.4 Resumo de vendas
console.log("--- 5.4 Resumo de vendas ---");
relatorioResumoVendas();

// ============================================================================
// 6. TESTES DE SITUAÇÕES INVÁLIDAS
// ============================================================================

console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
console.log("  ⚠️  6. TESTES DE SITUAÇÕES INVÁLIDAS");
console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");

// Teste 1: Cadastrar produto com preço negativo
console.log("--- Teste 1: Cadastrar produto com preço negativo ---");
cadastrarProduto("Produto Inválido", "Teste", -10, 5);

// Teste 2: Cadastrar produto com nome vazio
console.log("\n--- Teste 2: Cadastrar produto com nome vazio ---");
cadastrarProduto("", "Teste", 50, 10);

// Teste 3: Cadastrar produto com estoque negativo
console.log("\n--- Teste 3: Cadastrar produto com estoque negativo ---");
cadastrarProduto("Produto Teste", "Teste", 50, -5);

// Teste 4: Adicionar quantidade superior ao estoque
console.log("\n--- Teste 4: Adicionar quantidade superior ao estoque ---");
criarCarrinho(1);
adicionarAoCarrinho(6, 999);  // Smartphone tem estoque de 14

// Teste 5: Adicionar produto inexistente ao carrinho
console.log("\n--- Teste 5: Adicionar produto inexistente ao carrinho ---");
adicionarAoCarrinho(999, 1);

// Teste 6: Finalizar pedido com carrinho vazio
console.log("\n--- Teste 6: Finalizar pedido com carrinho vazio ---");
criarCarrinho(1);
finalizarPedido(1);

// Teste 7: Finalizar pedido para cliente inexistente
console.log("\n--- Teste 7: Finalizar pedido para cliente inexistente ---");
finalizarPedido(999);

// Teste 8: Cadastrar cliente com email duplicado
console.log("\n--- Teste 8: Cadastrar cliente com email já existente ---");
cadastrarCliente("Outra Maria", "maria.silva@email.com");

// Teste 9: Cadastrar cliente com nome vazio
console.log("\n--- Teste 9: Cadastrar cliente com nome vazio ---");
cadastrarCliente("", "teste@email.com");

// Teste 10: Adicionar quantidade zero ao carrinho
console.log("\n--- Teste 10: Adicionar quantidade zero ao carrinho ---");
criarCarrinho(1);
adicionarAoCarrinho(1, 0);

// Teste 11: Atualizar produto com preço negativo
console.log("\n--- Teste 11: Atualizar produto com preço negativo ---");
atualizarProduto(1, { preco: -50 });

// Teste 12: Remover produto inexistente
console.log("\n--- Teste 12: Remover produto inexistente ---");
removerProduto(999);

console.log("\n═══════════════════════════════════════════════════════════");
console.log("     ✅ DEMONSTRAÇÃO CONCLUÍDA COM SUCESSO!");
console.log("     Todas as funcionalidades foram testadas.");
console.log("═══════════════════════════════════════════════════════════\n");