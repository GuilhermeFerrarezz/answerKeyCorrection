import { Routes, Route, Navigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import '../style/Dashboard.css'
import api from '../../services/api.js'

function Dashboard() {
   const [user, setUser] = useState(null);
    useEffect(() => {
        const savedUser = localStorage.getItem('user')
        if (savedUser) {
            setUser(JSON.parse(savedUser))
            console.log(savedUser)
        }
    }, [])
    const handlePrivate = async () => {
        const response = await api.get('/private')
        console.log(response)

    }

    return (

       

        <div className="app-container">
            <h1>Dados Usuário</h1>
            {user ? (
                <div>
                <p>Nome: { user.name || "Não informado"}</p>

                <p>Email: {user.email || "Não informado"}</p>
                <button onClick={handlePrivate}>Teste Private Routes</button>

                
                    </div>
                
            ) : 
            (<p>Carregando dados do usuário</p>)
            }
            
                
            </div>

    )
}

export default Dashboard
