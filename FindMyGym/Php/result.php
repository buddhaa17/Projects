<?php
include("connection.php");
include("Gym.php");
include("GymOwner.php");
include("GetGymsResponse.php");



mysql_connect($hostname, $username, $password);

mysql_select_db($dbname);

 $query = "SELECT gds.Id, gow.Firstname, gow.Lastname, gow.Email, gow.Phonenumber, gds.GymName, gds.GymAddressLine1, gds.GymAddressLine2, gimg.Url FROM gymowner gow inner join gymdetails gds on gow.Id = gds.OwnerId inner join gyymimages gimg on gimg.GymId = gds.Id and gimg.ImageType = 'Primary'";

$result = mysql_query($query);

if($result)
{

	$arr = [];
	$i=0;
	while ($row = mysql_fetch_array($result))
{
	$gym = new gym();

	$gym ->GymId = $row['Id'];
	$gym ->Name = $row['GymName'];
	$gym ->Address1 = $row['GymAddressLine1'];
	$gym ->Address2 = $row['GymAddressLine2'];
	$gym ->ImageUrl = $row['Url'];

	$owner = new Owner();

	$owner ->FirstName = $row['Firstname'];
	$owner ->LastName = $row['Lastname'];
	$owner ->MobileNumber = $row['Phonenumber'];
	$owner ->Address1 = $row['GymAddressLine1'];
	$owner ->Address2 = $row['GymAddressLine2'];
	$owner ->Email = $row['Email'];

	$response = new GetGymsResponse();

	$response ->Gym = $gym;
	$response ->Owner = $owner;

	$arr[$i++] = $response;

}
$json = json_encode($arr);

echo $json;

}

?>