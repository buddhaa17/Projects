<?php
$file_name = $_FILES['file']['name'];

     $file_ext=strtolower(end(explode('.',$_FILES['file']['name'])));
     $file_tmp =$_FILES['file']['tmp_name'];
     $file_size =$_FILES['file']['size'];

      $expensions= array("jpeg","jpg","png");
      
      if(in_array($file_ext,$expensions)=== false){
         $errors[]="extension not allowed, please choose a JPEG or PNG file.";
      }
      
      if($file_size > 2097152){
         $errors[]='File size must be excately 2 MB';
      }
		
      if(empty($errors)==true){
         move_uploaded_file($file_tmp,"../images/".$file_name);
         echo "Success";
      }else{
         print_r($errors);
      }

?>