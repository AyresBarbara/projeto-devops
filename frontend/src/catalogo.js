// Funções relacionadas ao catálogo de livros
async function carregarCatalogo() {
    const container = document.getElementById('lista-livros');
    mostrarLoading(container);
    
    try {
        // Primeiro carrega livros do banco local
        const livrosLocais = await fazerRequisicao(`${CONFIG.API_URL}/livros`);
        
        // Se não há livros locais, busca livros aleatórios da API
        if (!livrosLocais || livrosLocais.length === 0) {
            await carregarLivrosAleatorios(container);
            return;
        }
        
        // SEMPRE mostra os livros locais primeiro
        container.innerHTML = livrosLocais.map(livro => criarCardLivro(livro)).join('');
        
        // Verifica favoritos para cada livro
        livrosLocais.forEach(livro => {
            verificarFavorito(livro.id);
        });
        
    } catch (erro) {
        console.error('Erro ao carregar catálogo local:', erro);
        // Se der erro no catálogo local, tenta carregar livros aleatórios
        await carregarLivrosAleatorios(container);
    }
}

// Nova função para carregar livros aleatórios da API
async function carregarLivrosAleatorios(container) {
    const termosBusca = [
        'javascript programming', 'python data science', 'react development', 
        'web design', 'machine learning', 'mobile development',
        'cloud computing', 'artificial intelligence', 'cybersecurity',
        'blockchain technology', 'user experience', 'software engineering'
    ];
    
    // Termo aleatório diferente a cada vez
    const termoAleatorio = termosBusca[Math.floor(Math.random() * termosBusca.length)];
    
    try {
        const livrosAPI = await fazerRequisicao(`${CONFIG.API_URL}/busca?q=${encodeURIComponent(termoAleatorio)}`);
        
        if (!livrosAPI || livrosAPI.length === 0) {
            container.innerHTML = '<div class="loading">Nenhum livro encontrado. Use a aba "Buscar Livros" para adicionar livros!</div>';
            return;
        }
        
        // Embaralha os livros para serem diferentes
        const livrosEmbaralhados = [...livrosAPI].sort(() => Math.random() - 0.5);
        const livrosParaMostrar = livrosEmbaralhados.slice(0, 8); // Mostra 8 livros diferentes
        
        container.innerHTML = `
            <div style="grid-column: 1 / -1; margin-bottom: 20px; text-align: center;">
                <div class="loading">
                    <h3>📚 Livros Sugeridos</h3>
                    <p>Tema: <strong>${termoAleatorio}</strong></p>
                    <small>Adicione livros para construir seu catálogo pessoal</small>
                </div>
            </div>
            ${livrosParaMostrar.map(livro => criarCardLivroAPI(livro)).join('')}
        `;
        
    } catch (erro) {
        console.log('Erro ao carregar livros aleatórios:', erro);
        container.innerHTML = '<div class="loading">Nenhum livro no catálogo. Use a aba "Buscar Livros" para adicionar livros!</div>';
    }
}

// Card especial para livros da API (ainda não adicionados)
function criarCardLivroAPI(livro) {
    return `
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
                    📚 Disponível na API
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
    `;
}

function criarCardLivro(livro) {
    return `
        <div class="card-livro ${!livro.disponivel ? 'indisponivel' : ''}" id="livro-${livro.id}">
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
                
                <div class="status ${livro.disponivel ? 'disponivel' : 'emprestado'}">
                    ${livro.disponivel ? '✅ Disponível' : '⏳ Emprestado'}
                </div>
                
                <div class="botoes-acao">
                    ${livro.disponivel ? 
                        `<button class="botao emprestar" onclick="emprestarLivro(${livro.id})">Emprestar</button>` :
                        `<button class="botao devolver" onclick="devolverLivro(${livro.id})">Devolver</button>`
                    }
                    <button class="botao favorito" id="favorito-${livro.id}" onclick="toggleFavorito(${livro.id})">
                        🤍 Favorito
                    </button>
                    <button class="botao detalhes" onclick="mostrarDetalhesLivro(${livro.id})">
                        🔍 Detalhes
                    </button>
                    <button class="botao" style="background: #e53e3e;" onclick="removerLivro(${livro.id})">
                        🗑️ Remover
                    </button>
                </div>
            </div>
        </div>
    `;
}

// Funções globais para interação com livros
window.emprestarLivro = async function(livroId) {
    try {
        const resposta = await fetch(`${CONFIG.API_URL}/emprestimos`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                livroId: livroId,
                usuario: CONFIG.USUARIO
            })
        });
        
        if (resposta.ok) {
            alert('✅ Livro emprestado com sucesso!');
            carregarCatalogo(); // Atualiza a interface
        } else {
            const erro = await resposta.json();
            throw new Error(erro.erro || 'Erro ao emprestar livro');
        }
    } catch (erro) {
        mostrarErro('Erro ao emprestar livro: ' + erro.message);
    }
};

window.devolverLivro = async function(livroId) {
    try {
        // Primeiro busca o empréstimo ativo
        const emprestimos = await fazerRequisicao(`${CONFIG.API_URL}/emprestimos?usuario=${CONFIG.USUARIO}`);
        const emprestimo = emprestimos.find(emp => emp.livroId === livroId && !emp.dataDevolucao);
        
        if (!emprestimo) {
            throw new Error('Empréstimo não encontrado');
        }
        
        const resposta = await fetch(`${CONFIG.API_URL}/emprestimos/${emprestimo.id}/devolver`, {
            method: 'PUT'
        });
        
        if (resposta.ok) {
            alert('✅ Livro devolvido com sucesso!');
            carregarCatalogo(); // Atualiza a interface
        } else {
            throw new Error('Erro ao devolver livro');
        }
    } catch (erro) {
        mostrarErro('Erro ao devolver livro: ' + erro.message);
    }
};
// Função para mostrar detalhes completos do livro
window.mostrarDetalhesLivro = async function(livroId) {
    try {
        const livros = await fazerRequisicao(`${CONFIG.API_URL}/livros`);
        const livro = livros.find(l => l.id === livroId);
        
        if (!livro) {
            mostrarErro('Livro não encontrado');
            return;
        }
        
        // Criar modal de detalhes
        const modalHTML = `
            <div class="modal" id="modal-detalhes" style="display: flex;">
                <div class="modal-conteudo">
                    <div class="modal-cabecalho">
                        <h3>Detalhes do Livro</h3>
                        <button class="fechar-modal" onclick="fecharModal()">&times;</button>
                    </div>
                    <div class="modal-corpo">
                        <div style="display: flex; gap: 20px; margin-bottom: 20px;">
                            ${livro.capa ? 
                                `<img src="${livro.capa}" alt="${livro.titulo}" style="width: 150px; height: 200px; object-fit: cover; border-radius: 8px;">` : 
                                '<div style="width:150px;height:200px;background:#f7fafc;display:flex;align-items:center;justify-content:center;border-radius:8px;font-size:3em;">📖</div>'
                            }
                            <div style="flex: 1;">
                                <h2 style="margin-bottom: 10px; color: #2d3748;">${livro.titulo}</h2>
                                <p style="color: #718096; margin-bottom: 15px; font-size: 1.1em;"><strong>Autor:</strong> ${livro.autor}</p>
                                <div style="display: flex; gap: 15px; margin-bottom: 15px; flex-wrap: wrap;">
                                    ${livro.ano ? `<span style="background: #e2e8f0; padding: 4px 8px; border-radius: 4px; font-size: 0.9em;">📅 ${livro.ano}</span>` : ''}
                                    ${livro.paginas ? `<span style="background: #e2e8f0; padding: 4px 8px; border-radius: 4px; font-size: 0.9em;">📖 ${livro.paginas} páginas</span>` : ''}
                                    ${livro.editora ? `<span style="background: #e2e8f0; padding: 4px 8px; border-radius: 4px; font-size: 0.9em;">🏢 ${livro.editora}</span>` : ''}
                                    ${livro.idioma ? `<span style="background: #e2e8f0; padding: 4px 8px; border-radius: 4px; font-size: 0.9em;">🌐 ${livro.idioma.toUpperCase()}</span>` : ''}
                                </div>
                                <div class="status ${livro.disponivel ? 'disponivel' : 'emprestado'}" style="display: inline-block;">
                                    ${livro.disponivel ? '✅ Disponível' : '⏳ Emprestado'}
                                </div>
                            </div>
                        </div>
                        
                        ${livro.descricao ? `
                            <div style="margin-bottom: 20px;">
                                <h4 style="margin-bottom: 10px; color: #2d3748;">Sinopse</h4>
                                <p style="line-height: 1.6; color: #4a5568;">${livro.descricao}</p>
                            </div>
                        ` : ''}
                        
                        ${livro.isbn ? `
                            <div style="margin-bottom: 20px;">
                                <h4 style="margin-bottom: 10px; color: #2d3748;">Informações Técnicas</h4>
                                <p style="color: #718096;"><strong>ISBN:</strong> ${livro.isbn}</p>
                            </div>
                        ` : ''}
                        
                        <div class="botoes-acao" style="margin-top: 25px;">
                            ${livro.disponivel ? 
                                `<button class="botao emprestar" onclick="emprestarLivro(${livro.id}); fecharModal();">📚 Emprestar Livro</button>` :
                                `<button class="botao devolver" onclick="devolverLivro(${livro.id}); fecharModal();">↩️ Devolver Livro</button>`
                            }
                            <button class="botao favorito" onclick="toggleFavorito(${livro.id}); fecharModal();">
                                ${await ehFavorito(livro.id) ? '💔 Remover dos Favoritos' : '🤍 Adicionar aos Favoritos'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Adicionar modal ao body
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        
    } catch (erro) {
        mostrarErro('Erro ao carregar detalhes do livro: ' + erro.message);
    }
};

// Função auxiliar para verificar se é favorito
async function ehFavorito(livroId) {
    try {
        const resposta = await fetch(`${CONFIG.API_URL}/favoritos/verificar?livroId=${livroId}&usuario=${CONFIG.USUARIO}`);
        const data = await resposta.json();
        return data.ehFavorito;
    } catch (erro) {
        return false;
    }
}

// Função para fechar modal
window.fecharModal = function() {
    const modal = document.getElementById('modal-detalhes');
    if (modal) {
        modal.remove();
    }
};

// Fechar modal clicando fora
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal')) {
        fecharModal();
    }
});

// Função para remover livro do catálogo (AGORA COM API REAL)
window.removerLivro = async function(livroId) {
    if (!confirm('Tem certeza que deseja remover este livro do catálogo?')) {
        return;
    }
    
    try {
        // Remove visualmente o card imediatamente
        const cardLivro = document.getElementById(`livro-${livroId}`);
        if (cardLivro) {
            cardLivro.style.opacity = '0';
            cardLivro.style.height = '0';
            cardLivro.style.margin = '0';
            cardLivro.style.padding = '0';
            cardLivro.style.overflow = 'hidden';
            cardLivro.style.transition = 'all 0.3s ease';
        }
        
        // FAZ A REQUISIÇÃO DELETE PARA A API
        const resposta = await fetch(`${CONFIG.API_URL}/livros/${livroId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        console.log('Resposta da API:', resposta.status); // Debug
        
        if (!resposta.ok) {
            const erroData = await resposta.json();
            throw new Error(erroData.erro || `Erro HTTP: ${resposta.status}`);
        }
        
        const resultado = await resposta.json();
        console.log('Livro removido:', resultado); // Debug
        
        // Remove completamente após a animação
        setTimeout(() => {
            if (cardLivro) {
                cardLivro.remove();
            }
            
            // Se não há mais livros, mostra livros aleatórios
            const container = document.getElementById('lista-livros');
            if (container && container.children.length === 0) {
                carregarLivrosAleatorios(container);
            }
        }, 300);
        
    } catch (erro) {
        console.error('Erro completo:', erro);
        mostrarErro('Erro ao remover livro: ' + erro.message);
        
        // Se deu erro, restaura o card
        const cardLivro = document.getElementById(`livro-${livroId}`);
        if (cardLivro) {
            cardLivro.style.opacity = '1';
            cardLivro.style.height = 'auto';
            cardLivro.style.margin = '';
            cardLivro.style.padding = '';
        }
    }
};

// Modal para livros da API (ainda não adicionados)
window.mostrarDetalhesLivroAPI = function(livro) {
    const modalHTML = `
        <div class="modal" id="modal-detalhes" style="display: flex;">
            <div class="modal-conteudo">
                <div class="modal-cabecalho">
                    <h3>Detalhes do Livro</h3>
                    <button class="fechar-modal" onclick="fecharModal()">&times;</button>
                </div>
                <div class="modal-corpo">
                    <div style="display: flex; gap: 20px; margin-bottom: 20px;">
                        ${livro.capa ? 
                            `<img src="${livro.capa}" alt="${livro.titulo}" style="width: 150px; height: 200px; object-fit: cover; border-radius: 8px;">` : 
                            '<div style="width:150px;height:200px;background:#f7fafc;display:flex;align-items:center;justify-content:center;border-radius:8px;font-size:3em;">📖</div>'
                        }
                        <div style="flex: 1;">
                            <h2 style="margin-bottom: 10px; color: #2d3748;">${livro.titulo}</h2>
                            <p style="color: #718096; margin-bottom: 15px; font-size: 1.1em;"><strong>Autor:</strong> ${livro.autor}</p>
                            <div style="display: flex; gap: 15px; margin-bottom: 15px; flex-wrap: wrap;">
                                ${livro.ano ? `<span style="background: #e2e8f0; padding: 4px 8px; border-radius: 4px; font-size: 0.9em;">📅 ${livro.ano}</span>` : ''}
                                ${livro.paginas ? `<span style="background: #e2e8f0; padding: 4px 8px; border-radius: 4px; font-size: 0.9em;">📖 ${livro.paginas} páginas</span>` : ''}
                                ${livro.editora ? `<span style="background: #e2e8f0; padding: 4px 8px; border-radius: 4px; font-size: 0.9em;">🏢 ${livro.editora}</span>` : ''}
                                ${livro.idioma ? `<span style="background: #e2e8f0; padding: 4px 8px; border-radius: 4px; font-size: 0.9em;">🌐 ${livro.idioma.toUpperCase()}</span>` : ''}
                            </div>
                            <div style="background: #bee3f8; color: #1a365d; padding: 6px 12px; border-radius: 4px; display: inline-block; font-weight: 500;">
                                📚 Disponível na Google Books API
                            </div>
                        </div>
                    </div>
                    
                    ${livro.descricao ? `
                        <div style="margin-bottom: 20px;">
                            <h4 style="margin-bottom: 10px; color: #2d3748;">Sinopse</h4>
                            <p style="line-height: 1.6; color: #4a5568;">${livro.descricao}</p>
                        </div>
                    ` : ''}
                    
                    ${livro.isbn ? `
                        <div style="margin-bottom: 20px;">
                            <h4 style="margin-bottom: 10px; color: #2d3748;">Informações Técnicas</h4>
                            <p style="color: #718096;"><strong>ISBN:</strong> ${livro.isbn}</p>
                        </div>
                    ` : ''}
                    
                    <div class="botoes-acao" style="margin-top: 25px;">
                        <button class="botao emprestar" onclick="adicionarLivro(${JSON.stringify(livro).replace(/"/g, '&quot;')}); fecharModal();">
                            ➕ Adicionar ao Catálogo
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
};