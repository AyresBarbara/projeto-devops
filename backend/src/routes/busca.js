const express = require('express');
const router = express.Router();

// Buscar livros na Google Books API
router.get('/', async (req, res) => {
  try {
    const { q } = req.query;
    
    if (!q) {
      return res.status(400).json({ 
        erro: 'Parâmetro de busca (q) é obrigatório' 
      });
    }

    const resposta = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(q)}&maxResults=12&langRestrict=pt`
    );
    
    const dados = await resposta.json();

    if (!dados.items) {
      return res.json([]);
    }

    const livrosEncontrados = dados.items.map(item => {
      const info = item.volumeInfo;
      return {
        titulo: info.title || 'Título não disponível',
        autor: info.authors ? info.authors.join(', ') : 'Autor desconhecido',
        isbn: info.industryIdentifiers ? 
          info.industryIdentifiers[0].identifier : '',
        capa: info.imageLinks ? 
          info.imageLinks.thumbnail.replace('http://', 'https://') : '',
        descricao: info.description || 
          'Descrição não disponível para este livro.'
      };
    });

    res.json(livrosEncontrados);
    
  } catch (erro) {
    res.status(500).json({ 
      erro: 'Erro ao buscar livros na API externa'
    });
  }
});

module.exports = router;