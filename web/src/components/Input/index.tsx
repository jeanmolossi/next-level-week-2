import React, { InputHTMLAttributes, useMemo } from 'react';
import MaskedInput, { MaskedInputProps } from 'react-text-mask';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';

import './styles.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  defaultMask?: 'tel' | 'currency';
  maskProps?: MaskedInputProps;
}

const Input: React.FC<InputProps> = ({ name, label, defaultMask, maskProps, ...rest }) => {


  const defaultMasks = useMemo(() => ({
    currency: createNumberMask({ 
      thousandsSeparatorSymbol: '.',
      allowDecimal: true,
      decimalSymbol: ',',
      suffix: '',
      prefix: 'R$ ',
    }),
    tel: [
      '(', /[1-9]/, /\d/, ')',
      ' ',
      /\d/, ' ',/\d/, /\d/,/\d/,/\d/,
      ' ',
      /\d/, /\d/, /\d/, /\d/
    ],
    default: maskProps && maskProps.mask ? maskProps.mask : undefined
  }), [maskProps])

  return (
    <div className="input-block">
      <label htmlFor={name}>{label}</label>
      {!maskProps
        ? (<input id={name} {...rest} />)
        : (
          <MaskedInput mask={defaultMasks[defaultMask || 'default']} {...rest} />
      )}
    </div>
  );
}

export default Input;