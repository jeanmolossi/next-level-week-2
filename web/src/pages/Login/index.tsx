import React, { useCallback, useState, FormEvent } from 'react';
import { Link } from 'react-router-dom';

import logoImg from '../../assets/images/logo.svg';
import purpleHeartIcon from '../../assets/images/icons/purple-heart.svg';

import { useAuth } from '../../contexts/Auth';

import PasswordInputField from '../../components/PasswordInputField'
import LoginInput from '../../components/LoginInput';

import './styles.css';

const Login: React.FC = () => {

  const { signIn } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberPassword, setRememberPassword] = useState(false);

  const handleSubmit = useCallback(async (e: FormEvent) => {
    e.preventDefault();

    await signIn({ email, password, rememberPassword });

  }, [email, password, rememberPassword, signIn]);

  return (
    <div className="login-screen">
      <div className="login-splash-side">
        <div className="inside-aligner">
          <img src={logoImg} alt="Proffy" className="logo"/>
          <h3>
            Sua plataforma de estudos online.
          </h3>
        </div>
      </div>

      <div className="login-form-side">
        <form onSubmit={handleSubmit}>
          <fieldset>
            <legend>Fazer login</legend>

            <section className="text-inputs-container">
              <LoginInput
                value={email}
                onChange={e => setEmail(e.target.value)}
                label="E-mail"
              />

              <PasswordInputField
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </section>

            <section className="password-section">
              <div className="remember-password">
                <input
                  type="checkbox"
                  className="remember-check-box"
                  id="remember-checkbox"
                  onClick={() => setRememberPassword(!rememberPassword)}
                />
                <label htmlFor="remember-checkbox" className="remeber-check-label">Lembrar-me</label>
              </div>
              <div className="forgot-password">
                <Link to="/forgot-password">Esqueci minha senha</Link>
              </div>
            </section>

            <button className="login-button" type="submit" disabled={!!email !== !!password || !email || !password}>
              Entrar
            </button>
          </fieldset>
        </form>

        <div className="register-content">
          <div className="register-question">
            <span>Não tem conta?</span>
            <Link to="/register">Cadastre-se</Link>
          </div>
          <span>É de graça <img src={purpleHeartIcon} alt="purple heart" /></span>
        </div>
      </div>
    </div>
  );
}

export default Login;
