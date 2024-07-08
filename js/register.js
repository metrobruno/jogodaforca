document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('register-form');
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const wordInput = document.getElementById('word');
        let word = wordInput.value.trim();

        // Verifica se a palavra tem menos de 3 caracteres
        if (word.length < 3) {
            alert('A palavra deve ter pelo menos 3 letras.');
            return;
        }

        // Normaliza para minúsculas e remove acentos
        word = normalizeWord(word);

        fetch('php/register_word.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `word=${encodeURIComponent(word)}`
        })
        .then(response => response.text())
        .then(result => {
            if (result.includes('sucesso')) {
                alert('Palavra cadastrada com sucesso!');
                form.reset();
            } else {
                alert('Erro ao cadastrar a palavra.');
            }
        })
        .catch(error => {
            console.error('Erro ao cadastrar a palavra:', error);
            alert('Erro ao cadastrar a palavra.');
        });
    });

    function normalizeWord(word) {
        // Converte para minúsculas
        word = word.toLowerCase();
        // Remove acentos usando regex
        word = word.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        return word;
    }
});
