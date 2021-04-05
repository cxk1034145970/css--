<?php
header("Content-type:text/html;charset=utf-8");
include 'user.php';
$name =  $_POST["name"];
$sql = "drop table $name";
$con=mysqli_connect($servername,$username,$password,$dbname);
if (mysqli_connect_errno())
   {
	$json = array("code"=>"0");
	echo json_encode($json);
	}
mysqli_query($con,'SET NAMES UTF8');
mysqli_query($con,$sql);
 $json = array("code"=>"已删除");
 echo json_encode($json);
mysqli_close($con);
?>