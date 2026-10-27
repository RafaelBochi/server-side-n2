export interface Assinante {
  id: string;
  cpf: string;
  nome: string;
  email: string;
  ativo: boolean;
  criadoEm: Date;
  atualizadoEm: Date;
}

export interface NovoAssinante {
  cpf: string;
  nome: string;
  email: string;
}

export interface AtualizacaoAssinante {
  nome?: string;
  email?: string;
}
