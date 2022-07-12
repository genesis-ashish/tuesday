import {Auth, Connect} from '@genesislcap/foundation-comms';
import {HostENV, HostURL} from '../../types';
import {customElement, FASTElement, observable, volatile} from '@microsoft/fast-element';
import {HomeTemplate as template} from './home.template';
import {HomeStyles as styles} from './home.styles';
import {logger} from '../../utils';
import {Select} from '@microsoft/fast-foundation';
import {AgGrid} from '@genesislcap/foundation-zero';

const name = 'home-route';

@customElement({
  name,
  template,
  styles,
})
export class Home extends FASTElement {
  @HostENV hostEnv!: string;
  @HostURL hostUrl!: string;
  @observable public something: boolean = true;
  @Connect connection: Connect;
  @Auth auth: Auth;
  public tradesGrid!: AgGrid;

  @observable public quantity: string;
  @observable public price: string;
  @observable public tradeSymbol: string;
  @observable public tradeSide: string = 'BUY';
  @observable public serverResponse;

  public connectedCallback() {
    super.connectedCallback();

    this.connection.socket.hasValidSession = true;

    logger.debug(`${name} is now connected to the DOM`);
    this.tradesGrid.addEventListener('onGridReady', () => {
      this.tradesGrid.gridApi.addEventListener('firstDataRendered', () => {
        this.tradesGrid.gridApi.sizeColumnsToFit();
      });
    });
  }

  public get canDoSomething() {
    return this.something;
  }

  public handleDoSomething() {
    if (this.canDoSomething) {
      const detail = {
        key: 'value',
      };
      /**
       * Helper within FAST to send custom events
       */
      this.$emit('doing-something', detail);
      logger.debug(`${name} you did something!`);
      this.something = false;
    }
  }

  public tradeSideChange(target: Select) {
    this.tradeSide = target.selectedOptions[0]?.value;
  }

  @volatile
  public get somethingActionText() {
    return this.something ? 'Do something once?' : `You've already done that thing!`;
  }

  public async insertTradeData() {
    this.serverResponse = await this.connection.commitEvent('EVENT_TRADE_INSERT', {
      DETAILS: {
        SYMBOL: this.tradeSymbol,
        QUANTITY: this.quantity,
        PRICE: this.price,
        DIRECTION: this.tradeSide,
      },
      IGNORE_WARNINGS: true,
      VALIDATE: false,
    });
    this.tradeSymbol = '';
    this.quantity = '';
    this.price = '';
    logger.debug('EVENT_TRADE_INSERT result -> ', this.serverResponse);
  }
}