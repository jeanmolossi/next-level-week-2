import React from 'react';
import { Route as DOMRoute, RouteProps as DOMRouteProps, Redirect } from 'react-router-dom';


interface RouteComponentProps extends DOMRouteProps{
  isPrivate?: boolean;
  component: React.ComponentType;
}

const Route: React.FC<RouteComponentProps> = ({ isPrivate = false, component: Component }) => {

  const userSigned = undefined;

  return <DOMRoute
    render={() => (isPrivate === !!userSigned)
      ? <Component />
      : <Redirect to={{ pathname: isPrivate ? '/' : '/home' }} />}
  />
}

export default Route;