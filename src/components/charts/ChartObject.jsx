import React, {useState, useEffect} from 'react'
import { ChartComponent, LineSeries, ColumnSeries, SeriesDirective, SeriesCollectionDirective, Inject, DataLabel, DateTime, Legend, Tooltip, Category } from '@syncfusion/ej2-react-charts'
import axios from 'axios'

import Loader from '../Loader'
import { Formatter } from '../../utilities/Formatter'
import { UnixConverter } from '../../utilities/UnixConverter'

const ChartObject = ({chain}) => {

  const [protocols, setProtocols] = useState([])
  const [lastDay, setLastDay] = useState()
  const [day, setDay] = useState()

  useEffect(() => {
    axios.get(`https://api.llama.fi/charts/${chain}`)
      .then(res => {
        const data = res.data
        const dates = data.map(item => UnixConverter(item.date));
        const values = data.map(item => item.totalLiquidityUSD)

        const datasource = values.map((value, index) => ({ date: dates[index], value }));
        setProtocols(datasource)

        const today = datasource.slice(datasource.length - 1, datasource.length)
        const yesterday = datasource.slice(datasource.length - 2, datasource.length - 1)

        setLastDay(yesterday[0].value)
        setDay(today[0].value)
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
        (<div className="flex justify-between">

        <div className="items-center w-[20%] p-2 flex flex-col justify-between gap-8">
          
          <div className="border border-white w-full h-full text-xl text-left py-10 px-4 bg-gray-800 rounded-xl">
              <div className="text-2xl pb-2">Total Value Locked</div>
              <div className="text-4xl pb-2 text-blue-500">{'$' + Formatter(num2)}</div>
          </div>
            
          <div className="border border-white w-full h-full text-xl text-left py-10 px-4 bg-gray-800 rounded-xl">
              <div className="text-2xl pb-2">24h Change</div>
              {percentageChange > 0 ? (<div className="text-green-500 text-4xl pb-2">+{percentageChange}%</div>) : (<div className="text-red-500 text-4xl pb-2">{ percentageChange }%</div>) }
              {dollarChange > 0 ? (<div className="text-green-500 text-4xl pb-2">{'+$' + Formatter(dollarChange)}</div>) : (<div className="text-red-500 text-4xl pb-2">${Formatter(dollarChange)}</div>) }
          </div>
          
        </div>

        <div className="bg-gray-800 border-white border w-[80%] my-2 rounded-xl">
        <ChartComponent id="charts" primaryXAxis={primaryxAxis} primaryYAxis={primaryyAxis} palettes={palette} legendSettings={legendSettings} tooltip={tooltip}>

          <Inject services={[ColumnSeries, Tooltip, LineSeries, DataLabel, Category, DateTime]} />
      
          <SeriesCollectionDirective>
            <SeriesDirective dataSource={protocols} xName='date' yName='value' legendShape='Circle' name="Total Locked" />
          </SeriesCollectionDirective>
      
        </ChartComponent>
        </div>
        </div>) : (<Loader />)
      }
      </>
  )
}

export default ChartObject
