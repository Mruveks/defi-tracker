import React from 'react'
import BridgesRanking from '../components/BridgesRanking'

const Bridges = () => {
  return (
    <div className="grid grid-cols-1 w-full text-md" >

      <header className="text-center  pt-10 mb-5 text-4xl italic">
        Top Bridges
      </header>


      <BridgesRanking />
    </div>
  )
}

export default Bridges
