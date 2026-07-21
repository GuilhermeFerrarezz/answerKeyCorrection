import { Routes, Route, Navigate, useAsyncError } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import '../style/Dashboard.css'
import api from '../../services/api.js'
import Header from './Header.jsx'
import Form from './FormFile.jsx';

function Dashboard() {
    const [user, setUser] = useState(null);
    const [respostasProva, setRespostasProva] = useState(null);
    const [gabarito, setGabarito] = useState(null)
    const [respostas, setRespostas] = useState(null)
    const [erros, setErros] = useState([])


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
    const handleNovaCorrecao = () => {
        setRespostasProva(null);
        setErros([])

    };

    const handleRespostasProva = (dados) => {
        setRespostasProva(dados)
        console.log(dados)
        let gabaritoFinal = dados.gabarito;
        let respostasFinais = dados.respostas;
        if (!dados.gabarito || !dados.respostas) {
        console.error("Gabarito ou Respostas faltando nos dados.");
        return;
    }
        const chavesGabarito = Object.keys(dados.gabarito).map(Number);
        const chavesRespostas = Object.keys(dados.respostas).map(Number);

        const inicioGabarito = Math.min(...chavesGabarito);
        const inicioRespostas = Math.min(...chavesRespostas);

        if (inicioGabarito !== inicioRespostas) {
        console.log("⚠️ Offset detectado. As chaves serão corrigidas.");
        
        const offset = inicioGabarito - inicioRespostas;
        
        let respostasAjustadas = {};

        Object.keys(dados.respostas).forEach((keyOriginal) => {
            const chaveNumerica = parseInt(keyOriginal);
            const novaChave = (chaveNumerica + offset).toString();
            
            respostasAjustadas[novaChave] = dados.respostas[keyOriginal];
        });

        console.log("Respostas ajustadas:", respostasAjustadas);
    
        respostasFinais = respostasAjustadas;
    } else {
        console.log(" Chaves alinhadas.");
     
    }
        setGabarito(gabaritoFinal);
        setRespostas(respostasFinais);
    
    setErros([]);
    correctAnswer(gabaritoFinal, respostasFinais);








    }
    const correctAnswer = (gab, resp) => {
        let questoesErradas = []
        setErros([])
        console.log('Corrigindo')
        console.log(gabarito)
        console.log(respostas)

        const chaves = Object.keys(gab).map(Number);
        const inicio = Math.min(...chaves);
        const fim = Math.max(...chaves);
        
        
        for (let index = inicio; index <= fim; index++) {
            const element = gab[index];
            const elementResponse = resp[index]
            if (element != elementResponse) {
                 questoesErradas.push(String(index))
            }
        }

            console.log(questoesErradas)
            setErros(questoesErradas)
            
        }

    return (
        <div className="dashboard-container">
            <Header></Header>
            <div className="dashboard-content">
                <h1>Dashboard</h1>
                <div className="pictureFormContainer">
                    {respostasProva ? (
                        <div className="resultado-card">
                            <h2>Respostas da prova</h2>
                            <div className="resultado-detalhes" style={{ maxHeight: '350px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '8px', margin: '15px 0', paddingRight: '10px' }}>
                                {gabarito && Object.keys(gabarito).map((q) => {
                                    const gabaritoOficial = gabarito ? gabarito[q] : '-';
                                    const respostaAluno = respostas[q];
                                    const isErro = erros.includes(q);

                        
                                    let borderColor = '#cbd5e1'; 
                                    if (erros.length > 0) {
                                        borderColor = isErro ? '#ef4444' : '#10b981'; 
                                    }

                                    return (
                                        <div 
                                            key={q} 
                                            style={{ 
                                                display: 'flex', 
                                                justifyContent: 'space-between', 
                                                alignItems: 'center', 
                                                background: '#f8fafc', 
                                                padding: '10px 15px', 
                                                borderRadius: '8px', 
                                                borderLeft: `4px solid ${borderColor}` 
                                            }}
                                        >
                                            <span style={{ fontWeight: 'bold', color: '#334155' }}>Questão {q}</span>
                                            <div style={{ display: 'flex', gap: '20px' }}>
                                                <span style={{ color: '#64748b' }}>Gabarito: <strong style={{ color: '#0f172a' }}>{gabaritoOficial}</strong></span>
                                                <span style={{ color: '#64748b' }}>Foto: <strong style={{ color: respostaAluno === gabaritoOficial ? '#10b981' : '#ef4444' }}>{respostaAluno || 'BRANCO'}</strong></span>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                           
                            <button 
                                type="button" 
                                className="submit-btn" 
                                onClick={handleNovaCorrecao}
                            >
                                Corrigir Outra Prova
                            </button>
                                {gabarito ? (   
                                <h2 style={{ paddingTop: '30px', color: '#ef4444' }}>Erros totais {erros.length}</h2>
                            ) :
                            (<></>)
                        }



                            
                        </div>
    

                    ) : 
                        <Form onCorrectionSuccess={(dados) => handleRespostasProva(dados) } />
                        
                
                }

                </div>


            </div>
        </div>


    )
}

export default Dashboard
