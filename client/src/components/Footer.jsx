import React from 'react';
import gitHubIcon from '../assets/github-mark.svg';

///Users/ianbuchanan/Codesmith/a11y-sprout/client/src/assets/github-mark.svg

function Footer() {
  return (
    <footer>
      <span>Check out the project on GitHub</span>{' '}
      <a
        href='https://github.com/ianbuchanan42/a11y-sprout'
        target='_blank'
        rel='noopener noreferrer'
        aria-label='Checkout the A11y Sprout on GitHub'
      >
        <span className='icon-text'>Checkout the A11y Sprout on GitHub</span>
        <img
          aria-hidden='true'
          id='gitHubIcon'
          src={gitHubIcon}
          alt='GitHub Icon'
        />
      </a>
    </footer>
  );
}

export default Footer;
