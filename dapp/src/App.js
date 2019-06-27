import React, { Component } from "react";
import "./App.css";
import contract from "./contract";
import logo from "./hotpotato.jpg";

class App extends Component {
  state = {
    playercount: "",
    holder: "",
    playername: [],
    gamestart: "",
    gameover: "",
    status: "",
    fenceHeight: "",
    winner: ""
  };

  async componentDidMount() {
    await this.refreshGameStatus();

    contract.events.allEvents().on("data", async event => {
      console.debug("Event received", event);
      await this.refreshGameStatus();
    });
  }

  refreshGameStatus = async () => {
    var playercount = await contract.methods.playerCount().call();
    var holder = await contract.methods.holder().call();
    var winner = await contract.methods.winnerName().call();
    var gamestart = await contract.methods.gameStarted().call();
    var gameover = await contract.methods.gameOver().call();
    var playername = [];
    for (var i = 0; i < playercount; i++) {
      playername.push(await contract.methods.playerNames(i).call());
    }

    // getting game status
    var status = "";
    if (!this.state.gameover && !this.state.gamestart) {
      status = "The game has not started yet.";
    } else if (this.state.gamestart) {
      status = "The game has started!";
    } else if (this.state.gameover) {
      status = "The game has ended.";
    } else {
      status = "";
    }

    var fenceHeight = await contract.methods.fenceHeight().call();

    this.setState({
      playercount,
      holder,
      playername,
      gamestart,
      gameover,
      status,
      fenceHeight,
      winner
    });
  };

  potatoStatus = playerName => {
    if (playerName === this.state.holder) {
      return <img src={logo} id="potato" alt="This player has the potato." />;
    }
    if (playerName === this.state.winner) {
      return <span className="winner">Winning</span>;
    }
    return;
  };

  //populating player names
  createRows = () => {
    var rows = [];
    for (let i = 0; i < this.state.playercount; i++) {
      const playerName = String(this.state.playername[i]);
      rows.push(
        <tr key={playerName}>
          <td>{playerName}</td>
          <td>{this.potatoStatus(playerName)}</td>
        </tr>
      );
    }
    return rows;
  };

  render() {
    return (
      <div className="app">
        <h2 id="title">Hot Potato</h2>
        <div>
          <p id="status">
            <b>{this.state.status}</b>
          </p>
          <p id="fence-height">Fence Height: {this.state.fenceHeight}</p>
          <table align="center" id="player-list">
            <tbody>{this.createRows()}</tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default App;
