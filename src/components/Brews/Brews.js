import React from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem"

class Brews extends React.Component{
    render(){
        return(
            <>
            
            <Card style={{ width: '18rem',marginLeft: 'auto', marginRight:'auto', marginTop:'1rem' }}>
                <Card.Img variant="top" src={this.props.image}  />
                <Card.Body>
                    <Card.Title>{this.props.title}</Card.Title>
                    <Card.Text>
                    {this.props.overview}
                    </Card.Text>
                </Card.Body>
                <ListGroup className="list-group-flush">
                    <ListGroupItem>Rating: {this.props.ave}</ListGroupItem>
                    <ListGroupItem>Released: {this.props.release}</ListGroupItem>
                </ListGroup>
            </Card>
            </>

        )
    
    }
}

export default Brews;