import PropTypes from 'prop-types';
import { Component } from 'react';
import MobiledocReactRenderer from '@dailybeast/mobiledoc-react-renderer';

const mobiledoc = {
  "atoms": [],
  "cards": [],
  "markups": [],
  "sections": [
    [
      1,
      "p",
      [
        [0, [], 0, "Hello world!"]
      ]
    ]
  ],
  "version": "0.3.0"
};

export default class Mobiledoc extends Component {
  static propTypes = {
    mobiledoc: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);

    const options = { atoms: [], cards: [], markups: [] };

    this.renderer = new MobiledocReactRenderer(options);
  }

  render() {
    return this.renderer.render(this.props.mobiledoc);
  }
}