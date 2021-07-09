import React from 'react';
import axios from 'axios';
import Weather from './componant/Weather.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Form,Button,Image,Col,Row,Container} from 'react-bootstrap'
class City extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cityName: '',
      output: '',
      show: false,
      errMsg: false,
      weatherData: [],
      movieData: [],
      API: `pk.e7dafb4666e0c853da004c39e1c164fc`

    }
  }
getData = async (e) => {
    e.preventDefault();   
    
    let weatherURL = `${process.env.REACT_APP_API}/weather?searchQuery=${this.state.cityName}`;
    let LocUrl = `https://eu1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_KYE} &q=${this.state.cityName}&format=json`;
    try {
      const locResult = await axios.get(LocUrl);

      this.setState({
        output: locResult.data[0],
        show: true,
      })

    }
    catch {
      this.setState({
        show: false,
        errMsg: true
      })
    }
    const weatherReq = await axios.get(weatherURL);
    this.setState({
      weatherData: weatherReq.data[0],
    })
    
  }
update = (event) => {
    this.setState({
      cityName: event.target.value,
    })

  }
  render() {
    return (
      <>
        <Form className="form" onSubmit={this.getData}>
          <Form.Group controlId="formBasicEmail">
            <Form.Text className="text-muted ">
              City Explorer
            </Form.Text>
          </Form.Group>
          <Form.Group>
            <br/>
            <Form.Control  type="text" placeholder="Enter Name of City or Country" onChange={this.update} />
          </Form.Group>
          <Button   type="submit">
          Explore!
          </Button>
        </Form>
        { this.state.show &&
          <p>
          City:<span>{this.state.output.display_name}</span> <br />
          Lat :<span>{this.state.output.lat}</span> <br />
          Lon :<span> {this.state.output.lon}</span>
          </p>
        }
        { this.state.show &&
        <Container >
        <Row>
          <Col xs={6} md={4}>
            <Image src={`https://maps.locationiq.com/v3/staticmap?key=${this.state.API}&center=${this.state.output.lat},${this.state.output.lon}`}  alt={this.state.display_name}  />
          </Col> 
        </Row>
      </Container>
         }
        { this.state.show &&
          <Weather weatherData={this.state.weatherData} />
        }
        { this.state.errMsg &&
          <p>
           not founde
          </p>
        }

      </>
    )
  }
}

export default City;