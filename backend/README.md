\# 📚 Backend - API Biblioteca Digital



!\[Node.js](https://img.shields.io/badge/Node.js-18.x-green)

!\[Express](https://img.shields.io/badge/Express-4.x-lightgrey)

!\[PostgreSQL](https://img.shields.io/badge/PostgreSQL-13-blue)



\## 🏗️ Arquitetura



API REST desenvolvida em Node.js com Express para gerenciamento de livros da biblioteca digital.



\## 📦 Estrutura do Projeto



```

backend/

├── config/

│   └── database.js      # Configuração do banco de dados

├── routes/

│   └── livros.js        # Rotas da API

├── app.js               # Aplicação principal

├── package.json         # Dependências

└── Dockerfile           # Containerização

```



\## 🚀 Instalação e Execução



\### Desenvolvimento Local

```bash

cd backend

npm install

npm start

```



\### Via Docker

```bash

\# Na raiz do projeto

docker-compose up backend

```



\## 📡 Endpoints da API



\### 🟢 GET /api/livros

\*\*Descrição:\*\* Lista todos os livros



\*\*Resposta:\*\*

```json

\[

&nbsp; {

&nbsp;   "id": 1,

&nbsp;   "titulo": "Dom Casmurro",

&nbsp;   "autor": "Machado de Assis",

&nbsp;   "isbn": "9788544001820",

&nbsp;   "descricao": "Romance brasileiro clássico"

&nbsp; }

]

```



\### 🟡 POST/api/livros

\*\*Descrição:\*\* Adiciona novo livro



\*\*Body:\*\*

```json

{

&nbsp; "titulo": "O Cortiço",

&nbsp; "autor": "Aluísio Azevedo",

&nbsp; "isbn": "9788572328522",

&nbsp; "descricao": "Romance naturalista"

}

```



\### 🔴 DELETE /api/livros/:id

\*\*Descrição:\*\* Remove livro por ID



\*\*Exemplo:\*\* `DELETE /api/livros/1`



\### 🔵 GET /api/health

\*\*Descrição:\*\* Health check da API



\## 🗄️ Banco de Dados



\### Conexão PostgreSQL

```javascript

// config/database.js

const pool = new Pool({

&nbsp; user: 'usuario',

&nbsp; host: 'database',

&nbsp; database: 'biblioteca',

&nbsp; password: 'senha',

&nbsp; port: 5432,

});

```

\### Estrutura da Tabela

```sql

CREATE TABLE livros (

&nbsp;   id SERIAL PRIMARY KEY,

&nbsp;   titulo VARCHAR(255) NOT NULL,

&nbsp;   autor VARCHAR(255) NOT NULL,

&nbsp;   isbn VARCHAR(20),

&nbsp;   capa TEXT,

&nbsp;   descricao TEXT,

&nbsp;   data\_criacao TIMESTAMP DEFAULT CURRENT\_TIMESTAMP

);

```

\### 🐳 Docker

## Dockerfile

```dockerfile

FROM node:18-alpine

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3000

CMD \["npm", "start"]

```

\## Variáveis de Ambiente

```bash

DATABASE\_URL=postgresql://usuario:senha@database:5432/biblioteca

```

\## 🧪 Testes



\### Com Postman

1\. Importe `../postman\_collection.json`

2\. Execute os testes automatizados



\### Com cURL

```bash

\# Health Check

curl http://localhost:3000/api/health



\# Listar livros

curl http://localhost:3000/api/livros

```

\## 📊 Monitoramento



\- \*\*Porta:\*\* 3000

\- \*\*Health Check:\*\* `/api/health`

\- \*\*Monitorado via:\*\* Zabbix



