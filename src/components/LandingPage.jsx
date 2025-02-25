import React from 'react'
import Herosection from './Herosection'
import Navbar from './Navbar'
import About from './About'

export default function LandingPage() {
  return (
    <div>
      <Navbar/>
      <Herosection/>
      <About/>
    </div>
  )
}
