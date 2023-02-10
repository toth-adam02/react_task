import React from 'react'
import './Pagination.css'

export default function Pagination(props) {

    let paginationElements = []
    for (let i = 0; i < props.pageCount; i++) {
        paginationElements.push(
            <li 
                className={props.activePage === i ? 'active' : ''}
                id={i}
                onClick={props.handleClick}
            >
                    {i+1}
            </li>
        )
    }

    return (
        <ul className="pagination" id="pagination">
            {paginationElements}
        </ul>
    )
}