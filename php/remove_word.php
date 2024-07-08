<?php
require_once 'Word.php';

// Obtém o ID da palavra a ser removida do corpo da requisição POST
$data = json_decode(file_get_contents('php://input'), true);
$id = $data['id'];

// Remove a palavra e verifica se foi removida com sucesso
$rowsAffected = Word::removeWord($id);
$response = ['success' => $rowsAffected > 0];

header('Content-Type: application/json');
echo json_encode($response);
?>
