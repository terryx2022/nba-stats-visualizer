import React from 'react';
import { DataViewContainer } from './DataViewContainer';
import { Profile } from './Profile';
import { SearchBar} from './SearchBar';
import { Message } from './Message';
import { DEFAULT_PALYER_INFO } from './../constants';
import nba from 'nba';
import _ from 'lodash';

export class Main extends React.Component {
  state = {
    playerInfo: DEFAULT_PALYER_INFO,
  }

  componentDidMount() {
    this.loadPlayerInfo(this.state.playerInfo.playerId)
  }

  componentDidUpdate() {
    // this.loadPlayerInfo(this.state.playerInfo.playerId)
  }

  loadPlayerInfo = (playerId) => {
    nba.stats.playerInfo({ PlayerID: playerId })
    .then((info) => {
      const playerInfo = Object.assign({}, 
        info.commonPlayerInfo[0], info.playerHeadlineStats[0]);
      this.setState({ playerInfo });
      console.log(info)
    })
    .catch((e) => {
      console.log(e);
    });
  }

  render() {
    return (
      <div className="main">
        <Message />
        <div className="main-content-container">
          <SearchBar changePlayer={_.debounce(this.loadPlayerInfo, 200)}/>
          <div className="player">                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             
            <Profile playerInfo={this.state.playerInfo}/>
            <DataViewContainer playerId={this.state.playerInfo.playerId} />
          </div>
        </div>
      </div>
    );
  }
}