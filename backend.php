<?php
$timezone = date_default_timezone_get();
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

//Connecting to Redis server on localhost
$redis = new Redis();
$redis->connect('127.0.0.1', 6379);
$city = htmlspecialchars($_GET["q"]);
$date = date('m/d/Y h ', time());
$cityWithDate = $city." ".$date;
$get_data = null;
if($redis->get($cityWithDate)!= null) {
    $get_data = $redis->get($cityWithDate);
}
else {
    $get_data = callAPI('GET', 'https://api.openweathermap.org/data/2.5/weather?q='.$city.'&units=imperial&appid=d815cf48153ad79ce73196e79191001c', false);
    $redis->set($cityWithDate,$get_data);
}
//Calling the API: Can call any city or USA states. Must have first letter capital
//$get_data = callAPI('GET', 'https://api.openweathermap.org/data/2.5/weather?q='.$city.'&units=imperial&appid=d815cf48153ad79ce73196e79191001c', false);
echo $get_data;
function callAPI($method, $url, $data){
    $curl = curl_init();
    switch ($method){
        case "POST":
            curl_setopt($curl, CURLOPT_POST, 1);
            if ($data)
                curl_setopt($curl, CURLOPT_POSTFIELDS, $data);
            break;
        case "PUT":
            curl_setopt($curl, CURLOPT_CUSTOMREQUEST, "PUT");
            if ($data)
                curl_setopt($curl, CURLOPT_POSTFIELDS, $data);
            break;
        default:
            if ($data)
                $url = sprintf("%s?%s", $url, http_build_query($data));
    }
    // OPTIONS:
    curl_setopt($curl, CURLOPT_URL, $url);
    curl_setopt($curl, CURLOPT_HTTPHEADER, array(
    ));
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($curl, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
    // EXECUTE:
    $result = curl_exec($curl);
    if(!$result){die("Connection Failure");}
    curl_close($curl);
    return $result;
}
?>


