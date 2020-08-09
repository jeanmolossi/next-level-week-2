import React, { TextareaHTMLAttributes } from 'react';

import './styles.css';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  label: string;
}

const Textarea: React.FC<TextareaProps> = ({ name, label, maxLength = 300, ...rest }) => {
  return (
    <div className="textarea-block">
      <label htmlFor={name}>
        {label}{' '}
        {maxLength && <small>(Máximo {maxLength} caracteres)</small>}
      </label>
      <textarea id={name} maxLength={maxLength} {...rest} />
    </div>
  );
}

export default Textarea;