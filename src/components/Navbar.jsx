import React,{useState} from 'react'
import { NavLink } from 'react-router-dom'

import {BsPercent, BsCoin, BsBank, BsCodeSlash, BsBarChart} from 'react-icons/bs'
import { GiRialtoBridge } from 'react-icons/gi'
import { RiHandCoinLine } from 'react-icons/ri'

import eth from '../assets/ethereum.png'
import bsc from '../assets/bsc.png'
import avax from '../assets/avalanche.png'
import polygon from '../assets/polygon.png'
import arbitrum from '../assets/arbitrum.png'
import optimism from '../assets/optimism.png'
import solana from '../assets/solana.png'
import algorand from '../assets/algorand.png'
import kava from '../assets/kava.png'
import ftm from '../assets/fantom.png'
import tron from '../assets/tron.png'


const Navbar = () => {

  const [activeNav, setActiveNav] = useState('/');

  return (
  <div className="w-full h-auto absolute left-0 ">
      
  <aside id="default-sidebar" className="w-48 fixed left-0 top-0 h-screen">
      <div className="px-4 py-4 overflow-y-auto mt-14 h-full">
      <ul className="space-y-2 mt-5 text-base ">
        <li>         
          <header className="flex items-center text-sm text-gray-400 ">Dashboards</header>
        </li>
        <li>
          <NavLink to="/" onClick={() => setActiveNav('/defi')}
            className={`${activeNav === '/defi' ? 'bg-gray-700' : ''} flex items-center p-1 rounded-lg hover:bg-gray-700`}
          ><BsBarChart className="mr-2"/>Defi</NavLink>
        </li>
        <li>
          <NavLink to="/stables" onClick={() => setActiveNav('/stables')}
            className={`${activeNav === '/stables' ? 'bg-gray-700' : ''} flex items-center p-1 rounded-lg hover:bg-gray-700`}
          ><BsCoin className="mr-2"/>Stables</NavLink>
        </li>
        <li>
          <NavLink to="/dex" onClick={() => setActiveNav('/dex')}
            className={`${activeNav === '/dex' ? 'bg-gray-700' : ''} flex items-center p-1 rounded-lg hover:bg-gray-700`}
          ><BsCodeSlash className="mr-2"/>Dex</NavLink>
        </li>
        <li>
          <NavLink to="/cex" onClick={() => setActiveNav('/cex')}
            className={`${activeNav === '/cex' ? 'bg-gray-700' : ''} flex items-center p-1 rounded-lg hover:bg-gray-700`}
          ><BsBank className="mr-2"/>Cex</NavLink>
        </li>
        <li>
          <NavLink to="/yields" onClick={() => setActiveNav('/yields')}
            className={`${activeNav === '/yields' ? 'bg-gray-700' : ''} flex items-center p-1 rounded-lg hover:bg-gray-700`}
          ><BsPercent className="mr-2"/>Yields</NavLink>
        </li>
        <li>
          <NavLink to="/bridges" onClick={() => setActiveNav('/bridges')}
            className={`${activeNav === '/bridges' ? 'bg-gray-700' : ''} flex items-center p-1 rounded-lg hover:bg-gray-700`}
          ><GiRialtoBridge className="mr-2"/>Bridges</NavLink>
        </li>
        <li>
          <NavLink to="/lending" onClick={() => setActiveNav('/lending')}
            className={`${activeNav === '/lending' ? 'bg-gray-700' : ''} flex items-center p-1 rounded-lg hover:bg-gray-700`}
          ><RiHandCoinLine className="mr-2"/>Lending</NavLink>
        </li>
      </ul>
      
      <div className="border-b-2 border-gray-600 mx-1 my-2"></div>
          
      <ul className="space-y-2 text-base ">
        <li>         
          <header className="flex items-center p-1 text-sm text-gray-400 ">Top Chains</header>
        </li>
        <li>
          <NavLink to="/ethereum" onClick={() => setActiveNav('/ethereum')}
            className={`${activeNav === '/ethereum' ? 'bg-gray-700' : ''} flex items-center p-1 rounded-lg hover:bg-gray-700`}
          ><img src={eth} alt="" className="rounded-full mr-2" />Ethereum</NavLink>
        </li>
        <li>
          <NavLink to="/bsc" onClick={() => setActiveNav('/bsc')}
            className={`${activeNav === '/bsc' ? 'bg-gray-700' : ''} flex items-center p-1 rounded-lg hover:bg-gray-700`}
          ><img src={bsc} alt="" className="rounded-full mr-2" />Bsc</NavLink>
        </li>
        <li>
          <NavLink to="/avalanche" onClick={() => setActiveNav('/avalanche')}
            className={`${activeNav === '/avalanche' ? 'bg-gray-700' : ''} flex items-center p-1 rounded-lg hover:bg-gray-700`}
          ><img src={avax} alt="" className="rounded-full mr-2" />Avalanche</NavLink>
        </li>
        <li>
          <NavLink to="/polygon" onClick={() => setActiveNav('/polygon')}
            className={`${activeNav === '/polygon' ? 'bg-gray-700' : ''} flex items-center p-1 rounded-lg hover:bg-gray-700`}
          ><img src={polygon} alt="" className="rounded-full mr-2" />Polygon</NavLink>
        </li>
        <li>
          <NavLink to="/arbitrum" onClick={() => setActiveNav('/arbitrum')}
            className={`${activeNav === '/arbitrum' ? 'bg-gray-700' : ''} flex items-center p-1 rounded-lg hover:bg-gray-700`}
          ><img src={arbitrum} alt="" className="rounded-full mr-2" />Arbitrum</NavLink>
        </li>
        <li>
          <NavLink to="/optimism" onClick={() => setActiveNav('/optimism')}
            className={`${activeNav === '/optimism' ? 'bg-gray-700' : ''} flex items-center p-1 rounded-lg hover:bg-gray-700`}
          ><img src={optimism} alt="" className="rounded-full mr-2" />Optimism</NavLink>
        </li>
        <li>
          <NavLink to="/solana" onClick={() => setActiveNav('/solana')}
            className={`${activeNav === '/solana' ? 'bg-gray-700' : ''} flex items-center p-1 rounded-lg hover:bg-gray-700`}
          ><img src={solana} alt="" className="rounded-full mr-2" />Solana</NavLink>
        </li>
        <li>
          <NavLink to="/tron" onClick={() => setActiveNav('/tron')}
            className={`${activeNav === '/tron' ? 'bg-gray-700' : ''} flex items-center p-1 rounded-lg hover:bg-gray-700`}
          ><img src={tron} alt="" className="rounded-full mr-2" />Tron</NavLink>
        </li>
        <li>
          <NavLink to="/fantom" onClick={() => setActiveNav('/fantom')}
            className={`${activeNav === '/fantom' ? 'bg-gray-700' : ''} flex items-center p-1 rounded-lg hover:bg-gray-700`}
          ><img src={ftm} alt="" className="rounded-full mr-2" />Fantom</NavLink>
        </li>
        <li>
          <NavLink to="/algorand" onClick={() => setActiveNav('/algorand')}
            className={`${activeNav === '/algorand' ? 'bg-gray-700' : ''} flex items-center p-1 rounded-lg hover:bg-gray-700`}
          ><img src={algorand} alt="" className="rounded-full mr-2" />Algorand</NavLink>
        </li>
        <li>
          <NavLink to="/kava" onClick={() => setActiveNav('/kava')}
            className={`${activeNav === '/kava' ? 'bg-gray-700' : ''} flex items-center p-1 rounded-lg hover:bg-gray-700`}
          ><img src={kava} alt="" className="rounded-full mr-2" />Kava</NavLink>
        </li>
      </ul>
   </div>
  </aside>
  </div>
)}

export default Navbar
