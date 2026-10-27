import { RecursoNaoEncontradoError } from "../domain/errors.js";
import type { AssinanteRepository } from "../repository/assinante-repository.js";

export class DeletarAssinante {
  constructor(private readonly repositorio: AssinanteRepository) {}

  async executar(id: string, exclusaoLogica?: boolean): Promise<void> {
    if (!(await this.repositorio.deletar(id, exclusaoLogica))) throw new RecursoNaoEncontradoError();
  }
}
