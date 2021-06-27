  
import React, { Component } from 'react';
import axios from 'axios';

export class App extends Component {

  constructor(props){
    super(props);
    this.state={
      displayName:'',
      longitude:'',
      latitude:''
    }
  }

  nameChangeHandler=(e)=>{
    this.setState({
      displayName:e.target.value
      })
  }
  submitData=async (e)=>{
    e.preventDefault()
    let axiosResponse= await axios.get(`https://eu1.locationiq.com/v1/search.php?key=pk.e7dafb4666e0c853da004c39e1c164fc&city=${this.state.displayName}&format=json`)
    this.setState({
      displayName:axiosResponse.data[0].display_name,
      longitude:axiosResponse.data[0].lon,
      latitude:axiosResponse.data[0].lat
    })
    console.log(axiosResponse.data[0].lat)
  }
  render() {
    return (
      <div>
        <form onSubmit={this.submitData}>
          <input type='text' placeholder='city name....' onChange={(e)=>{this.nameChangeHandler(e)}} />
          <button>Search</button>
        </form>
        <h1>{this.state.displayName}</h1>
        <h1>{this.state.longitude}</h1>
        <h1>{this.state.latitude}</h1>
      </div>
    )
  }
}

export default App
