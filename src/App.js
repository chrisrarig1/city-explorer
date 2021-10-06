import React from "react";

class  App extends React.Component {
  constructor (props){
    super(props);
    this.state = {
      cityName: ''
    }
  }
  render(){
  return (
    <>
    <h1>enter a city</h1>
    <input onChange= {(e) =>{this.setState({cityName: e.target.value})}} ></input>
    </>
  );
  }
}
console.log(process.env.REACT_APP_LOCATION_API_KEY)
export default App;
