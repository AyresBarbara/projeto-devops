const express = require('express');
const router = express.Router();
const {
  getLivros,
  adicionarLivro,
  atualizarLivro,
  removerLivro
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

// DELETE - Remover livro
router.delete('/:id', (req, res) => {
  try {
    const { id } = req.params;
    console.log(`Tentando remover livro ID: ${id}`);
    
    const livroRemovido = removerLivro(parseInt(id));
    
    if (!livroRemovido) {
      return res.status(404).json({ erro: 'Livro não encontrado' });
    }
    
    res.json({ 
      mensagem: 'Livro removido com sucesso',
      livro: livroRemovido
    });
    
  } catch (erro) {
    console.error('Erro ao remover livro:', erro);
    res.status(500).json({ 
      erro: 'Erro ao remover livro',
      detalhes: erro.message
    });
  }
});

// POST - Remover livro (alternativa)
router.post('/:id/remover', (req, res) => {
  try {
    const { id } = req.params;
    console.log(`🔄 Tentando remover livro ID: ${id} (via POST)`);
    
    const livroRemovido = removerLivro(parseInt(id));
    
    if (!livroRemovido) {
      return res.status(404).json({ erro: 'Livro não encontrado' });
    }
    
    console.log('✅ Livro removido:', livroRemovido.titulo);
    res.json({ 
      mensagem: 'Livro removido com sucesso',
      livro: livroRemovido
    });
    
  } catch (erro) {
    console.error('❌ Erro ao remover livro:', erro);
    res.status(500).json({ 
      erro: 'Erro ao remover livro',
      detalhes: erro.message
    });
  }
});

module.exports = router;