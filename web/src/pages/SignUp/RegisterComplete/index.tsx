import React from 'react';

import FinishedPageComponent from '../../../components/FinishedPageComponent';

const RegisterComplete: React.FC = () => {
  return (
    <FinishedPageComponent
      title="Cadastro concluído"
      description="Agora você faz parte da plataforma da Proffy.
      Tenha uma ótima experiência."
      textButton="Fazer login"
    />
  );
}

export default RegisterComplete;