import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

function Header() {
    const [user, setUser] = useState(null);
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
    }, []);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
        navigate('/login');
    };

    return (
        <HeaderContainer>
            <div className="logo">
                <h2>CORRECT TESTS</h2>
            </div>

            <div className="profile-section">
            
                <div className="avatar" onClick={toggleMenu}>
                    <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                    </svg>
                </div>


                <div className="user-info">
                    <span className="user-name">
                        {user ? user.name : 'Carregando...'}
                    </span>
                    <span className="user-email">
                        {user ? user.email : ''}
                    </span>
                </div>

                {menuOpen && (
                    <div className="dropdown-menu">
                        <button onClick={handleLogout} className="logout-btn">
                            <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                            Sair da conta
                        </button>
                    </div>
                )}
            </div>
        </HeaderContainer>
    );
}

const HeaderContainer = styled.header`
  background-color: #ffffff;
  height: 70px;
  padding: 0 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between; /* Isso garante que a logo fique na esquerda e o perfil na direita */
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);

  .logo h2 {
    color: #4F46E5;
    margin: 0;
    font-size: 1.5rem;
  }

  .profile-section {
    display: flex;
    align-items: center;
    gap: 0.75rem; /* Espaço entre o avatar e os textos */
    position: relative;
  }

  /* Novo contêiner para empilhar os textos */
  .user-info {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .user-name {
    font-weight: 600;
    color: #374151;
    font-size: 0.95rem;
    line-height: 1.2;
  }

  /* Estilo do e-mail: menor e mais claro */
  .user-email {
    font-size: 0.8rem;
    color: #6b7280;
    line-height: 1.2;
  }

  .avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #e5e7eb;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: #9ca3af;
    transition: background-color 0.2s;
  }

  .avatar:hover {
    background-color: #d1d5db;
  }

  .avatar svg {
    width: 24px;
    height: 24px;
  }

  .dropdown-menu {
    position: absolute;
    top: 55px;
    /* Ajustado para alinhar o menu com o começo do avatar */
    left: 0; 
    background-color: #fff;
    border: 1px solid #e5e7eb;
    border-radius: 0.5rem;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    padding: 0.5rem;
    width: 150px;
    z-index: 10;
  }

  .logout-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    width: 100%;
    padding: 0.5rem;
    background: none;
    border: none;
    color: #ef4444;
    font-weight: 500;
    font-size: 0.95rem;
    cursor: pointer;
    border-radius: 0.25rem;
    transition: background-color 0.2s;
  }

  .logout-btn:hover {
    background-color: #fef2f2;
  }
`;

export default Header;