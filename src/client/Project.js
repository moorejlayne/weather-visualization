export const Project = (props) => {
	const { temperatureData, rangeData, colorData } = props;

	const temperatureBreakpoints = rangeData.map((temperatureRange, index) => {
		if (index === 0) {
			return temperatureRange.upper
		}
		return temperatureRange.lower
	});

	const getTableSet = (temperature) => {
		return (
			<>
				<td>{ temperature }</td>
				<td style={ getStyles(temperature) }>{getColor(temperature, 'dmc')}</td>
			</>
		)
	}

	const getStyles = (temperature) => {
		return {
			color: 'white',
			backgroundColor: `#${getColor(temperature, 'rgb')}`
		}
	}

	const getColor = (temperature, type) => {
		let colorIndex = temperatureBreakpoints.findIndex((element,index,arr) => {
			if (index === 0) {
				return temperature < element
			}

			if (index === arr.length) {
				return temperature >= element
			}

			return (temperature >= element && temperature < arr[index+1])
		})

		if (colorIndex === -1) {
			colorIndex = 0
		}
		return colorData[`color-${colorIndex}`][type]
	}

	const getRow = (dailyData, index) => {
		return (
			<tr key={index}>
				<th scope={'row'}>{ dailyData.day }</th>
				{ getTableSet(dailyData.minTemperature) }
				{ getTableSet(dailyData.maxTemperature) }
				{ getTableSet(dailyData.meanTemperature) }
				{ getTableSet(dailyData.minFeelsLikeTemperature) }
				{ getTableSet(dailyData.maxFeelsLikeTemperature) }
				{ getTableSet(dailyData.meanFeelsLikeTemperature) }
			</tr>
		)
	}

	return (
		<table className="table">
			<thead>
			<tr>
				<th scope={'col'}>Date</th>
				<th scope={'col'}>Min Temp</th>
				<th scope={'col'}>Color</th>
				<th scope={'col'}>Max Temp</th>
				<th scope={'col'}>Color</th>
				<th scope={'col'}>Mean Temp</th>
				<th scope={'col'}>Color</th>
				<th scope={'col'}>Min Temp (Feels Like)</th>
				<th scope={'col'}>Color</th>
				<th scope={'col'}>Max Temp (Feels Like)</th>
				<th scope={'col'}>Color</th>
				<th scope={'col'}>Mean Temp (Feels Like)</th>
				<th scope={'col'}>Color</th>
			</tr>
			</thead>
			<tbody>
			{
				temperatureData.map((dailyData, index) => {
					return getRow(dailyData, index)
				})
			}
			</tbody>
		</table>
	)

}