import React, { useState } from "react";
import "./styles/styles.css";

const App = () => {
	const [previousState, setPreviousState] = useState(0);
	const [currentState, setCurrentState] = useState("");
	const [displayedState, setDisplayedState] = useState("");
	const [history, setHistory] = useState("hidden");

	const handleClear = () => {
		setPreviousState(0);
		setCurrentState("");
		setDisplayedState("");
	};

	const handlePlusMinus = () => {
		if (previousState === 0) {
			setCurrentState(currentState + "-");
			setDisplayedState(currentState + "-");
		} else if (previousState < 0) {
			const minusOrPlus = Math.abs(previousState);
			setPreviousState(minusOrPlus);
		} else {
			const minusOrPlus = -previousState;
			setPreviousState(minusOrPlus);
		}
	};

	// I was unsure if percent was allowed but it put it in just incase because it really just is division

	const handlePercent = () => {
		const percentValue = parseFloat(previousState) / 100;
		const percentResult = percentValue.toString();
		setPreviousState(percentResult);
	};

	const handleOperator = (operator) => {
		if (previousState === 0) return;

		if (operator === "/") {
			setDisplayedState(currentState + previousState + "÷");
		} else if (operator === "*") {
			setDisplayedState(currentState + previousState + " " + "x" + " ");
		} else {
			setDisplayedState(currentState + previousState + operator);
		}

		setCurrentState(currentState + previousState + operator);
		setPreviousState(0);
	};

	console.log(displayedState);

	const handleNumber = (number) => {
		const newState = parseFloat(previousState.toString() + number);
		setPreviousState(newState);
	};

	const handleDot = () => {
		if (!previousState.toString().includes(".")) {
			setPreviousState(previousState + ".");
		}
	};

	const handleEqual = () => {
		if (!currentState) return;

		const test = currentState + previousState;

		const evaluated = eval(test);

		setHistory(displayedState + previousState);
		setPreviousState(evaluated);
		setCurrentState("");
	};

	return (
		<div className="container">
			<div className="wrapper">
				<div className="info">
                    {/* This history part is so the boxes stay in the same spot, without it the column messes up and the screen moves when slightly on =*/}
					{history === "hidden" ? <p  className="history" style={{ color: "transparent" }}>hidden</p> : <p className="history">{history}</p>}
					<p className="screen">{currentState ? displayedState + (previousState === 0 ? "" : previousState) : previousState}</p>
				</div>
				<div className="button light-grey" onClick={handleClear}>
					AC
				</div>
				<div className="button light-grey" onClick={handlePlusMinus}>
					+/-
				</div>
				<div className="button light-grey" onClick={handlePercent}>
					%
				</div>
				<div className="button orange" onClick={() => handleOperator("/")}>
					÷
				</div>
				<div className="button number" onClick={() => handleNumber(7)}>
					7
				</div>
				<div className="button number" onClick={() => handleNumber(8)}>
					8
				</div>
				<div className="button number" onClick={() => handleNumber(9)}>
					9
				</div>
				<div className="button orange" onClick={() => handleOperator("*")}>
					X
				</div>
				<div className="button number" onClick={() => handleNumber(4)}>
					4
				</div>
				<div className="button number" onClick={() => handleNumber(5)}>
					5
				</div>
				<div className="button number" onClick={() => handleNumber(6)}>
					6
				</div>
				<div className="button orange" onClick={() => handleOperator("-")}>
					-
				</div>
				<div className="button number" onClick={() => handleNumber(1)}>
					1
				</div>
				<div className="button number" onClick={() => handleNumber(2)}>
					2
				</div>
				<div className="button number" onClick={() => handleNumber(3)}>
					3
				</div>
				<div className="button orange" onClick={() => handleOperator("+")}>
					+
				</div>
				<div className="button zero" onClick={() => handleNumber(0)}>
					0
				</div>
				<div className="button number" onClick={handleDot}>
					.
				</div>
				<div className="button orange" onClick={handleEqual}>
					=
				</div>
			</div>
		</div>
	);
};

export default App;
