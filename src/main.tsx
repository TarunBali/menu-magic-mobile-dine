
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Handle GitHub Pages SPA routing
// Check if coming from a GitHub Pages 404 redirect
const locationSearch = window.location.search;
const pathParam = /path=([^&]*)/.exec(locationSearch);
const queryParam = /query=([^&]*)/.exec(locationSearch);

if (pathParam) {
  // Reconstruct the URL and replace current state
  let redirectPath = '/' + decodeURIComponent(pathParam[1]);
  if (queryParam) {
    redirectPath += '?' + decodeURIComponent(queryParam[1]);
  }
  window.history.replaceState(null, '', redirectPath);
}

createRoot(document.getElementById("root")!).render(<App />);
