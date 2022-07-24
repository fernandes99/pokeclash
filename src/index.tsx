import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import store from './store';

import './styles/reset.css';
import './styles/base.css';
import './styles/fonts.css';

const root = ReactDOM.createRoot(
  document.getElementById('app') as HTMLElement
);
root.render(
  <Provider store={store}> 
    <App />
  </Provider>
);
