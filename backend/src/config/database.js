// Simulando um banco de dados em memória
const database = {
  livros: [
    {
      id: 1,
      titulo: "Dom Casmurro",
      autor: "Machado de Assis",
      isbn: "9788544001820",
      capa: "https://covers.openlibrary.org/b/id/1234567-M.jpg",
      descricao: "Romance clássico da literatura brasileira",
      disponivel: true
    },
    {
      id: 2,
      titulo: "O Cortiço",
      autor: "Aluísio Azevedo",
      isbn: "9788572329872",
      capa: "https://covers.openlibrary.org/b/id/1234568-M.jpg",
      descricao: "Romance naturalista brasileiro",
      disponivel: true
    }
  ],
  
  emprestimos: [],
  favoritos: [],
  usuarios: [
    {
      id: 1,
      nome: "João Silva",
      email: "joao@email.com"
    }
  ]
};

// Funções para acesso aos dados
const getLivros = () => database.livros;
const getEmprestimos = () => database.emprestimos;
const getFavoritos = () => database.favoritos;
const getUsuarios = () => database.usuarios;

const adicionarLivro = (livro) => {
  const novoId = database.livros.length + 1;
  const novoLivro = { id: novoId, ...livro, disponivel: true };
  database.livros.push(novoLivro);
  return novoLivro;
};

const adicionarEmprestimo = (emprestimo) => {
  const novoId = database.emprestimos.length + 1;
  const novoEmprestimo = { id: novoId, ...emprestimo };
  database.emprestimos.push(novoEmprestimo);
  return novoEmprestimo;
};

const adicionarFavorito = (favorito) => {
  const novoId = database.favoritos.length + 1;
  const novoFavorito = { id: novoId, ...favorito };
  database.favoritos.push(novoFavorito);
  return novoFavorito;
};

const removerFavorito = (livroId, usuario) => {
  const index = database.favoritos.findIndex(f => 
    f.livroId === livroId && f.usuario === usuario
  );
  if (index !== -1) {
    return database.favoritos.splice(index, 1)[0];
  }
  return null;
};

const atualizarLivro = (livroId, updates) => {
  const livro = database.livros.find(l => l.id === livroId);
  if (livro) {
    Object.assign(livro, updates);
    return livro;
  }
  return null;
};

const atualizarEmprestimo = (emprestimoId, updates) => {
  const emprestimo = database.emprestimos.find(e => e.id === emprestimoId);
  if (emprestimo) {
    Object.assign(emprestimo, updates);
    return emprestimo;
  }
  return null;
};

module.exports = {
  getLivros,
  getEmprestimos,
  getFavoritos,
  getUsuarios,
  adicionarLivro,
  adicionarEmprestimo,
  adicionarFavorito,
  removerFavorito,
  atualizarLivro,
  atualizarEmprestimo
};