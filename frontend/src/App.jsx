import React from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-tr from-blue-50/50 via-white to-sky-50/50 flex flex-col">
      <Navbar />
      <Home />
      <Footer />
    </div>
  )
}

export default App

