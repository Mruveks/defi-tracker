import React from 'react'
import YieldsRanking from '../components/YieldsRanking'

const Yields = () => {
  return (
    <div className="grid grid-cols-1 w-full text-md" >
      
      <header className="text-center text-white pt-10 mb-10 text-4xl italic">
        Yields Ranking
      </header>
      <YieldsRanking />
    </div>
  )
}

export default Yields
