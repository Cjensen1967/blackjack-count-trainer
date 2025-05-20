import CountSightTrainer from './components/CountSightTrainer';
import ThemeToggle from './components/ThemeToggle';
import Button from './components/UI/Button';
import { useTheme } from './hooks/useTheme';
import { useCardDeck } from './hooks/useCardDeck';
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
  const { dealNewCards } = useCardDeck();

  return (
    <div className={`app-wrapper ${theme}`}>
      <div className="container">
        <header className="header">
          <h1>Blackjack Count Trainer</h1>
          <div className="header-controls">
            <Button 
              onClick={dealNewCards} 
              variant="primary" 
              size="sm" 
              className="new-drill-button"
            >
              New Drill
            </Button>
            <ThemeToggle />
          </div>
        </header>
        
        <main>
          <CountSightTrainer onNewDrill={dealNewCards} />
        </main>
        
        <footer className="footer">
          <p>© {new Date().getFullYear()} Blackjack Count Trainer</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
