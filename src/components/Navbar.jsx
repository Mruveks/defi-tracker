import React from 'react'

const Navbar = () => {
  return (
    <div className="w-full h-auto absolute left-0 t">
      
<aside id="default-sidebar" className="w-64 fixed left-0 top-0 h-screen transition-transform -translate-x-full sm:translate-x-0 z-40" aria-label="Sidebar">
   <div className="px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800 h-full">
      <ul className="space-y-2">
         <li>
           
               <span className="flex font-poppins items-center p-2 text-lg font-normal text-gray-400">Dashboards</span>
 
         </li>
         <li>
         <a href="/" className="flex items-center p-2 text-base font-normal text-white rounded-lg hover:bg-gray-700">
               <span className="pl-4">DeFi</span>
            </a>
         </li>
         <li>
         <a href="/stables" className="flex items-center p-2 text-base font-normal text-white rounded-lg hover:bg-gray-700">
               <span className="pl-4">Stables</span>
            </a>
         </li>
         <li>
         <a href="/yields" className="flex items-center p-2 text-base font-normal text-white rounded-lg hover:bg-gray-700">
               <span className="pl-4">Yields</span>
            </a>
         </li>
         <li>
         <a href="#" className="flex items-center p-2 text-base font-normal text-white rounded-lg hover:bg-gray-700">
               <span className="pl-4">Fees</span>
            </a>
         </li>
         <li>
         <a href="#" className="flex items-center p-2 text-base font-normal text-white rounded-lg hover:bg-gray-700">
               <span className="pl-4">Volumes</span>
            </a>
         </li>
         <li>
         <a href="#" className="flex items-center p-2 text-base font-normal text-white rounded-lg hover:bg-gray-700">
               <span className="pl-4">Hacks</span>
            </a>
         </li>
      </ul>
   </div>
</aside>
</div>
)}

export default Navbar
