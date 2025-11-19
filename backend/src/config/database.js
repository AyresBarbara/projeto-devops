const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, 'data.json');

// Função para carregar dados do arquivo
function carregarDados() {
    try {
        if (fs.existsSync(DATA_FILE)) {
            const dados = fs.readFileSync(DATA_FILE, 'utf8');
            return JSON.parse(dados);
        }
    } catch (erro) {
        console.error('Erro ao carregar dados:', erro);
    }
    
    // Dados iniciais se o arquivo não existir
    return {
        livros: [
            {
                id: 1,
                titulo: "Dom Casmurro",
                autor: "Machado de Assis",
                isbn: "9788544001820",
                capa: "",
                descricao: "Romance clássico da literatura brasileira",
                disponivel: true,
                ano: "1899",
                paginas: 256,
                editora: "Editora Garnier",
                idioma: "pt"
            },
            {
                id: 2,
                titulo: "O Cortiço",
                autor: "Aluísio Azevedo",
                isbn: "9788572329872",
                capa: "",
                descricao: "Romance naturalista brasileiro",
                disponivel: true,
                ano: "1890",
                paginas: 312,
                editora: "Typ. de G. Ermakoff",
                idioma: "pt"
            }
        ],
        emprestimos: [],
        favoritos: []
    };
}

// Função para salvar dados no arquivo
function salvarDados(dados) {
    try {
        fs.writeFileSync(DATA_FILE, JSON.stringify(dados, null, 2));
        return true;
    } catch (erro) {
        console.error('Erro ao salvar dados:', erro);
        return false;
    }
}

// Carrega dados iniciais
let database = carregarDados();

// Funções para acesso aos dados
const getLivros = () => [...database.livros];
const getEmprestimos = () => [...database.emprestimos];
const getFavoritos = () => [...database.favoritos];

const adicionarLivro = (livro) => {
    const novoId = database.livros.length > 0 ? 
        Math.max(...database.livros.map(l => l.id)) + 1 : 1;
    
    const novoLivro = { 
        id: novoId, 
        ...livro, 
        disponivel: true,
        ano: livro.ano || 'N/A',
        paginas: livro.paginas || 0,
        editora: livro.editora || 'Editora não informada',
        idioma: livro.idioma || 'pt'
    };
    
    database.livros.push(novoLivro);
    salvarDados(database);
    return novoLivro;
};

const adicionarEmprestimo = (emprestimo) => {
    const novoId = database.emprestimos.length > 0 ? 
        Math.max(...database.emprestimos.map(e => e.id)) + 1 : 1;
    
    const novoEmprestimo = { 
        id: novoId, 
        ...emprestimo 
    };
    
    database.emprestimos.push(novoEmprestimo);
    salvarDados(database);
    return novoEmprestimo;
};

const adicionarFavorito = (favorito) => {
    const novoId = database.favoritos.length > 0 ? 
        Math.max(...database.favoritos.map(f => f.id)) + 1 : 1;
    
    const novoFavorito = { 
        id: novoId, 
        ...favorito 
    };
    
    database.favoritos.push(novoFavorito);
    salvarDados(database);
    return novoFavorito;
};

const removerFavorito = (livroId, usuario) => {
    const index = database.favoritos.findIndex(f => 
        f.livroId === livroId && f.usuario === usuario
    );
    
    if (index !== -1) {
        const favoritoRemovido = database.favoritos.splice(index, 1)[0];
        salvarDados(database);
        return favoritoRemovido;
    }
    
    return null;
};

// NOVA FUNÇÃO: Remover livro do catálogo
const removerLivro = (livroId) => {
    const index = database.livros.findIndex(l => l.id === livroId);
    
    if (index !== -1) {
        const livroRemovido = database.livros.splice(index, 1)[0];
        salvarDados(database);
        return livroRemovido;
    }
    
    return null;
};

const atualizarLivro = (livroId, updates) => {
    const livro = database.livros.find(l => l.id === livroId);
    
    if (livro) {
        Object.assign(livro, updates);
        salvarDados(database);
        return livro;
    }
    
    return null;
};

const atualizarEmprestimo = (emprestimoId, updates) => {
    const emprestimo = database.emprestimos.find(e => e.id === emprestimoId);
    
    if (emprestimo) {
        Object.assign(emprestimo, updates);
        salvarDados(database);
        return emprestimo;
    }
    
    return null;
};

module.exports = {
    getLivros,
    getEmprestimos,
    getFavoritos,
    adicionarLivro,
    adicionarEmprestimo,
    adicionarFavorito,
    removerFavorito,
    removerLivro, // Exporta a nova função
    atualizarLivro,
    atualizarEmprestimo
};