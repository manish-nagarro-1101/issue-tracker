import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Security, LoginCallback } from '@okta/okta-react';
import { oktaAuth } from './auth/oktaConfig';
import HomePage from './pages/HomePage';
import IssueListPage from './pages/IssueListPage';
import AddIssueForm from './components/AddIssueForm';
import Header from './components/Header';
import Footer from './components/Footer';


function App() {
  const restoreOriginalUri = async (_oktaAuth: any, originalUri: string) => {
    window.location.replace(originalUri || '/');
  };
  return (
    <Router>
      <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri}>
      <Header />
      <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login/callback" element={<LoginCallback />} />
          <Route path="/issues" element={<IssueListPage />} /> {/* Added new route for issues */}
          <Route path="/addIssue" element={<AddIssueForm />} />
        </Routes>
     <Footer />
      </Security>
    </Router>
  );
}

export default App;
