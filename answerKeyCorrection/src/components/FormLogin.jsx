import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom'; 
import api from '../../services/api.js'

function FormLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')
    const [succeed, setSucceed] = useState(false)
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        setLoading(true)
        setMessage('')
        try {
            const response = await api.post('/auth/login', { email, password })
            console.log('Resposta ', response)
            const { token, refreshToken, user } = response.data.data
            if (token) {
                localStorage.setItem('token', token);
            }
            if (refreshToken) {
                localStorage.setItem('refreshToken', refreshToken);
            }
            if (user) {
                localStorage.setItem('user', JSON.stringify(user));
            }
    
            setMessage('Login bem-sucedido!');
            setSucceed(true)
            setTimeout(() => {
                navigate('/dashboard');
            }, 1000);


        } catch (error) {
            console.error(error.status);
            if (error.status == 401) {
                setMessage('Credeniais inválidas')
            } else {
                setMessage(error.response?.data?.error || 'Erro ao conectar com servidor.');
            }
            
            
            setSucceed(false)
        } finally {
            setLoading(false);
        }



    }










    return (
        <StyledWrapper>
            
            <form className="form" onSubmit={(e) => {
                e.preventDefault()
                handleSubmit()
            }}>
                <p className="form-title">Sign in to your account</p>
                {message && succeed == false ? <p className="response-message" style={{color: 'red'}}>{message}</p> : <p style={{color: 'green'}}className="response-message">{message}</p> }
                <div className="input-container">
                    <input placeholder="Enter email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
                    <span>
                        <svg stroke="currentColor" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />
                        </svg>
                    </span>
                </div>
                <div className="input-container">
                    <input placeholder="Enter password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                    <span>
                        <svg stroke="currentColor" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />
                            <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />
                        </svg>
                    </span>
                </div>
                <button className="submit" type="submit" disabled={loading}>
                    {loading ? 'Connecting...' : 'Sign in'}
                </button>
                <p className="signup-link">
                    No account?
                    <Link to="/register">Sign up</Link>
                </p>
            </form>
        </StyledWrapper>
    );
}

const StyledWrapper = styled.div`
    .response-message{
        padding: 2px

    }

  .form {
    background-color: #fff;
    display: block;
    padding: 3rem; 
    width: 100%;
    max-width: 650px; 
    border-radius: 0.75rem;
    box-sizing: border-box;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  }

  .form-title {
    font-size: 1.75rem; /* Made the title text larger */
    line-height: 2.25rem;
    font-weight: 600;
    text-align: center;
    color: #000;
    margin-bottom: 1.5rem; /* Added space below the title */
  }

  .input-container {
    position: relative;
    margin-bottom: 1.25rem; /* Adds consistent breathing room between input fields */
  }

  .input-container input, .form button {
    outline: none;
    border: 1px solid #e5e7eb;
  }

  .input-container input {
    background-color: #fff;
    padding: 1.25rem; /* Made input field heights taller */
    padding-right: 3.5rem;
    font-size: 1rem; /* Slightly larger text inside inputs */
    line-height: 1.5rem;
    
    /* CRITICAL CHANGE: This makes the inputs stretch dynamically 
      to fill the parent card's width!
    */
    width: 100%; 
    box-sizing: border-box; 
    
    border-radius: 0.5rem;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  }

  .input-container span {
    display: grid;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    padding-left: 1.25rem;
    padding-right: 1.25rem;
    place-content: center;
  }

  .input-container span svg {
    color: #9CA3AF;
    width: 1.25rem; /* Slightly larger icons */
    height: 1.25rem;
  }

  .submit {
    display: block;
    padding-top: 1rem; /* Taller, more clickable button */
    padding-bottom: 1rem;
    padding-left: 1.25rem;
    padding-right: 1.25rem;
    background-color: #4F46E5;
    color: #ffffff;
    font-size: 1rem; /* Larger button text */
    line-height: 1.5rem;
    font-weight: 600;
    width: 100%;
    border-radius: 0.5rem;
    text-transform: uppercase;
    cursor: pointer;
    margin-top: 1.5rem;
  }

  .signup-link {
    color: #6B7280;
    font-size: 0.95rem;
    line-height: 1.5rem;
    text-align: center;
    margin-top: 1.5rem;
  }

  .signup-link a {
    text-decoration: underline;
    font-weight: 500;
    color: #4F46E5;
  }

`;
export default FormLogin;
