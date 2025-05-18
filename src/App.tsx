import CountSightTrainer from './components/CountSightTrainer';
import ThemeToggle from './components/ThemeToggle';
import { useTheme } from './hooks/useTheme';
import './App.css';

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
