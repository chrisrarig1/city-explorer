import React from 'react';
import axios from "axios";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Weather from './WeatherDay/Weather.js';
import Movie from './Movies/Movie.js';

class Main extends React.Component{

    constructor (props){
        super(props);
        this.state = {
          cityName: '',
          locationData: {},
          weatherData:[],
          movieData:[],
          cityMap:'',
          error: false,
          errormsg: '',
          showWeather: false,
          showMovie: false
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
        this.getMovie();
        this.state.showWeather= true;
        this.state.showMovie = true;
        }
        ///Need to actually display error on page
        catch (error){
          this.setState({error: true});
          this.setState({errormsg: error.message})
          console.log('There was an error:', error);
        }
    
      }
    
      getWeather = async () => {
        let url = `${process.env.REACT_APP_SERVER}weather?lat=${this.state.locationData.lat}&lon=${this.state.locationData.lon}&searchQuery=${this.state.cityName}`;
       try{
       let weatherdata = await axios.get(url);
       this.setState({weatherData:weatherdata.data});
       console.log(this.state.weatherData);
       
       }
    
    catch (error){
        this.setState({error: true});
        this.setState({errormsg: error.message})
        console.log('There was an error:', error);
      }
    
    }
    
    getMovie = async () => {
      let url = `${process.env.REACT_APP_SERVER}movie?searchQuery=${this.state.cityName}`;
     try{
     let moviedata = await axios.get(url);
     this.setState({movieData:moviedata.data});
     console.log(this.state.movieData);
     
     }
    
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
        return(
            <>
        <Form className="mb-3" controlId="formBasicEmail">
          <Form.Label style={{fontSize: '2rem', marginLeft:'1rem'}}>Enter A City</Form.Label>
          <Form.Control type="input" placeholder="City" onChange= {(e) =>{this.setState({cityName: e.target.value})}} style={{width: '15rem', marginLeft:'1rem'}}/>
          <Button onClick={this.getLocation} variant="outline-primary" style={{margin:'1rem'}}>Explore!</Button>
          <br/>
          <Form.Text className="text-muted">
           
          </Form.Text>
          
        </Form>

        {this.state.error && <div>
        <Card style={{width: '40rem',marginLeft: 'auto',marginRight: 'auto'}}>
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
        <Card style={{width: '40rem',  display: 'block',marginLeft: 'auto',marginRight: 'auto'}}border="primary">
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
      
      <Row xs={1} md={4} className="g-4">
      {
        this.state.showWeather &&
        this.state.weatherData.map((el) => <Weather date={el.date} description={el.description} />)
      }
      </Row>

      <Row xs={1} md={4} className="g-4">
      {
          this.state.showMovie &&
          this.state.movieData.map((el) => 
          <Movie title={el.title} overview={el.overview} ave={el.average_votes} tot={el.total_votes} image={el.image} release={el.release_date}/>)
        }
      </Row>
            </>
        )
    }
}

export default Main;