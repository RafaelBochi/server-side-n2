import { RecursoNaoEncontradoError } from "../domain/errors.js";
import type { AssinanteRepository } from "../repository/assinante-repository.js";

export class DesativarAssinante {
  constructor(private readonly repositorio: AssinanteRepository) {}

  async executar(id: string): Promise<void> {
    if (!(await this.repositorio.desativar(id))) throw new RecursoNaoEncontradoError();
  }
}
