
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Create a simpler version without Clerk authentication
createRoot(document.getElementById("root")!).render(
  <App />
);
