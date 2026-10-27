import type { Assinante } from "../domain/assinante.js";
import type { AssinanteRepository } from "../repository/assinante-repository.js";

export class ListarAssinantes {
  constructor(private readonly repositorio: AssinanteRepository) {}

  executar(nome?: string): Promise<Assinante[]> {
    return this.repositorio.listarAtivos(nome?.trim());
  }
}
