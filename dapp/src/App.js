import React , {Component} from 'react';
import './App.css';
import contract from './contract';
import logo from './hotpotato.jpg';

class App extends Component {
  state={
    playercount:'',
    holder:'',
    playername:[]
  }

  async componentDidMount(){
    var playercount= await contract.methods.playerCount().call();
    var holder= await contract.methods.holder().call();
    var playername=[];
    for (var i=0;i<playercount;i++){
      playername.push(await contract.methods.playerNames(i).call()+" ");
    }
    this.setState({playercount,holder,playername})
  }
  render(){
  return (
    <div className='app'>
      <h2 id='title'>Hot Potato Game</h2>
      <div className='body'>
        <p>Player Count -> {this.state.playercount}</p>
        <p>Potato holder: {this.state.holder}
        <img src={logo} id="App-logo" alt="logo" />
        </p>
      </div>
      <div className="list">
        <p>List of Players</p>
        <hr></hr>
        <p>{this.state.playername}</p>
      </div>
    </div>
  );
}
}

export default App;
