# \# 📚 Biblioteca Digital - Projeto DevOps

# 

# !\[Docker](https://img.shields.io/badge/Docker-✓-blue)

# !\[Node.js](https://img.shields.io/badge/Node.js-✓-green)

# !\[PostgreSQL](https://img.shields.io/badge/PostgreSQL-✓-blue)

# !\[Zabbix](https://img.shields.io/badge/Zabbix-✓-orange)

# !\[GitHub](https://img.shields.io/badge/GitHub-✓-black)

# 

# \## 🎯 Sobre o Projeto

# 

# Sistema completo de biblioteca digital desenvolvido como projeto acadêmico para aplicação de conceitos de DevOps, incluindo containerização, monitoramento, integração contínua e versionamento.

# 

# \## 🏗️ Arquitetura

```bash

projeto-devops/

├── 📁 backend/          # API REST Node.js/Express

├── 📁 frontend/         # Interface React/Nginx

├── 📁 database/         # Scripts PostgreSQL

├── 🐳 docker-compose.yml # Orquestração de containers

├── 📋 postman\_collection.json # Testes da API

└── 📖 README.md         # Documentação

```



\## 🚀 Instalação e Execução Rápida



\### Pré-requisitos

\- Docker

\- Docker Compose



\### 🐳 Executar Ambiente Completo



```bash

\# Clone o repositório

git clone https://github.com/AyresBarbara/projeto-devops.git

cd projeto-devops



\# Execute o ambiente completo

docker-compose up -d

```



\## 📊 Verificar Serviços



```bash

\# Verificar status dos containers

docker-compose ps



\# Ver logs em tempo real

docker-compose logs -f

```



\## 🌐 Acesso aos Serviços



| Serviço | URL | Porta | Descrição |

|---------|-----|-------|-----------|

| 🖥️ Frontend | http://localhost:80 | 80 | Interface da biblioteca |

| ⚙️ Backend | http://localhost:3000 | 3000 | API REST |

| 📊 Zabbix | http://localhost:8080 | 8080 | Monitoramento |

| 🗄️ PostgreSQL | localhost:5432 | 5432 | Banco de dados |



\*\*Credenciais Zabbix:\*\* 

\- Usuário: `Admin`

\- Senha: `zabbix`



\## 🛠️ Comandos Docker Úteis



```bash

\# Iniciar serviços

docker-compose up -d



\# Parar serviços

docker-compose down



\# Reconstruir e iniciar

docker-compose up -d --build



\# Ver logs específicos

docker-compose logs backend

docker-compose logs frontend



\# Acessar banco de dados

docker exec -it projeto-devops-db psql -U usuario -d biblioteca

```



\## 📚 API - Endpoints Disponíveis



\### Livros

\- `GET /api/livros` - Listar todos os livros

\- `POST /api/livros` - Adicionar novo livro  

\- `DELETE /api/livros/:id` - Remover livro



\### Health Check

\- `GET /api/health` - Status da API



\### Exemplo de uso



```bash

\# Listar livros

curl http://localhost:3000/api/livros



\# Adicionar livro

curl -X POST http://localhost:3000/api/livros \\

&nbsp; -H "Content-Type: application/json" \\

&nbsp; -d '{"titulo":"Dom Casmurro","autor":"Machado de Assis"}'

```



\## 🧪 Testes com Postman



1\. Abra o Postman

2\. Importe o arquivo `postman\_collection.json`

3\. Execute os testes automatizados da API



\## 📊 Monitoramento com Zabbix



O Zabbix monitora automaticamente:

\- ✅ Utilização de CPU e memória

\- ✅ Disponibilidade dos serviços

\- ✅ Métricas do PostgreSQL

\- ✅ Status das portas (80, 3000, 5432)



\### Hosts Monitorados

\- \*\*backend\*\* (172.18.0.5:3000)

\- \*\*frontend\*\* (172.18.0.3:80)

\- \*\*database\*\* (172.18.0.4:5432)



\## 🗄️ Estrutura do Banco de Dados



```bash

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



\## 🔄 Versionamento



\### Branches

\- `main` - Produção

\- `staging` - Homologação  

\- `develop` - Desenvolvimento



\### Fluxo de Trabalho

```bash

\# Desenvolvimento na branch develop

git checkout develop



\# Merge para staging

git checkout staging

git merge develop



\# Deploy para produção

git checkout main

git merge staging

```



\## 🏆 Requisitos Atendidos



\- \[x] \*\*Aplicação + Docker\*\* - Frontend, backend e containers

\- \[x] \*\*Versionamento Git\*\* - 3 branches no GitHub

\- \[x] \*\*Postman Collection\*\* - Testes e documentação da API

\- \[x] \*\*Zabbix Monitoramento\*\* - Monitoramento de serviços

\- \[x] \*\*Banco de dados PostgreSQL\*\* - Persistência de dados



\## 🐛 Solução de Problemas Comuns



\### Portas Ocupadas

```bash

\# Verificar portas em uso

netstat -ano | findstr :3000



\# Parar processo (Windows)

taskkill /PID <PID> /F



\## 👥 Desenvolvido por



\*\*Barbara Ayres\*\* - \[GitHub](https://github.com/AyresBarbara)

\*\*Gustavo Andrew\*\* - \[GitHub](https://github.com/ineviTavinho)

\*\*Isllâne Maria\*\* - \[GitHub](https://github.com/isllane07)

\*\*João Carneiro\*\* - \[GitHub](https://github.com/Jotta2k4)

\*\*Pedro Sales\*\* - \[GitHub](https://github.com/Salesdv)

\*\*Silas Rafael\*\* - \[GitHub](https://github.com/SilasAlbuquerque001)

\*\*Wilson Francisco\*\* - \[GitHub](https://github.com/WilsonQdop)



\## 📄 Licença



Este projeto é para fins acadêmicos.

