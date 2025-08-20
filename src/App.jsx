import React from 'react'
import TopHeader from './components/layouts/TopHeader'
import Header from './components/layouts/Header'
import Home from './components/pages/Home'

const App = () => {
  return (
    <div className="bg-[#f6f7f9] min-h-screen">
      <TopHeader />
      <Header />
      <Home />
    </div>
  )
}

export default App

