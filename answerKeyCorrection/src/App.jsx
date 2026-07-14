import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import FormLogin from './components/FormLogin.jsx'
import FormRegister from './components/FormRegister.jsx'
import Dashboard from './components/Dashboard.jsx';

function App() {
    const [count, setCount] = useState(0)

    return (
        <BrowserRouter>

        <div className="app-container">
                <h1>SISTEMA DE CORREÇÃO DE PROVAS</h1>
                
                <Routes>
                    <Route path='/' element={<Navigate to="/login"/>}/>
                    <Route path='/login' element={<FormLogin />} />
                    <Route path='/register' element={<FormRegister />} />
                    <Route path='/dashboard' element={<Dashboard />} />
            </Routes>
            </div>
        
        </BrowserRouter>
    )
}

export default App
