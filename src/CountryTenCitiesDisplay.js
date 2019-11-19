import React from 'react';
import CityTable from './CityTable'



function CountryTenCitiesDisplay ({countryData, airQualityParameter } )  {

    function sortArray() {
      
      // If there is more than 1 entry => it takes the last value, replaces the current one if it exists  
      // entries for some countries return data about regions (eg. french Paris districts)
      let filteredData = {};
      let i, k;
      for (i = 0; i < countryData.results.length; i++) {
        for (k = 0; k < countryData.results[i].countsByMeasurement.length; k++){
          if (countryData.results[i].countsByMeasurement[k].parameter === airQualityParameter) {
            let key = `${countryData.results[i].city}`;
            let value = countryData.results[i].countsByMeasurement[k].count;
            filteredData[key] = value;
          }
        }
      }
      let sortedArray = Object.keys(filteredData).sort(function(a,b){
        return filteredData[a]-filteredData[b]
      }).reverse().slice(0, 10)
        
      return sortedArray
    }
      
    return (
      <div>
        <CityTable listOfCities={sortArray()}/>
      </div>
    )
    
  }
  

//<div>
  //        {this.fetchData()} Data for 10 cities from 
 //       </div>
export default CountryTenCitiesDisplay;
