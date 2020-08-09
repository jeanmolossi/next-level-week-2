import React, { useEffect, useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import logoSvg from '../../assets/images/logo.svg';
import backIcon from '../../assets/images/icons/back.svg';

import './styles.css';

interface MenuProps {
  to: string;
  text: string;
}

interface PageHeaderProps {
  title: string;
  description?: string;
  location?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, description, location, children }) => {
  const { pathname } = useLocation();

  const [menuProps, setMenuProps] = useState({} as MenuProps);

  const menus = useMemo(() => ([
    { path: '/study', linkProps: { to: '/give-classes', text: 'Dar aulas' } },
    { path: '/give-classes', linkProps: { to: '/study', text: 'Estudar' } }
  ]), [])

  useEffect(() => {
    const menuToShow = menus.find(menu => menu.path === pathname);
    if(menuToShow)
      setMenuProps(menuToShow.linkProps)
  }, [pathname, menus]);

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