import axios from "axios";
import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import './App.css';
import Form from "react-bootstrap/Form";






class  App extends React.Component {
  constructor (props){
    super(props);
    this.state = {
      cityName: '',
      locationData: {},
      cityMap:'',
      error: false
    }
  }

  getLocation = async () => {
    let url = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATION_API_KEY}&q=${this.state.cityName}&format=json`;
    try{
    let citydata = await axios.get(url);
    this.setState({locationData:citydata.data[0]});
    console.log(this.state.locationData);
    this.getMap();
    
    }
    ///Need to actually display error on page
    catch (error){
      this.setState({error: true});
      console.log('There was an error:', error);
    }

  }

  getMap =  () =>{
    let mapurl = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATION_API_KEY}&center=${this.state.locationData.lat},${this.state.locationData.lon}&zoom=10&size=400x400&format=png&maptype=<MapType>&markers=icon:<icon>|<latitude>,<longitude>&markers=icon:<icon>|<latitude>,<longitude>`;
    this.setState({cityMap:mapurl});
    
  }


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

        
        {/* <h1 style={{margin:'1rem'}}>{this.state.cityName}</h1>
        <h2 style={{margin:'1rem'}}>Latitude: {this.state.locationData.lat}</h2>
        <h2 style={{margin:'1rem'}}>Longitude: {this.state.locationData.lon}</h2> */}
                {this.state.error && <div>
        <Card style={{width: '40rem',  display: 'block',marginLeft: 'auto',marginRight: 'auto'}}>
        <Card.Text style={{textAlign:'center', fontSize:'2rem'}}>
            There has been an error. Please try again
          </Card.Text>
        </Card>
        </div>}


        {this.state.locationData.display_name && <div>
        <Card style={{width: '40rem',display: 'block',marginLeft: 'auto',marginRight: 'auto'}}>
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
        
   

  </>
  );
  }
}

export default App;
