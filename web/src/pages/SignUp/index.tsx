import React, { useCallback, useState, FormEvent, useMemo } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import logoImg from '../../assets/images/logo.svg';
import goBackIcon from '../../assets/images/icons/back.svg';

import './styles.css';

const SignUp: React.FC = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const disabledCalc = useMemo(() => {
    return (!email || !password || !name || !lastname)
  }, [name, lastname, email, password]);

  const togglePasswordVisible = useCallback(() => {
    setIsPasswordVisible(!isPasswordVisible);
  }, [isPasswordVisible])

  const handleSubmit = useCallback((e: FormEvent) => {
    e.preventDefault();

    console.log({
      email,
      password,
    });
  }, [email, password]);

  return (
    <div className="register-screen">
      <div className="register-splash-side">
        <div className="inside-aligner">
          <img src={logoImg} alt="Proffy" className="logo"/>
          <h3>
            Sua plataforma de estudos online.
          </h3>
        </div>
      </div>

      <div className="register-form-side">
        <Link to="/">
          <img src={goBackIcon} alt="Go back button" />
        </Link>
        <form onSubmit={handleSubmit}>
          <fieldset>
            <legend>Cadastro</legend>
            <span>Preencha os dados abaixo para começar.</span>

            <section className="text-inputs-container">
              <div className={`register-input-block ${name ? 'filled': ''}`}>
                <input
                  value={name}
                  onChange={e => setName(e.target.value)}
                  type="text"
                />
                <span>Nome</span>
              </div>

              <div className={`register-input-block ${lastname ? 'filled': ''}`}>
                <input
                  value={lastname}
                  onChange={e => setLastname(e.target.value)}
                  type="text"
                />
                <span>Sobrenome</span>
              </div>

              <div className={`register-input-block ${email ? 'filled': ''}`}>
                <input
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  type="text"
                />
                <span>E-mail</span>
              </div>

              <div className={`register-input-block ${password ? 'filled': ''}`}>
                <input
                  type={isPasswordVisible ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
                <span>Senha</span>
                <button type="button" onClick={togglePasswordVisible}>
                  {isPasswordVisible ? <FiEyeOff color="#8257E5" /> : <FiEye />} 
                </button>
              </div>
            </section>

            <button className="register-button" type="submit" disabled={disabledCalc}>
              Concluir cadastro
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  );
}

export default SignUp;