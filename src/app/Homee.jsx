'use client'
import React from 'react'

const Homee = () => {
  return (
    <div>


    <header className="bg-white">
      <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
        <div className="flex lg:flex-1">
          <a href="#" className="-m-1.5 p-1.5">
            <h1 className='text-4xl font-bold'>AIGurukul</h1>
          </a>
        </div>
        <div className="lg:flex lg:flex-1 lg:justify-end">
          <a href="/login" className="text-sm font-semibold text-gray-900">
            Log in <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </nav>
    </header>

    </div>
  )
}

export default Homee
