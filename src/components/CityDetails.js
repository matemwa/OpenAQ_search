import React from "react";
import "./Accordion.css";

class CityDetails extends React.Component {
	constructor(props) {
		super(props);
		this.state = { cityData: null, loading: false };
	}

	componentDidMount() {
		const { city } = this.props;
		this.fetchWiki(city);
	}

	fetchWiki(city) {
		const url =
			"https://en.wikipedia.org/w/api.php?action=query&prop=description&titles=" +
			city +
			"&format=json&origin=*";

		fetch(url)
			.then((response) => response.json())
			.then((response) => this.setState({ cityData: response.query.pages }))
			.catch((err) => console.log("Cannot connect", err));
	}

	getDescription() {
		const { cityData } = this.state;
		const start = JSON.stringify(cityData).indexOf('"') + 1;
		const end = JSON.stringify(cityData).indexOf('"', 2);
		const pageID = JSON.stringify(cityData).slice(start, end);

		if (cityData) {
			const description = cityData[pageID].description;
			if (description) {
				return description;
			} else if (description === undefined) {
				return "Currently description is unavailable.";
			} else {
				return "Currently description is unavailable.";
			}
		}
	}
	render() {
		return (
			<div className="accordion-content">
				<p key={this.props.city}>{this.getDescription()}</p>
			</div>
		);
	}
}

export default CityDetails;
