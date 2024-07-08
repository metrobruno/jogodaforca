<?php
require_once 'Word.php';

$words = Word::getAllWords();

header('Content-Type: application/json');
echo json_encode($words);
?>
