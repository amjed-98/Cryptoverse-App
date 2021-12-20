import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './App.js';
import store from './app/store';

import 'antd/dist/antd.css';

ReactDOM.render(
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>,
  document.getElementById('root')
);

// todo add chart component
// todo implement loading spinner
// todo add exchanges component
// todo next.js serverSide rendering
