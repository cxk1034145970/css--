<?php
header("Content-type:text/html;charset=utf-8");
$time = $_SERVER['REQUEST_TIME'];
$name = $_FILES["file"]["name"];
$type = $_FILES["file"]["type"];
$size = ($_FILES["file"]["size"] / 1024);
$jpg = pathinfo($name,PATHINFO_EXTENSION);
$url = $_SERVER['SERVER_NAME'] . "/layout/sql/upload/";
$data = array(
    "name" => $url . $time . ".". $jpg,
    "type" => $type,
    "size" => $size
);
$json = array(
    "code" => "1",
    "data" => $data
);
if (file_exists("upload/" . $time . ".". $jpg)) {
    echo json_encode($json);
} else {
    move_uploaded_file($_FILES["file"]["tmp_name"], "upload/" . $time . ".". $jpg);
    echo json_encode($json);
}
?>