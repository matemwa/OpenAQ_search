import React from "react";
import "./App.css";
import AutocompleteCountry from "./components/AutocompleteCountry";
import countryList from "./utils/countries";

class App extends React.Component {
	render() {
		return (
			<div className="App">
				<header className="App-header">Air quality</header>
				<div className="App-Component">
					<AutocompleteCountry items={countryList} />
				</div>
			</div>
		);
	}
}

export default App;
