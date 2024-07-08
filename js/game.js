let game = null;

function startGame() {
    fetch('php/comecarjogo.php')
        .then(response => response.json())
        .then(data => {
            if (data) {
                game = {
                    word: data.word,
                    guesses: data.guesses,
                    incorrectGuesses: data.incorrectGuesses
                };
                renderGame();
            } else {
                console.error('Erro: Dados da resposta estão vazios.');
            }
        })
        .catch(error => console.error('Erro ao iniciar o jogo:', error));
}

function makeGuess(letter) {
    // Verifica se a letra não está vazia
    if (!letter.trim()) {
        console.error('Erro: Palpite vazio.');
        return;
    }

    // Verifica se a letra já foi adivinhada
    if (game.guesses.includes(letter)) {
        console.error('Erro: Letra já foi adivinhada.');
        return;
    }

    fetch('php/adivinhar.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ letter: letter })
    })
    .then(response => response.json())
    .then(data => {
        if (data) {
            game.word = data.word;
            game.guesses = data.guesses;
            game.incorrectGuesses = data.incorrectGuesses;
            renderGame();
            checkGameStatus();
        } else {
            console.error('Erro: Dados da resposta estão vazios.');
        }
    })
    .catch(error => console.error('Erro ao fazer o palpite:', error));
}

function renderGame() {
    const gameContainer = document.getElementById('game');
    gameContainer.innerHTML = '';

    // Exibe as letras adivinhadas
    const wordDisplay = document.createElement('div');
    wordDisplay.classList.add('word-display');
    game.word.split('').forEach(letter => {
        const letterSpan = document.createElement('span');
        if (game.guesses.includes(letter)) {
            letterSpan.textContent = letter;
        } else {
            letterSpan.textContent = '_';
        }
        wordDisplay.appendChild(letterSpan);
    });
    gameContainer.appendChild(wordDisplay);

    // Exibe as letras já adivinhadas
    const guessesDisplay = document.createElement('div');
    guessesDisplay.classList.add('guesses-display');
    const guessesTitle = document.createElement('h3');
    guessesTitle.textContent = 'Letras Adivinhadas:';
    guessesDisplay.appendChild(guessesTitle);
    const guessesList = document.createElement('ul');
    game.guesses.forEach(guess => {
        const guessItem = document.createElement('li');
        guessItem.textContent = guess;
        guessesList.appendChild(guessItem);
    });
    guessesDisplay.appendChild(guessesList);
    gameContainer.appendChild(guessesDisplay);

    // Exibe o desenho da forca
    const incorrectGuesses = game.incorrectGuesses;
    const hangmanDisplay = document.createElement('div');
    hangmanDisplay.classList.add('hangman-display');
    const hangmanTitle = document.createElement('h3');
    hangmanDisplay.appendChild(hangmanTitle);
    const hangmanImage = document.createElement('img');
    hangmanImage.src = `imagens/hangman_${incorrectGuesses}.png`; // Exemplo: 'images/hangman_0.png'
    hangmanImage.alt = `Forca - ${incorrectGuesses} erro(s)`;
    hangmanDisplay.appendChild(hangmanImage);
    gameContainer.appendChild(hangmanDisplay);

    // Campo para fazer um novo palpite
    const guessForm = document.createElement('form');
    guessForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const guessInput = document.getElementById('guess-input');
        const letter = guessInput.value.toLowerCase();
        
        // Verifica se o palpite não está vazio antes de fazer o envio
        if (letter.trim()) {
            makeGuess(letter);
            guessInput.value = '';
        } else {
            console.error('Erro: Palpite vazio.');
        }
    });

    const guessLabel = document.createElement('label');
    guessLabel.for = 'guess-input';
    guessLabel.textContent = 'Digite uma letra:';
    guessForm.appendChild(guessLabel);

    const guessInput = document.createElement('input');
    guessInput.type = 'text';
    guessInput.id = 'guess-input';
    guessInput.maxLength = '1';
    guessForm.appendChild(guessInput);

    const guessButton = document.createElement('button');
    guessButton.type = 'submit';
    guessButton.textContent = 'Enviar Palpite';
    guessForm.appendChild(guessButton);

    gameContainer.appendChild(guessForm);
}

function checkGameStatus() {
    if (game.word.split('').every(letter => game.guesses.includes(letter))) {
        alert('Parabéns! Você venceu!');
        window.location.reload(); // Reinicia o jogo
    } else if (game.incorrectGuesses >= 6) {
        alert(`Você perdeu! A palavra era: ${game.word}`);
        window.location.reload(); // Reinicia o jogo
    }
}

document.addEventListener('DOMContentLoaded', function() {
    startGame();
});
