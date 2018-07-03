import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

/**
class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}
**/

class code1 extends Component {
  render() {
    return (
      <textarea rows="6" cols="35" disabled="true">
        Hellooooooo
      </textarea>
    );
  }
}

export default code1;
