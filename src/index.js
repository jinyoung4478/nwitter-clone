import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from 'components/App';

const rootElement = document.getElementById('root');
const ReactDOM = createRoot(rootElement);

ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
);