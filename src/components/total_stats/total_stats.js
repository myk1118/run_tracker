import React, {Component} from 'react';

class TotalStats extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const divStyle = {
      height: '145px'
    };

    const imageStyle = {
      width: '100%'
    }

    return (
      <div>
        <img style={imageStyle} src="https://previews.123rf.com/images/bjarts/bjarts1801/bjarts180100024/94398065-continuous-line-drawing-of-graph-icon-isolated-on-black-background-growing-chart-image-with-arrow-up.jpg"/>
        <p>Selectable key to see additional lines in graph</p>
        <div className="d-flex" style={divStyle}>
          <div className="col-6 bg-primary text-center">
            <div className="bg-success h-75 mt-3"></div>
          </div>
          <div className="col-6 bg-primary text-center">
            <div className="bg-success h-75 mt-3"></div>
          </div>
        </div>
        <p>Best Time:</p>
        <p>Longest Distance:</p>
        <p>Most Calories Burned:</p>
        <p>Last Run:</p>
      </div>
    )
  }
}

export default TotalStats;
