//  Reading Csv file using Plotly.d3 and using unpack row, key function
Plotly.d3.csv('data/Forecast_Data.csv', function(err, rows){
    function unpack(rows, key) {
        return rows.map(function(row) { return row[key]; });
    }
// Creating variable allcityNames to store hour and temperature data from each city
var allCityNames = unpack(rows, 'City'),
    allHour = unpack(rows, 'Hour'),
    allF_Temp = unpack(rows, 'F_Temp'),
    allA_Temp = unpack(rows,'A_Temp')
    listofCity = [],
    //currentCity,
    forecastTemp = []
    actualTemp = [],
    currentHour = [];

//  Getting the list of the cities and creating functiong to get get the data by city
  for (var i = 0; i < allCityNames.length; i++ ){
    if (listofCity.indexOf(allCityNames[i]) === -1 ){
      listofCity.push(allCityNames[i]);
    }
  }
  
  function getCityData(chosenCity) {
    actualTemp = [];
    forecastTemp = []
    currentHour = [];
    for (var i = 0 ; i < allCityNames.length ; i++){
      if ( allCityNames[i] === chosenCity ) {
        actualTemp.push(allA_Temp[i]);
        forecastTemp.push(allF_Temp[i]);
        currentHour.push(allHour[i]);
      } 
    }
  };

// Setting up default City Data which will in our case be Norcross
setBubblePlot('Norcross');

// creating the function that set plot with trace1 and trace 2 attributes
function setBubblePlot(chosenCity) {
    getCityData(chosenCity);  

    var trace1 = {
      x: currentHour,
      y: actualTemp,
      name: 'Actual Temperature',
      mode: 'lines+markers',
      marker: {
        size: 12, 
        opacity: 0.5
      }
    };

    var trace2 = {
      x: currentHour,
      y: forecastTemp,
      name: 'Temperature',
      mode: 'lines+markers',
      marker: {
        size: 12, 
        opacity: 0.5
      }
    };
// creating variable data to store trace 1 and 2 data
    var data = [trace1, trace2];

// creating layout for the the plot with yaxis and y axis2 that will be overlaping
    var layout = {
      title: 'Actual Vs Forecast Temperature per City<br>'+ chosenCity + ' Temp',
      yaxis: {title: 'Forecast Temperature'},
      yaxis2: {
        title: 'yaxis2 title',
        titlefont: {color: 'rgb(148, 103, 189)'},
        tickfont: {color: 'rgb(148, 103, 189)'},
        overlaying: 'y',
        side: 'right'
      }
      
    };
// creating the plot using avobe defined variables
    Plotly.newPlot('plotdiv', data, layout, {showSendToCloud: true});
};

// 
var innerContainer = document.querySelector('[data-num="0"'),
    plotEl = innerContainer.querySelector('.plot'),
    citySelector = innerContainer.querySelector('.citydata');

function assignOptions(textArray, selector) {
  for (var i = 0; i < textArray.length;  i++) {
      var currentOption = document.createElement('option');
      currentOption.text = textArray[i];
      selector.appendChild(currentOption);
  }
}
//
assignOptions(listofCity, citySelector);

function updateCity(){
    setBubblePlot(citySelector.value);
}
  
citySelector.addEventListener('change', updateCity, false);
});