import React from "react";
// import Card from "react-bootstrap/Card";

import { withAuth0 } from '@auth0/auth0-react'; 


class Main extends React.Component{
    render(){
        return(
            <>

            

{/* 
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
      </div>} */}


      {/* {this.state.locationData.display_name && <div>
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
      </div>} */}
      


      {/* <Row xs={1} md={4} className="g-4">
      {
          this.state.showMovie &&
          this.state.movieData.map((el) => 
          <Movie title={el.title} overview={el.overview} ave={el.average_votes} tot={el.total_votes} image={el.image} release={el.release_date}/>)
          
        }
      </Row> */}
            </>
        )}}

export default withAuth0(Main);