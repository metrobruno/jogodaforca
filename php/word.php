<?php
require_once 'database.php';

class Word {
    private $id;
    private $word;
    private $played_count;
    private $won_count;
    private $lost_count;

    public function __construct($id, $word, $played_count, $won_count, $lost_count) {
        $this->id = $id;
        $this->word = $word;
        $this->played_count = $played_count;
        $this->won_count = $won_count;
        $this->lost_count = $lost_count;
    }

    public static function getRandomWord() {
        $db = Database::connect();
        $query = 'SELECT * FROM words ORDER BY LOWER(RANDOM()) LIMIT 1';
        $stmt = $db->query($query);
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        Database::disconnect();

        // Passa os parâmetros para o construtor da classe Word
        return new Word(
            $row['id'],
            $row['word'],
            $row['played_count'],
            $row['won_count'],
            $row['lost_count']
        );
    }

    public function incrementPlayedCount() {
        $this->played_count++;
        $db = Database::connect();
        $query = 'UPDATE words SET played_count = played_count + 1 WHERE id = :id';
        $stmt = $db->prepare($query);
        $stmt->bindParam(':id', $this->id, PDO::PARAM_INT);
        $stmt->execute();
        Database::disconnect();
    }

    public function incrementWonCount() {
        $this->won_count++;
        $db = Database::connect();
        $query = 'UPDATE words SET won_count = won_count + 1 WHERE id = :id';
        $stmt = $db->prepare($query);
        $stmt->bindParam(':id', $this->id, PDO::PARAM_INT);
        $stmt->execute();
        Database::disconnect();
    }

    public function incrementLostCount() {
        $this->lost_count++;
        $db = Database::connect();
        $query = 'UPDATE words SET lost_count = lost_count + 1 WHERE id = :id';
        $stmt = $db->prepare($query);
        $stmt->bindParam(':id', $this->id, PDO::PARAM_INT);
        $stmt->execute();
        Database::disconnect();
    }

    public function getWord() {
        return $this->word;
    }

    public static function getAllWords() {
        $db = Database::connect();
        $stmt = $db->query('SELECT * FROM words');
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public static function removeWord($id) {
        $db = Database::connect();
        $stmt = $db->prepare('DELETE FROM words WHERE id = :id');
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        $stmt->execute();
        return $stmt->rowCount();
    }
}
?>
