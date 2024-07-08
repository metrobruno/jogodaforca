<?php
require_once 'database.php';
require_once 'Word.php';

// Verifica se o método de requisição é POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Obtém a palavra do corpo da requisição
    $word = $_POST['word'];

    // Valida se a palavra não está vazia
    if (empty($word)) {
        http_response_code(400);
        echo "Erro: A palavra não pode estar vazia.";
        exit;
    }

    try {
        // Cria uma nova instância da classe Word
        $newWord = new Word(null, $word, 0, 0, 0); // Os outros parâmetros são inicializados com 0
        $db = Database::connect();
        
        // Prepara a query SQL para inserir a nova palavra na tabela 'words'
        $query = 'INSERT INTO words (word) VALUES (:word)';
        $stmt = $db->prepare($query);
        
        // Bind do parâmetro ':word' com o valor da palavra
        $stmt->bindParam(':word', $word, PDO::PARAM_STR);
        
        // Executa a query SQL
        $stmt->execute();
        
        // Desconecta do banco de dados
        Database::disconnect();

        // Retorna uma mensagem de sucesso
        echo "Palavra cadastrada com sucesso!";
    } catch (PDOException $e) {
        // Em caso de erro, retorna uma mensagem de erro
        http_response_code(500);
        echo "Erro ao cadastrar a palavra: " . $e->getMessage();
    }
} else {
    // Se não for uma requisição POST, retorna um erro de método não permitido
    http_response_code(405);
    echo "Método não permitido.";
}
?>
