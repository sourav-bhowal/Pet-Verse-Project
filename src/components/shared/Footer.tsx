import React from 'react'

export const Footer = () => {
  return (
    <footer className='bg-gray-900 text-white flex flex-col justify-center px-5 h-16 items-center gap-1'>
        <p className='text-center lg:text-sm text-xs'>Copyright © Pet World - 2024. All rights reserved.</p>
        <p className='text-center lg:text-sm text-xs'>Developed with ❤️ - <a 
          href="https://sourav-bhowal.vercel.app"
          className='text-blue-500 underline'>Sourav Bhowal</a></p>
    </footer>
  )
}

