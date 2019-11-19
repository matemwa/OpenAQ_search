import React from 'react';
import './CityTable.css'

class CityTable extends React.Component {

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
    
    return listOfCities.map(city => (
      <tr>
        <td>
          {city}
         </td>
         <td>
          description..
         </td>
      </tr>
    ))
  }

  render() {
    return(
        <table className="CityTable" border="0">
          <thead>
            
            <th>City</th>
            <th>Description</th>
          </thead>
          <tbody>
                {this.tableGenerator()}
          </tbody>
        </table>
    )
  }
}


export default CityTable;
