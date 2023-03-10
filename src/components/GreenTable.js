import React, {useState} from 'react'
import './styles/GreenTable.css'
import Pagination from './Pagination'

export default function GreenTable(props) {

    const [activePage, setActivePage] = useState(0)

    const headerElements = props.headers.map(header => <th>{header}</th>)

    const slicedData = props.data.slice(activePage * props.elementsPerPage, (activePage + 1) * props.elementsPerPage)

    const rowElements = slicedData.map(dataObject => {
        const cellElements = Object.values(dataObject).map(value => <td key={value.applicationId + ' ' + value.version}>{value}</td>)
        return (
            <tr>
                {cellElements}
            </tr>
        )
    })
    
    const pageCount = Math.floor(props.data.length / props.elementsPerPage) + (props.data.length % props.elementsPerPage === 0 ? 0 : 1)
    
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