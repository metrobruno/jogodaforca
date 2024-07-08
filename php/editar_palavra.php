<?php
require_once 'database.php';

// Verifica se foi recebido um corpo JSON
$input = file_get_contents('php://input');
$data = json_decode($input, true);

if (!empty($data['id']) && !empty($data['word'])) {
    $id = $data['id'];
    $word = $data['word'];

    $db = Database::connect();
    $stmt = $db->prepare('UPDATE words SET word = :word WHERE id = :id');
    $stmt->bindParam(':word', $word, PDO::PARAM_STR);
    $stmt->bindParam(':id', $id, PDO::PARAM_INT);
    $stmt->execute();

    if ($stmt->rowCount() > 0) {
        echo 'sucesso';
    } else {
        echo 'erro';
    }
} else {
    echo 'erro';
}
?>
