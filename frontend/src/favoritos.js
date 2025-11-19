// Funções relacionadas aos favoritos
async function carregarFavoritos() {
    const container = document.getElementById('lista-favoritos');
    mostrarLoading(container);
    
    try {
        const favoritos = await fazerRequisicao(`${CONFIG.API_URL}/favoritos?usuario=${CONFIG.USUARIO}`);
        
        if (!favoritos || favoritos.length === 0) {
            container.innerHTML = '<div class="loading">Nenhum livro favoritado ainda.</div>';
            return;
        }
        
        // Busca informações completas dos livros favoritados
        const livros = await fazerRequisicao(`${CONFIG.API_URL}/livros`);
        const livrosFavoritos = livros.filter(livro => 
            favoritos.some(f => f.livroId === livro.id)
        );
        
        if (livrosFavoritos.length === 0) {
            container.innerHTML = '<div class="loading">Nenhum livro favoritado encontrado no catálogo.</div>';
            return;
        }
        
        // Usa a mesma função do catálogo para criar os cards
        container.innerHTML = livrosFavoritos.map(livro => criarCardLivroFavorito(livro)).join('');
        
    } catch (erro) {
        container.innerHTML = `<div class="erro">Erro ao carregar favoritos: ${erro.message}</div>`;
    }
}

// Card especial para favoritos (com botão de remover dos favoritos)
function criarCardLivroFavorito(livro) {
    return `
        <div class="card-livro ${!livro.disponivel ? 'indisponivel' : ''}" id="favorito-livro-${livro.id}">
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
                    <button class="botao favorito" style="background: #e53e3e;" onclick="toggleFavorito(${livro.id})">
                        💔 Remover
                    </button>
                    <button class="botao detalhes" onclick="mostrarDetalhesLivro(${livro.id})">
                        🔍 Detalhes
                    </button>
                </div>
            </div>
        </div>
    `;
}

// Função global para favoritar/desfavoritar (atualizada)
window.toggleFavorito = async function(livroId) {
    try {
        const resposta = await fetch(`${CONFIG.API_URL}/favoritos`, {
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
            const resultado = await resposta.json();
            
            // Atualiza o botão de favorito visualmente
            const botaoFavorito = document.getElementById(`favorito-${livroId}`);
            if (botaoFavorito) {
                if (resultado.acao === 'adicionado') {
                    botaoFavorito.innerHTML = '❤️ Favorito';
                    botaoFavorito.style.background = '#e74c3c';
                } else {
                    botaoFavorito.innerHTML = '🤍 Favorito';
                    botaoFavorito.style.background = '#9b59b6';
                }
            }
            
            // Remove o card dos favoritos se estiver desfavoritando
            const cardFavorito = document.getElementById(`favorito-livro-${livroId}`);
            if (cardFavorito && resultado.acao === 'removido') {
                cardFavorito.style.opacity = '0';
                cardFavorito.style.height = '0';
                cardFavorito.style.margin = '0';
                cardFavorito.style.padding = '0';
                cardFavorito.style.overflow = 'hidden';
                cardFavorito.style.transition = 'all 0.3s ease';
                
                setTimeout(() => {
                    cardFavorito.remove();
                    
                    // Se não há mais favoritos, mostra mensagem
                    const container = document.getElementById('lista-favoritos');
                    if (container.children.length === 0) {
                        container.innerHTML = '<div class="loading">Nenhum livro favoritado ainda.</div>';
                    }
                }, 300);
            }
            
        } else {
            throw new Error('Erro ao atualizar favoritos');
        }
    } catch (erro) {
        mostrarErro('Erro ao atualizar favoritos: ' + erro.message);
    }
};

// Verifica se um livro é favorito e atualiza o botão
async function verificarFavorito(livroId) {
    try {
        const resposta = await fetch(`${CONFIG.API_URL}/favoritos/verificar?livroId=${livroId}&usuario=${CONFIG.USUARIO}`);
        const data = await resposta.json();
        
        const botaoFavorito = document.getElementById(`favorito-${livroId}`);
        if (botaoFavorito && data.ehFavorito) {
            botaoFavorito.innerHTML = '❤️ Favorito';
            botaoFavorito.style.background = '#e74c3c';
        }
    } catch (erro) {
        console.error('Erro ao verificar favorito:', erro);
    }
}