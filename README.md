# API de Assinantes

API REST para o cadastro de assinantes de jornal, implementada em TypeScript, Express, Prisma e PostgreSQL. A organização separa regras de negócio (`use_cases`), acesso a dados (`repository`) e HTTP (`presentation`).

## Executar

```bash
cp .env.example .env
docker compose up -d
npm install
npm run prisma:generate
npx prisma migrate deploy
npm run dev
```

A API inicia em `http://localhost:3000`; o PostgreSQL é exposto em `localhost:5433`. Para encerrar o banco, use `docker compose down`; acrescente `-v` somente se desejar remover os dados persistidos.

## Endpoints

| Método | Rota                     | Descrição                                                     |
| ------ | ------------------------ | ------------------------------------------------------------- |
| POST   | `/assinantes`            | Cria um assinante.                                            |
| GET    | `/assinantes`            | Lista todos os assinantes ativos.                             |
| GET    | `/assinantes?nome=maria` | Busca ativa, parcial e sem diferenciar maiúsculas/minúsculas. |
| GET    | `/assinantes/:id`        | Busca assinante ativo por UUID.                               |
| PATCH  | `/assinantes/:id`        | Atualiza `nome` e/ou `email`.                                 |
| DELETE | `/assinantes/:id`        | Exclui um assinante, lógica ou definitivamente.               |

Exemplo de criação:

```json
{
  "cpf": "529.982.247-25",
  "nome": "Maria da Silva",
  "email": "maria@exemplo.com"
}
```

## Exclusão

`DELETE /assinantes/:id` aceita `?logico=true` para exclusão lógica e `?logico=false` para exclusão definitiva. Quando não há o parâmetro, o repositório usa a variável de ambiente `EXCLUSAO_LOGICA`.

- `EXCLUSAO_LOGICA=true`: define `ativo` como `false`.
- `EXCLUSAO_LOGICA=false`: remove definitivamente o registro.
- Variável ausente: usa exclusão lógica como padrão seguro.
- Outro valor: retorna erro de configuração.
