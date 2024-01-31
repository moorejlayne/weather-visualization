// https://open-meteo.com/en/docs/historical-weather-api

export const getData = async (inputParameters) => {
	const url = getUrl(inputParameters)
	const response = await fetch(url)
	if (!response.ok) {
		return
	}

	const rawData = await response.json()
	return mapData(rawData)
}

export const getUrl = ({ latitude, longitude, startDate, endDate}) => {
	return `https://archive-api.open-meteo.com/v1/archive?latitude=${latitude}&longitude=${longitude}&start_date=${startDate}&end_date=${endDate}&daily=weather_code,temperature_2m_max,temperature_2m_min,temperature_2m_mean,apparent_temperature_max,apparent_temperature_min,apparent_temperature_mean,rain_sum,snowfall_sum,wind_speed_10m_max&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch&timezone=America%2FChicago`
	// date format: 2022-01-01
}

const mapData = data => {
	const mappedData = []
	const dailyData = data.daily
	dailyData.time.forEach((day,index) => {
		mappedData.push({
			day,
			weatherCode: dailyData['weather_code'][index],
			maxTemperature: dailyData['temperature_2m_max'][index],
			minTemperature: dailyData['temperature_2m_min'][index],
			meanTemperature: dailyData['temperature_2m_mean'][index],
			maxFeelsLikeTemperature: dailyData['apparent_temperature_max'][index],
			minFeelsLikeTemperature: dailyData['apparent_temperature_min'][index],
			meanFeelsLikeTemperature: dailyData['apparent_temperature_mean'][index],
			rainFall: dailyData['rain_sum'][index],
			snowFall: dailyData['snowfall_sum'][index],
			maxWindSpeed: dailyData['wind_speed_10m_max'][index],
		})
	})
	return mappedData
}