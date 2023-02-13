import React from 'react'
import './styles/Pagination.css'

export default function Pagination(props) {

    let paginationElements = []
    for (let i = 0; i < props.pageCount; i++) {
        paginationElements.push(
            <li
                key={i} 
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