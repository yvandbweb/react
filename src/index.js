import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import AppUser from './AppUsers';
import './index.css';

import { Route, Link, BrowserRouter as Router, Switch } from 'react-router-dom'

const routing = (
        <div className="page-container">
          <div className="content-wrap">
              <Router>
                  <ul className="ul1">
                    <li>
                      <Link to={`${process.env.PUBLIC_URL}/`}><u>Posts</u></Link>
                    </li>
                    <li>
                      <Link to={`${process.env.PUBLIC_URL}/users`}><u>Users</u></Link>
                    </li>
                  </ul>
                  <Switch>
                  <Route exact path={`${process.env.PUBLIC_URL}/`} component={App} />
                  <Route path={`${process.env.PUBLIC_URL}/users`} component={AppUser} />
                  </Switch>
              </Router>
          </div>
        </div>


)
ReactDOM.render(routing, document.getElementById('root'))
