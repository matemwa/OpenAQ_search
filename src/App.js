import React from 'react';
import './App.css';
import AutocompleteCountry from './AutocompleteCountry'
import countryList from './Countries'

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          Air quality
        </header>
        <div className="App-Component">
            <AutocompleteCountry items={countryList}/>
        </div>
        
      </div>
  );
    }
}

export default App;
