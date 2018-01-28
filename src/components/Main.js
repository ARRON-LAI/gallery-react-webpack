require('normalize.css/normalize.css');
require('styles/App.scss');

import React from 'react';

let yeomanImage = require('../images/yeoman.png');
let imageDat = require('../data/imageData.json');

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
