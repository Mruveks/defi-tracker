import React,{useState} from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {

  const [activeNav, setActiveNav] = useState('/');


  return (
  <div className="w-full h-auto absolute left-0">
      
  <aside id="default-sidebar" className="w-48 fixed left-0 top-0 h-screen">
    <div className="px-3 py-4 overflow-y-auto bg-gray-900 h-full">
      <ul className="space-y-2">
        <li>         
          <header className="flex font-poppins items-center p-2 text-lg font-normal text-gray-400 ">Dashboards</header>
        </li>
        <li>
          <NavLink to="/defi" onClick={() => setActiveNav('/')}
            className={`${activeNav === '/' ? 'bg-gray-700' : ''} flex items-center p-2 text-base font-normal text-white rounded-lg hover:bg-gray-700`}
          >Defi</NavLink>
        </li>
        <li>
          <NavLink to="/stables" onClick={() => setActiveNav('/stables')}
            className={`${activeNav === '/stables' ? 'bg-gray-700' : ''} flex items-center p-2 text-base font-normal text-white rounded-lg hover:bg-gray-700`}
          >Stables</NavLink>
        </li>
        <li>
          <NavLink to="/yields" onClick={() => setActiveNav('/yields')}
            className={`${activeNav === '/yields' ? 'bg-gray-700' : ''} flex items-center p-2 text-base font-normal text-white rounded-lg hover:bg-gray-700`}
          >Yields</NavLink>
        </li>
        <li>
          <NavLink to="/bridges" onClick={() => setActiveNav('/bridges')}
            className={`${activeNav === '/bridges' ? 'bg-gray-700' : ''} flex items-center p-2 text-base font-normal text-white rounded-lg hover:bg-gray-700`}
          >Bridges</NavLink>
        </li>
        <li>
          <NavLink to="/fees" onClick={() => setActiveNav('/fees')}
            className={`${activeNav === '/fees' ? 'bg-gray-700' : ''} flex items-center p-2 text-base font-normal text-white rounded-lg hover:bg-gray-700`}
          >Fees</NavLink>
        </li>
      </ul>
   </div>
  </aside>
  </div>
)}

export default Navbar
