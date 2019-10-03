import React from 'react';
import { DataViewContainer } from './DataViewContainer';
import { Profile } from './Profile';
import { SearchBar} from './SearchBar'
import nba from 'nba';
import { DEFAULT_PALYER_INFO } from './../constants'
import _ from 'lodash';

export class Main extends React.Component {
  state = {
    playerInfo: DEFAULT_PALYER_INFO,
    isLoading: false
  }

  componentDidMount() {
    console.log('Main.js - Main page Mounted')
    this.loadPlayerInfo(this.state.playerInfo.playerId)
  }

  componentDidUpdate() {
    console.log('Main.js - Main page Updated')
    // this.loadPlayerInfo(this.state.playerInfo.playerId)
  }

  loadPlayerInfo = (playerId) => {
    console.log('Main.js - Start loading chart')
    this.setState({
      isLoading: true
    }) 
    nba.stats.playerInfo({ PlayerID: playerId })
    .then((info) => {
      const playerInfo = Object.assign({}, 
        info.commonPlayerInfo[0], info.playerHeadlineStats[0]);
      console.log('Main.js - Finish loading chart')
      this.setState({ playerInfo, isLoading: false });
      this.setState({ playerInfo });
    })
    .catch((e) => {
      console.log(e);
      console.log("Main.js - Error occurred.(Finish loading)")
      this.setState({isLoading: false})
    });
  }

  render() {
    console.log("Main.js - Rendering main page...")
    return (
      <div className="main">
        <SearchBar changePlayer={_.debounce(this.loadPlayerInfo, 200)}/>
        {this.state.isLoading ? 
            <div className="loading">Loading...</div> : 
            (<div className="player">                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             
              <Profile playerInfo={this.state.playerInfo}/>
              <DataViewContainer playerId={this.state.playerInfo.playerId} />
            </div>)}
      </div>
    );
  }
}