<?php

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

// calendar stuff
$file = "http://loyolablakefield.myschoolapp.com/podium/feed/iCal.aspx?z=YkqgS1pON1KuxEGt0ulpFjoF3%2bVyoOHhZbRECO2AZRu6I%2f2xSnw9bYYjV9qd1BfY1UB3HHdVFuV4%2f5N%2f07Ecug%3d%3d";
$fileconts = file_get_contents($file);

// weather information from API
// current conditions
$curl1 = curl_init();

curl_setopt($curl1, CURLOPT_URL, "https://api.weather.gov/zones/forecast/MDZ011/observations?limit=1");
curl_setopt($curl1, CURLOPT_HTTPHEADER, [
    'accept: application/geo+json',
    'User-Agent: (Loyola Blakefield Dev, snrugas2027@loyolablakefield.org)'
]);
curl_setopt($curl1, CURLOPT_RETURNTRANSFER, true);

$result_curl1 = curl_exec($curl1);
$json_curl1 = json_decode($result_curl1, true);

// forecast
$curl2 = curl_init();

curl_setopt($curl2, CURLOPT_URL, "https://api.weather.gov/gridpoints/LWX/108,96/forecast");
curl_setopt($curl2, CURLOPT_HTTPHEADER, [
    'accept: application/geo+json',
    'User-Agent: (Loyola Blakefield Dev, snrugas2027@loyolablakefield.org)'
]);
curl_setopt($curl2, CURLOPT_RETURNTRANSFER, true);

$result_curl2 = curl_exec($curl2);
$json_curl2 = json_decode($result_curl2, true);

$offset_night = 0;
$offset_determiner = $json_curl2["properties"]["periods"][0]["name"];

if (str_contains($offset_determiner, "ight")) {
    $offset_night = 1;
}

// cram
$weather_return = [
    "current_conditions" => [
        "temp" => $json_curl1["features"][0]["properties"]["temperature"]["value"],
        "desc" => $json_curl1["features"][0]["properties"]["textDescription"],
        "icon" => $json_curl1["features"][0]["properties"]["icon"],
        "wind_dir" => $json_curl1["features"][0]["properties"]["windDirection"]["value"],
        "wind_sp" => $json_curl1["features"][0]["properties"]["windSpeed"]["value"],
        "hum" => $json_curl1["features"][0]["properties"]["relativeHumidity"]["value"],
        "pres" => $json_curl1["features"][0]["properties"]["barometricPressure"]["value"],
    ],

    "forecast" => []
];

for ($i = $offset_night; $i <= 10; $i += 2) {
    $weather_return["forecast"][] = [
        "label" => $json_curl2["properties"]["periods"][$i]["name"],
        "temp" => $json_curl2["properties"]["periods"][$i]["temperature"],
        "icon" => $json_curl2["properties"]["periods"][$i]["icon"],
        "precip" => $json_curl2["properties"]["periods"][$i]["probabilityOfPrecipitation"]["value"],
    ];
}

// data to return
$response = [
    "content" => "products",
    "grabtime" => date("Y-m-d H:i:s"),

    "calendar" => $fileconts,
    "weather" => $weather_return
];

// Output JSON
echo json_encode($response);
?>