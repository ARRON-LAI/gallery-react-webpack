require('normalize.css/normalize.css');
require('styles/App.scss');

import React from 'react';

let imageData = require('../data/imageData.json');

imageData = (function genImageData(imgs) {
  for(let i = 0; i < imgs.length; ++i) {
    const fn = imgs[i].fileName;
    imgs[i].imageUrl = require('../images/' + fn);
  }
  return imgs;
})(imageData);

class AppComponent extends React.Component {
  render() {
    return (
      <section className="stage">
        <section className="img-sec">

        </section>
        <nav className="controller"></nav>
      </section>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
