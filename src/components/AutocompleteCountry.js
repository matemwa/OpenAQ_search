import React from "react";
import "./AutocompleteCountry.css";
import "./AirQualityBar.css";
import CountryTenCitiesDisplay from "./CountryTenCitiesDisplay";
const countryCodeList = {
	Poland: "PL",
	Germany: "DE",
	France: "FR",
	Spain: "ES"
};
const parameterList = ["bc", "co", "no2", "o3", "pm10", "pm25", "so2"];

class AutocompleteCountry extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			suggestions: [],
			text: "",
			country: "",
			countryData: null,
			url: "https://api.openaq.org/v1/locations?country=",
			shouldFetchData: false,
			airQualityParamBar: false,
			airQualityParameter: ""
		};
	}

	onTextChange = (e) => {
		const { items } = this.props;
		const inputValue = e.target.value;
		let suggestions = [];
		if (inputValue.length > 0) {
			const regex = new RegExp(`${inputValue}`, "i");
			suggestions = items.sort().filter((v) => regex.test(v));
		}
		this.setState({ suggestions, text: inputValue });
	};

	suggestionSelected(value) {
		this.setState(() => ({
			text: value,
			suggestions: [],
			country: value,
			url:
				"https://api.openaq.org/v1/locations?limit=1000&country=" +
				countryCodeList[value],
			shouldFetchData: false,
			airQualityParamBar: true
		}));
	}

	renderSuggestions() {
		const { suggestions } = this.state;
		if (suggestions.length === 0) {
			return null;
		}
		return (
			<ul>
				{suggestions.map((item) => (
					<li key={item} onClick={() => this.suggestionSelected(item)}>
						{item}
					</li>
				))}
			</ul>
		);
	}

	fetchData = () => {
		fetch(this.state.url)
			.then((response) => response.json())
			.then((response) => this.setState({ countryData: response }))
			.catch((err) => alert("Cannot connect", err));
		this.setState({
			shouldFetchData: false
		});
	};

	createAirQualityBar() {
		const { airQualityParameter } = this.state;
		return (
			<div>
				<form>
					<select
						value={airQualityParameter}
						onChange={this.handleParameterChange}
					>
						<option> - parameter - </option>
						{parameterList.map((param) => (
							<option key={param} value={`${param}`}>
								{param.toUpperCase()}
							</option>
						))}
					</select>
				</form>
			</div>
		);
	}

	airBarUpdate = (value) => {
		this.setState({
			airParameter: value,
			url: this.state.url + "&parameter=" + value
		});
		console.log(this.state.url, this.state.airParameter);
	};

	handleParameterChange = (event) => {
		this.setState({
			airQualityParameter: event.target.value,
			shouldFetchData: true
		});
	};

	render() {
		const {
			text,
			countryData,
			airQualityParameter,
			airQualityParamBar,
			shouldFetchData
		} = this.state;

		return (
			<div>
				<div className="autocomplete-country">
					<input
						type="text"
						value={text}
						onChange={this.onTextChange}
						placeholder="Poland, Germany, France or Spain"
					/>
					{this.renderSuggestions()}
				</div>
				<div className="airquality-bar">
					{airQualityParamBar && this.createAirQualityBar()}
				</div>
				<div className="city-accordion">
					<div>
						{shouldFetchData && this.fetchData()}
						{countryData && (
							<CountryTenCitiesDisplay
								countryData={countryData}
								airQualityParameter={airQualityParameter}
							/>
						)}
					</div>
				</div>
			</div>
		);
	}
}

export default AutocompleteCountry;
