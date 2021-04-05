<?php
header("Content-type:text/html;charset=utf-8");
$servername = $_POST["servername"];
$username = $_POST["username"];
$password = $_POST["password"];
$dbname = $_POST["dbname"];
$file = "user.php";
$conn = mysqli_connect($servername, $username, $password,$dbname);
if (!$conn) {
	die(mysqli_connect_error());
}else {
	unlink($file);
	file_put_contents("user.php","<?php\r\nheader(\"Content-type:text/html;charset=utf-8\");//语言\r\n\$servername = \"$servername\";//端口\r\n\$username = \"$username\";//账号\r\n\$password = \"$password\";//密码\r\n\$dbname = \"$dbname\";//数据库名\r\n?>");
	$json = array("code"=>"创建成功");
	echo json_encode($json);
}
?>