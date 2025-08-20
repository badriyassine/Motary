import React from 'react'
import Intro from './HomeSections/Intro'
import About from './HomeSections/About'
import Brands from './HomeSections/Brands'
import Gallery from './HomeSections/Gallary'

const Home = () => {
  return (
    <div>
      <Intro />
      <About />
      <Brands />
      <Gallery />
    </div>
  )
}

export default Home