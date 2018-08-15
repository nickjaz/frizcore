import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ScoreCard from '../scorecard';


class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
        </header>
        <ScoreCard />
      </div>
    );
  }
}

export default App;
