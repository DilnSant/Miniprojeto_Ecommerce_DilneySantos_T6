import promptSync = require('prompt-sync');
import { cadastrarCliente, listarClientes, buscarClientePorId } from './clientes';
import {
  cadastrarProduto,
  listarProdutos,
  buscarProdutoPorId,
  buscarProdutosPorNome,
  filtrarPorCategoria,
  atualizarProduto,
  removerProduto,
} from './produtos';
import {
  criarCarrinho,
  adicionarAoCarrinho,
  removerDoCarrinho,
  alterarQuantidadeNoCarrinho,
  listarCarrinho,
  calcularTotalCarrinho,
} from './carrinho';
import { finalizarPedido, consultarPedidos, consultarPedidosPorCliente } from './pedidos';
import {
  relatorioProdutos,
  relatorioClientes,
  relatorioPedidos,
  relatorioResumoVendas,
  relatorioPedidosPorCliente,
} from './relatorios';
import { formatarMoeda } from './helper';

const prompt = promptSync({ sigint: true });

// Demonstração automática de 3 situações inválidas (exigido pelo documento - Sprint 5)
console.log('\n══════════════════════════════════════════════════════════════');
console.log('  🧪 DEMONSTRAÇÃO: Testes de situações inválidas');
console.log('══════════════════════════════════════════════════════════════');

// Situação inválida 1: Cadastrar produto com preço negativo
console.log('\n  [Teste 1] Tentar cadastrar produto com preço negativo:');
cadastrarProduto('Produto Inválido', 'Teste', -50, 10);

// Situação inválida 2: Finalizar pedido com carrinho vazio
console.log('\n  [Teste 2] Tentar finalizar pedido com carrinho vazio:');
criarCarrinho(1); // cria carrinho vazio para cliente 1
finalizarPedido(1);

// Situação inválida 3: Adicionar produto ao carrinho com quantidade além do estoque
console.log('\n  [Teste 3] Tentar adicionar quantidade além do estoque:');
adicionarAoCarrinho(6, 9999); // produto 6 tem apenas 15 em estoque

console.log('\n══════════════════════════════════════════════════════════════');
console.log('  ✅ Testes concluídos. Iniciando o menu principal...');
console.log('══════════════════════════════════════════════════════════════\n');

let escolha: number = 0;

do {
    console.log('\n╔═════════════════════════════════════════════════════════════╗');
    console.log('║    🛍️  SISTEMA DE GERENCIAMENTO DE E-COMMERCE  🛍️          ║');
    console.log('╚═════════════════════════════════════════════════════════════╝\n');
    console.log('1 - Cadastrar produto');
    console.log('2 - Listar produtos');
    console.log('3 - Buscar produto por ID');
    console.log('4 - Buscar produtos por nome');
    console.log('5 - Filtrar produtos por categoria');
    console.log('6 - Atualizar produto');
    console.log('7 - Remover produto');
    console.log('8 - Cadastrar cliente');
    console.log('9 - Listar clientes');
    console.log('10 - Buscar cliente por ID');
    console.log('11 - Criar carrinho');
    console.log('12 - Adicionar produto ao carrinho');
    console.log('13 - Remover produto do carrinho');
    console.log('14 - Alterar quantidade no carrinho');
    console.log('15 - Listar carrinho');
    console.log('16 - Calcular total do carrinho');
    console.log('17 - Finalizar pedido');
    console.log('18 - Consultar todos os pedidos');
    console.log('19 - Consultar pedidos por cliente');
    console.log('20 - Relatório de produtos');
    console.log('21 - Relatório de clientes');
    console.log('22 - Relatório de pedidos');
    console.log('23 - Resumo de vendas');
    console.log('0 - Sair do sistema');
    escolha = Number(prompt('O que você deseja fazer? '));
    switch (escolha) {
        case 1:
            const nomeProd = prompt('Nome do produto: ');
            const categoriaProd = prompt('Categoria: ');
            const precoProd = Number(prompt('Preço: '));
            const estoqueProd = Number(prompt('Estoque: '));
            cadastrarProduto(nomeProd, categoriaProd, precoProd, estoqueProd);
            break;
        case 2:
            console.log('Seus produtos são:');
            console.log(listarProdutos());
            break;
        case 3:
            const idBusca = Number(prompt('ID do produto: '));
            const prodEncontrado = buscarProdutoPorId(idBusca);
            if (prodEncontrado) {
                console.log(`Produto encontrado: ${prodEncontrado.nome} - ${formatarMoeda(prodEncontrado.preco)}`);
            } else {
                console.log('Produto não encontrado.');
            }
            break;
        case 4:
            const termoBusca = prompt('Termo de busca: ');
            const resultados = buscarProdutosPorNome(termoBusca);
            resultados.forEach((p) => {
                console.log(`Encontrado: ${p.nome} - ${formatarMoeda(p.preco)}`);
            });
            break;
        case 5:
            const catFiltro = prompt('Categoria: ');
            const filtrados = filtrarPorCategoria(catFiltro);
            filtrados.forEach((p) => {
                console.log(`${p.nome} - ${formatarMoeda(p.preco)} | Estoque: ${p.estoque}`);
            });
            break;
        case 6:
            const idAtualizar = Number(prompt('ID do produto a atualizar: '));
            const novoPreco = Number(prompt('Novo preço (0 para manter): '));
            const novoEstoque = Number(prompt('Novo estoque (-1 para manter): '));
            const dadosAtualizar: Partial<{ nome: string; categoria: string; preco: number; estoque: number }> = {};
            if (novoPreco > 0) dadosAtualizar.preco = novoPreco;
            if (novoEstoque >= 0) dadosAtualizar.estoque = novoEstoque;
            atualizarProduto(idAtualizar, dadosAtualizar);
            break;
        case 7:
            const idRemover = Number(prompt('ID do produto a remover: '));
            removerProduto(idRemover);
            break;
        case 8:
            const nomeCliente = prompt('Nome do cliente: ');
            const emailCliente = prompt('E-mail do cliente: ');
            cadastrarCliente(nomeCliente, emailCliente);
            break;
        case 9:
            console.log('Seus clientes são:');
            console.log(listarClientes());
            break;
        case 10:
            const idCliente = Number(prompt('ID do cliente: '));
            const clienteEncontrado = buscarClientePorId(idCliente);
            if (clienteEncontrado) {
                console.log(`Cliente encontrado: ${clienteEncontrado.nome} - ${clienteEncontrado.email}`);
            } else {
                console.log('Cliente não encontrado.');
            }
            break;
        case 11:
            const idClienteCarrinho = Number(prompt('ID do cliente para criar carrinho: '));
            criarCarrinho(idClienteCarrinho);
            break;
        case 12:
            const idProdCarrinho = Number(prompt('ID do produto: '));
            const qtdAdicionar = Number(prompt('Quantidade: '));
            adicionarAoCarrinho(idProdCarrinho, qtdAdicionar);
            break;
        case 13:
            const idProdRemover = Number(prompt('ID do produto a remover do carrinho: '));
            removerDoCarrinho(idProdRemover);
            break;
        case 14:
            const idProdAlterar = Number(prompt('ID do produto: '));
            const novaQtd = Number(prompt('Nova quantidade: '));
            alterarQuantidadeNoCarrinho(idProdAlterar, novaQtd);
            break;
        case 15:
            console.log('Itens do carrinho:');
            listarCarrinho();
            break;
        case 16:
            console.log(`Total do carrinho: ${formatarMoeda(calcularTotalCarrinho())}`);
            break;
        case 17:
            const idClientePedido = Number(prompt('ID do cliente para finalizar pedido: '));
            finalizarPedido(idClientePedido);
            break;
        case 18:
            console.log('Todos os pedidos:');
            relatorioPedidos();
            break;
        case 19:
            const idClienteConsulta = Number(prompt('ID do cliente: '));
            relatorioPedidosPorCliente(idClienteConsulta);
            break;
        case 20:
            relatorioProdutos();
            break;
        case 21:
            relatorioClientes();
            break;
        case 22:
            relatorioPedidos();
            break;
        case 23:
            relatorioResumoVendas();
            break;
        case 0:
            console.log('Você escolheu sair do sistema');
            break;
        default:
            console.log('Digite uma opção válida!')
    }
} while (escolha !== 0)