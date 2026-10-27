export class ErroAplicacao extends Error {
  constructor(
    public readonly status: number,
    message: string,
  ) {
    super(message);
    this.name = "ErroAplicacao";
  }
}

export class RecursoNaoEncontradoError extends ErroAplicacao {
  constructor(mensagem = "Assinante não encontrado") {
    super(404, mensagem);
  }
}

export class ConflitoError extends ErroAplicacao {
  constructor(mensagem: string) {
    super(409, mensagem);
  }
}
