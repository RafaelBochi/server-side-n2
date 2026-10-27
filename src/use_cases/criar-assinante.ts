import { cpfEhValido, normalizarCpf } from "../domain/cpf.js";
import { ConflitoError, ErroAplicacao } from "../domain/errors.js";
import type { Assinante, NovoAssinante } from "../domain/assinante.js";
import type { AssinanteRepository } from "../repository/assinante-repository.js";

export class CriarAssinante {
  constructor(private readonly repositorio: AssinanteRepository) {}

  async executar(dados: NovoAssinante): Promise<Assinante> {
    const cpf = normalizarCpf(dados.cpf);
    if (!cpfEhValido(cpf)) throw new ErroAplicacao(400, "CPF inválido");

    const existente = await this.repositorio.buscarPorCpf(cpf);
    if (existente) throw new ConflitoError("CPF já cadastrado");

    return this.repositorio.criar({
      cpf,
      nome: dados.nome.trim(),
      email: dados.email.trim().toLowerCase(),
    });
  }
}
