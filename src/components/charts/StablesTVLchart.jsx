import React, {useState, useEffect} from 'react'
import { ChartComponent, LineSeries, ColumnSeries, SeriesDirective, SeriesCollectionDirective, Inject, DataLabel, DateTime, Legend, Tooltip, Category } from '@syncfusion/ej2-react-charts'

import axios from 'axios'
import Loader from '../Loader'
import { Formatter } from '../../utilities/Formatter'
import { UnixConverter } from '../../utilities/UnixConverter'

const StablesTVLchart = () => {

  const [stable, setStables] = useState([]);
  const [lastDay, setLastDay] = useState();
  const [day, setDay] = useState();

  useEffect(() => {
    axios.get('https://stablecoins.llama.fi/stablecoincharts/all?stablecoin=1')
      .then(res => {
        const stables = res.data;
        const dates = stables.map(item => UnixConverter(item.date));        
        const totalCirculating = stables.map(item => item.totalCirculatingUSD);
        const totalPegged = totalCirculating.map(item => item.peggedUSD);
        const datasource = totalPegged.map((value, index) => ({ date: dates[index], value }));

        setStables(datasource);
        
        setLastDay(datasource[767].value)
        setDay(datasource[768].value)
      })
      .catch(err => {
        console.log(err)
      });
  }, []);

  const primaryxAxis = { valueType: 'Category', visible: false}
  const primaryyAxis = { visible: false, rangePadding: 'Additional', labelFormat: 'c2' }
  const legendSettings = { visible: true, textStyle: { color: 'white' } }
  const tooltip = {enable: true}
  const palette = ["skyblue"]
  
  const num1 = parseFloat(day).toFixed(2)
  const num2 = parseFloat(lastDay).toFixed(2)

  const dollarChange = (num1 - num2).toFixed(2)
  const percentageChange = (((num1 - num2) / num2) * 100).toFixed(2)

  return (
    <>
    {stable.length ?
      <div className="flex flex-col lg:flex-row">

      <div className="flex flex-col w-full lg:w-[30%] gap-4 lg:gap-8 lg:p-2 text-4xl">
        
        <div className="flex sm:flex-row lg:flex-col justify-evenly border border-gray-600 w-full h-full lg:py-10 py-2 px-4 rounded-xl md:items-center lg:items-start">
          <div >Total Value Locked</div>
          <div className="text-blue-500">{'$' + Formatter(stable[768].value)}</div>
        </div>
          
        <div className="flex sm:flex-row lg:flex-col justify-evenly border border-gray-600 w-full h-full lg:py-10 py-2 px-4 rounded-xl md:items-center lg:items-start">
              <div>24h Change</div>
              <div className="">
              {percentageChange > 0 ?
                <div className="text-green-500">+{percentageChange}%</div>
                : <div className="text-red-500">{percentageChange + '%'}</div>
              }
              {dollarChange > 0 ?
                <div className="text-green-500">{'+$' + Formatter(dollarChange)}</div>
                : <div className="text-red-500">{'-$' + Formatter(dollarChange.slice(1, 14))}</div>
              }
              </div>
          </div>
        
      </div>

      <div className="resize lg:w-[70%] my-2 rounded-xl border border-gray-600">
      <ChartComponent id="charts" primaryXAxis={primaryxAxis} primaryYAxis={primaryyAxis} palettes={palette} legendSettings={legendSettings} tooltip={tooltip} useGroupingSeparator={true}>

        <Inject services={[ColumnSeries, Tooltip, LineSeries, DataLabel, Category, DateTime, Legend]} />
      
        <SeriesCollectionDirective>
          <SeriesDirective dataSource={stable} xName='date' yName='value' legendShape='Circle' />
        </SeriesCollectionDirective>
      
        </ChartComponent>
      </div>
      </div> : <Loader />
    }
    </>
  )
}

export default StablesTVLchart

