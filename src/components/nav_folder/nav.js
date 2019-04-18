import React, {Component} from 'react';
import RunHeader from './run_nav';

class Nav extends Component {
  constructor(props) {
    super(props);
  }


  render() {
    return (
      <div>
        <RunHeader />
      </div>
    )
  }
}

export default Nav;
