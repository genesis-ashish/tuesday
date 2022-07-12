import {css} from '@microsoft/fast-element';
import {mixinScreen, stylesFontFaces} from '../styles';
import './main.css';

export const MainStyles = css`
  ${stylesFontFaces}
  :host {
    ${mixinScreen()}
  }
  :host,
  zero-design-system-provider,
  #dynamic-template,
  fast-router {
    display: block;
    height: 100%;
  }
`;