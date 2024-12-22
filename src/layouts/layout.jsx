import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '@/components/Header'
const Applayout = () => {
  return (
    
    // the css is written for the grid in app.css
    
    <div>
      <div className='grid-background'> </div>
      
      <main className='min-h-screen container'>
        <Header/>
      <Outlet/>
      </main>
  <footer className='w-full'>
  <div className='p-10 text-center bg-gray-800 mt-10 '>Made with ❤️ by Adithya Rana</div>
  </footer>
    </div>
  )
}

export default Applayout