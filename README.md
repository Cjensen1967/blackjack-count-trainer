# Blackjack Count Trainer

A web application to help users practice Hi-Lo card counting for blackjack. Built with React, TypeScript, Vite, and Tailwind CSS.

[![Netlify Status](https://api.netlify.com/api/v1/badges/your-netlify-badge-id/deploy-status)](https://app.netlify.com/sites/blackjack-counter/deploys)

## Live Demo

[Visit the Blackjack Count Trainer](https://blackjack-counter.netlify.app)

## Features

- **Redesigned Card Counting Practice**: Train with a new interface that displays a configurable number of random playing cards.
- **Configurable Training Settings**: Customize your practice sessions via the Settings page:
    - **Drill Type**: Choose between Standard drills or Deck Training mode.
    - **Number of Cards**: Set the number of cards to display per drill (e.g., 3, 6, 9, 12).
    - **Card Display Time**: Adjust the initial time cards are shown (e.g., 3s, 5s, 10s, 15s).
- **Adaptive Timing System**: While initial display time is configurable, the system dynamically adjusts subsequent card display times based on your performance for a progressive challenge.
- **Customizable Session Timer**: Configure a session timer on the Settings page:
    - **Visibility**: Show or hide the timer during drills.
    - **Behavior**: Set to count up or count down.
    - **Duration**: Select a predefined duration (e.g., 30s, 60s, 90s, 120s) for countdown mode.
- **Hi-Lo Card Counting System**: Utilizes the popular and effective Hi-Lo strategy for learning card counting.
- **Visual Card Representation**: Clear and realistic SVG card images for an authentic practice experience.
- **Redesigned User Interface**: Modern and intuitive UI with a new layout structure and an in-drill timer display.
- **Dark/Light Mode**: Toggle between dark and light themes with your preference saved locally.
- **Optimized Mobile Experience**: Full-screen layout with a clean, touch-friendly interface for practice on the go.
- **Responsive Design**: Adapts seamlessly to various screen sizes for a consistent experience across devices.
- **Upcoming Strategy Section**: A dedicated page (`/strategy`) with detailed information about card counting strategies is planned for a future update.

![Blackjack Count Trainer Screenshot](screenshot-url-here)

## Hi-Lo Card Counting System

The Hi-Lo (High-Low) system is one of the most popular card counting strategies in blackjack. It assigns a value to each card:

- **Cards 2-6**: +1 (low cards)
- **Cards 7-9**: 0 (neutral cards)
- **Cards 10, J, Q, K, A**: -1 (high cards)

### Why Card Counting Works

Card counting works because a deck rich in high cards (10s, face cards, and Aces) favors the player, while a deck rich in low cards favors the dealer. By keeping track of the running count, players can:

1. Make larger bets when the count is positive (more high cards remain)
2. Make smaller bets or avoid playing when the count is negative (more low cards remain)

### Using This Trainer

This application helps you practice the mental calculations needed for card counting in a real casino environment. Regular practice can improve your speed and accuracy.

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/blackjack-counter.git
   cd blackjack-counter
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Development

Run the development server:
```bash
npm run dev
```

This will start the development server at `http://localhost:5173/`.

### Building for Production

Build the project for production:
```bash
npm run build
```

This will generate a `dist` folder with static files ready for deployment.

### Preview Production Build

To preview the production build locally:
```bash
npm run preview
```

## How to Use the Application

1. **Configure Settings (Optional)**: Navigate to the "Settings" page to customize drill type, number of cards, card display time, and session timer preferences.
2. **Start a New Drill**: Click the "New Drill" button on the main training page to display a set of random cards according to your settings.
3. **Count the Cards**: Cards will be displayed for the configured time. A timer will show the remaining display duration. Apply the Hi-Lo counting system to calculate the total count.
4. **Enter Your Answer**: After the cards disappear, enter your count in the input field.
5. **Get Feedback**: Submit your answer to receive immediate feedback on your accuracy.
6. **Adaptive Timing**: If the initial display time is set, the system may still adjust it for subsequent rounds based on your performance:
   - Correct answers: Display time can decrease (making it more challenging).
   - Incorrect answers: Display time can increase (giving you more time to practice).
7. **Reset Timer**: If needed, you can reset the card display timer to its default or configured value.

## Deployment

### Netlify Deployment

This project is configured for deployment on Netlify:

1. Push your code to a GitHub repository
2. Connect your repository to Netlify
3. Configure the build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Deploy the site

### SPA Routing Configuration

The project includes a `public/_redirects` file with the following content:

```
/* /index.html 200
```

This configuration ensures that all routes are redirected to `index.html`, allowing the React Router to handle client-side routing properly.

### Base Path Configuration

The `vite.config.ts` file is configured with a root base path:

```typescript
export default defineConfig({
  plugins: [react()],
  base: '/',
})
```

This setting ensures that all assets are loaded correctly from the root path of the domain.

## Mobile Experience

The application is optimized for mobile devices with several key features:

- **Full-Screen Layout**: The app utilizes the entire screen space on mobile devices for an immersive experience
- **Clean Interface**: Unnecessary UI elements have been removed to focus on the core functionality
- **Flexible Layout**: The card grid and input areas automatically adjust to different screen sizes
- **Optimized Touch Targets**: Buttons and interactive elements are sized appropriately for touch input
- **Progressive Web App Support**: Meta tags enable installation as a home screen app on mobile devices

To get the best experience on mobile:
1. Access the application in your mobile browser
2. For iOS users: Use the "Add to Home Screen" option in Safari
3. For Android users: Use the "Add to Home Screen" or "Install App" option in Chrome

## Project Structure

- `src/components/` - React components
  - `CountSightTrainerNew.tsx` - Main training component with card display, input functionality, and settings integration.
  - `PlayingCard.tsx` - Card rendering component
  - `Settings.tsx` - Component for configuring training settings.
  - `ThemeToggle.tsx` - Dark/light mode toggle
  - `Timer.tsx` - Component for displaying countdown/countup timers.
  - `UI/` - Reusable UI components (e.g., buttons, inputs)
  - `Layout.tsx` - Main layout structure for pages.
- `src/App.tsx` - Root component with router, header, and main content area.
- `src/contexts/` - React contexts
  - `SettingsContext.tsx` - React context for managing and providing application settings.
- `src/hooks/` - Custom React hooks
  - `useCardDeck.ts` - Card deck management, game logic, and adaptive timing.
  - `useTheme.ts` - Theme switching functionality.
  - `useSettings.ts` - Hook for managing user settings.
- `src/utils/` - Utility functions
  - `countingUtils.ts` - Card counting logic.
- `public/images/cards/` - SVG card images

## Acknowledgements

- The playing card images used in this application are available in the public domain, courtesy of [Tek Eye](https://tekeye.uk). As a gesture of appreciation for the hard work that went into creating and maintaining these resources, a link to the original article is provided: [SVG Playing Cards - Public Domain](https://tekeye.uk/playing_cards/svg-playing-cards).

## License

This project is licensed under the MIT License.
