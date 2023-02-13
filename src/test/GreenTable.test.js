import GreenTable from '../components/GreenTable'
import { render, screen } from '@testing-library/react'
import testData from './TestData'

const testHeaders = Object.keys(testData[0])

test('table and header have correct amount of rows', () => {
    const elementsPerPage = 3
    render(<GreenTable elementsPerPage={elementsPerPage} headers={testHeaders} data={testData}/>)

    const tableElement = screen.getByRole('table')

    const headerRow = tableElement.querySelector('thead > tr')

    const dataRows = tableElement.querySelectorAll('tbody > tr')

    const headers = headerRow.querySelectorAll('th')

    expect(headers.length).toBe(testHeaders.length)

    expect(dataRows.length).toBe(testData.length > elementsPerPage ? elementsPerPage : testData.length)
})

