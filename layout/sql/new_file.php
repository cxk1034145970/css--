<?php
header("Content-type:text/html;charset=utf-8");
$text = $_POST["text"];
$name = $_POST["name"];
file_put_contents("file/$name.php",$text);
	$json = array("code"=>'创建成功');
	echo json_encode($json);
?>