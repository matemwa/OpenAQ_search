import React from 'react';
import './AutocompleteCountry.css'
import CountryTenCitiesDisplay from './CountryTenCitiesDisplay'

const countryCodeList = {'Poland':'PL', 'Germany':'DE', 'France':'FR', 'Spain':'ES'}

class AutocompleteCountry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      suggestions:  [],
      text: '',
      isCountryPicked: false,
      countryCode: '',
      country: '',
      countryData: null,
      url: 'https://api.openaq.org/v1/locations?country=',
      shouldFetchData: false
      }
  }

  onTextChange = (e) => {
    const { items } = this.props;
    const inputValue = e.target.value;
    let suggestions = [];
    if (inputValue.length > 0) {
      const regex = new RegExp(`${inputValue}`, 'i');
      suggestions = items.sort().filter(v => regex.test(v));
    }
    this.setState(() => ({ suggestions, text: inputValue }));
  }

  suggestionSelected (value) {
    this.setState(() => ({
      text: value,
      suggestions: [],
      isCountryPicked: true,
      country: value,
      countryCode: countryCodeList[value],
      url: 'https://api.openaq.org/v1/locations?limit=10000&country=' + countryCodeList[value],
      shouldFetchData: true
    }))
    
  }

  renderSuggestions () {
    const { suggestions } = this.state;
    if (suggestions.length === 0) {
      return null;
    }
    return (
      <ul>
        {suggestions.map((item) => <li onClick={() => this.suggestionSelected(item)}>{item}</li>)}
      </ul>
    )
  }
 
  fetchData = () => {
    
    fetch(this.state.url)
    .then(response => response.json())
    .then(response => this.setState({ countryData: response}))
    .catch(err => console.log(err))
    this.setState(() => ({
      shouldFetchData: false,
    }))
  }
    
 
  


  render () {
    const { text } = this.state;
    return (
      <div>
        <div className="AutocompleteCountry">
          <input type="text" value={text} onChange={this.onTextChange} placeholder="Poland, Germany, France or Spain"/>
          {this.renderSuggestions()}
        </div>
        <div className="CitiesDescription">
          {this.state.shouldFetchData && this.fetchData()}
          {this.state.countryData && <CountryTenCitiesDisplay countryData={this.state.countryData}/>}
        </div>
        
      </div>
      

    )
  }
};

export default AutocompleteCountry;