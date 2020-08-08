import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Landing from './pages/Landing';
import TeacherList from './pages/TeacherList';
import TeacherForm from './pages/TeacherForm';

import Login from './pages/Login';
import ForgotPassword from './pages/Login/ForgotPassword';
import ForgotPasswordFinished from './pages/Login/ForgotPassword/ForgotPasswordFinished';
import SignUp from './pages/SignUp';
import RegisterComplete from './pages/SignUp/RegisterComplete';

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Route path="/" exact component={Login} />
      <Route path="/forgot-password" component={ForgotPassword} />
      <Route path="/forgot-password-finished" component={ForgotPasswordFinished} />
      <Route path="/register" component={SignUp} />
      <Route path="/register-finished" component={RegisterComplete} />      

      <Route path="/home" component={Landing} />
      <Route path="/study" component={TeacherList} />
      <Route path="/give-classes" component={TeacherForm} />
    </BrowserRouter>
  );
}

export default Routes;