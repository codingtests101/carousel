import React, { Component } from 'react';
import './App.css';
import ImageSlider from './components/image-slider';
class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App__container">
          <h1>Carousel Test</h1>
          <ImageSlider/>
        </div>
        
      </div>
      
    );
  }
}

export default App;
