// Configurações globais
const CONFIG = {
    API_URL: 'http://localhost:3000/api',
    USUARIO: 'João Silva' // Poderia vir de um sistema de login
};

// Gerenciamento de abas
function inicializarAbas() {
    const abas = document.querySelectorAll('.aba');
    
    abas.forEach(aba => {
        aba.addEventListener('click', () => {
            // Remove classe ativa de todas as abas
            abas.forEach(a => a.classList.remove('ativa'));
            document.querySelectorAll('.aba-conteudo').forEach(conteudo => {
                conteudo.classList.remove('ativa');
            });
            
            // Adiciona classe ativa na aba clicada
            aba.classList.add('ativa');
            const abaAlvo = aba.getAttribute('data-aba');
            document.getElementById(abaAlvo).classList.add('ativa');
            
            // Carrega conteúdo específico da aba
            carregarConteudoAba(abaAlvo);
        });
    });
}

// Carrega conteúdo baseado na aba ativa
function carregarConteudoAba(aba) {
    switch(aba) {
        case 'catalogo':
            carregarCatalogo();
            break;
        case 'emprestimos':
            carregarEmprestimos();
            break;
        case 'favoritos':
            carregarFavoritos();
            break;
        case 'buscar':
            // Só carrega quando usuário buscar
            break;
    }
}

// Funções utilitárias
async function fazerRequisicao(url, opcoes = {}) {
    try {
        const resposta = await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                ...opcoes.headers
            },
            ...opcoes
        });
        
        if (!resposta.ok) {
            throw new Error(`Erro HTTP: ${resposta.status}`);
        }
        
        return await resposta.json();
    } catch (erro) {
        console.error('Erro na requisição:', erro);
        mostrarErro(`Erro: ${erro.message}`);
        return null;
    }
}

function mostrarErro(mensagem) {
    // Poderia ser um toast notification
    alert(mensagem);
}

function mostrarLoading(container) {
    container.innerHTML = '<div class="loading">Carregando...</div>';
}

// Inicialização da aplicação
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Biblioteca Digital inicializada');
    inicializarAbas();
    carregarCatalogo(); // Carrega catálogo por padrão
    
    // Enter no campo de busca
    document.getElementById('campo-busca').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            buscarLivros();
        }
    });
});

// Função global para buscar livros (chamada do HTML)
window.buscarLivros = async function() {
    const termo = document.getElementById('campo-busca').value.trim();
    if (!termo) {
        mostrarErro('Digite um termo para buscar');
        return;
    }
    
    const container = document.getElementById('resultados-busca');
    mostrarLoading(container);
    
    try {
        const livrosAPI = await fetch(`${CONFIG.API_URL}/busca?q=${encodeURIComponent(termo)}`)
            .then(resposta => resposta.json());
        
        if (!livrosAPI || livrosAPI.length === 0) {
            container.innerHTML = '<div class="loading">Nenhum livro encontrado na busca.</div>';
            return;
        }
        
        container.innerHTML = livrosAPI.map(livro => `
            <div class="card-livro">
                <div class="capa-container">
                    ${livro.capa ? `<img src="${livro.capa}" alt="${livro.titulo}" onerror="this.style.display='none'">` : 
                      '<div style="height:200px;background:#f7fafc;display:flex;align-items:center;justify-content:center;color:#718096;font-size:2em;">📖</div>'}
                </div>
                
                <div class="conteudo-card">
                    <h3>${livro.titulo}</h3>
                    <p class="autor"><strong>Autor:</strong> ${livro.autor}</p>
                    
                    ${livro.descricao ? `<p class="sinopse">${livro.descricao.substring(0, 120)}...</p>` : ''}
                    
                    <div class="info-extra">
                        ${livro.ano ? `<span class="info-item">📅 ${livro.ano}</span>` : ''}
                        ${livro.paginas ? `<span class="info-item">📖 ${livro.paginas}p</span>` : ''}
                    </div>
                    
                    <div class="status disponivel" style="background: #bee3f8; color: #1a365d;">
                        📚 Disponível na Google Books
                    </div>
                    
                    <div class="botoes-acao">
                        <button class="botao emprestar" onclick="adicionarLivro(${JSON.stringify(livro).replace(/"/g, '&quot;')})">
                            ➕ Adicionar
                        </button>
                        <button class="botao detalhes" onclick="mostrarDetalhesLivroAPI(${JSON.stringify(livro).replace(/"/g, '&quot;')})">
                            🔍 Detalhes
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
        
    } catch (erro) {
        container.innerHTML = `<div class="erro">Erro ao buscar livros: ${erro.message}</div>`;
    }
};

// Função global para adicionar livro (corrigida)
window.adicionarLivro = async function(livro) {
    try {
        const resposta = await fetch(`${CONFIG.API_URL}/livros`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                titulo: livro.titulo,
                autor: livro.autor,
                isbn: livro.isbn || '',
                capa: livro.capa || '',
                descricao: livro.descricao || 'Descrição não disponível.',
                ano: livro.ano || 'N/A',
                paginas: livro.paginas || 0,
                editora: livro.editora || 'Editora não informada',
                idioma: livro.idioma || 'pt'
            })
        });
        
        if (resposta.ok) {
            const livroAdicionado = await resposta.json();
            alert('✅ Livro adicionado com sucesso!');
            mudarParaCatalogo();
            
            // Recarrega o catálogo para mostrar o novo livro
            setTimeout(() => {
                if (typeof carregarCatalogo === 'function') {
                    carregarCatalogo();
                }
            }, 500);
            
        } else {
            const erroData = await resposta.json();
            throw new Error(erroData.erro || 'Erro ao adicionar livro');
        }
    } catch (erro) {
        mostrarErro('Erro ao adicionar livro: ' + erro.message);
    }
};

// Função auxiliar para mudar de aba (se quiser usar)
function mudarParaCatalogo() {
    const abas = document.querySelectorAll('.aba');
    const conteudos = document.querySelectorAll('.aba-conteudo');
    
    // Remove classe ativa de todas as abas
    abas.forEach(aba => aba.classList.remove('ativa'));
    conteudos.forEach(conteudo => conteudo.classList.remove('ativa'));
    
    // Adiciona classe ativa na aba catálogo
    document.querySelector('[data-aba="catalogo"]').classList.add('ativa');
    document.getElementById('catalogo').classList.add('ativa');
    
    // Carrega o catálogo
    if (typeof carregarCatalogo === 'function') {
        carregarCatalogo();
    }
}