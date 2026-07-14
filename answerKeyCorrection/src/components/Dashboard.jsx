import { Routes, Route, Navigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import '../style/Dashboard.css'
import api from '../../services/api.js'
import Header from './Header.jsx'

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
        <div className="dashboard-container">
            <Header></Header>
            <div className="dashboard-content">
                <h1>Dashboard</h1>
                <button className="btn-primary" onClick={handlePrivate}>Teste Private Routes</button>
            </div>
        </div>



    )
}

export default Dashboard
