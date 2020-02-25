import React, { Fragment, Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PreGameContainer from "./PreGameContainer";
import GameViewContainer from "./GameViewContainer";
import CaptainChoiceScreen from "../components/GameComponents/CaptainChoiceScreen";
import CoCaptainChoiceScreen from "../components/GameComponents/CoCaptainChoiceScreen";
import GameBoards from "../components/GameComponents/GameBoards";
import PlayerDetails from "../components/GameComponents/PlayerComponents/PlayerInfo";
import PlayersList from "../components/GameComponents/PlayerComponents/PlayersList";
import Request from "../helpers/request";

class MainContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      players: props.players,
      aliens: [],
      humans: [],
      cards: props.cards,
      cardsInPlay: [],
      immitationsBlockedBoard: [],
      immitationsPassBoard: [],
      playersPopulated: false
    };
    this.findPlayerById = this.findPlayerById.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  componentDidMount() {
    const request = new Request();
    const playerPromise = request.get("/api/players");
    const cardsPromise = request.get("/api/cards");

    Promise.all([playerPromise, cardsPromise]).then(data => {
      this.setState({
        players: data[0],
        cards: data[1],
        playersPopulated: true
      });
    });
  }

  handleUpdate(player, id) {
    const request = new Request();
    request.patch("/api/players/" + id, player);
  }

  findPlayerById(id) {
    return this.state.players.find(player => {
      return player.id === id;
    });
  }

  render() {
    return this.state.playersPopulated ? (
      <section className="game-container">
        <Router>
          <Fragment>
            <Switch>
              <Route
                exact
                path="/thething/players/:id"
                render={props => {
                  const id = props.match.params.id;
                  const player = this.findPlayerById(id);
                  return <PlayerDetails player={player} />;
                }}
              />
              <Route
                exact
                path="/thething/players"
                render={() => {
                  console.log("here");

                  return <PlayersList players={this.state.players} />;
                }}
              />
              <Route
                exact
                path="/thething/cocaptain"
                render={() => <CoCaptainChoiceScreen></CoCaptainChoiceScreen>}
              />

              <Route
                exact
                path="/thething/captain"
                render={() => <CaptainChoiceScreen></CaptainChoiceScreen>}
              />
              <Route
                exact
                path="/thething/board"
                render={() => (
                  <GameBoards
                    immitationsBlockedBoard={this.state.immitationsBlockedBoard}
                    immitationsPassBoard={this.state.immitationsPassBoard}
                  ></GameBoards>
                )}
              />

              <Route
                exact
                path="/thething"
                render={() => <PreGameContainer></PreGameContainer>}
              />
            </Switch>
          </Fragment>
        </Router>
      </section>
    ) : (
      <p>Loading ....</p>
    );
  }
}
export default MainContainer;
