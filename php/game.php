<?php
require_once 'database.php';
require_once 'Word.php';

class Game {
    private $word;
    private $guesses;
    private $incorrectGuesses;

    public function __construct() {
        $this->word = Word::getRandomWord();
        $this->guesses = [];
        $this->incorrectGuesses = 0;
    }

    public function getWord() {
        return $this->word;
    }

    public function guess($letter) {
        if (strpos($this->word->getWord(), $letter) !== false) {
            $this->guesses[] = $letter;
        } else {
            $this->incorrectGuesses++;
        }
    }

    public function getGuesses() {
        return $this->guesses;
    }

    public function getIncorrectGuesses() {
        return $this->incorrectGuesses;
    }

    public function isComplete() {
        foreach (str_split($this->word->getWord()) as $letter) {
            if (!in_array($letter, $this->guesses)) {
                return false;
            }
        }
        return true;
    }

    public function isGameOver() {
        return $this->incorrectGuesses >= 6;
    }

    public function finishGame() {
        if ($this->isComplete() || $this->isGameOver()) {
            $this->word->incrementPlayedCount(); // Incrementa played_count apenas quando o jogo é completo
        }

        if ($this->isComplete()) {
            $this->word->incrementWonCount();
        } else {
            $this->word->incrementLostCount();
        }
    }
}
?>
