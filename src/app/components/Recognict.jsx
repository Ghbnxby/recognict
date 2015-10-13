import React from "react";
import {Image} from "react-bootstrap";
import SimpleFilter from "../filters/Filter.js";
import jQuery from "jquery";

export default class Recognict extends React.Component{
  render(){
    return(
      <div className="container">
        <div className="col-md-4">
          <div className="thumbnail">
            <img ref="img"/>
            <div className="caption">
              <h3 className="text-center">Source image</h3>
            </div>
          </div>
        </div>
        <div className="col-md-2"/>
        <div className="col-md-4">
          <div className="thumbnail">
            <canvas ref="canvas"/>
            <div className="caption">
              <h3 className="text-center">Filter image</h3>
            </div>
          </div>
        </div>
      </div>
    )
  };

  constructor(props){
    super(props);
    this.simpleFilter = new SimpleFilter()
  }

  componentDidMount(){
    let img = React.findDOMNode(this.refs["img"]);
    img.onload = () => {
      let canvas = React.findDOMNode(this.refs["canvas"]);
      let context = canvas.getContext('2d');
      context.drawImage(img, 0, 0);
      let imageData = context.getImageData(0, 0, 300, 300);
      console.log(imageData);
      let imageDataFiltered = this.simpleFilter.apply(imageData);
      console.log(imageDataFiltered);
      context.putImageData(imageDataFiltered, 0, 0);
    };
    img.src = "demo/girl.png";
  }

}