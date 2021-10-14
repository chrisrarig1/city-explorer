import React from "react";

import Card from "react-bootstrap/Card";


class Weather extends React.Component{


     render(){
         return(
             <>
                      
                        <Card style={{marginBottom: '4rem', marginTop: '2rem',marginLeft: 'auto', marginRight:'auto'}} border="primary">
                            <Card.Body>
                            
                                <Card.Title style={{fontSize:'2rem', textAlign:'center'}}> {this.props.date}</Card.Title> 
                                <Card.Text style={{fontSize:'1.15rem', textAlign:'center'}}>
                                {this.props.description}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                      
                
             </>
         )
     }

}



 export default Weather;