import React from "react";
import "./CityTable.css";

class CityTable extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			city: "",
			cityData: null,
			isDescriptionVisible: false
		};
	}
	tableGenerator = () => {
		const { listOfCities } = this.props;
		const accordion = listOfCities.map((city) => (
			<div key={"accordion-" + city}>
				<button
					className="city-accordion"
					key={"city-" + city}
					onClick={() => this.onAccordionClick(city)}
				>
					<p>{city}</p>
				</button>
				{this.getDescription(city)}
				<div className="accordion-content">
					<p key={city}>{console.log(this.fetchWiki(city))}</p>
				</div>
			</div>
		));
		return accordion;
	};

	onAccordionClick = () => {
		this.setState({ isDescriptionVisible: !this.state.isDescriptionVisible });
	};

	fetchWiki = (city) => {
		const url =
			"https://en.wikipedia.org/w/api.php?action=query&prop=description&titles=" +
			city +
			"&format=json&origin=*";

		fetch(url)
			.then((response) => response.json())
			.then((response) => this.setState({ cityData: response }))
			.catch((err) => console.log("Cannot connect", err));
	};

	getDescription(city) {
		this.fetchWiki(city);
		const { cityData } = this.state;

		console.table(cityData);
	}

	render() {
		return <div>{this.tableGenerator()}</div>;
	}
}

export default CityTable;
