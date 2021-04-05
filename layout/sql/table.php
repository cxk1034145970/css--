<?php
header("Content-type:text/html;charset=utf-8");
include 'user.php';
$con = mysql_connect($servername,$username,$password);
if (!$con)
{
	  die('不能连接此数据库: ' . mysql_error());
}else{
    mysql_select_db($dbname) or die("数据库连接失败！");
	$result = mysql_query("SHOW TABLES");
	$i = 0;
	while($row = mysql_fetch_array($result))
	{
		$arr[$i++]['name'] =  $row[0];
	}
}
mysql_close($con);
echo json_encode($arr);
?>