import type { ErrorRequestHandler } from "express";
import { Prisma } from "@prisma/client";
import { ZodError } from "zod";
import { ErroAplicacao } from "../../domain/errors.js";

export const tratadorDeErros: ErrorRequestHandler = (erro, _req, res, _next) => {
  if (erro instanceof ErroAplicacao) {
    res.status(erro.status).json({ erro: erro.message });
    return;
  }

  if (erro instanceof ZodError) {
    res.status(400).json({ erro: erro.issues[0]?.message ?? "Dados inválidos" });
    return;
  }

  if (erro instanceof Prisma.PrismaClientKnownRequestError && erro.code === "P2002") {
    res.status(409).json({ erro: "CPF já cadastrado" });
    return;
  }

  console.error(erro);
  res.status(500).json({ erro: "Erro interno do servidor" });
};
