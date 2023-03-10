import { render } from '@testing-library/react';
import React, { useState, useEffect } from 'react'
import './App.css';
import TableWithForm from './components/TableWithForm';

function App() {

  const url = 'http://localhost:5000'

  const defaultLimit = 5

  const defaultOffset = 0

  const tables = ['applications', 'global-applications', 'org-applications']

  const defaultFormDataObject = tables.reduce((formAccumulator, table) => ({
    ...formAccumulator,
    [table]: {
      'limit': defaultLimit,
      'offset': defaultOffset,
    },
  }), {})

  const [dataFromCsv, setDataFromCsv] = useState()

  const [tableFormData, setTableFormData] = useState(defaultFormDataObject)

  const [isLoading, setIsLoading] = useState(true)

  const [isError, setIsError] = useState(false)

  async function fetchData(endpoint, limit, offset) {
    return fetch(`${url}/${endpoint}?limit=${limit}&offset=${offset}`)
      .catch(() => setIsError(true))
      .then(resp => resp.json())
      .then(data => setDataFromCsv(prev => ({
        ...prev,
        [endpoint]: data
      })))
  }

  function handleTableFormChange(event, id) {
    const { name, value } = event.target
    setTableFormData(prev => ({
      ...prev,
      [id]: {
        ...prev[id],
        [name]: value >= 0 ? value : 0,
      }
    }))
  }

  function handleTableFormSubmit(event, id) {
    event.preventDefault()
    fetchData(id, tableFormData[id].limit, tableFormData[id].offset)
  }

  useEffect(() => {
    const promises = []
    for (const table of tables) {
      promises.push(fetchData(table, defaultLimit, defaultOffset))
    }
    Promise.all(promises)
      .then(() => setIsLoading(false))
  }, [])

  let tableElements = []
  if (!isLoading) {
    tableElements = tables.map(table => (
      <TableWithForm
        key={table}
        id={table}
        elementsPerPage={5}
        tableData={{
          headers: Object.keys(dataFromCsv[table][0]),
          data: dataFromCsv[table]
        }}
        handleChange={handleTableFormChange}
        handleSubmit={handleTableFormSubmit}
        limit={tableFormData[table].limit}
        offset={tableFormData[table].offset}
      />
    ))
  }

  function renderComponent() {
    if (isError) {
      return <h1>Error</h1>
    } else {
      return (
        !isLoading && tableElements
      )
    }
  }

  return renderComponent()
}

export default App;
