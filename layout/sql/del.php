<?php
$file = $_POST["name"];
unlink("file/$file");
$json = array("code"=>"文件已删除");
	echo json_encode($json);
?>