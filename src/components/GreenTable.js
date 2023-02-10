import React, {useState, useEffect} from 'react'
import './GreenTable.css'
import Pagination from './Pagination'

export default function GreenTable(props) {

    const [activePage, setActivePage] = useState(0)

    const headerElements = props.headers.map(header => <th>{header}</th>)

    const slicedData = props.data.slice(activePage * 5, activePage * 5 + 5)

    const rowElements = slicedData.map(dataObject => {
        const cellElements = Object.values(dataObject).map(value => <td key={value.applicationId}>{value}</td>)
        return (
            <tr>
                {cellElements}
            </tr>
        )
    })
    
    const pageCount = Math.floor(props.data.length / 5) + (props.data.length % 5 === 0 ? 0 : 1)
    
    console.log(activePage + ' ' + pageCount)
    
    function handlePageChange(event) {
        event.preventDefault()
        setActivePage(parseInt(event.target.id))
    }

    return (
        <div>
            <table className="green-table">
                <thead>
                    <tr>
                        {headerElements}
                    </tr>
                </thead>
                <tbody>
                        {rowElements}
                </tbody>
            </table>
            <Pagination
                pageCount={pageCount}
                activePage={activePage}
                handleClick={handlePageChange}
            />
        </div>
    )
}