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

  const primaryxAxis = { valueType: 'Category', visible: false }
  const primaryyAxis = { labelFormat: '${value}K', visible: false }
  const legendSettings = { visible: true, textStyle: { color: 'white' } }
  const tooltip = { enable: true, shared: false }

  const palette = ["skyblue"]



  return (
    <div className="flex justify-center">
    <ChartComponent id="charts" primaryXAxis={primaryxAxis} primaryYAxis={primaryyAxis} palettes={palette} legendSettings={legendSettings} tooltip={tooltip}>

      <Inject services={[ColumnSeries, Tooltip, LineSeries, DataLabel, Category, DateTime, Legend]} />
      
      <SeriesCollectionDirective>
        <SeriesDirective dataSource={protocols} xName='date' yName='totalLiquidityUSD' legendShape='Circle' name='Total Value Locked in USD'/>
      </SeriesCollectionDirective>
      
      </ChartComponent>
    </div>
  )
}

export default TVLchart
