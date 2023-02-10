import React from 'react'
import GreenTable from './GreenTable'

export default function TableWithForm(props) {
    return (
        <div>
            <form action="" onSubmit={(event) => props.handleSubmit(event, props.id)}>
                <label htmlFor="limit">Limit</label>
                <br />
                <input
                    type="number"
                    name="limit"
                    id="limit"
                    onChange={(event) => props.handleChange(event, props.id)}
                    value={props.limit}
                />
                <br />
                <label htmlFor="offset">Offset</label><br />
                <input
                    type="number"
                    name="offset"
                    id="offset"
                    onChange={(event) => props.handleChange(event, props.id)}
                    value={props.offset}
                />
                <br />
                <button name="submit" id="submit">Query</button>
            </form>
            <GreenTable key={props.id} headers={props.tableData.headers} data={props.tableData.data} />
        </div>
    )
}