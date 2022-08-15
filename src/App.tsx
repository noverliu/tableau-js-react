import React, { useCallback, FC } from 'react'
import Tableau, { TableauProps } from './Tableau'

const App: FC = () => {
  const onMarkSelected = useCallback((event) => {
    console.log(event)
  }, [])
  const onFilterChanged = useCallback((event) => {
    console.log(event)
  })
  const dbProps: TableauProps = {
    url: 'https://public.tableau.com/views/RegionalSampleWorkbook/Storms',
    onMarkSelected,
    onFilterChanged,
    autoResize: true
  }
  return (
    <div className="App">
      <Tableau {...dbProps} />
    </div>
  )
}

export default App
