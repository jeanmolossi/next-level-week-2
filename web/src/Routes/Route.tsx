import React from 'react';
import { Route as DOMRoute, RouteProps as DOMRouteProps, Redirect } from 'react-router-dom';

import { useAuth } from '../contexts/Auth';

interface RouteComponentProps extends DOMRouteProps{
  isPrivate?: boolean;
  component: React.ComponentType;
}

const Route: React.FC<RouteComponentProps> = ({ isPrivate = false, component: Component }) => {

  const { user } = useAuth();

  return <DOMRoute
    render={() => (isPrivate === !!user)
      ? <Component />
      : <Redirect to={{ pathname: isPrivate ? '/' : '/home' }} />}
  />
}

export default Route;