import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import AppTop from './AppTop';
import ApplistingPosts from './ApplistingPosts';
import AppBottom from './AppBottom';
function Comment(props) {
  return (
    <div>
      <ApplistingPosts />
    </div>
  );
}

class App extends Component {
  render() {
    return (
       <div className="row centered">
          <Comment /> 
        </div>
        
        

    );
  }
}

export default App;
