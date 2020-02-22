import React, { Fragment, Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

class MainContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      players: [],
      humans: [],
      aliens: [],
      cards: []
    }
  }

  componentDidMount(){
    const request = new Request();
    const playerPromise = request.get('/api/players')
    const cardsPromise = request.get('/api/cards')

    Promise.all([playerPromise, cardsPromise])
    .then((data) => {
      this.setState({
        players: data[0],
        cards: data[1]
      })
    })
  }

  render(){

    if(!this.state.players){
      return null
    }

    return(
      <p>text</p>
    )
  }


}
export default MainContainer;