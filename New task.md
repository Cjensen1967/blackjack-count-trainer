## New Task: Build CountSight Trainer from Scratch for GitHub Pages

__Objective:__ Create a "CountSight Trainer" application as a static website, suitable for deployment on GitHub Pages. The application helps users practice Hi-Lo card counting for blackjack.

__Core Functionality:__

1. __Card Display:__

   - Display 12 random playing cards from a standard 52-card deck for a timed period.
   - The cards should disappear after the timer elapses, prompting the user for input.

2. __Hi-Lo Counting Logic:__

   - Implement the Hi-Lo card counting system:

     - Cards 2-6: +1
     - Cards 7-9: 0
     - Cards 10, J, Q, K, A: -1

   - Calculate the correct Hi-Lo count for the displayed hand.

3. __User Input & Feedback:__

   - Allow users to input their calculated Hi-Lo count.
   - Provide immediate feedback: "Correct!" or "Incorrect. The correct count was X."

4. __Progressive Timing System:__

   - Start with an initial timer (e.g., 10 seconds) for displaying the cards.
   - If the user answers correctly, decrease the time for the next hand (e.g., by 200ms), down to a minimum time (e.g., 2 seconds).
   - If the user answers incorrectly, increase the time for the next hand (e.g., by 200ms), up to the intial time (e.g., 10 seconds).
   - Include a "Reset Timer" button to set the timer back to its initial value.

5. __New Drill:__
   - Provide a "New Drill" button to deal a new hand of cards at any time, resetting the current state.

6. __Theme Toggle (Dark/Light Mode):__

   - Implement a theme toggle button (e.g., sun/moon icon) to switch between light and dark modes.
   - Theme preference should persist between sessions (e.g., using localStorage).

__Technical Stack & Requirements:__

1. __Framework/Library:__

   - Use __React__ with __Vite__ and __TypeScript__. This stack is well-suited for static site generation and avoids the complexities encountered with Next.js static export for this particular project.
   - Alternatively, vanilla JavaScript, HTML, and CSS is also acceptable if preferred for simplicity, as long as all core functionality is met.

2. __Styling:__

   - Use __Tailwind CSS__ for styling.
   - The UI should be clean, user-friendly, and responsive.
   - A professional and engaging look is desired. Consider a "casino green felt" theme for the card display area.

3. __Static Site Generation:__

   - The final output __must__ be a static website (HTML, CSS, JS) that can be deployed directly to GitHub Pages.
   - Ensure all asset paths (images, CSS) are correctly configured for GitHub Pages (i.e., relative paths or correct base path handling if the repository name is used in the URL).

4. __No Backend:__
   - The application must be entirely client-side. No server-side logic or database is required.

__Asset Requirements:__

1. __Playing Card Images:__

   - Use SVG images for playing cards.

   - __Asset Location Placeholder:__ Card assets (52 SVG files) can be found at `[USER: Please specify the local path to the 'public/images/cards/' directory from the original project, e.g., 'C:/Users/username/path/to/original/project/public/images/cards/']`.

   - __Naming Convention:__ Card images are named like `suit_rank.svg` (e.g., `hearts_ace.svg`, `clubs_10.svg`, `diamonds_7.svg`).

     - Suits: `hearts`, `diamonds`, `clubs`, `spades`
     - Ranks: `ace`, `2`, `3`, `4`, `5`, `6`, `7`, `8`, `9`, `10`, `jack`, `queen`, `king`

   - The `PlayingCard.tsx` component from the original project (if referenced) handled constructing these image paths.

__Key UI Components (Conceptual):__

- `CountSightTrainer`: Main application component.
- `PlayingCard`: Component to render a single card.
- `ThemeProvider`: For managing light/dark themes.
- `ThemeToggle`: Button to switch themes.
- Standard UI elements like buttons, input fields, and cards for layout. (Shadcn/UI was used previously, but direct Tailwind styling or a simpler component library is also fine).

__Deployment:__

- The project will be deployed to GitHub Pages. The build process should generate an `out` or `dist` folder compatible with this.
- If the GitHub repository is named, for example, `blackjack-counter`, the Vite config should set `base: '/blackjack-counter/'`.

__Deliverables:__

1. A complete, functional Vite (or vanilla JS) application meeting all requirements.
2. All source code, including components, styling, and utility functions.
3. A simple `README.md` explaining how to build and run the project locally.
4. Configuration files for Vite and Tailwind CSS.

__Summary of Previous Attempt (for context, not to repeat issues):__ The previous attempt involved refactoring a Next.js application to Vite. Significant and persistent issues were encountered with Tailwind CSS and PostCSS configuration within the Vite environment, leading to this request for a fresh build. The core React components and logic are generally sound and can be reused. The primary challenge was the build tooling integration.

This new build should prioritize a stable and straightforward setup for static site generation with React, Vite, and Tailwind CSS.
