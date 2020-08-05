import React from 'react';

import whatsappIcon from '../../assets/images/icons/whatsapp.svg';

import './styles.css';

const TeacherItem: React.FC = () => {
  return (
    <article className="teacher-item">
      <header>

        <img src="https://api.adorable.io/avatars/285/abott@adorable.png" alt=""/>
        <div>
          <strong>Jean Carlos</strong>
          <span>Química</span>
        </div>

      </header>


      <p>
        Entusiasta das melhores tecnologias de química avançada.
        <br /><br />
        Apaixonado por expordir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões
      </p>

      <footer>

        <p>
          Preço/hora
          <strong>R$ 89,97</strong>
        </p>
        <button type="button">
          <img src={whatsappIcon} alt="Whatsapp" />
          Entrar em contato
        </button>
      </footer>
    </article>
  );
}

export default TeacherItem;