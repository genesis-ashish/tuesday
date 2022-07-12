import {css} from '@microsoft/fast-element';
import {mixinCardTitle} from './typography';

export const stylesCardHeading = css`
  header h1 {
    ${mixinCardTitle}
  }
`;

export const mixinScreen = (display: string = 'block') => `
  contain: content;
  display: ${display};
  height: 100%;
`;

export const mixinCardStyles = `
  padding: calc(var(--design-unit) * 2px);
`;
