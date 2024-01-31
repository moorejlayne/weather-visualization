import { useState } from 'react';
import { dmcData } from '../resources/DMC-data';

export const ColorInput = (props) => {
	const { rangeData } = props

	const defaultDmcState = {
		'color-0': '3813',
		'color-1': '3766',
		'color-2': '597',
		'color-3': '597',
		'color-4': '3765',
		'color-5': '3765',
		'color-6': '3750',
		'color-7': '823',
		'color-8': '500',
		'color-9': '319',
		'color-10': '991',
		'color-11': '987',
		'color-12': '3051',
		'color-13': '471',
		'color-14': '989',
		'color-15': '966',
	}

	const defaultRgbState = {}

	Object.values(defaultDmcState).forEach((item,index) => {
		defaultRgbState[`color-${index}`] = dmcData[item] ? dmcData[item]['RGB code'] : null
	})

	const [dmcValues, setDmcValues] = useState(defaultDmcState)
	const [rgbValues, setRgbValues] = useState(defaultRgbState)

	const handleChange = (event) => {
		const {	name, value } = event.target

		setDmcValues(previousValues => ({
			...previousValues,
			[name]: value,
		}))

		setRgbValues(previousValues => ({
			...previousValues,
			[name]: dmcData[value] ? dmcData[value]['RGB code'] : null,
		}))


	}
	const handleSubmit = (event) => {
		event.preventDefault()
		props.getColors({dmcValues, rgbValues})
	}

	const getRow = (range, index) => {
		return (
			<tr key={index}>
				<th scope={'row'}>{ `${range.lower} - ${range.upper}` }</th>
				<td><input name={`color-${index}`} type={'text'} className={'form-control'} onChange={ handleChange } value={dmcValues[`color-${index}`]}/></td>
				<td>
					<div style={{color: 'white', backgroundColor: `#${rgbValues[`color-${index}`]}`}}>
						{ rgbValues[`color-${index}`] }
					</div>
				</td>
			</tr>
		)
	}

	return (
		<form onSubmit={ handleSubmit }>
			<table className="table">
				<thead>
				<tr>
					<th scope={'col'}>Range</th>
					<th scope={'col'}>DMC</th>
					<th scope={'col'}>RGB</th>
				</tr>
				</thead>
				<tbody>
				{
					rangeData.map((range, index) => {
						return getRow(range, index)
					})
				}
				</tbody>
			</table>
			<div className={'form-button'}>
				<button type="submit" className='btn btn-primary'>Submit</button>
			</div>
		</form>
	)
}