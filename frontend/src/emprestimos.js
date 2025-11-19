// Funções relacionadas aos empréstimos
async function carregarEmprestimos() {
    const container = document.getElementById('lista-emprestimos');
     container.className = 'grid-livros';
    mostrarLoading(container);
    
    try {
        const emprestimos = await fazerRequisicao(`${CONFIG.API_URL}/emprestimos?usuario=${CONFIG.USUARIO}`);
        
        if (!emprestimos || emprestimos.length === 0) {
            container.innerHTML = '<div class="loading">Nenhum empréstimo ativo.</div>';
            return;
        }
        
        // Busca informações dos livros
        const livros = await fazerRequisicao(`${CONFIG.API_URL}/livros`);
        
        container.innerHTML = emprestimos
            .filter(emprestimo => !emprestimo.dataDevolucao)
            .map(emprestimo => {
                const livro = livros.find(l => l.id === emprestimo.livroId);
                return criarCardEmprestimo(emprestimo, livro);
            })
            .join('');
            
    } catch (erro) {
        container.innerHTML = `<div class="erro">Erro ao carregar empréstimos: ${erro.message}</div>`;
    }
}

function criarCardEmprestimo(emprestimo, livro) {
    if (!livro) {
        return `
            <div class="card-livro">
                <div class="conteudo-card">
                    <h3>Livro ID: ${emprestimo.livroId}</h3>
                    <p><strong>Data do empréstimo:</strong> ${emprestimo.dataEmprestimo}</p>
                    <div class="status emprestado">⏳ Emprestado</div>
                    <div class="botoes-acao">
                        <button class="botao devolver" onclick="devolverLivro(${emprestimo.livroId})">
                            📚 Devolver
                        </button>
                    </div>
                </div>
            </div>
        `;
    }
    
    return `
        <div class="card-livro">
            <div class="capa-container">
                ${livro.capa ? `<img src="${livro.capa}" alt="${livro.titulo}" onerror="this.style.display='none'">` : 
                  '<div style="height:200px;background:#f7fafc;display:flex;align-items:center;justify-content:center;color:#718096;font-size:2em;">📖</div>'}
            </div>
            
            <div class="conteudo-card">
                <h3>${livro.titulo}</h3>
                <p class="autor"><strong>Autor:</strong> ${livro.autor}</p>
                
                ${livro.descricao ? `<p class="sinopse">${livro.descricao.substring(0, 100)}...</p>` : ''}
                
                <div class="info-extra">
                    <span class="info-item">📅 ${emprestimo.dataEmprestimo}</span>
                    ${livro.ano ? `<span class="info-item">📖 ${livro.ano}</span>` : ''}
                </div>
                
                <div class="status emprestado">
                    ⏳ Emprestado
                </div>
                
                <div class="botoes-acao">
                    <button class="botao devolver" onclick="devolverLivro(${livro.id})">
                        📚 Devolver
                    </button>
                    <button class="botao favorito" onclick="toggleFavorito(${livro.id})">
                        🤍 Favorito
                    </button>
                    <button class="botao detalhes" onclick="mostrarDetalhesLivro(${livro.id})">
                        🔍 Detalhes
                    </button>
                </div>
            </div>
        </div>
    `;
}