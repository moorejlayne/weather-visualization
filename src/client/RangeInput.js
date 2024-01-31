import { Form } from './Form';

export const RangeInput = (props) => {
	const defaultState = {
		minTemp: -15,
		maxTemp: 104,
		numberOfColors: 16,
	}

	const formData = [
		{
			title: 'Enter Your Temperature Range',
			class: 'range-input',
			columns: [
				{ name: 'minTemp', text: 'Min Temp Threshold', type: 'number' },
				{ name: 'maxTemp', text: 'Max Temp Threshold', type: 'number' },
				{ name: 'numberOfColors', text: 'Number of Colors', type: 'number' },
			],
		},
	]

	return (
		<Form
			defaultState={ defaultState }
			formData={ formData }
			onSubmit={ props.getRange }
		/>
	)
}