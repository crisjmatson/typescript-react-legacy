import React, { useState, useEffect } from "react";
import FetchClass from "./FetchClass";

const Fetch: React.FunctionComponent = ({}) => {
	const [showWeather, setShowWeather] = useState(false);
	const [title, setTitle] = useState("")
	const [main, setMain] = useState("");
	const [desc, setDesc] = useState("");
	const [temp, setTemp] = useState("");

	useEffect(() => {
		console.log("Functional Component: ", main);
		if (main !== ("" || undefined || null)) {
			setShowWeather(true);
		} else console.log("awaiting api");
	}, [main]);

	return (
		<div>
			{showWeather ? (
				<ul>
					<h4>{title}</h4>
					<li>{main}</li>
					<li>{desc}</li>
					<li>{temp}</li>
				</ul>
			) : (
				<span></span>
			)}
			<FetchClass setTitle={setTitle} setMain={setMain} setDesc={setDesc} setTemp={setTemp} />
		</div>
	);
};

export default Fetch;
