function validaTexto(texto: string): boolean {
     if (texto.trim() === '') {
          console.log('O texto não pode estar vazio.');
          return false;
     }
     return true;
}

export { validaTexto };