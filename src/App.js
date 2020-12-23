import Cards from "./components/Cards/Cards";
import CountryPicker from "./components/CountryPicker/CountryPicker";
import Chart from "./components/Chart/Chart";

import styles from "./App.module.css";
import { fetchData } from "./api";
import { useEffect, useState } from "react";

import coronaImage from "./images/image.png";

function App() {
	const [data, setData] = useState({});
	const [country, setCountry] = useState("");

	useEffect(() => {
		const fetchAPI = async () => {
			setData(await fetchData());
		};

		fetchAPI();
	}, []);

	const handleCountryChange = async (country) => {
		const fetchedData = await fetchData(country);
		// console.log(fetchedData);
		setData(fetchedData);
		setCountry(country);
	};

	return (
		<div className={styles.container}>
			<img className={styles.image} src={coronaImage} alt="COVID-19" />
			<Cards data={data} />
			<CountryPicker handleCountryChange={handleCountryChange} />
			<Chart data={data} country={country} />
		</div>
	);
}

export default App;
