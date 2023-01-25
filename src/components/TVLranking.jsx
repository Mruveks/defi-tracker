import React, { useState, useEffect} from 'react'
import axios from 'axios';

const TVLranking = () => {

  const [protocols, setProtocols] = useState([])

  const six = 66666;

  useEffect(() => {
    axios.get('https://api.llama.fi/protocols', {
      params: {
        _limit: "10"
      }
    })
      .then(res => {
        setProtocols(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, []);

  return (
    <div className=" h-auto grid grid-rows-1">
      <div className="flex p-2  text-center justify-between">
        <header>Name</header>
        <header>Category</header>
        <header>Chains</header>
        <header>1d Change</header>
        <header>7d Change</header>
        <header>30d Change</header>
        <header>TVL</header>
        <header>Mcap/TVL</header>
      </div>
        {
          protocols.map(protocol =>
            <div
              className="flex p-2 bg-blue-400 text-center "
              key={protocol.id}
            >
              <img src={protocol.logo} alt="logo" className="h-8 w-8 rounded-full" />
              <a href={protocol.url} alt="site" className="px-2 my-auto rounded-xl hover:bg-gray-400">{protocol.name}</a>
              <span>{ parseInt(six)}</span>
            </div>)
        }
    </div>
  )
}

export default TVLranking
