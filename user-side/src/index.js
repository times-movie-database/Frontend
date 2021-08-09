import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Header from './components/Header';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
 
ReactDOM.render(
  <React.StrictMode>
      <Router>
      <div>
      <Switch>
          <Route exact path="/movie/id/edit">
          </Route>
          <Route exact path="/movie/add">
            <Header searchBar="no" addButton="no" />
          </Route>
          <Route path="/">
          <Header searchBar="yes" addButton="yes" />
          </Route>
        </Switch>
      </div>
    </Router>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
 
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
