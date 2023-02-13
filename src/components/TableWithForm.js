import React from 'react'
import './styles/TableWithForm.css'
import GreenTable from './GreenTable'

export default function TableWithForm(props) {
    return (
        <div className='table-with-form'>
            <form action="" onSubmit={(event) => props.handleSubmit(event, props.id)} className='table-form'>
                <label htmlFor="limit">Limit</label>
                <br />
                <input
                    className='form-input'
                    type="number"
                    name="limit"
                    id="limit"
                    onChange={(event) => props.handleChange(event, props.id)}
                    value={props.limit}
                />
                <br />
                <label htmlFor="offset">Offset</label><br />
                <input
                    className='form-input'
                    type="number"
                    name="offset"
                    id="offset"
                    onChange={(event) => props.handleChange(event, props.id)}
                    value={props.offset}
                />
                <br />
                <button className="submit-form" name="submit" id="submit">Query</button>
            </form>
            <GreenTable key={props.id} elementsPerPage={props.elementsPerPage} headers={props.tableData.headers} data={props.tableData.data} />
        </div>
    )
}