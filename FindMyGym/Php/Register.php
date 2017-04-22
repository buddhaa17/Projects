<?php
include("connection.php");
include("RegisterResponse.php");
$json = file_get_contents('php://input');
$data = json_decode($json);

// Creating Connection
$conn = mysqli_connect($hostname, $username, $password, $dbname);
 
// Writing Inserting Query
$sql = "INSERT INTO  gymowner
(Firstname , Lastname , Email, Phonenumber, AddressLine1, AddressLine2) VALUES ('$data->fname','$data->lname','$data->email', '$data->phoneNumber', '$data->ownerAddress1', '$data->ownerAddress2')";


// Executing query on database
if (mysqli_query($conn, $sql)) {
  		
	$sql1 = "INSERT INTO gymdetails (OwnerId,GymName,GymAddressLine1,GymAddressLine2,gymDescription) VALUES (LAST_INSERT_ID(),'$data->gymName', '$data->gymAddress1','$data->gymAddress2','$data->gymDescription')";

	if (mysqli_query($conn, $sql1)) {

		$gymId = $conn->insert_id;
		foreach ($data->gymImages as $key) {
			$sql = "INSERT INTO  gyymimages (GymId , ImageType , Url) VALUES ($gymId,'$key->type','$key->url')";
			mysqli_query($conn, $sql);
	}
						
foreach ($data->Aminities as $key) {
	
	if($key->IsSelected == "true")
	{
		$sql = "INSERT INTO gymaminities( GymId, Aminity) VALUES ($gymId, '$key->Name')";
    	mysqli_query($conn, $sql);
	}
}

			$result= new RegisterResponse();	
			$result ->status = true;
			$json = json_encode($result);

			echo $json;
		

	}
	else
	{
		  echo "Error: " . $sql . "
" . mysqli_error($conn);
	}

    }else {
    echo "Error: " . $sql . "
" . mysqli_error($conn);
}

?>