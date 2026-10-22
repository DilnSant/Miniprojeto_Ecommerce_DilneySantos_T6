// Definição dos tipos utilizados pelo sistema de e-commerce

// Representa um produto do catálogo
type Produto = {
  id: number;
  nome: string;
  categoria: string;
  preco: number;
  estoque: number;
};

// Representa um cliente cadastrado no sistema
type Cliente = {
  id: number;
  nome: string;
  email: string;
};

// Representa um item dentro do carrinho de compras
type ItemCarrinho = {
  produtoId: number;
  quantidade: number;
};

// Representa o carrinho de compras de um cliente
type Carrinho = {
  clienteId: number;
  itens: ItemCarrinho[];
};

// Representa um item dentro de um pedido finalizado
// Guarda o preço praticado no momento da compra
type ItemPedido = {
  produtoId: number;
  nomeProduto: string;
  quantidade: number;
  precoUnitario: number;
  subtotal: number;
};

// Representa um pedido registrado no sistema
type Pedido = {
  id: number;
  clienteId: number;
  itens: ItemPedido[];
  total: number;
  data: string;
};

export type { Produto, Cliente, ItemCarrinho, Carrinho, ItemPedido, Pedido };