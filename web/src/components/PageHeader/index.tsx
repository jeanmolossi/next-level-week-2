import React from 'react';
import { Link } from 'react-router-dom';

import logoSvg from '../../assets/images/logo.svg';
import backIcon from '../../assets/images/icons/back.svg';

import './styles.css';

interface PageHeaderProps {
  title: string;
  description?: string;
  location?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, description, location, children }) => {

  return (
    <header className="page-header">
      <div className="top-bar-container">
        <Link to="/">
          <img src={backIcon} alt="Back"/>
        </Link>
        {location && <>{location}</>}
        <Link to="/">
          <img src={logoSvg} alt="Proffy" />
        </Link>
      </div>

      {title && (
        <div className="header-content">
          <strong>{title}</strong>
          {description && (<p>{description}</p>)}

          {children}
        </div>
      )}
    </header>
  );
}

export default PageHeader;
