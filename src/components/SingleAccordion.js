import React from "react";
import CityDetails from "./CityDetails";
import "./Accordion.css";

class SingleAccordion extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isShown: false
		};
	}

	showCityDetails() {
		this.setState({ isShown: !this.state.isShown });
	}

	render() {
		const { city } = this.props;

		return (
			<div className="city-accordion" key={"accordion-" + city}>
				<button key={"city-" + city} onClick={() => this.showCityDetails()}>
					<p>{city}</p>
				</button>
				{this.state.isShown && <CityDetails city={city} />}
			</div>
		);
	}
}

export default SingleAccordion;
