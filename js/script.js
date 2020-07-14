const marsWeatherURL = `https://api.nasa.gov/insight_weather/?api_key=${config.MARS_WEATHER_API_KEY}&feedtype=json&ver=1.0`;
const spaceXURL = "";
// const launchAPI = "https://launchlibrary.net/1.3/launch/next/5"
const launchAPI = `https://sfhu2ayqth.execute-api.us-east-1.amazonaws.com/test/getapilambda`

let theseLaunches, forecastDebug, marsWeather;


let $roverTweet = roverTweets.$insight
$roverTweet.appendTo($("#twitterfeed"));




function renderLaunches (launchList) {
    theseLaunches = launchList
    launchList.launches.forEach((launch) => renderLaunchCard(launch)); 
}


//We want to render some cards to show the upcoming launches. 
//TODO: create a rocket graphic for each card.
function renderLaunchCard (launch) {
    forecastDebug = launch
//we can use bootstrap to handle creating the cards for us with this basic template:
let $myCard = $(`<div class="card" style="width: 18rem;">
    <img src="images/Rocket-ship-Clip-Art.svg" class="card-img-top" alt="...">
    <div class="card-body">
      <ul class="list-group list-group-flush list-launch">
          <li class="list-group-item">Day & Time: ${launch.windowstart}</li>
          <li class="list-group-item">Mission:${launch.name}</li>
          <li class="list-group-item">Launch Location: ${launch.location.pads[0].name}</li>
          <li class="list-group-item">Rocket: ${launch.rocket.name}</li>
    </ul>
    </div>
  </div>`)

let $myCol =$(".launchList");
$myCard.appendTo($myCol);
}

function renderMarsWeather (marsWeather) {
    let ourSol = marsWeather.sol_keys
    $("#temperature").html(marsWeather[ourSol].AT.av);
    $("#windspeed").html(marsWeather[ourSol].HWS.av);
    $("#season").html(marsWeather[ourSol].Season);
    console.log(marsWeather[ourSol].Season)
}


//Make our DATA calls down here
//Upcoming lauches
$.ajax({
    url: `${launchAPI}`
}).then (
    (data) => {
 
        myLaunches = data
        renderLaunches(myLaunches)
        console.log(`My data is ${data}`)

    },
    (error) => {
        console.log("ERROR is: ", error)
    }
    
)
//NASA's Mars Insight weather station
$.ajax({
    url: `${marsWeatherURL}`
}).then (
    (data) => {
 
        marsWeather = data
        renderMarsWeather(marsWeather)
        console.log(`My mars key is ${data.sol_keys}`)

    },
    (error) => {
        console.log("ERROR is: ", error)
    }
    
)