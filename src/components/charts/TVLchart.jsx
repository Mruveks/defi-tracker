import React, {useState, useEffect} from 'react'
import { ChartComponent, LineSeries, ColumnSeries, SeriesDirective, SeriesCollectionDirective, Inject, DataLabel, DateTime, Legend, Tooltip, Category } from '@syncfusion/ej2-react-charts'
import axios from 'axios'

import Loader from '../Loader'
import { Formatter } from '../../utilities/Formatter'
import { UnixConverter } from '../../utilities/UnixConverter'

const TVLchart = () => {

  const [protocols, setProtocols] = useState([])
  const [lastDay, setLastDay] = useState()
  const [day, setDay] = useState()

  useEffect(() => {
    axios.get('https://api.llama.fi/charts')
      .then(res => {
        const data = res.data
        const dates = data.map(item => UnixConverter(item.date));
        const datasource = data.map((value, index) => ({ date: dates[index], value: JSON.parse(Formatter(value.totalLiquidityUSD)) }));

        console.log(datasource)
        console.log(data)

        setProtocols(data)
        setLastDay(res.data[1632].totalLiquidityUSD)
        setDay(res.data[1631].totalLiquidityUSD)
      })
      .catch(err => {
        console.log(err)
      })
  }, []);

  const primaryxAxis = { valueType: 'Double', minimum: 1, maximum: 1000, interval: 100 }
  const primaryyAxis = { labelFormat: '${value}K'}
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
        (<div className="flex justify-between">

        <div className="items-center w-[20%] p-2 flex flex-col justify-between gap-8">
          
          <div className="border border-gray-500 w-full h-full text-xl text-left py-10 px-4 bg-gray-800 rounded-xl">
              <div className="text-2xl pb-2">Total Value Locked</div>
              <div className="text-4xl pb-2 text-blue-500">{'$' + Formatter(num2)}</div>
          </div>
            
          <div className="border border-gray-500 w-full h-full text-xl text-left py-10 px-4 bg-gray-800 rounded-xl">
              <div className="text-2xl pb-2">24h Change</div>
              {percentageChange > 0 ? (<div className="text-green-500 text-4xl pb-2">+{percentageChange}%</div>) : (<div className="text-red-500 text-4xl pb-2">{ percentageChange }%</div>) }
              {dollarChange > 0 ? (<div className="text-green-500 text-4xl pb-2">{'+$' + Formatter(dollarChange)}</div>) : (<div className="text-red-500 text-4xl pb-2">{dollarChange}$</div>) }
          </div>
          
        </div>

        <div className="bg-gray-800 w-[80%] my-2 rounded-xl">
        <ChartComponent id="charts" primaryXAxis={primaryxAxis} primaryYAxis={primaryyAxis} palettes={palette} legendSettings={legendSettings} tooltip={tooltip}>

          <Inject services={[ColumnSeries, Tooltip, LineSeries, DataLabel, Category, DateTime]} />
      
          <SeriesCollectionDirective>
            <SeriesDirective dataSource={protocols} xName='date' yName='totalLiquidityUSD' type="line"/>
          </SeriesCollectionDirective>
      
        </ChartComponent>
        </div>
        </div>) : (<Loader />)
      }
      </>
  )
}

export default TVLchart
