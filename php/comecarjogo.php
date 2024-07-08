<?php
require_once 'database.php';
require_once 'Word.php';
require_once 'Game.php';

session_start();
$game = new Game();

$_SESSION['game'] = serialize($game);

$response = [
    'word' => $game->getWord()->getWord(),
    'guesses' => $game->getGuesses(),
    'incorrectGuesses' => $game->getIncorrectGuesses()
];

echo json_encode($response);
?>
