import React, { Component } from 'react'
import axios from 'axios';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Image from 'react-bootstrap/Image'
import Massege from './Massege';

export class City extends Component {

  constructor(props) {
    super(props);
    this.state = {
      cityName: "",
      cityData: {},
      display: false,
      error: "",
      alert: false
    }
  }

  updateCity = (e) => {
    console.log(e.target.value);
    this.setState({
      cityName: e.target.value,
    });
    console.log(this.state);
  }

  getData = async (e) => {
    e.preventDefault();
    try {
      const axiosData = await axios.get(`https://us1.locationiq.com/v1/search.php?key=pk.e7dafb4666e0c853da004c39e1c164fc&q=${this.state.cityName}&format=json`)
      console.log(axiosData);
      this.setState({
        cityData: axiosData.data[0],
        display: true,
        alert:false
      })
    } catch (error) {
      this.setState({
        errot: error.message,
        alert: true,
        display: true
      })
    }
  }


  render() {
    return (
      <div>

        <Massege
          alert={this.state.alert}
        />

        <Form onSubmit={this.getData}>
          <Form.Group className="mb-3" controlId="formBasicEmail" 	 >
            <Form.Label>City Name</Form.Label>
            <Form.Control type="text" placeholder="Enter City Name" onChange={this.updateCity} size={'sm'} />
          </Form.Group>
          <Button variant="primary" type="submit" >
            Explore!
          </Button>
        </Form>
        {this.state.display &&
          <div>
            <p>
              {this.state.cityData.display_name}
            </p>
            <Image src={`https://maps.locationiq.com/v3/staticmap?key=pk.e7dafb4666e0c853da004c39e1c164fc&center=${this.state.cityData.lat},${this.state.cityData.lon}&zoom=10`} rounded/>
            <p>
              {`latitude: ${this.state.cityData.lat}, longitude: ${this.state.cityData.lon}`}
            </p>
          </div>
        }
      </div>
    )
  }
}

export default City;