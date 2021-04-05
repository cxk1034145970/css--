<?php
header("Content-type:text/html;charset=utf-8");
include '../../sql/user.php';
$conn = mysqli_connect($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    $json = array("code"=>"0");
    echo json_encode($json);
	} 
$sql = "SELECT * FROM  `xiaowangxian`";
mysqli_set_charset( $conn ,"utf8");
$result = $conn->query($sql);
if ($result->num_rows > 0) {
	$json=array();
    $data=array();
    while($row = $result->fetch_assoc()) {
		$data[ ] = array('id' => $row["id"],'name' => $row["name"],'password' => $row["password"],'js' => $row["js"],'css' => $row["css"],'vip' => $row["vip"],'time' => $row["time"],'state' => $row["state"],'v' => $row["v"],'link' => $row["link"],'erp' => $row["erp"]);
    }
	 $json = array("code"=>0,"msg"=>"","count"=>1000,"data"=>$data);
	 echo json_encode($json);
} else {
    echo "无数据";
}
$conn->close();
?>