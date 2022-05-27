import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import AppUser from './AppUsers';
import './index.css';

import { Route, Link, BrowserRouter as Router, Switch } from 'react-router-dom'

const routing = (
        <div className="page-container">
            <Router>
                <div className="row1">
                <div className="react">A Demo React App</div>
                    <ul>
                      <li className="tmp">
                        <Link to={`${process.env.PUBLIC_URL}/`}><u>Posts</u></Link>
                      </li>
                      <li  className="tmp">
                        <Link to={`${process.env.PUBLIC_URL}/users`}><u>Users</u></Link>
                      </li>
                    </ul>
                </div>
                <Switch>
                <Route exact path={`${process.env.PUBLIC_URL}/`} component={App} />
                <Route path={`${process.env.PUBLIC_URL}/users`} component={AppUser} />
                </Switch>
            </Router> 
        </div>


)
ReactDOM.render(routing, document.getElementById('root'))
