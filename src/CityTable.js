import React from 'react';

class CityTable extends React.Component {
  

  //
  fetchWiki = (city) => {
    let description;
    let url = 'https://en.wikipedia.org/w/api.php?action=query&prop=description&titles=' + city 
    description = fetch(url)
      .then(response => response.json())
      .catch(err => alert("Cannot connect", err))
    return description;
  }

  tableGenerator = () => {
    const { listOfCities } = this.props;
    const table = listOfCities.map(city => (
      <tr>
        <td>
          {city}
         </td>
       <td>
        
        </td>
      </tr>
      
    ))
      return table
  }

  render() {
    return(
      <div>
        <table border="0">
          <thead>
            <tr>
                <th>
                  
                </th>
            </tr>
          </thead>
          <tbody>
                {this.tableGenerator()}
          </tbody>
        </table>
      </div>
      
    )
  }
}


export default CityTable;
