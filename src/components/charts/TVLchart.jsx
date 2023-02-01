import React, {useState, useEffect} from 'react'
import { ChartComponent, LineSeries, ColumnSeries, SeriesDirective, SeriesCollectionDirective, Inject, DataLabel, DateTime, Legend, Tooltip, Category } from '@syncfusion/ej2-react-charts'
import axios from 'axios'

const TVLchart = () => {

  const [protocols, setProtocols] = useState([])

  useEffect(() => {
    axios.get('https://api.llama.fi/charts')
      .then(res => {
        setProtocols(res.data)
        console.log(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, []);



  const data = [
    { month: 'Jan', sales: 35 }, { month: 'Feb', sales: 28 },
    { month: 'Mar', sales: 34 }, { month: 'Apr', sales: 32 },
    { month: 'May', sales: 40 }, { month: 'Jun', sales: 32 },
    { month: 'Jul', sales: 35 }, { month: 'Aug', sales: 55 },
    { month: 'Sep', sales: 38 }, { month: 'Oct', sales: 30 },
    { month: 'Nov', sales: 25 }, { month: 'Dec', sales: 32 }
  ];
  
  const primaryxAxis = { valueType: 'Category' }
  const primaryyAxis = { labelFormat: '${value}K' };
  const legendSettings = { visible: true };
  const tooltip = { enable: true, shared: false };

  return (
    <ChartComponent id="charts" primaryXAxis={primaryxAxis} primaryYAxis={primaryyAxis} legendSettings={legendSettings} tooltip={tooltip}>

      <Inject services={[ColumnSeries, Tooltip, LineSeries, Category, DateTime]} />
      
      <SeriesCollectionDirective>
        <SeriesDirective dataSource={protocols} xName='date' yName='totalLiquidityUSD' name='TVL'/>
      </SeriesCollectionDirective>
      
    </ChartComponent>
  )
}

export default TVLchart
