# Blackjack Count Trainer

A web application to help users practice Hi-Lo card counting for blackjack. Built with React, TypeScript, Vite, and Tailwind CSS.

## Features

- Display 12 random playing cards for a timed period
- Implement Hi-Lo card counting system
- Progressive timing system that adjusts based on user performance
- Dark/Light mode toggle with persistent preference
- Responsive design for various screen sizes

## Hi-Lo Counting System

- Cards 2-6: +1
- Cards 7-9: 0
- Cards 10, J, Q, K, A: -1

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/blackjack-count-trainer.git
   cd blackjack-count-trainer
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

This will start the development server at `http://localhost:5173/blackjack-count-trainer/`.

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

## Deployment

This project is configured for GitHub Pages deployment. The base path is set to `/blackjack-count-trainer/` in the Vite configuration.

To deploy to GitHub Pages:

1. Push your code to a GitHub repository
2. Set up GitHub Pages to deploy from the `dist` folder on your preferred branch

## Project Structure

- `src/components/` - React components
- `src/hooks/` - Custom React hooks
- `src/utils/` - Utility functions
- `public/images/cards/` - SVG card images

## License

This project is licensed under the MIT License.
