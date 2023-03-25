import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'


import Routers from './routers/routers'
import Footer from './components/Footer'


function App() {


  return (
    <div className="App">
      <Routers></Routers>
      <Footer></Footer>
    </div>
  )
}

export default App
