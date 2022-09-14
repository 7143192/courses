import React from "react";

export default class Map extends React.Component{
  render() {
    return (
      <div className={"map"}>
        <img id={'mapimg'} src={require('../../../asserts/MainImg/map.png')} alt={""}/>
      </div>
    );
  }
}
