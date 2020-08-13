import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import logoSvg from '../../assets/images/logo.svg';
import backIcon from '../../assets/images/icons/back.svg';

import proffysIcon from '../../assets/images/emoji-proffy.svg';

import './styles.css';
import api from '../../services/api';

interface PageHeaderProps {
  title: string;
  description?: string;
  location?: string;
  blockquote?: React.ReactNode | 'proffysCount';
}

const PageHeader: React.FC<PageHeaderProps> =
  ({ title, description, location, blockquote, children }) => {

    const [proffyCount, setProffyCount] = useState(0);

    useEffect(() => {
      if(blockquote && blockquote === 'proffysCount'){
        api.get(`proffys`).then(response => {
          setProffyCount(response.data.count);
        })
      }
    });

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


        <div className="header-content">
          <main className="header-main">
            <div className="title-description">
              {title && (
                <strong>{title}</strong>
              )}

              {description && (
                <p>{description}</p>
              )}
            </div>
            <div className="blockquote">
              <blockquote>

                {blockquote && blockquote === 'proffysCount'
                  ? (
                  <>
                    <img src={proffysIcon} alt="Proffys emoji" />
                    <span>
                      {proffyCount} proffys
                    </span>
                  </>
                  ) : blockquote}

              </blockquote>
            </div>
          </main>

          {children}
        </div>

    </header>
  );
}

export default PageHeader;
