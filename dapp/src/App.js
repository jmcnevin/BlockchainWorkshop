import React , {Component} from 'react';
import './App.css';
import contract from './contract';
import logo from './hotpotato.jpg';

class App extends Component {
  state={
    playercount:'',
    holder:'',
    playername:[],
    gamestart:'',
    gameover:'',
    status:''
  }

  async componentDidMount(){
    var playercount= await contract.methods.playerCount().call();
    var holder= await contract.methods.holder().call();
    var gamestart = await contract.methods.gameStarted().call();
    var gameover = await contract.methods.gameOver().call();
    var playername=[];
    for (var i=0;i<playercount;i++){
      playername.push(await contract.methods.playerNames(i).call());
    }
    // getting game status
    var status ='';
    if (this.state.gameover==false && this.state.gamestart==false){
      status= 'The game has not started yet';
    }else if (this.state.gamestart==true){
      status = 'The game has started !!!';
    }else {
      status ='The game has ended';
    }
    this.setState({playercount,holder,playername,gamestart,gameover,status});
  }

  //populating player names
  createCol1 = () => {
    var col1 = []
    for (let i = 0; i < this.state.playercount; i++) {
      col1.push(<tr>{this.state.playername[i]}</tr>)
    }
    return col1
    }
  
  //holder
  createCol2 = ()=> {
    var col2=[]
    for (let i = 0; i < this.state.playercount; i++) {
      if (String(this.state.playername[i])===this.state.holder){
        col2.push(<tr><img src={logo} id="logo" alt="logo" /></tr>)
      }else{
        col2.push(<tr>-</tr>)
      }
    }
    return col2
  }  

  render(){
  return (

    <div className='app'>
      <h2 id='title'>Hot Potato Game</h2>
      <img src={logo} id='title-image' alt="logo" />
      <div>
        <p id='status'><b>{this.state.status}</b></p>
        <table align='center' id="table">
          <tr>
            <th>Players</th>
            <th>Potato</th>
          </tr>
          <tr>
            <td>{this.createCol1()}</td>
            <td>{this.createCol2()}</td>
          </tr>
        </table>
      </div>
    </div>
  );
}
}

export default App;
