import { PrismaClient } from "@prisma/client";
import { ErroAplicacao } from "../domain/errors.js";
import type { Assinante, AtualizacaoAssinante, NovoAssinante } from "../domain/assinante.js";
import type { AssinanteRepository } from "./assinante-repository.js";

export class PrismaAssinanteRepository implements AssinanteRepository {
  constructor(private readonly prisma: PrismaClient) {}

  criar(dados: NovoAssinante): Promise<Assinante> {
    return this.prisma.assinante.create({ data: dados });
  }

  buscarPorCpf(cpf: string): Promise<Assinante | null> {
    return this.prisma.assinante.findUnique({ where: { cpf } });
  }

  buscarAtivoPorId(id: string): Promise<Assinante | null> {
    return this.prisma.assinante.findFirst({ where: { id, ativo: true } });
  }

  listarAtivos(nome?: string): Promise<Assinante[]> {
    return this.prisma.assinante.findMany({
      where: {
        ativo: true,
        ...(nome ? { nome: { contains: nome, mode: "insensitive" } } : {}),
      },
      orderBy: { nome: "asc" },
    });
  }

  async atualizarAtivo(id: string, dados: AtualizacaoAssinante): Promise<Assinante | null> {
    const assinante = await this.buscarAtivoPorId(id);
    if (!assinante) return null;
    return this.prisma.assinante.update({ where: { id }, data: dados });
  }

  async deletar(id: string, exclusaoLogica?: boolean): Promise<boolean> {
    const deveExcluirLogicamente = this.obterExclusaoLogica(exclusaoLogica);

    if (!deveExcluirLogicamente) {
      const resultado = await this.prisma.assinante.deleteMany({ where: { id, ativo: true } });
      return resultado.count === 1;
    }

    const resultado = await this.prisma.assinante.updateMany({
      where: { id, ativo: true },
      data: { ativo: false },
    });
    return resultado.count === 1;
  }

  private obterExclusaoLogica(exclusaoLogica?: boolean): boolean {
    if (exclusaoLogica !== undefined) return exclusaoLogica;

    const valorConfigurado = process.env.EXCLUSAO_LOGICA;
    if (valorConfigurado === undefined) return true;
    if (valorConfigurado === "true") return true;
    if (valorConfigurado === "false") return false;

    throw new ErroAplicacao(500, "EXCLUSAO_LOGICA deve ser true ou false");
  }
}
