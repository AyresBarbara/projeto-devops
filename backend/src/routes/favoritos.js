const express = require('express');
const router = express.Router();
const {
  getFavoritos,
  adicionarFavorito,
  removerFavorito
} = require('../config/database');

// GET - Listar favoritos do usuário
router.get('/', (req, res) => {
  try {
    const { usuario } = req.query;
    
    if (!usuario) {
      return res.status(400).json({ 
        erro: 'Parâmetro usuario é obrigatório' 
      });
    }

    const favoritos = getFavoritos();
    const favoritosUsuario = favoritos.filter(f => f.usuario === usuario);

    res.json(favoritosUsuario);
    
  } catch (erro) {
    res.status(500).json({ 
      erro: 'Erro ao buscar favoritos'
    });
  }
});

// POST - Adicionar ou remover favorito
router.post('/', (req, res) => {
  try {
    const { livroId, usuario } = req.body;
    
    if (!livroId || !usuario) {
      return res.status(400).json({ 
        erro: 'livroId e usuario são obrigatórios' 
      });
    }

    const favoritos = getFavoritos();
    const favoritoExistente = favoritos.find(f => 
      f.livroId === livroId && f.usuario === usuario
    );

    let resultado;
    let acao;

    if (favoritoExistente) {
      // Remover favorito
      resultado = removerFavorito(livroId, usuario);
      acao = 'removido';
    } else {
      // Adicionar favorito
      resultado = adicionarFavorito({ livroId, usuario });
      acao = 'adicionado';
    }

    res.json({
      mensagem: `Livro ${acao} dos favoritos com sucesso`
    });
    
  } catch (erro) {
    res.status(500).json({ 
      erro: 'Erro ao atualizar favoritos'
    });
  }
});

module.exports = router;