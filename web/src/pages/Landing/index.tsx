import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'

import logoSvg from '../../assets/images/logo.svg'
import landingSvg from '../../assets/images/landing.svg'

import studyIcon from '../../assets/images/icons/study.svg'
import giveClassesIcon from '../../assets/images/icons/give-classes.svg'
import purpleHeartIcon from '../../assets/images/icons/purple-heart.svg'

import api from '../../services/api';
import { useAuth } from '../../contexts/Auth';

import './styles.css';

const Landing: React.FC = () => {
  const { signOut } = useAuth();

  const [totalConnections, setTotalConnections] = useState(0);

  useEffect(() => {
    api.get(`connections`).then(({ data }) => {
      const { total } = data;
      
      setTotalConnections(total)
    });
  }, [])

  return (
    <div id="page-landing">
      <div id="page-landing-content" className="container">
        
        <div className="logo-container">
          <img src={logoSvg} alt="Proffy" />
          <h2>Sua plataforma de estudos online.</h2>
        </div>

        <img src={landingSvg} alt="Plataforma de estudos" className="hero-image"/>

        <div className="buttons-container">
          <Link to="/study" className="study">
            <img src={studyIcon} alt="Estudar"/>
            Estudar
          </Link>

          <Link to="/give-classes" className="give-classes">
            <img src={giveClassesIcon} alt="Dar aulas"/>
            Dar aulas
          </Link>

          <button type="button" onClick={() => signOut()}>Out</button>
        </div>

        <span className="total-connections">
          Total de {totalConnections} conexões já realizadas <img src={purpleHeartIcon} alt="Coração roxo"/>
        </span>

      </div>
    </div>
  );
}

export default Landing;