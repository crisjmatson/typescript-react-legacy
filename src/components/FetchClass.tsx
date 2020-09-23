import React, { Component } from "react";

export interface FetchProps {
	setTitle: any;
	setMain: any;
	setDesc: any;
	setTemp: any;
}
type FetchClassState = {
	LatLocation: number;
	LonLocation: number;
	weather: any;
};

export default class FetchClass extends Component<FetchProps, FetchClassState> {
	constructor(props: FetchProps) {
		super(props);
		this.state = {
			LatLocation: 0,
			LonLocation: 0,
			weather: "",
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
		let res: any = await fetch(url);
		let json: any = await res.json();
		this.rainFall(json);
	}

	rainFall(weather: any): any {
		console.log("rainfall started: ", weather);
		this.setState({ weather: weather });
		this.props.setTitle(weather.name + ", " + weather.sys.country);
		this.props.setMain(weather.weather[0].main);
		this.props.setDesc(weather.weather[0].description);
		this.props.setTemp(this.kToF(weather.main.feels_like).toFixed(2));
	}

	kToF = (num: number) => (num - 273.15) * 1.8 + 32;

	render() {
		return <div></div>;
	}
}
