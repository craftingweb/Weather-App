//creating object for storing functions and variables that will be necessary for using API
//First we need API key to access weather. API key need it to see who is using API.
//JSON - java script object notation plagin that makes API look much more readable and understanable than without it.
let weather = {
    "apiKey": "d815cf48153ad79ce73196e79191001c",
    //creating function that take parameter city
   fetchWeather: function(city){
       fetch("https://api.openweathermap.org/data/2.5/weather?q=" 
       + city 
       + "&units=imperial&appid=" 
       + this.apiKey
       )
       .then((response)=>response.json())
       .then((data)=>this.displayWeather(data));
       //once fetch this url then do response, response json and then take data and display data in console console.log(data));
   },
   //end of first function
   //start of second function
   displayWeather: function (data) {
       //In order to display wether we have to find all elements on the page and replace their content. 
    //So looking in data (json). So to get city name just const {name} this will geting out of the data and extract name from the object
    const {name} = data;
    // and inside of wether we have some information like description we want and the icon
    const {icon, description} = data.weather[0];
    //so now it gets data.weather object and extract icon and description and we will be using them as variables and then. Please note: because it is array we have to add[0] it will point to first element in array (identifier) and it will extract from it icon and decription. All other in Json are objects.
    const {temp, humidity} = data.main;
    //and same extraction for wind
    const {speed} = data.wind;
    //so speed will be taken out of that object and made into a variable.
    //we can log them into console
    //console.log(name, icon, description, temp, humidity, speed);
    //now need to display this information on the page.
    document.querySelector(".city").innerText = "Weather in " + name;
    //have to put point (.) in front of city 
    //document.querySelector(".icon").src = icon;
    document.querySelector(".temp").innerText = temp + " °F";
    document.querySelector(".description").innerText = description;
    document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
    document.querySelector(".wind").innerText = "Wind speed: " + speed + "mph";
    document.body.style.backgroundImage = "url('https://source.unsplash.com/random/1600x900/?" + name + "')"
    },
        search: function (){
          this.fetchWeather(document.querySelector(".search-bar").value);
        }
};


//first function
//api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key} where is {city name} first parameter and {API key} second parameter. q= inputs
//Once API key was activated you can see all information need it. To change temperature units we have to look at API: units=metric  https://api.openweathermap.org/data/2.5/weather?q=NewYorkCity&units=metric&appid=d815cf48153ad79ce73196e79191001c
//Now we can allow to work in any city: q=Brooklyn change to q=" + city + " (city is parameter) and "units=imperial&appid=" (it taken from url above and delete api key and subscituted with variable apiKey) + apiKey; "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + this.apiKey; To make them more readable start them in new line. appid = this.apiKey;
//We can write new function that will display the weather on a page displayWeather: that will be the function that take data and display weather
//here end of first function description

//Exta
//To change JSON lower case data to capital letter - select that class then text-transofm: Capitalize



//Working with Search
document.querySelector(".search button").addEventListener('click', function(){
    weather.search();
});

//Enter key
document.querySelector(".search-bar").addEventListener("keyup", function(event){
    if (event.key == "Enter"){
        weather.search();
    }
});

