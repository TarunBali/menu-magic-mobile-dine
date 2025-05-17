
# FoodieSpot Restaurant Ordering System

A modern restaurant ordering system built with React, TypeScript, and Tailwind CSS.

## Live Demo

[View the live demo on GitHub Pages](#) (Add your GitHub Pages URL once deployed)

## Features

- Customer Portal:
  - Menu browsing and item selection
  - Cart management
  - Order placement and tracking
  - Order history
  - Login with OTP verification

- Staff Portal:
  - Order management dashboard
  - Real-time order status updates
  - Sales reports and analytics
  - Staff authentication

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- NPM or Yarn

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/foodiespot.git
   cd foodiespot
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start development server:
   ```
   npm run dev
   ```

## Deployment

This project is configured for easy deployment to GitHub Pages. Simply push to the `main` branch, and the GitHub Action will automatically deploy your site.

### Configuration

By default, the application runs in "Demo Mode" using mock data. To switch to production mode:

1. Go to `/config` in the deployed application
2. Download the sample configuration file
3. Fill in your API details
4. Upload the modified configuration file

> ⚠️ **Security Note**: Never commit the configuration file with real API keys to your repository. The app is designed to load this file at runtime only.

## Project Structure

- `src/components`: Reusable UI components
- `src/pages`: Application pages and views
- `src/context`: React context providers
- `src/services`: API service functions
- `src/types`: TypeScript type definitions
- `src/utils`: Utility functions

## License

[MIT License](LICENSE)

## Acknowledgments

- Built with [Vite](https://vitejs.dev/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide React](https://lucide.dev/)

