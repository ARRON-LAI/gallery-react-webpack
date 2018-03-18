require('normalize.css/normalize.css');
require('styles/App.scss');

import React from 'react';
import ReactDOM from 'react-dom';

let imageData = require('../data/imageData.json');

imageData = (function genImageData(imgs) {
  for(let i = 0; i < imgs.length; ++i) {
    const fn = imgs[i].fileName;
    imgs[i].imageURL = require('../images/' + fn);
  }
  return imgs;
})(imageData);

class ImageFigure extends React.Component {
  render() {
    let styleObj = null;
    if (this.props.arrange && this.props.arrange.pos) {
      styleObj = this.props.arrange.pos;
      ['ms', 'Moz', 'Webkit', ''].forEach( value => {
        styleObj[value + 'Transform'] = 'rotate(' + this.props.arrange.rotate + ')';
      });
    }
    return (
      <figure className="img-figure" style={styleObj}>
        <img src={this.props.data.imageURL}
            alt={this.props.data.title} />
        <figcaption>
          <h2 className="img-title">
            {this.props.data.title}
          </h2>
        </figcaption>
      </figure>
    )
  }
}
class AppComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      imgArrangeArr: [
        // {
        //   pos: {
        //     left: 0,
        //     top: 0
        //   };
        //   rotate : 0
        // }
      ]
    }
  }
  Constant = {
    centerPos: {
      left: 0,
      top: 0
    },
    hPosRange: {  //horizontal position range
      leftX: [0, 0],
      rightX: [0, 0],
      y: [0, 0]
    },
    vPosRange : { //vertical position range
      topY: [0, 0],
      x: [0, 0]
    }
  };

  componentDidMount() {
    const stage = this.refs.imgSec,
          stageW = stage.scrollWidth,
          stageH = stage.scrollHeight,
          hStageW = Math.ceil(stageW / 2),
          hStageH = Math.ceil(stageH / 2);
    const figure = ReactDOM.findDOMNode(this.refs.imgFigure0),
          figureW = figure.scrollWidth,
          figureH = figure.scrollHeight,
          hFigureW = Math.ceil(figureW / 2),
          hFigureH = Math.ceil(figureH / 2);

    this.Constant.centerPos.left = hStageW - hFigureW;
    this.Constant.centerPos.top = hStageH - hFigureH;
    this.Constant.hPosRange.leftX[0] = -hFigureW;
    this.Constant.hPosRange.leftX[1] = hStageW - hFigureW * 3;
    this.Constant.hPosRange.rightX[0] = hStageW + hFigureW;
    this.Constant.hPosRange.rightX[1] = stageW - hFigureW;
    this.Constant.hPosRange.y[0] = -hFigureH;
    this.Constant.hPosRange.y[1] = stageH + hFigureH;
    this.Constant.vPosRange.topY[0] = -hFigureH;
    this.Constant.vPosRange.topY[1] = hStageH - hFigureH * 3;
    this.Constant.vPosRange.x[0] = hStageW - figureW;
    this.Constant.vPosRange.x[1] = hStageW;

    this.rearrange(0);
  }

  getRandomPos(low, high) {
    return Math.ceil(Math.random() * (high - low) + low);
  }
  getRandomRoatate() {
    return (Math.random() > 0.5 ? '' : '-') + Math.ceil(Math.random() * 30) + 'deg';
  }

  rearrange(index) {
    // centeralize figure[index] and rearrange all imgs 
    let imgArrangeArr = this.state.imgArrangeArr,
        Constant = this.Constant,
        centerPos = Constant.centerPos,
        hPosRange = Constant.hPosRange,
        vPosRange = Constant.vPosRange;

    // centeralize figure[index]
    const centerImgArr = imgArrangeArr.splice(index, 1);
    centerImgArr[0].pos = centerPos;
    centerImgArr[0].rotate = '0deg';

    // arrange top section images (can hold 0 image)
    const topNum = Math.floor(Math.random() * 2),
          topIndex = Math.floor(Math.random() * imgArrangeArr.length),
          topImgArr = imgArrangeArr.splice(topIndex, topNum);
    topImgArr.forEach((value, index) => {
      topImgArr[index].pos = {
        left: this.getRandomPos(vPosRange.x[0], vPosRange.x[1]),
        top: this.getRandomPos(vPosRange.topY[0], vPosRange.topY[1])
      };
      topImgArr[index].rotate = this.getRandomRoatate();
    });

    // arrange left section and right section images
    for (let i = 0; i < imgArrangeArr.length; ++i) {
      let hPosLeftOrRightRange = {};
      if(i < imgArrangeArr.length / 2) {
        hPosLeftOrRightRange.x = hPosRange.leftX;
      } else {
        hPosLeftOrRightRange.x = hPosRange.rightX;
      }
      imgArrangeArr[i].pos = {
        left: this.getRandomPos(hPosLeftOrRightRange.x[0], hPosLeftOrRightRange.x[1]),
        top: this.getRandomPos(hPosRange.y[0], hPosRange.y[1])
      };
      imgArrangeArr[i].rotate = this.getRandomRoatate();
    }

    if (topImgArr && topImgArr[0]) {
      imgArrangeArr.splice(topIndex, 0, topImgArr[0]);
    }
    imgArrangeArr.splice(index, 0, centerImgArr[0]);
    this.setState({
      imgArrangeArr: imgArrangeArr
    });
  }

  render() {
    let imageFigures = [];
    imageData.forEach( (value, index) => {
      imageFigures.push(<ImageFigure data={value} ref={'imgFigure' + index} arrange={this.state.imgArrangeArr[index]}/>);
      if (!this.state.imgArrangeArr[index]) {
        this.state.imgArrangeArr[index] = {
          pos: {
            left: 0,
            top: 0
          },
          rotate: 0
        }
      }
    })
    return (
      <section className="stage">
        <section className="img-sec" ref="imgSec">
          {imageFigures}
        </section>
        <nav className="controller"></nav>
      </section>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
