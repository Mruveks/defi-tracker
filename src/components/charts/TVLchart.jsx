import React, {useState, useEffect} from 'react'
import { ChartComponent, LineSeries, ColumnSeries, SeriesDirective, SeriesCollectionDirective, Inject, DataLabel, DateTime, Legend, Tooltip, Category } from '@syncfusion/ej2-react-charts'

import axios from 'axios'
import Loader from '../Loader'
import {Formatter} from '../../utilities/Formatter'

const TVLchart = () => {

  const [protocols, setProtocols] = useState([])
  const [lastDay, setLastDay] = useState()
  const [day, setDay] = useState()

  useEffect(() => {
    axios.get('https://api.llama.fi/charts')
      .then(res => {
        setProtocols(res.data)
        setLastDay(res.data[1632].totalLiquidityUSD)
        setDay(res.data[1631].totalLiquidityUSD)
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

  
  

  const num1 = parseFloat(day).toFixed(2)
  const num2 = parseFloat(lastDay).toFixed(2)
  
  const dollarChange = (num1 - num2).toFixed(2)
  const percentageChange = (((num1 - num2) / num2) * 100).toFixed(2)

  return (
    <>
      {protocols.length ?
        (<div className="grid grid-cols-[1fr,2fr]">

        <div className="grid grid-cols-1 w-48 items-center mx-auto">
          
          <div className="border border-blue-400 rounded text-right p-2">
              <div className="text-xl">Total Value Locked</div>
              <div>{Formatter(num2)} $</div>
          </div>
            
          <div className="border border-blue-400 rounded text-right p-2">
              <div className="text-xl">24h change</div>
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
