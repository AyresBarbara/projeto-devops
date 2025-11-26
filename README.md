# 📚 Biblioteca Digital - Projeto DevOps

![Docker](https://img.shields.io/badge/Docker-✓-blue)
![Node.js](https://img.shields.io/badge/Node.js-✓-green)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-✓-blue)
![Zabbix](https://img.shields.io/badge/Zabbix-✓-orange)
![GitHub](https://img.shields.io/badge/GitHub-✓-black)

## 🎯 Sobre o Projeto

Sistema completo de biblioteca digital desenvolvido como projeto acadêmico para aplicação de conceitos de DevOps, incluindo containerização, monitoramento, integração contínua e versionamento.

## 🏗️ Arquitetura
```bash
projeto-devops/
├── 📁 backend/          # API REST Node.js/Express
├── 📁 frontend/         # Interface React/Nginx
├── 📁 database/         # Scripts PostgreSQL
├── 🐳 docker-compose.yml # Orquestração de containers
├── 📋 postman_collection.json # Testes da API
└── 📖 README.md         # Documentação
```

## 🚀 Instalação e Execução Rápida

### Pré-requisitos
- Docker
- Docker Compose

### 🐳 Executar Ambiente Completo

```bash
# Clone o repositório
git clone https://github.com/AyresBarbara/projeto-devops.git
cd projeto-devops

# Execute o ambiente completo
docker-compose up -d
```

## 📊 Verificar Serviços

```bash
# Verificar status dos containers
docker-compose ps

# Ver logs em tempo real
docker-compose logs -f
```

## 🌐 Acesso aos Serviços

| Serviço | URL | Porta | Descrição |
|---------|-----|-------|-----------|
| 🖥️ Frontend | http://localhost:80 | 80 | Interface da biblioteca |
| ⚙️ Backend | http://localhost:3000 | 3000 | API REST |
| 📊 Zabbix | http://localhost:8080 | 8080 | Monitoramento |
| 🗄️ PostgreSQL | localhost:5432 | 5432 | Banco de dados |

**Credenciais Zabbix:** 
- Usuário: `Admin`
- Senha: `zabbix`

## 🛠️ Comandos Docker Úteis

```bash
# Iniciar serviços
docker-compose up -d

# Parar serviços
docker-compose down

# Reconstruir e iniciar
docker-compose up -d --build

# Ver logs específicos
docker-compose logs backend
docker-compose logs frontend

# Acessar banco de dados
docker exec -it projeto-devops-db psql -U usuario -d biblioteca
```

## 📚 API - Endpoints Disponíveis

### Livros
- `GET /api/livros` - Listar todos os livros
- `POST /api/livros` - Adicionar novo livro  
- `DELETE /api/livros/:id` - Remover livro

### Health Check
- `GET /api/health` - Status da API

### Exemplo de uso

```bash
# Listar livros
curl http://localhost:3000/api/livros

# Adicionar livro
curl -X POST http://localhost:3000/api/livros \
  -H "Content-Type: application/json" \
  -d '{"titulo":"Dom Casmurro","autor":"Machado de Assis"}'
```

## 🧪 Testes com Postman

1. Abra o Postman
2. Importe o arquivo `postman_collection.json`
3. Execute os testes automatizados da API

## 📊 Monitoramento com Zabbix

O Zabbix monitora automaticamente:
- ✅ Utilização de CPU e memória
- ✅ Disponibilidade dos serviços
- ✅ Métricas do PostgreSQL
- ✅ Status das portas (80, 3000, 5432)

### Hosts Monitorados
- **backend** (172.18.0.5:3000)
- **frontend** (172.18.0.3:80)
- **database** (172.18.0.4:5432)

## 🗄️ Estrutura do Banco de Dados

```bash
CREATE TABLE livros (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    autor VARCHAR(255) NOT NULL,
    isbn VARCHAR(20),
    capa TEXT,
    descricao TEXT,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 🔄 Versionamento

### Branches
- `main` - Produção
- `staging` - Homologação  
- `develop` - Desenvolvimento

### Fluxo de Trabalho
```bash
# Desenvolvimento na branch develop
git checkout develop

# Merge para staging
git checkout staging
git merge develop

# Deploy para produção
git checkout main
git merge staging
```

## 🏆 Requisitos Atendidos

- [x] **Aplicação + Docker** - Frontend, backend e containers
- [x] **Versionamento Git** - 3 branches no GitHub
- [x] **Postman Collection** - Testes e documentação da API
- [x] **Zabbix Monitoramento** - Monitoramento de serviços
- [x] **Banco de dados PostgreSQL** - Persistência de dados

## 👥 Desenvolvido por

-**Barbara Ayres** - [GitHub](https://github.com/AyresBarbara)
-**Gustavo Andrew** - [GitHub](https://github.com/ineviTavinho)
-**Isllâne** - [GitHub](https://github.com/isllane07)
-**João Carneiro** - [GitHub](https://github.com/Jotta2k4)
-**Pedro Sales** - [GitHub](https://github.com/Salesdv)
-**Silas Rafael** - [GitHub](https://github.com/SilasAlbuquerque001)
-**Wilson Francisco** - [GitHub](https://github.com/WilsonQdop)

## 📄 Licença

Este projeto é para fins acadêmicos.
