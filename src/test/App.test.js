import App from '../App'
import { screen, render, waitFor, fireEvent } from '@testing-library/react'
import testData from './TestData'


let mockedFetch

beforeEach(() => {
    mockedFetch = jest.spyOn(global, 'fetch').mockResolvedValue({
        json: () => testData,
    })
})

afterEach(() => {
    jest.restoreAllMocks()
})

test('page has correct amount of tables', async () => {
    render(<App />)

    await waitFor(() => {
        expect(screen.getAllByRole('table').length).toBe(3)
    })
})

test('pushing button calls fetch', async () => {
    render(<App />)

    await waitFor(() => {
        const buttons = screen.getAllByText('Query')
        fireEvent.click(buttons[0])
        expect(mockedFetch).toBeCalled()
    })
})

test('limit cant be less than zero', async () => {
    render(<App />)

    await waitFor(() => {
        const inputs = screen.getAllByLabelText('Limit')
        inputs.forEach((input) => {
            fireEvent.change(input, {target: {value: -5}})
            expect(input.value).toBe("0")
        })
    })
})

test('offset cant be less than zero', async () => {
    render(<App />)

    await waitFor(() => {
        const offsets = screen.getAllByLabelText('Offset')
        offsets.forEach((offset) => {
            fireEvent.change(offset, {target: {value: -5}})
            expect(offset.value).toBe("0")
        })
    })
})

test('limit changes correctly', async () => {
    render(<App />)

    await waitFor(() => {
        const inputs = screen.getAllByLabelText('Limit')
        inputs.forEach((input) => {
            fireEvent.change(input, {target: {value: 7}})
            expect(input.value).toBe("7")
        })
    })
})

test('offset changes correctly', async () => {
    render(<App />)

    await waitFor(() => {
        const offsets = screen.getAllByLabelText('Offset')
        offsets.forEach((offset) => {
            fireEvent.change(offset, {target: {value: 15}})
            expect(offset.value).toBe("15")
        })
    })
})
