import React from 'react'
import TopHeader from './components/layouts/TopHeader'
import Header from './components/layouts/Header'
import Home from './components/pages/Home'
import Footer from './components/layouts/Footer'

const App = () => {
  return (
    <div className="bg-[#f6f7f9] min-h-screen">
      <TopHeader />
      <Header />
      <Home />
      <Footer />
    </div>
  )
}

export default App

