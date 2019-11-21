import React from "react";
import CityTable from "./CityTable";
import sortArray from "../utils/sortArrayfunction";

export default function GetTenCitiesTable({
	countryData,
	airQualityParameter
}) {
	return (
		<React.Fragment>
			<CityTable listOfCities={sortArray(countryData, airQualityParameter)} />
		</React.Fragment>
	);
}
