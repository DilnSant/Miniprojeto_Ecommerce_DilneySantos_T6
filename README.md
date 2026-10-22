# 🛍️ Mini-Projeto Avaliativo - Sistema de Gerenciamento de E-commerce

## 📌 Informações do Projeto

- **Estudante:** Dilney Santos
- **Turma:** T6 - Desenvolvedor Back-End Node
- **Módulo:** 1 - Semana 07
- **Data de entrega:** 26/10/2026

---

## 🎯 Objetivo

Desenvolver um Sistema de Gerenciamento de E-commerce utilizando **TypeScript** e **Node.js**, capaz de administrar um catálogo de produtos, gerenciar clientes, montar carrinhos de compras, registrar pedidos e gerar relatórios de vendas.

O foco do projeto está na construção da **lógica back-end**, na **organização do código** em módulos e na **aplicação correta dos conceitos da linguagem TypeScript**.

---

## ✅ Funcionalidades Implementadas

### 📦 Gerenciamento de Produtos
- Cadastrar novos produtos com validação completa
- Listar todos os produtos do catálogo
- Buscar produto por ID
- Buscar produtos por nome (busca parcial, case-insensitive)
- Filtrar produtos por categoria
- Atualizar informações de um produto
- Remover produto do catálogo

### 👥 Cadastro e Consulta de Clientes
- Cadastrar clientes com validação de nome e e-mail
- Listar todos os clientes cadastrados
- Buscar cliente por ID
- Prevenção de cadastro com e-mail duplicado

### 🛒 Carrinho de Compras
- Criar carrinho vinculado a um cliente
- Adicionar produtos ao carrinho
- Remover produtos do carrinho
- Alterar quantidade de itens
- Calcular subtotal por item e total geral
- Acumular quantidade ao adicionar produto já existente

### 📋 Finalização de Pedidos
- Transformar carrinho em pedido registrado
- Validação transacional (tudo ou nada)
- Registro do preço praticado no momento da compra
- Geração de ID único por pedido
- Atualização automática do estoque
- Consulta de pedidos (geral e por cliente)

### 📊 Relatórios
- Relatório geral de produtos
- Relatório de clientes
- Relatório detalhado de pedidos
- Resumo de vendas (receita total, ticket médio, produto mais vendido)
- Relatório de pedidos por cliente

---

## 🛠️ Tecnologias Utilizadas

- **TypeScript** - Linguagem principal com tipagem estática
- **Node.js** - Ambiente de execução
- **Git/GitHub** - Versionamento de código

---

## 📁 Estrutura dos Arquivos

```
Ecommerce_2/
├── src/
│   ├── types.ts         # Definição dos tipos (Produto, Cliente, Carrinho, Pedido)
│   ├── helper.ts        # Funções auxiliares (validação, formatação, geração de IDs)
│   ├── produtos.ts      # CRUD de produtos e validações
│   ├── clientes.ts      # Cadastro e consulta de clientes
│   ├── carrinho.ts      # Operações do carrinho de compras
│   ├── pedidos.ts       # Finalização e consulta de pedidos
│   ├── relatorios.ts    # Relatórios e consolidação de dados
│   └── main.ts          # Arquivo principal de demonstração
├── dist/                # Arquivos JavaScript compilados
├── docs/                # Documentação do projeto
├── package.json         # Configuração do projeto Node.js
├── tsconfig.json        # Configuração do compilador TypeScript
├── .gitignore           # Arquivos ignorados pelo Git
└── README.md            # Este arquivo
```

---

## 🚀 Instruções de Compilação e Execução

### Pré-requisitos
- **Node.js** (versão 18 ou superior)
- **npm** (gerenciador de pacotes do Node)

### Instalação

```bash
# Clonar o repositório
git clone https://github.com/seu-usuario/Miniprojeto_Ecommerce_DilneySantos_T6.git

# Acessar a pasta do projeto
cd Miniprojeto_Ecommerce_DilneySantos_T6

# Instalar dependências
npm install
```

### Compilação e Execução

```bash
# Compilar TypeScript para JavaScript
npm run build

# Executar a aplicação
npm start

# Ou compilar e executar em um único comando
npm run dev
```

---

## 📝 Exemplos das Principais Operações

### Cadastro de Produto
```typescript
cadastrarProduto("Notebook Gamer", "Eletrônicos", 5499.90, 10);
// ✅ Produto "Notebook Gamer" cadastrado com sucesso! (ID: 8)
```

### Cadastro de Cliente
```typescript
cadastrarCliente("Carlos Pereira", "carlos.pereira@email.com");
// ✅ Cliente "Carlos Pereira" cadastrado com sucesso! (ID: 4)
```

### Carrinho de Compras
```typescript
criarCarrinho(1);             // Cria carrinho para cliente ID 1
adicionarAoCarrinho(1, 3);    // Adiciona 3 unidades do produto ID 1
adicionarAoCarrinho(3, 1);    // Adiciona 1 unidade do produto ID 3
listarCarrinho();              // Exibe os itens com subtotais e total
```

### Finalização de Pedido
```typescript
finalizarPedido(1);
// ✅ PEDIDO FINALIZADO COM SUCESSO!
// Pedido Nº 1 | Cliente: Maria Silva | Total: R$ 1.079,20
```

### Relatórios
```typescript
relatorioProdutos();           // Lista todos os produtos
relatorioClientes();           // Lista todos os clientes
relatorioPedidos();            // Lista todos os pedidos
relatorioResumoVendas();       // Resumo com receita total e ticket médio
relatorioPedidosPorCliente(1); // Pedidos de um cliente específico
```

---

## 📏 Regras de Negócio Implementadas

### Produtos
- ID único gerado automaticamente
- Nome não pode estar vazio
- Preço deve ser maior que zero
- Estoque não pode ser negativo
- Não permite cadastro com ID duplicado

### Clientes
- ID único gerado automaticamente
- Nome e e-mail são obrigatórios
- Não permite e-mail duplicado

### Carrinho
- Quantidade deve ser maior que zero
- Não permite produtos inexistentes
- Não permite quantidade superior ao estoque
- Produto duplicado acumula quantidade (não cria linha duplicada)
- Subtotal = preço unitário × quantidade
- Total = soma dos subtotais

### Pedidos
- Não permite pedido sem itens (carrinho vazio)
- Não permite pedido para cliente inexistente
- Validação transacional: verifica TODOS os itens antes de alterar estoque
- Estoque reduzido somente após validação completa
- Se falhar em qualquer item, nenhum estoque é alterado
- Preço registrado no momento da compra (alterações futuras no catálogo não afetam pedidos anteriores)
- ID único gerado automaticamente com data de criação

---

## ⚠️ Limitações Conhecidas

- Os dados são armazenados em memória e perdidos ao encerrar a aplicação
- Não há interface gráfica (saída apenas via terminal)
- Não há integração com banco de dados
- Não há sistema de autenticação ou login
- Não há cálculo de frete, impostos ou descontos
- O sistema suporta apenas um carrinho ativo por vez
- Não há API REST ou endpoints HTTP
