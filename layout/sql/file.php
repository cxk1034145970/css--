<?php  
$dir =  dirname(__FILE__)."/file";
$file = scandir($dir);
echo json_encode($file);
?>