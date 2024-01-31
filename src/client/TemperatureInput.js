import { Form } from './Form';

export const TemperatureInput = (props) => {
	const defaultState = {
		latitude: 53.2146,
		longitude: -8.26767,
		startDate: '2022-01-01',
		endDate: '2022-01-03',
	}

	const formData = [
		{
			title: 'Enter Your Location',
			class: 'location-input',
			columns: [
				{ name: 'latitude', text: 'Latitude', type: 'number' },
				{ name: 'longitude', text: 'Longitude', type: 'number' },
			],
		},
		{
			title: 'Enter Your Date Range',
			class: 'date-input',
			columns: [
				{ name: 'startDate', text: 'Start Date (YYYY-MM-DD)', type: 'text' },
				{ name: 'endDate', text: 'End Date (YYYY-MM-DD)', type: 'text' },
			],
		},
	]

	return (
		<Form
			defaultState={ defaultState }
			formData={ formData }
			onSubmit={ props.getTemperatureData }
		/>
	)
}