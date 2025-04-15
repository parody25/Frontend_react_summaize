import React from 'react';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { useAppSelector } from './app/hooks';
import { BrowserRouter as Router } from 'react-router-dom'; 
import CreditApplicationGenerator from './components/CreditApplication';
import Login from './components/Auth/login';

const AppContent: React.FC = () => {
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn); // Ensure 'isLoggedIn' matches your store structure

  return isLoggedIn ? <CreditApplicationGenerator /> : <Login />;
};

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router> {/* Wrap the application in a Router */}
        <AppContent />
      </Router>
    </Provider>
  );
};

export default App;