import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import CountSightTrainerNew from './components/CountSightTrainerNew';
import './App.css';

/**
 * Main application component
 * 
 * This is the root component of the Blackjack Count Trainer application.
 * It sets up routing and includes the main layout with navigation.
 * 
 * @returns The main application component
 */
function App() {
  // We'll add more routes as we implement additional screens
  return (
    <Router>
      <Routes>
        {/* Home/Training route */}
        <Route 
          path="/" 
          element={
            <Layout title="Hi-Lo Blackjack Training" showBackButton={false}>
              <CountSightTrainerNew />
            </Layout>
          } 
        />
        
        {/* Training route (same as home for now) */}
        <Route 
          path="/training" 
          element={
            <Layout title="Hi-Lo Blackjack Training">
              <CountSightTrainerNew />
            </Layout>
          } 
        />
        
        {/* Placeholder routes for future screens */}
        <Route 
          path="/strategy" 
          element={
            <Layout title="Hi-Lo Blackjack Strategy">
              <div className="placeholder-content">
                <h2>Strategy Content</h2>
                <p>Strategy content will be implemented in a future update.</p>
              </div>
            </Layout>
          } 
        />
        
        <Route 
          path="/settings" 
          element={
            <Layout title="Settings">
              <div className="placeholder-content">
                <h2>Settings</h2>
                <p>Settings content will be implemented in a future update.</p>
              </div>
            </Layout>
          } 
        />
        
        {/* Redirect any unknown routes to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
