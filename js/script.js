const marsWeatherURL = `https://api.nasa.gov/insight_weather/?api_key=${config.MARS_WEATHER_API_KEY}&feedtype=json&ver=1.0`;
const spaceXURL = "";
// const launchAPI = "https://launchlibrary.net/1.3/launch/next/5"
const launchAPI = `https://bxfc45tfvh.execute-api.us-east-1.amazonaws.com/Beta1/launches`

let theseLaunches, launchDebug, marsWeather, $roverTweet;




//Event Listeners


//Let our visitor select which martian celebrity to see on twitter
$('#twitterfeed').on('click', 'button', function() {
    let $item = $(this)

    //This does not works as expected. I need to grab the actual widget object
    //to properly remove this.
    $('.rover-tweets').remove()
    console.log(String($item[0].id))

    //attempted to use switch case to handle this but still uncertain about matchig strings
    // switch(String($item[0].id)){
    //     case "spirit":$roverTweet = roverTweets.$spirit;
            
    //     case "curiosity": $roverTweet = roverTweets.$curiosity;
            
    //     case "insight": $roverTweet = roverTweets.$insight;
    //}
    if ($item[0].id == "perseverance"){
        $roverTweet = roverTweets.$perseverance;
    } else if($item[0].id == "curiosity") {
        $roverTweet = roverTweets.$curiosity;
    } else if($item[0].id == "insight") {
        $roverTweet = roverTweets.$insight;
    }
    // let $tweetDiv = $('<div class="rover-tweets"></div');
    // $tweetDiv.appendTo($('#twitterfeed'));
    $roverTweet.appendTo($('#twitterfeed'));

})




//Render Functions can go Here

function renderLaunches (launchList) {
    theseLaunches = launchList
    launchList.launches.forEach((launch) => renderLaunchCard(launch)); 
}


//We want to render some cards to show the upcoming launches. 
//TODO: create a rocket graphic for each card.
function renderLaunchCard (launch) {
    launchDebug = launch
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

//The beginnings of our current conditions card.
function renderMarsWeather (marsWeather) {
    let ourSol = marsWeather.sol_keys[0]
    $("#temperature").html(marsWeather[ourSol].AT.av);
    $("#windspeed").html(marsWeather[ourSol].HWS.av);
    $("#season").html(marsWeather[ourSol].Season);
    console.log(marsWeather[ourSol].Season)
}


//Make our DATA calls down here
//Upcoming launches
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