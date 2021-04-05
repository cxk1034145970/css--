<?php
header("Content-type:text/html;charset=utf-8");
include '../../sql/user.php';
$conn = mysqli_connect($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    $json = array("code"=>"0");
    echo json_encode($json);
	} 
$sql = "SELECT SUM(id) FROM chengfen";
mysqli_set_charset( $conn ,"utf8");
$result = $conn->query($sql);
if ($result->num_rows > 0) {
	$row = $result->fetch_assoc();
	print_r($row);
	echo $row['SUM(id)'];
} else {
    echo "无数据";
}
$conn->close();
?>