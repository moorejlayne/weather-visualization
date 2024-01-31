import { useState } from 'react';

export const Form = (props) => {

	const [formData, setFormData] = useState(props.defaultState || null)

	const handleChange = (event) => {
		const {	name, value } = event.target

		setFormData(previousFormData => ({
			...previousFormData,
			[name]: value,
		}))
	}

	const handleSubmit = event => {
		event.preventDefault()
		props.onSubmit(formData)
	}


	const getFormElement = (name, text, type) => {
		return (<div className='col'>
			<label className='form-label' htmlFor={ name }>{ text }</label>
			<input className='form-control' type={ type } id={ name } name={ name }
			       value={ formData[name] } onChange={ handleChange }/>
		</div>)
	}

	const getFormContent = formData => {
		return formData.map((row,index) => {
			return (
				<>
					<h1 key={index} className={ 'header' }>{row.title}</h1>
					<div className={ `row ${row.class}` }>
						{row.columns.map(column => {
							return getFormElement(column.name, column.text, column.type)
						})}
					</div>
				</>
			)
		})
	}

	return (
		<form onSubmit={ handleSubmit }>
			{ getFormContent(props.formData) }
			<div className={'form-button'}>
				<button type="submit" className='btn btn-primary'>Submit</button>
			</div>
		</form>
	)

}