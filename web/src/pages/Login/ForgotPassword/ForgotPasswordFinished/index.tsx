import React from 'react';

import FinishedPageComponent from '../../../../components/FinishedPageComponent';

const ForgotPasswordFinished: React.FC = () => {
  return (
    <FinishedPageComponent
      title="Redefinição enviada!"
      description="Boa, agora é só checar o e-mail que foi enviado para você redefinir sua senha e aproveitar os estudos."
      textButton="Voltar ao login"
    />
  );
}

export default ForgotPasswordFinished;