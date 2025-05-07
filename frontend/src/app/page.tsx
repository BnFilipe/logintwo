'use client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import RegisterPage from './register/page'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        {/* outras rotas aqui */}
      </Routes>
    </BrowserRouter>
  )
}