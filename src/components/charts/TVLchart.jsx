import React, {useState, useEffect} from 'react'
import { ChartComponent, LineSeries, ColumnSeries, SeriesDirective, SeriesCollectionDirective, Inject, DataLabel, DateTime, Legend, Tooltip, Category } from '@syncfusion/ej2-react-charts'

import axios from 'axios'
import Loader from '../Loader'

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


  const n = 2;
  const day1 = protocols[1631]
  const day2 = protocols[1632]
  const num1 = parseFloat(day1.totalLiquidityUSD).toFixed(2);
  const num2 = parseFloat(day2.totalLiquidityUSD).toFixed(2);
  const dollarChange = (num1 - num2).toFixed(2);
  const percentageChange = (((num1 - num2) / num2) * 100).toFixed(2);
  
  return (
    <>
      {protocols.length ?
        (<div className="grid grid-cols-[1fr,2fr]">

        <div className="grid grid-cols-1 items-center mx-auto">
          
          <div>
              <div className=" bg-blue-300 rounded">Total Locked USD</div>
              <div></div>
          </div>
            
          <div>
              <div>24h change</div>
              {percentageChange > 0 ? (<div className="text-green-500">+{percentageChange} %</div>) : (<div className="text-red-500">{ percentageChange }%</div>) }
              {dollarChange > 0 ? (<div className="text-green-500">+{dollarChange} $</div>) : (<div className="text-red-500">{dollarChange}$</div>) }
          </div>
          
        </div>

        <div className="pl-10">
        <ChartComponent id="charts" primaryXAxis={primaryxAxis} primaryYAxis={primaryyAxis} palettes={palette} legendSettings={legendSettings} tooltip={tooltip}>

          <Inject services={[ColumnSeries, Tooltip, LineSeries, DataLabel, Category, DateTime, Legend]} />
      
          <SeriesCollectionDirective>
            <SeriesDirective dataSource={protocols} xName='date' yName='totalLiquidityUSD' legendShape='Circle' name='Total Value Locked in USD' />
          </SeriesCollectionDirective>
      
        </ChartComponent>
        </div>
        </div>) : (<Loader />)
      }
      </>
  )
}

export default TVLchart
