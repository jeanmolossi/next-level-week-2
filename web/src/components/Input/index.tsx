import React, { InputHTMLAttributes } from 'react';
import MaskedInput, { MaskedInputProps } from 'react-text-mask';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';

import './styles.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  currency?: boolean;
  maskProps?: MaskedInputProps;
}

const Input: React.FC<InputProps> = ({ name, label, currency = false, maskProps, ...rest }) => {

  const currencyMask = createNumberMask({ 
    thousandsSeparatorSymbol: '.',
    allowDecimal: true,
    decimalSymbol: ',',
    suffix: '',
    prefix: 'R$ ',
  })

  return (
    <div className="input-block">
      <label htmlFor={name}>{label}</label>
      {!maskProps
        ? (<input id={name} {...rest} />)
        : (
          <MaskedInput mask={currency ? currencyMask : maskProps.mask} {...rest} />
      )}
    </div>
  );
}

export default Input;