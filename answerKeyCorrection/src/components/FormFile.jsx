import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom'; 
import api from '../../services/api.js'

const Form = ({onCorrectionSuccess}) => {
  const [imagem, setImagem] = useState(null);
  const [pdf, setPdf] = useState(null);
    const [dia, setDia] = useState('1');
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')
    const [succeed, setSucceed] = useState(false)
    const [resultado, setResultado] = useState(null)

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e, tipo) => {
    e.preventDefault();
    e.stopPropagation();
    const arquivo = e.dataTransfer.files[0];
    if (!arquivo) return;

    if (tipo === 'imagem' && arquivo.type.startsWith('image/')) {
      setImagem(arquivo);
    } else if (tipo === 'pdf' && arquivo.type === 'application/pdf') {
      setPdf(arquivo);
    }
    };

    const checkAnswer = async () => {
        if (!imagem || !pdf || !dia) {
            setMessage("Por favor, seleciona a foto e o PDF")
            return
        }
        setLoading(true)
        setMessage('')
        const formData = new FormData()
        formData.append('image', imagem)
        formData.append('pdf', pdf)
        formData.append('day', dia)
    

        try {
            const response = await api.post('/check', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            })
            console.log(response.data)
           
            setMessage('Extração completa!');
            setSucceed(true)
            onCorrectionSuccess(response.data.resumo)

            
        } catch (err) {
            console.error(err);
            setMessage(err.response?.data?.erro || "Erro ao processar a correção da prova.");
            setSucceed(false)
        } finally {
            setLoading(false)
    
        }

    }
    



  return (
    <StyledWrapper>
      <div className="corretor-container">
        <h2>Painel de Correção - ENEM</h2>

        <div className="select-container">
          <label>Dia da Prova:</label>
          <select value={dia} onChange={(e) => setDia(e.target.value)}>
            <option value="1">Dia 1 (Questões 1 a 90)</option>
            <option value="2">Dia 2 (Questões 91 a 180)</option>
          </select>
        </div>

        <div className="upload-grid">
     
          <div className="upload-box">
            <span className="box-title">Foto do Gabarito</span>
            <div 
              className={`custum-file-upload ${imagem ? 'has-file' : ''}`}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, 'imagem')}
            >
              {imagem ? (
                <div className="file-info">
                  <span className="file-name" title={imagem.name}>{imagem.name}</span>
                  <button 
                    type="button" 
                    className="delete-btn" 
                    onClick={() => setImagem(null)}
                    title="Remover arquivo"
                  >
                    ×
                  </button>
                </div>
              ) : (
                <label htmlFor="file-image" className="drop-label">
                  <div className="icon">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <path fill="currentColor" fillRule="evenodd" d="M10 1C9.73478 1 9.48043 1.10536 9.29289 1.29289L3.29289 7.29289C3.10536 7.48043 3 7.73478 3 8V20C3 21.6569 4.34315 23 6 23H7C7.55228 23 8 22.5523 8 22C8 21.4477 7.55228 21 7 21H6C5.44772 21 5 20.5523 5 20V9H10C10.5523 9 11 8.55228 11 8V3H18C18.5523 3 19 3.44772 19 4V9C19 9.55228 19.4477 10 20 10C20.5523 10 21 9.55228 21 9V4C21 2.34315 19.6569 1 18 1H10ZM9 7H6.41421L9 4.41421V7ZM14 15.5C14 14.1193 15.1193 13 16.5 13C17.8807 13 19 14.1193 19 15.5V16V17H20C21.1046 17 22 17.8954 22 19C22 20.1046 21.1046 21 20 21H13C11.8954 21 11 20.1046 11 19C11 17.8954 11.8954 17 13 17H14V16V15.5ZM16.5 11C14.142 11 12.2076 12.8136 12.0156 15.122C10.2825 15.5606 9 17.1305 9 19C9 21.2091 10.7909 23 13 23H20C22.2091 23 24 21.2091 24 19C24 17.1305 22.7175 15.5606 20.9844 15.122C20.7924 12.8136 18.858 11 16.5 11Z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="text">
                    <span>Arraste ou clique para enviar</span>
                  </div>
                  <input 
                    type="file" 
                    id="file-image" 
                    accept="image/*" 
                    onChange={(e) => setImagem(e.target.files[0])} 
                  />
                </label>
              )}
            </div>
          </div>

      
          <div className="upload-box">
            <span className="box-title">Gabarito Oficial (PDF)</span>
            <div 
              className={`custum-file-upload ${pdf ? 'has-file' : ''}`}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, 'pdf')}
            >
              {pdf ? (
                <div className="file-info">
                  <span className="file-name" title={pdf.name}>{pdf.name}</span>
                  <button 
                    type="button" 
                    className="delete-btn" 
                    onClick={() => setPdf(null)}
                    title="Remover arquivo"
                  >
                    ×
                  </button>
                </div>
              ) : (
                <label htmlFor="file-pdf" className="drop-label">
                  <div className="icon">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <path fill="currentColor" fillRule="evenodd" d="M10 1C9.73478 1 9.48043 1.10536 9.29289 1.29289L3.29289 7.29289C3.10536 7.48043 3 7.73478 3 8V20C3 21.6569 4.34315 23 6 23H7C7.55228 23 8 22.5523 8 22C8 21.4477 7.55228 21 7 21H6C5.44772 21 5 20.5523 5 20V9H10C10.5523 9 11 8.55228 11 8V3H18C18.5523 3 19 3.44772 19 4V9C19 9.55228 19.4477 10 20 10C20.5523 10 21 9.55228 21 9V4C21 2.34315 19.6569 1 18 1H10ZM9 7H6.41421L9 4.41421V7ZM14 15.5C14 14.1193 15.1193 13 16.5 13C17.8807 13 19 14.1193 19 15.5V16V17H20C21.1046 17 22 17.8954 22 19C22 20.1046 21.1046 21 20 21H13C11.8954 21 11 20.1046 11 19C11 17.8954 11.8954 17 13 17H14V16V15.5ZM16.5 11C14.142 11 12.2076 12.8136 12.0156 15.122C10.2825 15.5606 9 17.1305 9 19C9 21.2091 10.7909 23 13 23H20C22.2091 23 24 21.2091 24 19C24 17.1305 22.7175 15.5606 20.9844 15.122C20.7924 12.8136 18.858 11 16.5 11Z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="text">
                    <span>Arraste ou clique para enviar</span>
                  </div>
                  <input 
                    type="file" 
                    id="file-pdf" 
                    accept="application/pdf" 
                    onChange={(e) => setPdf(e.target.files[0])} 
                  />
                </label>
              )}
            </div>
          </div>
        </div>

              <button onClick={checkAnswer}   type="button" className="submit-btn" disabled={loading}>
                    {loading ? 'Enviando...' : 'Enviar'}
              </button>
              {message && succeed == false ? <p className="response-message" style={{color: 'red'}}>{message}</p> : <p style={{color: 'green'}}className="response-message">{message}</p> }
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f1f5f9;
  font-family: inherit;

  .corretor-container {
    background-color: #ffffff;
    padding: 2.5rem;
    border-radius: 16px;
    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.05);
    width: 100%;
    max-width: 650px;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  h2 {
    font-size: 1.4rem;
    color: #1e293b;
    text-align: center;
    font-weight: 700;
  }

  .select-container {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    label {
      font-size: 0.85rem;
      font-weight: 600;
      color: #64748b;
    }

    select {
      padding: 0.75rem;
      border-radius: 8px;
      border: 1px solid #cbd5e1;
      font-size: 0.95rem;
      outline: none;
      background: #f8fafc;
      color: #334155;
      cursor: pointer;
    }
  }

  .upload-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;

    @media (max-width: 580px) {
      grid-template-columns: 1fr;
    }
  }

  .upload-box {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    .box-title {
      font-size: 0.85rem;
      font-weight: 600;
      color: #64748b;
    }
  }

  .custum-file-upload {
    height: 180px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 2px dashed #cbd5e1;
    background-color: #f8fafc;
    padding: 1rem;
    border-radius: 12px;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.02);
    transition: all 0.3s ease;
    position: relative;

    &:hover {
      border-color: #488aec;
      background-color: #f0f4ff;
    }

    &.has-file {
      border-style: solid;
      border-color: #cbd5e1;
      background-color: #ffffff;
    }
  }

  .drop-label {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 15px;
    cursor: pointer;
  }

  .file-info {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 0.75rem 1rem;
    background: #f8fafc;
    border-radius: 8px;
    border: 1px solid #e2e8f0;
    gap: 0.5rem;

    .file-name {
      font-size: 0.8rem;
      font-weight: 500;
      color: #334155;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      flex: 1;
    }

    .delete-btn {
      background: #fee2e2;
      color: #ef4444;
      border: none;
      width: 26px;
      height: 26px;
      border-radius: 50%;
      font-size: 1.1rem;
      font-weight: bold;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.2s ease;

      &:hover {
        background: #ef4444;
        color: #ffffff;
      }
    }
  }

  .custum-file-upload .icon {
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      height: 40px;
      width: 40px;
      fill: #488aec;
    }
  }

  .custum-file-upload .text {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;

    span {
      font-weight: 500;
      font-size: 0.8rem;
      color: #475569;
    }
  }

  .custum-file-upload input {
    display: none;
  }

  .submit-btn {
    border: none;
    padding: 0.9rem;
    background-color: #488aec;
    color: #ffffff;
    font-size: 0.9rem;
    font-weight: 700;
    text-transform: uppercase;
    border-radius: 10px;
    cursor: pointer;
    letter-spacing: 0.5px;
    box-shadow: 0 4px 12px rgba(72, 138, 236, 0.3);
    transition: all 0.3s ease;

    &:hover {
      background-color: #3b76d0;
      box-shadow: 0 6px 16px rgba(72, 138, 236, 0.4);
    }

    &:active {
      transform: scale(0.98);
    }
  }
`;

export default Form;