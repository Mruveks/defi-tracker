import React from 'react'

import TVLranking from '../components/TVLranking'

const Home = () => {
  return (
    <div className="grid grid-cols-1 w-full">
      <header className="flex justify-center w-full text-white text-2xl italic">Protocols TVL Ranking</header>

      <TVLranking />
    </div>
  )
}

export default Home
