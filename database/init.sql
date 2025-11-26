--  CRIAÇÃO DA TABELA livros
CREATE TABLE IF NOT EXISTS livros (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    autor VARCHAR(255) NOT NULL,
    isbn VARCHAR(20),
    capa TEXT,
    descricao TEXT,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- DADOS INICIAIS
INSERT INTO livros (titulo, autor, isbn, descricao) VALUES
('Dom Casmurro', 'Machado de Assis', '9788544001820', 'Romance brasileiro clássico'),
('O Cortiço', 'Aluísio Azevedo', '9788572328522', 'Romance naturalista brasileiro'),
('1984', 'George Orwell', '9788525045265', 'Distopia clássica');