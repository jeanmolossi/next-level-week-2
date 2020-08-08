import React, { useCallback, useState, FormEvent } from 'react';
import { Link } from 'react-router-dom';

import logoImg from '../../../assets/images/logo.svg';
import goBackIcon from '../../../assets/images/icons/back.svg';

import './styles.css';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = useCallback((e: FormEvent) => {
    e.preventDefault();

    console.log({
      email,
    });
  }, [email]);

  return (
    <div className="forgot-password-screen">
      <div className="forgot-password-splash-side">
        <div className="inside-aligner">
          <img src={logoImg} alt="Proffy" className="logo"/>
          <h3>
            Sua plataforma de estudos online.
          </h3>
        </div>
      </div>

      <div className="forgot-password-form-side">
        <Link to="/"><img src={goBackIcon} alt="Go back button" /></Link>
        <form onSubmit={handleSubmit}>
          <fieldset>
            <legend>Eita, esqueceu sua senha ?</legend>
            <span>Não esquenta, vamos dar um jeuto nisso.</span>

            <section className="text-inputs-container">
              <div className={`forgot-password-input-block ${email ? 'filled': ''}`}>
                <input
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  type="text"
                />
                <span>E-mail</span>
              </div>
              
            </section>

            <button className="forgot-password-button" type="submit" disabled={!email}>
              Enviar
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;