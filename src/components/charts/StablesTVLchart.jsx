import React, {useState, useEffect} from 'react'
import { ChartComponent, LineSeries, ColumnSeries, SeriesDirective, SeriesCollectionDirective, Inject, DataLabel, DateTime, Legend, Tooltip, Category } from '@syncfusion/ej2-react-charts'
import axios from 'axios'

const StablesTVLchart = () => {

  const [protocols, setProtocols] = useState([])
  
  const datadate = new Array;
  const totalCirculating = new Array;
  const totalPegged = new Array;
  const datasource = [];

  useEffect(() => {
    axios.get('https://stablecoins.llama.fi/stablecoincharts/all?stablecoin=1')
      .then(res => {

        const data = res.data
        setProtocols(data)
        

        for (var i = 0; i < protocols.length; i++){
          datadate.push(parseFloat(protocols[i].date))
          totalCirculating.push(data[i].totalCirculatingUSD)
        }

        for (var y = 0; y < totalCirculating.length; y++){
          totalPegged.push(totalCirculating[y].peggedUSD)
        }
        
        for (var e = 0; e < datadate.length; e++){
          datasource.push({ date: datadate[e], value: totalPegged[e] })
        }
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

  console.log(datasource)
  return (
    <div className="w-full">
    <ChartComponent id="charts" primaryXAxis={primaryxAxis} primaryYAxis={primaryyAxis} palettes={palette} legendSettings={legendSettings} tooltip={tooltip}>

      <Inject services={[ColumnSeries, Tooltip, LineSeries, DataLabel, Category, DateTime, Legend]} />
      
      <SeriesCollectionDirective>
        <SeriesDirective dataSource={datasource} xName='date' yName='value' legendShape='Circle' name='Total Value Locked in USD'/>
      </SeriesCollectionDirective>
      
      </ChartComponent>
    </div>
  )
}

export default StablesTVLchart
