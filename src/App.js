import axios from "axios";
import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import './App.css';
import Form from "react-bootstrap/Form";
import Weather from './Weather.js';






class  App extends React.Component {
  constructor (props){
    super(props);
    this.state = {
      cityName: '',
      locationData: {},
      weatherData:[],
      cityMap:'',
      error: false,
      errormsg: '',
      showWeather: false
    }
  }

  getLocation = async () => {
     let url = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATION_API_KEY}&q=${this.state.cityName}&format=json`;
    try{
    let citydata = await axios.get(url);
    this.setState({locationData:citydata.data[0]});
    console.log(this.state.locationData);
    this.getMap();
    this.getWeather();
    this.state.showWeather= true;
    }
    ///Need to actually display error on page
    catch (error){
      this.setState({error: true});
      this.setState({errormsg: error.message})
      console.log('There was an error:', error);
    }

  }

  getWeather = async () => {
    let url = `http://localhost:3001/weather?lat=1223&lon=-1425&searchQuery=${this.state.cityName}`;
   try{
   let weatherdata = await axios.get(url);
   this.setState({weatherData:weatherdata.data});
   console.log(this.state.weatherData);
   
   }
       ///Need to actually display error on page
catch (error){
    this.setState({error: true});
    this.setState({errormsg: error.message})
    console.log('There was an error:', error);
  }

}

  getMap =  () =>{
    let mapurl = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATION_API_KEY}&center=${this.state.locationData.lat},${this.state.locationData.lon}&zoom=10&size=400x400&format=png&maptype=<MapType>&markers=icon:<icon>|<latitude>,<longitude>&markers=icon:<icon>|<latitude>,<longitude>`;
    this.setState({cityMap:mapurl});
    
  }

  errorHide = () => this.setState({error: false});


  render(){
  return (
    <>
    <header><h1>City Explorer</h1></header>
        <Form className="mb-3" controlId="formBasicEmail">
          <Form.Label style={{fontSize: '2rem', marginLeft:'1rem'}}>Enter A City</Form.Label>
          <Form.Control type="input" placeholder="City" onChange= {(e) =>{this.setState({cityName: e.target.value})}} style={{width: '15rem', marginLeft:'1rem'}}/>
          <Button onClick={this.getLocation} variant="outline-primary" style={{margin:'1rem'}}>Explore!</Button>
          <br/>
          <Form.Text className="text-muted">
           
          </Form.Text>
          
        </Form>

        
        
      {this.state.error && <div>
        <Card style={{width: '40rem',  display: 'block',marginLeft: 'auto',marginRight: 'auto'}}>
            <Card.Text style={{textAlign:'center', fontSize:'2rem'}}>
              There has been an error. Please try again
            </Card.Text>
            <Card.Text style={{textAlign:'center', fontSize:'2rem'}}>
              {this.state.errormsg}
            </Card.Text>
            <div class="row justify-content-center">
            <Button onClick={this.errorHide} style={{fontSize:'2rem', width:'7rem', marginBottom:'.5rem'}}>Exit</Button>
            </div>
        </Card>
      </div>}


      {this.state.locationData.display_name && <div>
        <Card style={{width: '40rem',display: 'block',marginLeft: 'auto',marginRight: 'auto'}}border="primary">
              <Card.Text style={{textAlign:'center', fontSize:'2rem'}}>
                Here is a map of {this.state.cityName}
              </Card.Text>
          <Card.Img  src={this.state.cityMap} alt={this.state.cityName} style={{marginLeft: 'auto',marginRight: 'auto'}} />
          <Card.Body>
              <Card.Text>
              Longitude: {this.state.locationData.lon}
              </Card.Text>
              <Card.Text>
              Latitude: {this.state.locationData.lat}
              </Card.Text>
          </Card.Body>
        </Card>
      </div>}
      {
          this.state.showWeather &&
          this.state.weatherData.map((el) => <Weather date={el.date} description={el.description} />)
        }
    
      
        
   

  </>
  );
  }
}

export default App;
