var cityHistory = document.getElementById('cityHistory');
var currentDateSpan = document.getElementById('currentDate');
var currentDateSpan1 = document.getElementById('currentDate1');
var currentDateSpan2 = document.getElementById('currentDate2');
var currentDateSpan3 = document.getElementById('currentDate3');
var currentDateSpan4 = document.getElementById('currentDate4');
var today = moment();
currentDateSpan.textContent = today.format("MM-DD-YY")
var citySpan = document.getElementById('city');
var tempSpan = document.getElementById('temp');
var tempSpan1 = document.getElementById('temp1');
var tempSpan2 = document.getElementById('temp2');
var tempSpan3 = document.getElementById('temp3');
var tempSpan4 = document.getElementById('temp4');
var windSpan = document.getElementById('wind');
var windSpan1 = document.getElementById('wind1');
var windSpan2 = document.getElementById('wind2');
var windSpan3 = document.getElementById('wind3');
var windSpan4 = document.getElementById('wind4');
var humiditySpan = document.getElementById('humidity');
var humiditySpan1 = document.getElementById('humidity1');
var humiditySpan2 = document.getElementById('humidity2');
var humiditySpan3 = document.getElementById('humidity3');
var humiditySpan4 = document.getElementById('humidity4');
var iconRef = document.getElementById('icon');
var iconRef1 = document.getElementById('icon1');
var iconRef2 = document.getElementById('icon2');
var iconRef3 = document.getElementById('icon3');
var iconRef4 = document.getElementById('icon4');
var uvIndexSpan = document.getElementById('index');

var searchButton = document.getElementById("search-button");
var cityInput = document.querySelector("#mySearch");
var weatherApiRootUrl = 'https://api.openweathermap.org';

function renderHistory (event) {
  
  // Prevent Default
  event.preventDefault();
  
  
  // Creating elements: div, br, row, and button
  var elementDiv = document.createElement('div');
  var elementBr = document.createElement('br');
  var historyRow = document.createElement('div');
  var searchedCityButton = document.createElement('button');
  
  // Setting the text of searchedCityButton
  searchedCityButton.textContent = cityInput.value;    
  searchedCityButton.addEventListener('click',function(){cityInput.value=searchedCityButton.textContent})
  
  $(searchedCityButton).addClass('btn btn-primary history-buttons');
  $(historyRow).addClass('row');

  // Appending the button to the historyRow and then appending the historyRow to the elementBr
  // The elementBr then gets appended to the cityHistory
  
  historyRow.appendChild(searchedCityButton);    
  elementDiv.appendChild(elementBr);
  elementDiv.appendChild(historyRow);
  cityHistory.append(elementDiv);
  
  getLatLon(cityInput.value);
  

 
}

searchButton.addEventListener('click', renderHistory);



function getLatLon(cityName) {    
    // let cityName = cityInput.value;    
    let APIkey = '22a3324a817052e3ecb8f5b95307e41b'
    // fetch request gets a list of all the repos for the node.js organization
    var requestUrl = `${weatherApiRootUrl}/geo/1.0/direct?q=${cityName}&limit=5&appid=${APIkey}`
    
  
    fetch(requestUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        
        getCity(data[0].lat,data[0].lon);
        // console.log(data[0].current.clouds);
        
      }).then(function (data){
        fiveDayForecast(cityName)
      })
      .catch(err=>console.log(err));
  }
  
  function fiveDayForecast (cityName){
    let APIkey = '22a3324a817052e3ecb8f5b95307e41b'

    var requestUrl = `${weatherApiRootUrl}/data/2.5/forecast?q=${cityName}&units=metric&appid=${APIkey}`;

    fetch(requestUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data)
        currentDateSpan1.textContent = data.list[2].dt_txt;
        currentDateSpan2.textContent = data.list[10].dt_txt;
        currentDateSpan3.textContent = data.list[18].dt_txt;
        currentDateSpan4.textContent = data.list[26].dt_txt;
        let iconURL1 = data.list[2].weather[0].icon;
        iconRef1.src = `https://openweathermap.org/img/wn/${iconURL1}@2x.png`;
        let iconURL2 = data.list[10].weather[0].icon;
        iconRef2.src = `https://openweathermap.org/img/wn/${iconURL2}@2x.png`;
        let iconURL3 = data.list[18].weather[0].icon;
        iconRef3.src = `https://openweathermap.org/img/wn/${iconURL3}@2x.png`;
        let iconURL4 = data.list[26].weather[0].icon;
        iconRef4.src = `https://openweathermap.org/img/wn/${iconURL4}@2x.png`;
        tempSpan1.textContent = data.list[2].main.temp;
        tempSpan2.textContent = data.list[10].main.temp;
        tempSpan3.textContent = data.list[18].main.temp;
        tempSpan4.textContent = data.list[26].main.temp;
        windSpan1.textContent = data.list[2].wind.speed;
        windSpan2.textContent = data.list[10].wind.speed;
        windSpan3.textContent = data.list[18].wind.speed;
        windSpan4.textContent = data.list[26].wind.speed;
        humiditySpan1.textContent = data.list[2].main.humidity;
        humiditySpan2.textContent = data.list[10].main.humidity;
        humiditySpan3.textContent = data.list[18].main.humidity;
        humiditySpan4.textContent = data.list[26].main.humidity;
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
        windSpan.textContent = data.current.wind_speed;
        let iconURL = data.current.weather[0].icon;
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
    cityInput.value="";
  };

  getLatLon(citySpan.textContent);