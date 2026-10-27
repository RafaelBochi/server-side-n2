import { RecursoNaoEncontradoError } from "../domain/errors.js";
import type { Assinante, AtualizacaoAssinante } from "../domain/assinante.js";
import type { AssinanteRepository } from "../repository/assinante-repository.js";

export class AtualizarAssinante {
  constructor(private readonly repositorio: AssinanteRepository) {}

  async executar(id: string, dados: AtualizacaoAssinante): Promise<Assinante> {
    const assinante = await this.repositorio.atualizarAtivo(id, {
      ...(dados.nome !== undefined ? { nome: dados.nome.trim() } : {}),
      ...(dados.email !== undefined ? { email: dados.email.trim().toLowerCase() } : {}),
    });
    if (!assinante) throw new RecursoNaoEncontradoError();
    return assinante;
  }
}
