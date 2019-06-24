import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import './App.css';
import AppTop from './AppTop';
import ApplistingUsers from './ApplistingUsers';
import AppBottom from './AppBottom';
function Comment1(props) {
  return (
    <div className="center-block">
      <ApplistingUsers />
      </div>
  );
}

class AppUser extends Component {
  render() {
    return (
       <div className="row centered">
          <Comment1 /> 
        </div>
    );
  }
}


export default AppUser;
