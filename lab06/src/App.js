import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import City from './City';


 class App extends Component {
  render() {
    return (
      <div className="App">
      
       <header >
          <h1>City Name </h1>
        </header>
       
       <City />
      </div>
    )
  }
}

export default App