import React from 'react'

import RankingObject from '../components/RankingObject'

const Lending = () => {
  return (
    <div className="grid grid-cols-1 w-full text-md">

      <header className="text-center text-white pt-10 mb-5 text-4xl italic">
        Top Lending Protocols
      </header>

      <RankingObject chain='Lending' />

    </div>
  )
}

export default Lending
