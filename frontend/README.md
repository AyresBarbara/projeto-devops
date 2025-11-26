\# 🖥️ Frontend - Biblioteca Digital



!\[React](https://img.shields.io/badge/React-18.x-blue)

!\[Nginx](https://img.shields.io/badge/Nginx-Latest-green)

!\[Docker](https://img.shields.io/badge/Docker-✓-blue)



\## 🎯 Sobre



Interface web responsiva para a biblioteca digital, desenvolvida com React e servida via Nginx.



\## 📦 Estrutura do Projeto

```

frontend/

├── src/

│ ├── index.html # Página principal

│ ├── css/ # Estilos

│ ├── js/ # JavaScript

│ └── assets/ # Imagens e recursos

├── nginx.conf # Configuração Nginx

└── Dockerfile # Containerização

```



\## 🚀 Instalação e Execução



\### Desenvolvimento Local

```bash

cd frontend

\# Servir com live-server ou similar

npx live-server src/ --port=3001

```

\### Via Docker

```bash

\# Na raiz do projeto

docker-compose up frontend

```

\## 🌐 Acesso



\- \*\*URL:\*\* http://localhost:80

\- \*\*Ambiente:\*\* Produção



\## 🔧 Funcionalidades



\- ✅ Listagem de livros

\- ✅ Adição de novos livros

\- ✅ Remoção de livros

\- ✅ Interface responsiva

\- ✅ Integração com API backend



\## 🐳 Docker



\### Dockerfile

```dockerfile

FROM nginx:alpine

COPY src/ /usr/share/nginx/html/

EXPOSE 80

CMD \["nginx", "-g", "daemon off;"]

```



\### Configuração Nginx

```nginx

server {

&nbsp;   listen 80;

&nbsp;   root /usr/share/nginx/html;

&nbsp;   index index.html;

&nbsp;   

&nbsp;   location / {

&nbsp;       try\_files $uri $uri/ =404;

&nbsp;   }

}

```



\## 🔌 Integração com Backend



\### API Endpoints Utilizados

```javascript

// Buscar livros

fetch('http://localhost:3000/api/livros')



// Adicionar livro

fetch('http://localhost:3000/api/livros', {

&nbsp;   method: 'POST',

&nbsp;   headers: { 'Content-Type': 'application/json' },

&nbsp;   body: JSON.stringify(livro)

})



// Remover livro

fetch(`http://localhost:3000/api/livros/${id}`, {

&nbsp;   method: 'DELETE'

})

```

\## 📊 Monitoramento



\- \*\*Porta:\*\* 80

\- \*\*Servidor:\*\* Nginx

\- \*\*Status:\*\* Disponível via Zabbix

\- \*\*Health Check:\*\* Responde na porta 80



\## 🎨 Tecnologias



\- \*\*HTML5\*\* - Estrutura

\- \*\*CSS3\*\* - Estilização

\- \*\*JavaScript\*\* - Interatividade

\- \*\*Nginx\*\* - Servidor web

\- \*\*Docker\*\* - Containerização



\## 🚀 Deploy



O frontend é automaticamente deployado via:

```bash

docker-compose up -d frontend

```

