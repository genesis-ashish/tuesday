import {css} from '@microsoft/fast-element';
import {mixinScreen} from '../../styles';

export const HomeStyles = css`
  :host {
    ${mixinScreen('flex')}
    align-items: center;
    justify-content: center;
    flex-direction: column;
    --neutral-stroke-divider-rest: var(--neutral-fill-stealth-rest);
  }
  
  
  zero-ag-grid {
  width: 100%;
  height: 50%;
}

.trade-card {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

zero-text-field, zero-select {
  width: 250px;
}

span:first-of-type, zero-button {
  margin-top: 10px;
}
`;
