import React, { Component } from "react";

interface FetchProps {
	setTitle: React.Dispatch<React.SetStateAction<string>>;
	setMain: React.Dispatch<React.SetStateAction<string>>;
	setDesc: React.Dispatch<React.SetStateAction<string>>;
	setTemp: React.Dispatch<React.SetStateAction<string>>;
}
interface FetchClassState {
	LatLocation: number;
	LonLocation: number;
	weather?: Weather;
}
interface Weather {
	base: string;
	clouds: Clouds;
	cod: number;
	coord: Coordinates;
	dt: number;
	id: number;
	main: WeatherMain;
	name: string;
	sys: WeatherSys;
	timezone: -21600;
	visibility: 10000;
	weather: WeatherWeather;
	wind: WeatherWind;
}
interface Clouds {
	all: number;
}
interface Coordinates {
	lon: number;
	lat: number;
}
interface WeatherMain {
	temp: number;
	feels_like: number;
	temp_min: number;
	temp_max: number;
	pressure: number;
}
interface WeatherSys {
	type: number;
	id: number;
	country: string;
	sunrise: number;
	sunset: number;
}
interface WeatherWeather {
	0: {
		id: number;
		main: string;
		description: string;
		icon: string;
	};
}
interface WeatherWind {
	speed: number;
	deg: number;
	gust: number;
}

export default class FetchClass extends Component<FetchProps, FetchClassState> {
	constructor(props: FetchProps) {
		super(props);
		this.state = {
			LatLocation: 0,
			LonLocation: 0,
		};
	}

	componentWillMount() {
		this.locate();
	}

	locate() {
		console.log("location started");
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition((position) => {
				let latitude = position.coords.latitude;
				let longitude = position.coords.longitude;
				this.setState({ LatLocation: latitude, LonLocation: longitude });
				console.log(longitude, latitude);
				this.rainCheck(this.state.LatLocation, this.state.LonLocation);
			});
		} else {
			return "Geolocation is not supported by this browser.";
		}
	}

	async rainCheck(lat: number, lon: number): Promise<void> {
		let url: string = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=27a60c1f9a0ec85a6ca1c508fee7dd68`;
		let res = await fetch(url);
		console.log(res);
		let json = await res.json();
		this.rainFall(json);
	}

	rainFall(weather: Weather): void {
		console.log("rainfall started: ", weather);
		this.setState({ weather: weather });
		weather.name !== ""
			? this.props.setTitle(weather.name + ", " + weather.sys.country)
			: this.props.setTitle(
					this.state.LatLocation + ", " + this.state.LonLocation
			  );

		this.props.setMain(weather.weather[0].main);
		this.props.setDesc(weather.weather[0].description);
		this.props.setTemp(this.kToF(weather.main.feels_like).toFixed(2));
	}

	kToF = (num: number) => (num - 273.15) * 1.8 + 32;

	render() {
		return <div></div>;
	}
}
