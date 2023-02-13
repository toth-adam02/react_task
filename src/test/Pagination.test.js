import Pagination from '../components/Pagination'
import { render, screen } from '@testing-library/react';

test('correct number of pages get rendered', () => {
    const pageCount = 5
    render(<Pagination pageCount={pageCount} activePage='1'/>)
    const pageList = screen.getByRole('list')
    expect(pageList.childElementCount).toBe(pageCount)
})

test('correct page is active', () => {
    const pageCount = 5
    const activePage = 2
    render(<Pagination pageCount={pageCount} activePage={activePage}/>)
    const pageList = screen.getByRole('list')
    const pageElements = pageList.querySelectorAll('li')
    expect(pageElements[activePage].classList.contains('active')).toBe(true)
})