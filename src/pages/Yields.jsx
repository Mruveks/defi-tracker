import React from 'react'
import YieldsRanking from '../components/YieldsRanking'

const Yields = () => {
  return (
    <div className="grid grid-cols-1 w-full text-md" >
      <header className="flex justify-center w-full text-white text-2xl italic">Yield Ranking</header>
      <YieldsRanking />
    </div>
  )
}

export default Yields
