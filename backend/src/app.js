const express = require('express');
const cors = require('cors');

// Importar rotas
const livrosRoutes = require('./routes/livros');
const emprestimosRoutes = require('./routes/emprestimos');
const favoritosRoutes = require('./routes/favoritos');
const buscaRoutes = require('./routes/busca');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Log de requisições
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Rotas
app.use('/api/livros', livrosRoutes);
app.use('/api/emprestimos', emprestimosRoutes);
app.use('/api/favoritos', favoritosRoutes);
app.use('/api/busca', buscaRoutes);

// Rota de saúde da API
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    mensagem: 'API da Biblioteca Digital está funcionando!',
    timestamp: new Date().toISOString()
  });
});

// Rota principal
app.get('/', (req, res) => {
  res.json({
    mensagem: 'Bem-vindo à API da Biblioteca Digital!',
    endpoints: {
      livros: '/api/livros',
      emprestimos: '/api/emprestimos',
      favoritos: '/api/favoritos',
      busca: '/api/busca',
      health: '/api/health'
    },
    documentacao: 'Consulte o README para mais informações'
  });
});

// Middleware de erro 404
app.use('*', (req, res) => {
  res.status(404).json({
    erro: 'Rota não encontrada',
    path: req.originalUrl,
    metodo: req.method
  });
});

// Middleware de tratamento de erros
app.use((erro, req, res, next) => {
  console.error('Erro na aplicação:', erro);
  res.status(500).json({
    erro: 'Erro interno do servidor',
    detalhes: process.env.NODE_ENV === 'development' ? erro.message : 'Contate o administrador'
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor da Biblioteca Digital rodando na porta ${PORT}`);
  console.log(`📚 Endpoints disponíveis:`);
  console.log(`   http://localhost:${PORT}/api/livros`);
  console.log(`   http://localhost:${PORT}/api/emprestimos`);
  console.log(`   http://localhost:${PORT}/api/favoritos`);
  console.log(`   http://localhost:${PORT}/api/busca`);
  console.log(`   http://localhost:${PORT}/api/health`);
});

module.exports = app;