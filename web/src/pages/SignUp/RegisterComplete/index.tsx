import React from 'react';
import { Link } from 'react-router-dom';
import { FiCheck } from 'react-icons/fi';

import './styles.css';

const RegisterComplete: React.FC = () => {
  return (
    <div className="register-complete-container">
      <section className="middle-content">
        <div className="icon-content">
          <FiCheck />
        </div>
        <h1>Cadastro concluído</h1>
        <p>Agora você faz parte da plataforma da Proffy. Tenha uma ótima experiência.</p>

        <Link to="/">Fazer login</Link>
      </section>
    </div>
  );
}

export default RegisterComplete;