import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './layouts/home'
import Check from './layouts/check'

createRoot(document.querySelector('.weather__now__app')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/check' element={<Check/>} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
