<?php

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

$file = "http://loyolablakefield.myschoolapp.com/podium/feed/iCal.aspx?z=YkqgS1pON1KuxEGt0ulpFjoF3%2bVyoOHhZbRECO2AZRu6I%2f2xSnw9bYYjV9qd1BfY1UB3HHdVFuV4%2f5N%2f07Ecug%3d%3d";
$fileconts = file_get_contents($file);

// Example data to return
$response = [
    "content" => "products",
    "grabtime" => date("Y-m-d H:i:s"),

    "calendar" => $fileconts,
];

// Output JSON
echo json_encode($response);
?>