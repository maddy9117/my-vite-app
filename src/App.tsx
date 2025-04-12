import { useState } from 'react'
import GetHihgest from './pages/LandingPage'
import './App.css'
import SearchBar from './components/ProductSearchBar'

function App() {


  return (
    <>
    
    <SearchBar query={''} onChange={function (value: string): void {
        throw new Error('Function not implemented.')
      } } />
      
    </>
  )
}

export default App
