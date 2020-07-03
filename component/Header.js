import React, { Component } from 'react';
import css from './Header.module.css';


class Header extends Component {

  render(){
    return (<header>
      <div>
        {this.props.header}
      </div>
      <h1 className={css['header_font']}>
        パノラマTIMES
      </h1>
    </header>
    );
  }
}

export default Header;