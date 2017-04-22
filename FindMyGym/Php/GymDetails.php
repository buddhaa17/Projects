<?php
include("connection.php");
include("Gym.php");
include ("Image.php");
$json = file_get_contents('php://input');
$data = json_decode($json);

mysql_connect($hostname, $username, $password);
mysql_select_db($dbname);

$query = "SELECT GymName, GymAddressLine1, GymAddressLine2, GymDescription FROM gymdetails WHERE Id = '$data->gymId' ";

$result = mysql_query($query);
$gym = new gym();
if($result)
{
		while ($row = mysql_fetch_array($result))
		{
			$gym ->Name = $row['GymName'];
			$gym ->Address1 = $row['GymAddressLine1'];
			$gym ->Address2 = $row['GymAddressLine2'];
			$gym ->GymDescription = $row['GymDescription'];
		}
}

$query = "SELECT ImageType, Url, GymId FROM gyymimages where gymid = '$data->gymId'";
$result = mysql_query($query);



if($result)
{
	$i = 0;
	while ($row = mysql_fetch_array($result))
	{
		$image = new Image();
		$image ->Type = $row['ImageType'];
		$image ->Url = $row['Url'];
		$gym ->GymImages[$i++] = $image;
	}
}

$query = "SELECT  Aminity from gymaminities where gymid = '$data->gymId'";
$result = mysql_query($query);


if($result)
{
	$i = 0;
	while ($row = mysql_fetch_array($result))
	{
		$gym ->Aminities[$i++] = $row['Aminity'];
	}

}

$json =  json_encode($gym);
echo $json;

?>