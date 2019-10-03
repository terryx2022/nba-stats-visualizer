import React from 'react';

export class Message extends React.Component {
  render() {
    return (
      <div className="message">
        <ul>
          <li>Slide or enter a value to filter shot spots by frequency.</li>
          <li>
          Two display modes:
            <ul>
              <li>Hexbin(default): Shots near a certain spot are aggregated into one hexagon</li>
              <li>Scatter: accurate spots of each shot</li>
            </ul>
          </li>
          <li>Turn on tooltip and hoover your cursor over the spots to see more</li>
        </ul>
      </div>
    );
  }

}