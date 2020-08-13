import React, { useCallback, useState, FormEvent, useMemo } from 'react';
import { Link, useHistory } from 'react-router-dom';

import logoImg from '../../assets/images/logo.svg';
import goBackIcon from '../../assets/images/icons/back.svg';

import api from '../../services/api';

import LoginInput from '../../components/LoginInput';
import PasswordInputField from '../../components/PasswordInputField';

import './styles.css';

const SignUp: React.FC = () => {
  const history = useHistory();

  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const disabledCalc = useMemo(() => {
    return (!email || !password || !name || !lastname)
  }, [name, lastname, email, password]);

  const handleSubmit = useCallback((e: FormEvent) => {
    e.preventDefault();

    api.post(`users`, {
      name, lastname, email, password
    })
      .then(_ => {
        history.push('/register-finished')
      })
      .catch((err) => {
        alert('Ocorreu um erro, não foi possível cadastrar')
      })

    console.log({
      name,
      lastname,
      email,
      password,
    });
  }, [name, lastname, email, password, history]);

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
              <LoginInput
                value={name}
                onChange={e => setName(e.target.value)}
                containerClassStyle="register-input-block"
                label="Nome"
              />

              <LoginInput
                value={lastname}
                onChange={e => setLastname(e.target.value)}
                containerClassStyle="register-input-block"
                label="Sobrenome"
              />

              <LoginInput
                value={email}
                onChange={e => setEmail(e.target.value)}
                containerClassStyle="register-input-block"
                label="E-mail"
              />

              <PasswordInputField
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
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
