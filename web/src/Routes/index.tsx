import React from 'react';
import { BrowserRouter as Router, Switch, Route as DOMRoute } from 'react-router-dom';
import Route from './Route';

import Landing from '../pages/Landing';
import TeacherList from '../pages/TeacherList';
import TeacherForm from '../pages/TeacherForm';

import Login from '../pages/Login';
import ForgotPassword from '../pages/Login/ForgotPassword';
import ForgotPasswordFinished from '../pages/Login/ForgotPassword/ForgotPasswordFinished';
import RecoverPassword from '../pages/Login/ForgotPassword/RecoverPassword';
import RecoverPasswordFinished from '../pages/Login/ForgotPassword/RecoverPassword/RecoverPasswordFinished';
import SignUp from '../pages/SignUp';
import RegisterComplete from '../pages/SignUp/RegisterComplete';
import Profile from '../pages/Profile';

const Routes: React.FC = () => {
  return (
    <Router>
      <Switch>

        <Route path="/" exact component={Login} />
        <Route path="/forgot-password" component={ForgotPassword} />
        <Route path="/forgot-password-finished" component={ForgotPasswordFinished} />
        <DOMRoute path="/recover-password/:token" component={RecoverPassword} />
        <DOMRoute path="/recover-password-finished" component={RecoverPasswordFinished} />
        <Route path="/register" component={SignUp} />
        <Route path="/register-finished" component={RegisterComplete} />

        <Route path="/home" component={Landing} isPrivate />
        <Route path="/study" component={TeacherList} isPrivate />
        <Route path="/give-classes" component={TeacherForm} isPrivate />
        <Route path="/profile" component={Profile} isPrivate />

      </Switch>
    </Router>
  );
}

export default Routes;
