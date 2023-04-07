import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import SearchList from '../../components/SearchList';
import { UnixConverter } from '../../utilities/UnixConverter';
import ChartObject from '../../components/charts/ChartObject';
import { ChartComponent, LineSeries, ColumnSeries, SeriesDirective, SeriesCollectionDirective, Inject, DataLabel, DateTime, Legend, Tooltip, Category } from '@syncfusion/ej2-react-charts'

const ProtocolPage = () => {
  const { protocolId } = useParams(); // get the protocol ID from the URL params

  const [protocolData, setProtocolData] = useState([]);

  let formattedProtocolId = protocolId.replace(/ /g, '-').toLowerCase();

  useEffect(() => {
    axios.get(`https://api.llama.fi/protocol/${formattedProtocolId}`)
      .then(res => {
        const data = [res.data]; // convert the object to an array
        setProtocolData(data);
        console.log(protocolData);
      })
      .catch(err => {
        console.log(err);
      });
  }, [formattedProtocolId]);

  console.log(protocolData[0].tvl)
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
    <div>
      {/* Display the analytics data for the protocol here */}
      <div className="mt-10 mx-10">
        <SearchList />
      </div>

      <div>
      <ChartComponent id="charts" primaryXAxis={primaryxAxis} primaryYAxis={primaryyAxis} palettes={palette} legendSettings={legendSettings} tooltip={tooltip} useGroupingSeparator={true}>

          <Inject services={[ColumnSeries, LineSeries, DataLabel, Category, DateTime, Tooltip]} />
      
          <SeriesCollectionDirective>
            <SeriesDirective dataSource={protocolData[0].tvl} xName='date' yName='totalLiquidityUSD' legendShape='Circle' />
          </SeriesCollectionDirective>
      
        </ChartComponent>
        </div>

      <div className="text-center text-white pt-10 mb-5 text-4xl italic capitalize">
        {protocolId}
        <div>
          {protocolData.map(protocol => (
            <div key={protocol.id} className="grid">
              <img src={protocol.img} alt={protocol.name} className="" />
              <p>Created at: <UnixConverter date={protocol.listedAt}/></p>
              <p>{protocol.chains}</p>
              <p>{protocol.chain}</p>
              <p>{protocol.mcap}</p>
              <p>{protocol.address}</p>
              <p>{protocol.description}</p>
              <p>Audits: {protocol.audits}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProtocolPage;
