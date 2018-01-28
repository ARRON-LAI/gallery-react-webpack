require('normalize.css/normalize.css');
require('styles/App.scss');

import React from 'react';

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
    return (
      <figure className="img-figure">
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
  render() {
    let imageFigures = [];
    imageData.forEach(value => {
      imageFigures.push(<ImageFigure data={value}/>)
    })
    return (
      <section className="stage">
        <section className="img-sec">
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
