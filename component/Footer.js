import React, { Component } from 'react';
import css from './Footer.module.css';

class Footer extends Component {

  render(){
    return (<footer>
      <div>
        {this.props.footer}
      </div>
      <p className={css['footer_font']}>@all rigth reserved by team React</p>
    </footer>
    );
  }
}

export default Footer;