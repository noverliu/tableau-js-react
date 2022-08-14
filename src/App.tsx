import { useCallback } from 'react'
import Tableau, { TableauProps } from './Tableau';

function App() {
  const onMarkSelected = useCallback((event) => {
    console.log(event);
  }, []);
  const dbProps: TableauProps = {
    url: 'https://public.tableau.com/views/RegionalSampleWorkbook/Storms',
    onMarkSelected,
    autoResize: true
  };
  return (
    <div className="App">
      <Tableau {...dbProps} />
    </div>
  )
}

export default App
