import React from 'react';

function CountryTenCitiesDisplay({ countryData })  {
    
      
    return (
      <div>
        <div>
           {JSON.stringify(countryData.results)}
           {console.log(countryData.results)}
        </div>
        
      </div>
      
    )
  }
  

//<div>
  //        {this.fetchData()} Data for 10 cities from 
 //       </div>
export default CountryTenCitiesDisplay;
