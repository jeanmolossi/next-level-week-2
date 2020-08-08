import React from 'react';
import { Link } from 'react-router-dom';
import { FiCheck } from 'react-icons/fi';

import './styles.css';

interface FinishedPageComponentProps {
  title: string;
  description: string;
  textButton: string;
  link?: string;
}

const FinishedPageComponent: React.FC<FinishedPageComponentProps> = ({ title, description, textButton, link = '/'}) => {
  return (
    <div className="register-complete-container">
      <section className="middle-content">
        <div className="icon-content">
          <FiCheck />
        </div>
        <h1>{title}</h1>
        <p>{description}</p>

        <Link to={link}>{textButton}</Link>
      </section>
    </div>
  );
}

export default FinishedPageComponent;