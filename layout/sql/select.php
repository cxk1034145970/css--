<?php
header("Content-type:text/html;charset=utf-8");
include 'user.php';
$table_name = $_POST["name"];
$con = mysql_connect($servername,$username,$password);
if (!$con)
{
	$json = array("code"=>mysql_error());
	echo json_encode($json);
}else{
    mysql_select_db($dbname) or die("error");
$result =  mysql_query("SHOW FULL COLUMNS FROM ".$table_name."") ;
$i = 0;
while($row = mysql_fetch_array($result))
{
   $arr[$i++]['name'] =  $row[0];
}
}
mysql_close($con);
echo json_encode($arr);
?>