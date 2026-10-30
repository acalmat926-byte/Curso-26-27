<?php
$conn = new mysqli(getenv('DB_HOST'), getenv('DB_USER'),
getenv('DB_PASS'), getenv('DB_NAME'));
if ($conn->connect_error) {
 die("Error de conexión: " . $conn->connect_error);
}
echo "<h2>Conexión a la base de datos exitosa.</h2>";
?>
