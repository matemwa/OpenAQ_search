import React from "react";
import SingleAccordion from "./SingleAccordion";
import "./Accordion.css";

export default function CityTable({ listOfCities }) {
	return listOfCities.map((city) => (
		<React.Fragment>
			<SingleAccordion key={"single-accordion-" + { city }} city={city} />
		</React.Fragment>
	));
}
