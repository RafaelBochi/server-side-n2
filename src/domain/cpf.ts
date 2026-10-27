export function normalizarCpf(cpf: string): string {
  return cpf.replace(/\D/g, "");
}

export function cpfEhValido(cpf: string): boolean {
  if (!/^\d{11}$/.test(cpf) || /^(\d)\1{10}$/.test(cpf)) return false;

  const calcularDigito = (quantidade: number): number => {
    const soma = cpf
      .slice(0, quantidade)
      .split("")
      .reduce((total, digito, indice) => total + Number(digito) * (quantidade + 1 - indice), 0);
    const resto = (soma * 10) % 11;
    return resto === 10 ? 0 : resto;
  };

  return calcularDigito(9) === Number(cpf[9]) && calcularDigito(10) === Number(cpf[10]);
}
