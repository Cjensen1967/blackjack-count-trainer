import CountSightTrainer from './components/CountSightTrainer';
import ThemeToggle from './components/ThemeToggle';
import { useTheme } from './hooks/useTheme';
import './App.css';

/**
 * Main application component
 * 
 * This is the root component of the Blackjack Count Trainer application.
 * It sets up the overall layout and includes the theme toggle and main trainer component.
 * 
 * @returns The main application component
 */
function App() {
  const { theme } = useTheme();

  return (
    <div className={`app-wrapper ${theme}`}>
      <div className="container">
        <header className="header">
          <h1>Blackjack Count Trainer</h1>
          <ThemeToggle />
        </header>
        
        <main>
          <CountSightTrainer />
        </main>
        
        <footer className="footer">
          <p>© {new Date().getFullYear()} Blackjack Count Trainer. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
