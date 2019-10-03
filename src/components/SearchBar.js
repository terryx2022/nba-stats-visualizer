import React from 'react';
import { AutoComplete, Input, Icon } from 'antd';
import nba from 'nba';
import { PROFILE_PIC_URL_PREFIX } from './../constants'
// window.nba = nba;
// const option = AutoComplete.Option

export class SearchBar extends React.Component {
    state = {
        choices: []
      }
    
      handleSearch = (prefix) => {
        let allInfo = nba.searchPlayers(prefix);
        this.setState({
            choices: allInfo.map(
                ({ fullName, playerId }) => 
                <AutoComplete.Option key={playerId} value={fullName}>
                    <img
                        className="player-option-pic"
                        src={`${PROFILE_PIC_URL_PREFIX}/${playerId}.png`}
                        alt={'Player pic can\'t be found'}
                    />
                    <span className="player-option-full-name">{fullName}</span>
                </AutoComplete.Option>
            )
        })
      }
    
    //   Recall: When creating each <Option>, we use playerId as key
      onSelect = (choice, {key}) => {
        console.log('onSelect', choice, key);
        this.props.changePlayer(key)
      }
      
    
      render() {
        return (
          <AutoComplete
            className="search-bar"
            size="large"
            dataSource={this.state.choices}
            onSelect={this.onSelect}
            onSearch={this.handleSearch}
            placeholder="Enter the name of player"
            optionLabelProp='value'
          >
            <Input suffix={<Icon type="search"/>} />
          </AutoComplete>
        );
      }
}