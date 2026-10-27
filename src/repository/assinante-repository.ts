import type { Assinante, AtualizacaoAssinante, NovoAssinante } from "../domain/assinante.js";

export interface AssinanteRepository {
  criar(dados: NovoAssinante): Promise<Assinante>;
  buscarPorCpf(cpf: string): Promise<Assinante | null>;
  buscarAtivoPorId(id: string): Promise<Assinante | null>;
  listarAtivos(nome?: string): Promise<Assinante[]>;
  atualizarAtivo(id: string, dados: AtualizacaoAssinante): Promise<Assinante | null>;
  desativar(id: string): Promise<boolean>;
}
