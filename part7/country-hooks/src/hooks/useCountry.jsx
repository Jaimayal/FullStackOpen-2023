import { useEffect } from "react";
import countriesService from "../services/countries";
import { useState } from "react";

const useCountry = (searchValue) => {
    const [countryData, setCountryData] = useState(null)

	useEffect(() => {
		countriesService
			.getByName(searchValue)
			.then((res) => setCountryData(res))
	}, [searchValue]);

    if (!countryData) {
        return null
    }

    return countryData[0]
};

export default useCountry;
