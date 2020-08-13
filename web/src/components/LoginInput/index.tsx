import React, { InputHTMLAttributes, useMemo } from 'react';

import './styles.css';
import { isArray } from 'util';

interface LoginInputProps extends InputHTMLAttributes<HTMLInputElement>{
  label: string;
  containerClassStyle?: string | string[];
}

const LoginInput: React.FC<LoginInputProps> = ({ label, value = '', containerClassStyle = '', ...rest }) => {

  const classesContainer = useMemo(() => {
    if(isArray(containerClassStyle)){
      return containerClassStyle.join(' ');
    }
    return containerClassStyle;
  }, [containerClassStyle]);

  return (
    <div className={`login-input-block ${value ? 'filled': ''} ${classesContainer}`}>
      <input
        type="text"
        required
        {...rest}
      />
      <span>{label}</span>
    </div>
  );
}

export default LoginInput;
