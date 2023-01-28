import React, {useState, useEffect} from 'react'
import axios from 'axios'

import Loader from '../Loader';

const Avax = () => {

  const [protocols, setProtocols] = useState([]);

  useEffect(() => {
    axios.get('https://api.llama.fi/protocols')
      .then((res) => {
        let result = [];
        res.data.forEach((req) => {
          if (req.options.chain === 'Avalanche') {
            result.push(req)
          }
        })
        this.setProtocols({ results: results })
        console.log(protocols)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])
  return (

    <div className="h-max m-10 border rounded-xl border-gray-400 bg-gray-800 text-white">
    <div className="grid grid-cols-7 p-2 border-black border-b ">
      <header className="font-bold italic">Project</header>
      <header className="text-right font-bold italic">Category</header>
      <header className="text-right font-bold italic">Daily Fees</header>
      <header className="text-right font-bold italic">Daily Holder Revenue</header>
      <header className="text-right font-bold italic">Daily Protocol Revenue</header>
      <header className="text-right font-bold italic">Revenue</header>
      <header className="text-right font-bold italic">All time fees</header>
    </div>
    {protocols ?
      (
        protocols.map(protocol =>
          `${console.log(protocol.chain)}`

          )
      )
        : (<Loader />)}


  </div>
  )
}

export default Avax
