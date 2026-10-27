import express from "express";
import type { AssinanteRepository } from "./repository/assinante-repository.js";
import { AssinanteController } from "./presentation/controllers/assinante-controller.js";
import { tratadorDeErros } from "./presentation/middlewares/tratador-de-erros.js";
import { criarRotasAssinantes } from "./presentation/routes/assinante-routes.js";
import { AtualizarAssinante } from "./use_cases/atualizar-assinante.js";
import { BuscarAssinante } from "./use_cases/buscar-assinante.js";
import { CriarAssinante } from "./use_cases/criar-assinante.js";
import { DeletarAssinante } from "./use_cases/deletar-assinante.js";
import { ListarAssinantes } from "./use_cases/listar-assinantes.js";

export function criarApp(repositorio: AssinanteRepository) {
  const app = express();
  app.use(express.json());

  const controller = new AssinanteController(
    new CriarAssinante(repositorio),
    new ListarAssinantes(repositorio),
    new BuscarAssinante(repositorio),
    new AtualizarAssinante(repositorio),
    new DeletarAssinante(repositorio),
  );

  app.use(criarRotasAssinantes(controller));
  app.use(tratadorDeErros);
  return app;
}
