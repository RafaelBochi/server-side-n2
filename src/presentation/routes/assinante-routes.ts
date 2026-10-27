import { Router } from "express";
import type { AssinanteController } from "../controllers/assinante-controller.js";

export function criarRotasAssinantes(controller: AssinanteController): Router {
  const rotas = Router();
  rotas.post("/assinantes", controller.criar);
  rotas.get("/assinantes", controller.listar);
  rotas.get("/assinantes/:id", controller.buscarPorId);
  rotas.patch("/assinantes/:id", controller.atualizar);
  rotas.delete("/assinantes/:id", controller.deletar);
  return rotas;
}
