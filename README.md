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

| Método | Rota | Descrição |
| --- | --- | --- |
| POST | `/assinantes` | Cria um assinante. |
| GET | `/assinantes` | Lista todos os assinantes ativos. |
| GET | `/assinantes?nome=maria` | Busca ativa, parcial e sem diferenciar maiúsculas/minúsculas. |
| GET | `/assinantes/:id` | Busca assinante ativo por UUID. |
| PATCH | `/assinantes/:id` | Atualiza `nome` e/ou `email`. |
| DELETE | `/assinantes/:id` | Exclusão lógica: define `ativo` como `false`. |

Exemplo de criação:

```json
{
  "cpf": "529.982.247-25",
  "nome": "Maria da Silva",
  "email": "maria@exemplo.com"
}
```

O CPF é validado, normalizado para 11 dígitos e é único. Registros inativos não aparecem em GET, PATCH ou DELETE e respondem `404`. Erros seguem o formato `{ "erro": "mensagem" }`.

## Comandos

```bash
npm run build
npm test
npm run prisma:migrate -- --name nome_da_migration
```
