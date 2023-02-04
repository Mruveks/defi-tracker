import React, {useState, useEffect} from 'react'
import { ChartComponent, LineSeries, ColumnSeries, SeriesDirective, SeriesCollectionDirective, Inject, DataLabel, DateTime, Legend, Tooltip, Category } from '@syncfusion/ej2-react-charts'
import axios from 'axios'

const StablesTVLchart = () => {

  const [stable, setStables] = useState([])
  
  const datadate = new Array;
  const totalCirculating = new Array;
  const totalPegged = new Array;
  const datasource = [];

  useEffect(() => {
    axios.get('https://stablecoins.llama.fi/stablecoincharts/all?stablecoin=1')
      .then(res => {
        const stables = res.data;
        const dates = stables.map(item => parseFloat(item.date));
        const totalCirculating = stables.map(item => item.totalCirculatingUSD);
        const totalPegged = totalCirculating.map(item => item.peggedUSD);
        const datasource = totalPegged.map((value, index) => ({ date: dates[index], value }));
        setStables(datasource);
      })
      .catch(err => {
        console.log(err)
      });
  }, []);

    console.log(stable)

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
        <SeriesDirective dataSource={stable} xName='date' yName='value' legendShape='Circle' name='Total Value Locked in USD'/>
      </SeriesCollectionDirective>
      
      </ChartComponent>
    </div>
  )
}

export default StablesTVLchart
