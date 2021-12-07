var cityHistory = document.getElementById('cityHistory');
var currentDateSpan = document.getElementById('currentDate');
var today = moment();
currentDateSpan.textContent = today.format("MM-DD-YY")
var citySpan = document.getElementById('city');
var tempSpan = document.getElementById('temp');
var windSpan = document.getElementById('wind');
var humiditySpan = document.getElementById('humidity');
var iconRef = document.getElementById('icon');
var uvIndexSpan = document.getElementById('index');

var searchButton = document.getElementById('search-button');
var cityInput = document.querySelector("#mySearch");
var weatherApiRootUrl = 'https://api.openweathermap.org';


function renderHistory (event) {
    
    // Prevent Default
    event.preventDefault();
    console.log(cityInput.value);

    // Creating elements, br, row, and button
    var elementDiv = document.createElement('div');
    var elementBr = document.createElement('br');
    var historyRow = document.createElement('div');
    var createButton = document.createElement('button');

    // Setting the text of createButton
    createButton.textContent = cityInput.value;    
    $(createButton).addClass('btn btn-primary');
    $(historyRow).addClass('row');

    
    

    // Appending the button to the historyRow and then appending the historyRow to the elementBr
    // The elementBr then gets appended to the cityHistory
    
    historyRow.appendChild(createButton);    
    elementDiv.appendChild(elementBr);
    elementDiv.appendChild(historyRow);
    cityHistory.append(elementDiv);
    getLatLon();
}

searchButton.addEventListener('click', renderHistory);

function getLatLon() {    
    let cityName = cityInput.value;    
    let APIkey = '22a3324a817052e3ecb8f5b95307e41b'
    // fetch request gets a list of all the repos for the node.js organization
    var requestUrl = `${weatherApiRootUrl}/geo/1.0/direct?q=${cityName}&limit=5&appid=${APIkey}`
    
  
    fetch(requestUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data)
        getCity(data[0].lat,data[0].lon);
        // console.log(data[0].current.clouds);
        
      }).then(function (data){
        fiveDayForecast(cityName)
      })
      .catch(err=>console.log(err));
  }
  // getLatLon();
  function fiveDayForecast (cityName){
    let APIkey = '22a3324a817052e3ecb8f5b95307e41b'

    var requestUrl = `${weatherApiRootUrl}/data/2.5/forecast?q=${cityName}&appid=${APIkey}`;

    fetch(requestUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data)
      });
  }

  function getCity(lat,lon) {
    
    let APIkey = '22a3324a817052e3ecb8f5b95307e41b'
    
    // fetch request gets a list of all the repos for the node.js organization
    var requestUrl = `${weatherApiRootUrl}/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=minutely,hourly&appid=${APIkey}`;
  
    fetch(requestUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data)
        tempSpan.textContent = data.current.temp;
        tempSpan.textContent = data.current.temp;
        windSpan.textContent = data.current.wind_speed;
        let iconURL = data.current.weather[0].icon
        iconRef.src = `https://openweathermap.org/img/wn/${iconURL}@2x.png`;
        humiditySpan.textContent = data.current.humidity;
        citySpan.textContent = cityInput.value;
        uvIndexSpan.textContent = data.current.uvi;        
        uvIndexScale(data.current.uvi);
        
      });
  }

  function uvIndexScale (index) {
    if(2>index && index>1){
      console.log('uvIndex function running')
      uvIndexSpan.setAttribute('class','low');
    }
    else if (5>index && index>2){
      uvIndexSpan.setAttribute('class','medium');
    }
    else if (7>index && index>5){
      uvIndexSpan.setAttribute('class','high');
    }
    else if (10>index && index>7){
      uvIndexSpan.setAttribute('class','veryHigh');
    }
    else if(index>10){
      uvIndexSpan.setAttribute('class','extremelyHigh');
    };
  };