import React from "react";
import "./App.css";
//import Clock from "./components/Clock";
import Fetch from "./components/Fetch";

const App: React.FunctionComponent = () => {
	return (
		<div className="App" id="mainBg">
			<div className="verticalCenter">
				<Fetch />
				{/* <Clock testProp={testProp} optionalProp={optionalProp} /> */}
			</div>
		</div>
	);
};

export default App;
