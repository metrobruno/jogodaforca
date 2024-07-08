<?php
require_once 'Game.php';

session_start();

if (!isset($_SESSION['game'])) {
    // Caso não haja um jogo na sessão, devemos iniciar um novo jogo em comecarjogo.php
    echo json_encode(['error' => 'Nenhum jogo ativo. Por favor, inicie um novo jogo.']);
    exit;
}

$game = unserialize($_SESSION['game']);

$input = json_decode(file_get_contents('php://input'), true);

if (!isset($input['letter']) || !preg_match('/^[a-zA-Z]$/', $input['letter'])) {
    echo json_encode(['error' => 'Palpite inválido. Insira uma única letra.']);
    exit;
}

$letter = strtolower($input['letter']); // Converter para minúscula

// Converter a palavra do banco de dados para minúsculas antes de comparar
$wordFromDatabase = strtolower($game->getWord()->getWord());

$game->guess($letter);

if ($game->isComplete() || $game->isGameOver()) {
    $game->finishGame();
}

$_SESSION['game'] = serialize($game);

$response = [
    'word' => $game->getWord()->getWord(),
    'guesses' => $game->getGuesses(),
    'incorrectGuesses' => $game->getIncorrectGuesses()
];

echo json_encode($response);
?>
