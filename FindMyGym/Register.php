<?php

$json = file_get_contents('php://input');
$data = json_decode($json);


$hostname= 'localhost';
$username= 'root';
$password= '';
$dbname= 'gymdb'; 

// Creating Connection
$conn = mysqli_connect($hostname, $username, $password, $dbname);
 
// Writing Inserting Query
$sql = "INSERT INTO  gymowner
(Id,Firstname,Lastname,Email) VALUES (3,'$data->fname','$data->lname','$data->gymImageUrl1')";

// Executing query on database3
if (mysqli_query($conn, $sql)) {
    echo "Data Submitted successfully";
}else {
    echo "Error: " . $sql . "
" . mysqli_error($conn);
}

?>