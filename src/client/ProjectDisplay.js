import { useState } from 'react';
import { TemperatureInput } from './TemperatureInput';
import { RangeInput } from './RangeInput';
import { ColorInput } from './ColorInput';
import { Project } from './Project';
import { getData } from '../api/fetchWeatherData';

export const ProjectDisplay = () => {
	const [temperatureData, setTemperatureData] = useState(null);
	const [rangeData, setRangeData] = useState(null);
	const [colorData, setColorData] = useState(null);

	const getTemperatureData = async (inputParameters) => {
		const data = await getData(inputParameters)
		setTemperatureData(data)
	}

	const getRange = (inputParameters) => {
		const maxTemp = parseInt(inputParameters.maxTemp)
		const minTemp = parseInt(inputParameters.minTemp)
		const numberOfColors = parseInt(inputParameters.numberOfColors)

		const temperatureBreaks = []

		const step = (maxTemp - minTemp) / (numberOfColors - 2);
		for (let color = 0; color < numberOfColors; color++) {
			const currentTemperature = minTemp + color * step;
			temperatureBreaks.push(currentTemperature);
		}

		const temperatureRange = [];
		temperatureBreaks.forEach((currentBreak, index) => {
			if (index === 0) {
				temperatureRange.push({
					lower: null,
					upper: Math.floor(temperatureBreaks[index]),
				})
				return
			}

			if (index === numberOfColors - 1) {
				temperatureRange.push({
					lower: Math.floor(temperatureBreaks[index-1]+1),
					upper: null,
				})
				return
			}

			temperatureRange.push({
				lower: Math.floor(temperatureBreaks[index-1]+1),
				upper: Math.floor(temperatureBreaks[index]),
			})
		})

		setRangeData(temperatureRange);
	}

	const getColors = (inputParameters) => {
		const { dmcValues, rgbValues } = inputParameters
		const colorMapping = {}
		Object.keys(dmcValues).forEach((color) => {
			colorMapping[color] = {
				dmc: dmcValues[color],
				rgb: rgbValues[color],
			}
		})
		setColorData(colorMapping)
	}

	return (
		<div className="project-display">
			<div className='user-inputs'>
				<TemperatureInput getTemperatureData={ getTemperatureData }/>
				{!!temperatureData && <RangeInput getRange={ getRange }/>}
				{!!rangeData && <ColorInput
					getColors={ getColors }
					rangeData={ rangeData }
				/>}
			</div>
			<div className={ 'project' }>
				{!!colorData && <Project
					temperatureData={ temperatureData }
					rangeData={ rangeData }
					colorData={ colorData }
				/>}
			</div>
		</div>
	)
}