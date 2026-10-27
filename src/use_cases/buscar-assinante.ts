import { RecursoNaoEncontradoError } from "../domain/errors.js";
import type { Assinante } from "../domain/assinante.js";
import type { AssinanteRepository } from "../repository/assinante-repository.js";

export class BuscarAssinante {
  constructor(private readonly repositorio: AssinanteRepository) {}

  async executar(id: string): Promise<Assinante> {
    const assinante = await this.repositorio.buscarAtivoPorId(id);
    if (!assinante) throw new RecursoNaoEncontradoError();
    return assinante;
  }
}
