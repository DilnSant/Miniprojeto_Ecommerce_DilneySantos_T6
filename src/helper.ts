// Módulo de validação e funções auxiliares

/**
 * Valida se um texto não está vazio após remoção de espaços.
 */
function validaTexto(texto: string): boolean {
  if (texto.trim() === "") {
    return false;
  }
  return true;
}

/**
 * Gera um ID único baseado no array existente.
 * Retorna o maior ID encontrado + 1, ou 1 se o array estiver vazio.
 */
function gerarId(itens: { id: number }[]): number {
  if (itens.length === 0) return 1;
  const maiorId = itens.reduce(
    (max, item) => (item.id > max ? item.id : max),
    0
  );
  return maiorId + 1;
}

/**
 * Formata um valor numérico para o formato de moeda brasileira (R$).
 */
function formatarMoeda(valor: number): string {
  return `R$ ${valor.toFixed(2).replace(".", ",")}`;
}

/**
 * Retorna a data atual formatada no padrão brasileiro (dd/mm/aaaa HH:mm:ss).
 */
function obterDataAtual(): string {
  const agora = new Date();
  const dia = String(agora.getDate()).padStart(2, "0");
  const mes = String(agora.getMonth() + 1).padStart(2, "0");
  const ano = agora.getFullYear();
  const hora = String(agora.getHours()).padStart(2, "0");
  const minuto = String(agora.getMinutes()).padStart(2, "0");
  const segundo = String(agora.getSeconds()).padStart(2, "0");
  return `${dia}/${mes}/${ano} ${hora}:${minuto}:${segundo}`;
}

export { validaTexto, gerarId, formatarMoeda, obterDataAtual };