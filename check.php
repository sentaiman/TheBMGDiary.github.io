<?php

//list of the usernames and passwords

$userName = [

"bruh" => "nah"
"deez" => "nuts"

];


session_start();


if(isset($POST['user']) & !isset($_SESSION['user'])) {
  
  
  if($userName[$_POST['user']] == $_POST['passWord']) {
    
    $_SESSION['user'] = $_POST['user'];
    
    
  }
  
  
  if (!isset($_SESSIOn['user'])) { $failed = true; }
  
  }
  
  
  
if (!isset($_SESSIOn['user'])) {
  
  header("Location: 115337.html");
  
exit();
}