const wordList = document.getElementById('wordList');

// Função para carregar as palavras da API
function loadWords() {
    fetch('php/get_words.php')
        .then(response => response.json())
        .then(words => {
            renderWordList(words);
        })
        .catch(error => console.error('Erro ao buscar as palavras:', error));
}

// Função para renderizar a lista de palavras na página
function renderWordList(words) {
    wordList.innerHTML = '';

    words.forEach(word => {
        const listItem = document.createElement('li');
        listItem.textContent = `${word.word} - Jogada: ${word.played_count}, Vencida: ${word.won_count}, Perdida: ${word.lost_count}`;

        // Botão para editar a palavra
        const editButton = document.createElement('button');
        editButton.textContent = 'Editar';
        editButton.addEventListener('click', function() {
            editWord(word);
        });
        listItem.appendChild(editButton);

        // Botão para remover a palavra
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remover';
        removeButton.addEventListener('click', function() {
            if (confirm(`Tem certeza que deseja remover a palavra "${word.word}"?`)) {
                removeWord(word.id);
            }
        });
        listItem.appendChild(removeButton);

        wordList.appendChild(listItem);
    });
}

// Função para editar uma palavra
function editWord(word) {
    const newWord = prompt('Editar palavra:', word.word);
    if (newWord !== null && newWord.trim() !== '') {
        // Normaliza a palavra para minúsculas e remove acentos
        const normalizedWord = normalizeWord(newWord.trim());
        word.word = normalizedWord;
        saveWord(word);
    }
}

// Função para normalizar a palavra (converte para minúsculas e remove acentos)
function normalizeWord(word) {
    // Converte para minúsculas
    word = word.toLowerCase();
    // Remove acentos usando regex
    word = word.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    return word;
}

// Função para salvar a palavra editada
function saveWord(word) {
    fetch('php/editar_palavra.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(word)
    })
    .then(response => response.text())
    .then(result => {
        if (result.includes('sucesso')) {
            alert('Palavra editada com sucesso!');
            window.location.reload()
            loadWords(); // Recarrega a lista de palavras após edição

        } else {
            alert('Erro ao editar a palavra.');
        }
    })
    .catch(error => {
        console.error('Erro ao editar a palavra:', error);
        alert('Erro ao editar a palavra.');
    });
}

// Função para remover uma palavra
function removeWord(id) {
    fetch('php/remove_word.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: id })
    })
    .then(response => response.text())
    window.location.reload()
}

// Carrega as palavras ao carregar a página
loadWords();
