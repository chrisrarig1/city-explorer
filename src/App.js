import React from 'react';
import './App.css';
import axios from "axios";
import Header from './components/Header/Header.js'
import { withAuth0 } from '@auth0/auth0-react';
import Food from './components/Food/Food.js';
import Brews from './components/Brews/Brews.js';
import Profile from './components/Profile/Profile.js';
import About from './components/About/About.js';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Main from './components/Main.js'

import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";

class App extends React.Component{

    constructor (props){
        super(props);
        this.state = {
          cityName: '',
          locationData: {},
          foodData:[],
          beerData:[],
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
        this.getFood();
        this.getBeer();
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
    3
      getFood = async () => {
        let url = `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?latitude=${this.state.locationData.lat}&longitude=${this.state.locationData.lon}`;
        let apiKey = 'LPf8D8wFH1KK056dCQjxWtxuOWSePe7WLPxaAlrLcq5qpGT7sONYqhzbse1mKUJkCnvvfozr6naRn-njrFP_-F0YRe5aHriK7_vAhD3lojm2mW3P60yWAb3U1g29YXYx'
        try{
       let fooddata = await axios.get(url,{headers: {
        "Authorization": `Bearer ${apiKey}`
       }});
       this.setState({foodData:fooddata.data});
       console.log(this.state.foodData);
       
       }
    
    catch (error){
        this.setState({error: true});
        this.setState({errormsg: error.message})
        console.log('There was an error:', error);
      }
    
    }
    
    getBeer = async () => {
      let url = `http://beermapping.com/webservice/loccity/f89bb60fcc1545101933159a2e25d29e/${this.state.cityName}&s=json`;
     try{
     let beerdata = await axios.get(url);
     this.setState({beerData:beerdata.data});
     
     console.log(this.state.beerData);
     
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
            <Header/>
            <Router>
                <Routes>
                  <Route exact path="/" element={<Main/>}/>
                  <Route exact path="/brews" element={<Brews brewData={this.state.brewData}/>}/>
                  <Route exact path="/food" element={<Food/>}/>
                  <Route exact path="/profile" element={<Profile/>}/>
                  <Route exact path="/about" element={<About/>}/>
                </Routes>
            </Router>
            <Form className="mb-3" controlId="formBasicEmail">
          <Form.Label style={{fontSize: '2rem', marginLeft:'1rem'}}>Enter A City</Form.Label>
          <Form.Control type="input" placeholder="City" onChange= {(e) =>{this.setState({cityName: e.target.value})}} style={{width: '15rem', marginLeft:'1rem'}}/>
          <Button onClick={this.getLocation} variant="outline-primary" style={{margin:'1rem'}}>Explore!</Button>
          <br/>
          <Form.Text className="text-muted">
           
          </Form.Text>
          
        </Form>



            </>
        )
    }
}

export default withAuth0(App);