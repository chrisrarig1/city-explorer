import React from "react";
import Card from "react-bootstrap/Card";


class Weather extends React.Component{


     render(){
         return(
             <>
             
                             
                        <Card style={{ width: '15rem', margin: '0 auto',marginBottom: '10px', marginTop: '10px', }} border="primary">
                            <Card.Body>
                            
                                <Card.Title> {this.props.date}</Card.Title> 
                                <Card.Text>
                                {this.props.description}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    
                
                


             </>
         )
     }

}



 export default Weather;