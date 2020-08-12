import React from 'react';

import FinishedPageComponent from '../../../../../components/FinishedPageComponent';

const ForgotPasswordFinished: React.FC = () => {
  return (
    <FinishedPageComponent
      title="Senha alterada!"
      description="Boa, agora você já pode fazer o login com sua nova senha. Bons estudos!"
      textButton="Ir ao login"
    />
  );
}

export default ForgotPasswordFinished;
