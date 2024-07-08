<?php
class Database {
    private static $dbName = 'databasejogo.db';
    private static $cont = null;

    public function __construct() {
        die('Init function is not allowed');
    }

    public static function connect() {
        if (null == self::$cont) {
            try {
                // Use __DIR__ diretamente dentro do método
                $dbPath = __DIR__ . '/../database/' . self::$dbName;
                self::$cont = new PDO('sqlite:' . $dbPath);
                self::$cont->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            } catch(PDOException $e) {
                die($e->getMessage());
            }
        }
        return self::$cont;
    }

    public static function disconnect() {
        self::$cont = null;
    }
}
?>
