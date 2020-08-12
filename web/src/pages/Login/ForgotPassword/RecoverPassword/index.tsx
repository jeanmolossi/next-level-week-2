import React, { useCallback, useState, FormEvent, useEffect } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';

import logoImg from '../../../../assets/images/logo.svg';
import goBackIcon from '../../../../assets/images/icons/back.svg';

import PasswordInputField from '../../../../components/PasswordInputField';

import './styles.css';

import api from '../../../../services/api';

const ForgotPassword: React.FC = () => {
  const history = useHistory();
  const { token } = useParams();

  const [password, setPassword] = useState('');
  const [disabledButton, setDisabledButton] = useState(false);


  const handleSubmit = useCallback((e: FormEvent) => {
    e.preventDefault();

    setDisabledButton(true);

    console.log(password, token);
    api.put(`password/recover`, { password, token }).then(response => {
      history.push('/recover-password-finished');
    }).catch(() => {
      alert('Não foi possível recuperar a senha');
      setDisabledButton(false);
    })
  }, [history, password, token]);

  useEffect(() => { console.log(token) }, [token]);

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
            <legend>Vamos dar um jeitinho</legend>
            <span>Digita sua nova senha aí abaixo. Mas certifique-se de digitar corretamente</span>

            <section className="text-inputs-container">
              <PasswordInputField
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </section>

            <button className="forgot-password-button" type="submit" disabled={!password || disabledButton}>
              Salvar
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
