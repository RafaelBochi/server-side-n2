import type { Request, Response } from "express";
import { z } from "zod";
import { AtualizarAssinante } from "../../use_cases/atualizar-assinante.js";
import { BuscarAssinante } from "../../use_cases/buscar-assinante.js";
import { CriarAssinante } from "../../use_cases/criar-assinante.js";
import { DeletarAssinante } from "../../use_cases/deletar-assinante.js";
import { ListarAssinantes } from "../../use_cases/listar-assinantes.js";

const idSchema = z.object({ id: z.string().uuid("id deve ser um UUID válido") });
const criarSchema = z.object({
  cpf: z.string().min(1),
  nome: z.string().trim().min(1, "nome é obrigatório"),
  email: z.string().trim().email("email inválido"),
}).strict();
const atualizarSchema = z.object({
  nome: z.string().trim().min(1, "nome não pode ser vazio").optional(),
  email: z.string().trim().email("email inválido").optional(),
}).strict().refine((dados) => dados.nome !== undefined || dados.email !== undefined, {
  message: "Informe nome ou email para atualizar",
});
const buscaSchema = z.object({ nome: z.string().trim().min(1, "nome não pode ser vazio").optional() }).strict();
const exclusaoSchema = z.object({ logico: z.enum(["true", "false"]).optional() }).strict();

export class AssinanteController {
  constructor(
    private readonly criarAssinante: CriarAssinante,
    private readonly listarAssinantes: ListarAssinantes,
    private readonly buscarAssinante: BuscarAssinante,
    private readonly atualizarAssinante: AtualizarAssinante,
    private readonly deletarAssinante: DeletarAssinante,
  ) {}

  criar = async (req: Request, res: Response): Promise<void> => {
    const dados = criarSchema.parse(req.body);
    const assinante = await this.criarAssinante.executar(dados);
    res.status(201).json(assinante);
  };

  listar = async (req: Request, res: Response): Promise<void> => {
    const { nome } = buscaSchema.parse(req.query);
    res.json(await this.listarAssinantes.executar(nome));
  };

  buscarPorId = async (req: Request, res: Response): Promise<void> => {
    const { id } = idSchema.parse(req.params);
    res.json(await this.buscarAssinante.executar(id));
  };

  atualizar = async (req: Request, res: Response): Promise<void> => {
    const { id } = idSchema.parse(req.params);
    const dados = atualizarSchema.parse(req.body);
    res.json(await this.atualizarAssinante.executar(id, dados));
  };

  deletar = async (req: Request, res: Response): Promise<void> => {
    const { id } = idSchema.parse(req.params);
    const { logico } = exclusaoSchema.parse(req.query);
    await this.deletarAssinante.executar(id, logico === undefined ? undefined : logico === "true");
    res.status(204).send();
  };
}
