const express = require('express');
const router = express.Router();
const {
  getEmprestimos,
  getLivros,
  adicionarEmprestimo,
  atualizarEmprestimo,
  atualizarLivro
} = require('../config/database');

// GET - Listar todos os empréstimos
router.get('/', (req, res) => {
  try {
    const { usuario } = req.query;
    let emprestimos = getEmprestimos();
    
    if (usuario) {
      emprestimos = emprestimos.filter(e => e.usuario === usuario);
    }
    
    res.json(emprestimos);
    
  } catch (erro) {
    res.status(500).json({ 
      erro: 'Erro ao buscar empréstimos'
    });
  }
});

// POST - Criar novo empréstimo
router.post('/', (req, res) => {
  try {
    const { livroId, usuario } = req.body;
    
    if (!livroId || !usuario) {
      return res.status(400).json({ 
        erro: 'livroId e usuario são obrigatórios' 
      });
    }

    const livros = getLivros();
    const livro = livros.find(l => l.id === livroId);
    
    if (!livro) {
      return res.status(404).json({ erro: 'Livro não encontrado' });
    }
    
    if (!livro.disponivel) {
      return res.status(400).json({ 
        erro: 'Livro não está disponível para empréstimo' 
      });
    }

    // Marcar livro como indisponível
    atualizarLivro(livroId, { disponivel: false });

    const novoEmprestimo = adicionarEmprestimo({
      livroId,
      usuario,
      dataEmprestimo: new Date().toISOString().split('T')[0],
      dataDevolucao: null
    });

    res.status(201).json(novoEmprestimo);
    
  } catch (erro) {
    res.status(500).json({ 
      erro: 'Erro ao criar empréstimo'
    });
  }
});

// PUT - Devolver livro
router.put('/:id/devolver', (req, res) => {
  try {
    const { id } = req.params;
    const emprestimos = getEmprestimos();
    const emprestimo = emprestimos.find(e => e.id === parseInt(id));
    
    if (!emprestimo) {
      return res.status(404).json({ erro: 'Empréstimo não encontrado' });
    }

    // Atualizar empréstimo
    const emprestimoAtualizado = atualizarEmprestimo(parseInt(id), {
      dataDevolucao: new Date().toISOString().split('T')[0]
    });

    // Marcar livro como disponível
    atualizarLivro(emprestimo.livroId, { disponivel: true });

    res.json({
      mensagem: 'Livro devolvido com sucesso'
    });
    
  } catch (erro) {
    res.status(500).json({ 
      erro: 'Erro ao devolver livro'
    });
  }
});

module.exports = router;