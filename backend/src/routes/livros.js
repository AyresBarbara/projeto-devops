const express = require('express');
const router = express.Router();
const {
  getLivros,
  adicionarLivro,
  atualizarLivro
} = require('../config/database');

// GET - Listar todos os livros
router.get('/', (req, res) => {
  try {
    const livros = getLivros();
    res.json(livros);
  } catch (erro) {
    res.status(500).json({ 
      erro: 'Erro ao buscar livros'
    });
  }
});

// POST - Adicionar novo livro
router.post('/', (req, res) => {
  try {
    const { titulo, autor, isbn, capa, descricao } = req.body;
    
    if (!titulo || !autor) {
      return res.status(400).json({ 
        erro: 'Título e autor são obrigatórios' 
      });
    }

    const novoLivro = adicionarLivro({
      titulo,
      autor,
      isbn: isbn || '',
      capa: capa || '',
      descricao: descricao || 'Descrição não disponível.'
    });

    res.status(201).json(novoLivro);
    
  } catch (erro) {
    res.status(500).json({ 
      erro: 'Erro ao adicionar livro'
    });
  }
});

module.exports = router;