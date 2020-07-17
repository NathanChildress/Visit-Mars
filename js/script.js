const marsWeatherURL = `https://bxfc45tfvh.execute-api.us-east-1.amazonaws.com/Beta1/marsinsight/`;
const spaceXURL = "";
// const launchAPI = "https://launchlibrary.net/1.3/launch/next/5"
const launchAPI = `https://bxfc45tfvh.execute-api.us-east-1.amazonaws.com/Beta1/launches`

let theseLaunches, launchDebug, marsWeather, $roverTweet,debugThis, keysplit;




//Event Listeners

//rotate our rocket on click
$('.launchList').on('click', 'img', function() {
    console.log(this);
    $(this).css({
      "transform" : "rotate(0.125turn)",
      "transition-duration" : "1.5s",
    })

    debugThis = $(this)
    launchDebug = theseLaunches.launches[parseInt(debugThis[0].id)]
    $('.modal-body').html(renderLaunchModal(theseLaunches.launches[parseInt(debugThis[0].id)]))
    $('#launchModal').attr("class", `modal fade ${debugThis[0].id}`);
    $('#launchModal').modal({keyboard: true})
});

$("#launchModal").on("hidden.bs.modal", function () {
    // put your default event here
    console.log($(this)[0].className)
    keySplit = $(this)[0].className
    keyArray = keySplit.split(" ")
    $(`#${keyArray[2]}`).css({
        "transform" : "rotate(0turn)",
        "transition-duration" : "1.5s",
    })
});

//Let our visitor select which martian celebrity to see on twitter
$('#twitterfeed').on('click', 'button', function() {
    let $item = $(this)

    //This does not works as expected. I need to grab the actual widget object
    //to properly remove this.
    $('#perseverance-tweet').css({
        "display":"none"
    })
    $('#curiosity-tweet').css({
        "display":"none"
    })
    $('#insight-tweet').css({
        "display":"none"
    })
    console.log(String($item[0].id))
    $(`#${$item[0].id}-tweet`).css({
        "display": "flex",
        "flex-direction" : "column",
        "align-items" : "center",
    })
    //attempted to use switch case to handle this but still uncertain about matchig strings
    // switch(String($item[0].id)){
    //     case "spirit":$roverTweet = roverTweets.$spirit;
            
    //     case "curiosity": $roverTweet = roverTweets.$curiosity;
            
    //     case "insight": $roverTweet = roverTweets.$insight;
    //}
    // if ($item[0].id == "perseverance"){
    //     $roverTweet = roverTweets.$perseverance;
    // } else if($item[0].id == "curiosity") {
    //     $roverTweet = roverTweets.$curiosity;
    // } else if($item[0].id == "insight") {
    //     $roverTweet = roverTweets.$insight;
    // }
    // let $tweetDiv = $('<div class="rover-tweets"></div');
    // $tweetDiv.appendTo($('#twitterfeed'));
    // $roverTweet.appendTo($('#twitterfeed'));

})




//Render Functions can go Here

function renderLaunches (launchList) {
    theseLaunches = launchList
    launchList.launches.forEach((launch, index) => renderLaunchCard(launch, index)); 
}


//We want to render some cards to show the upcoming launches. 
//TODO: create a rocket graphic for each card.
function renderLaunchCard (launch, index) {
    launchDebug = launch
//we can use bootstrap to handle creating the cards for us with this basic template:
let $myCard = $(`<div class="card" style="width: 18rem;">
    <img src="images/Rocket-ship-Clip-Art.svg" class="card-img-top" id="${index}" alt="...">
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

function renderLaunchModal (launch){
    return (`<div class="card" style="width: 18rem;">
        <img src="${launch.rocket.imageURL}" class="card-img-top" style="width: 5rem;" alt="...">
        <div class="card-body">
        <ul class="list-group list-group-flush list-launch">
            <li class="list-group-item">Day & Time: ${launch.windowstart}</li>
            <li class="list-group-item">Mission:${launch.name}</li>
            <li class="list-group-item">Launch Location: ${launch.location.pads[0].name}</li>
            <li class="list-group-item">Rocket: ${launch.rocket.name}</li>
        </ul>
        </div>
    </div>`)
  }

//The beginnings of our current conditions card.
function renderMarsWeather (marsWeather) {
    let ourSol = marsWeather.sol_keys[0]
    $("#temperature").html(marsWeather[ourSol].AT.av);
    $("#windspeed").html(marsWeather[ourSol].HWS.av);
    $("#season").html(marsWeather[ourSol].Season);
    console.log(marsWeather[ourSol].Season)
}

function renderSky(stars) {
    for (let i = 0; i < stars; i++){
        const canva = document.getElementById('canvas');
        const ctx = canva.getContext('2d');
        x = Math.random() * document.body.offsetWidth;
        y = Math.random() * document.body.offsetHeight;
        ctx.fillStyle = "white";
        ctx.fillRect(x,y,1,1,)
    }

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

renderSky(200);
