import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
  <div className="w-full h-auto absolute left-0">
      
  <aside id="default-sidebar" className="w-48 fixed left-0 top-0 h-screen">
   <div className="px-3 py-4 overflow-y-auto bg-gray-900 h-full">
      <ul className="space-y-2">
         <li>         
               <span className="flex font-poppins items-center p-2 text-lg font-normal text-gray-400 ">Dashboards</span>
 
         </li>
         <li>
         <a href="/" className="flex items-center p-2 text-base font-normal text-white rounded-lg hover:bg-gray-700">
               <span className="pl-4">DeFi</span>
            </a>
         </li>
         <li>
         <NavLink to="/stables">Stabless</NavLink>
         </li>
         <li>
         <a href="/yields" className="flex items-center p-2 text-base font-normal text-white rounded-lg hover:bg-gray-700">
               <span className="pl-4">Yields</span>
            </a>
         </li>
         <li>
         <a href="/bridges" className="flex items-center p-2 text-base font-normal text-white rounded-lg hover:bg-gray-700">
               <span className="pl-4">Bridges</span>
            </a>
         </li>
         <li>
         <a href="/fees" className="flex items-center p-2 text-base font-normal text-white rounded-lg hover:bg-gray-700">
               <span className="pl-4">Fees/Revenue</span>
            </a>
         </li>
      </ul>
   </div>
  </aside>
  </div>
)}

export default Navbar
