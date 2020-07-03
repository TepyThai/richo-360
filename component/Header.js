import React, { Component } from 'react';
import css from './Header.module.css';
import Link from 'next/link';

class Header extends Component {
  render() {
    return (
      <header>
        <Link href="/">
          <h1 className={css['header_font']}>パノラマTIMES</h1>
        </Link>
      </header>
    );
  }
}

export default Header;
