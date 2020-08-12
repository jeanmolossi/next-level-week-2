import React, { useCallback, useState, InputHTMLAttributes } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';

import './styles.css';

const PasswordInputField: React.FC<InputHTMLAttributes<HTMLInputElement>> = ({ value = '', ...rest }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisible = useCallback(() => {
    setIsPasswordVisible(!isPasswordVisible);
  }, [isPasswordVisible])

  return (
    <div className={`login-input-block ${value ? 'filled': ''}`}>
      <input
        type={isPasswordVisible ? 'text' : 'password'}
        required
        {...rest}
      />
      <span>Senha</span>
      <button type="button" onClick={togglePasswordVisible}>
        {isPasswordVisible ? <FiEyeOff color="#8257E5" /> : <FiEye />}
      </button>
    </div>
  );
}

export default PasswordInputField;
