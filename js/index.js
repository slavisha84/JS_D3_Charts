/**
 * ---------------------------------------
 * This chart wqas created using amCharts 4.
 * All documentation for this librarry is available at:
 * https://www.amcharts.com/docs/v4/
 * We have used documentation with boiler code that is
 * specific for this library to create the charts that fited our needs. 
 * The licence for this library is also included in our repo that says that we are allowed to use if free of charge. 
 * ---------------------------------------
 */
//  We are Reading Csv file using Plotly.d3 and using unpack row, key function
Plotly.d3.csv('data/Forecast_Data.csv', function(err, rows){
    function unpack(rows, key) {
        return rows.map(function(row) { return row[key];});
    }
// Creating variable allcityNames to store hour and temperature data from each city
var allCityNames = unpack(rows, 'City'),
    // unpacing hours to all hours
    allHour = unpack(rows, 'Hour'),
    // foractinst temperature into allFTemp variable
    allF_Temp = unpack(rows, 'F_Temp'),
    // unpacking actual temperature into allA_temp variable
    allA_Temp = unpack(rows,'A_Temp')
    // Creating the variables to store empty list for now for city, date, forecast and actual temperarutre. 
    listofCity = [],
    forecastTemp = []
    actualTemp = [],
    currentHour = [];

//  Getting the list of the cities and creating functiong to get the data by city
  for (var i = 0; i < allCityNames.length; i++ ){
    if (listofCity.indexOf(allCityNames[i]) === -1 ){
      listofCity.push(allCityNames[i]);
    }
  }
// Defining the function getCityData to pull the data into variables
  function getCityData(chosenCity) {
    // initiating empty lists to store data
    actualTemp = [];
    forecastTemp = []
    currentHour = [];
    // for each element in list of cities if element is equal to selected element push the data into coresponding variable
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
// Setting up variable trace 1 to define x and y axis
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
// Setting up variable trace 2 to define x and y 
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
      // setting up the title with chosencity 
      title: 'Actual Vs Forecast Temperature per City<br>'+ chosenCity + ' Temp',
      // setting up yaxis title
      yaxis: {title: 'Temperature (F)'},
      // setting up yaxis2 title, font and tick font
      yaxis2: {
        title: 'yaxis2 title',
        titlefont: {color: 'rgb(148, 103, 189)'},
        tickfont: {color: 'rgb(148, 103, 189)'},
        overlaying: 'y',
        side: 'right'
      },
      // setting up xxis tickfont, family, size and color of the fonts
      xaxis: {
        tickfont: {
          family: 'calibri',
          size: 12,
          color: 'black'}}      
    };
// creating the plot using avobe defined variables
    Plotly.newPlot('plotdiv', data, layout, {showSendToCloud: true});
};

// using innercontainer to get data through queryselector
var innerContainer = document.querySelector('[data-num="0"'),
    plotEl = innerContainer.querySelector('.plot'),
// using cityselector variable to to store citydata
    citySelector = innerContainer.querySelector('.citydata');

// Based on documentation and boiler code function bellow used to create the option for dropdown menu
function assignOptions(textArray, selector) {
  for (var i = 0; i < textArray.length;  i++) {
      var currentOption = document.createElement('option');
      currentOption.text = textArray[i];
      selector.appendChild(currentOption);
  }
}
// Setting up list of cities and city celector drop down menu
assignOptions(listofCity, citySelector);

// Setting up function to update the city  and select the plot using the city selector value. 
function updateCity(){
    setBubblePlot(citySelector.value);
}
 // Setting up the city selector using event listener to snif the city change in drop down menu.  
citySelector.addEventListener('change', updateCity, false);
});