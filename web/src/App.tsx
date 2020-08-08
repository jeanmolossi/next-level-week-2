import React from 'react';

import Routes from './Routes';

import AppProviders from './contexts';

import './assets/styles/global.css';

function App() {
  return (
    <AppProviders>
      <Routes />
    </AppProviders>
  );
}

export default App;
