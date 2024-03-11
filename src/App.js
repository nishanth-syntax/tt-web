import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import CssBaseline from '@mui/material/CssBaseline';

import './App.css';
import { Provider } from 'react-redux'
import { store } from './store'

import ErrorPage from './containers/ErrorPage'
import VideoRecorderPage from './containers/VideoRecorderPage'
import React from "react";

function App() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Provider store={store}>
        <Router>
          <Routes>
            <Route index element={<VideoRecorderPage />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </Router>
      </Provider>
    </React.Fragment>
  );
}

export default App;
