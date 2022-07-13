import {html, when} from '@microsoft/fast-element';
import type {Home} from './home';
import {repeat, ref} from '@microsoft/fast-element';
import {ColDef} from '@ag-grid-community/core';
import {Select} from '@microsoft/fast-foundation';
import {sync} from '@genesislcap/foundation-utils';
import {formatNumber} from '../../utils/formatting';

export const tutorialColumnDefs: ColDef[] = [
    {field: 'TRADE_ID', headerName: 'TRADE_ID'},
    {field: 'SYMBOL', headerName: 'SYMBOL'},
    {field: 'QUANTITY', headerName: 'QUANTITY'},
    {field: 'PRICE', headerName: 'PRICE', valueFormatter: formatNumber(2)},
    {field: 'DIRECTION', headerName: 'DIRECTION'},
    {field: 'COMMENT', headerName: 'COMMENT'}
];

export const HomeTemplate = html<Home>`
    <zero-card class="trade-card">
        <zero-ag-grid ${ref('tradesGrid')} rowHeight="45" only-template-col-defs>
            ${when(x => x.connection.isConnected, html`
      <ag-genesis-datasource resourceName="ALL_TRADES"></ag-genesis-datasource>
      ${repeat(() => tutorialColumnDefs, html`
        <ag-grid-column :definition="${x => x}" />
      `)}
    `)}
        </zero-ag-grid>
        ${when(x => x.serverResponse, html`
<span>${x=> x.serverResponse.MESSAGE_TYPE == 'EVENT_ACK' ?
                'Successfully added trade' : 'Something went wrong'}
</span>
`)}
        <span>Add Trade</span>
        <zero-text-field type="number" :value=${sync(x=> x.quantity)}>
            <span>Quantity</span>
        </zero-text-field>
        <zero-text-field type="number" :value=${sync(x=> x.price)}>
            <span>Price</span>
        </zero-text-field>
        <zero-text-field type="text" :value=${sync(x=> x.tradeSymbol)}>
            <span>Symbol</span>
        </zero-text-field>
        <span>Side</span>
        <zero-select @change=${((x, c)=> x.tradeSideChange(c.event.target as Select))}>
            <zero-option value='BUY'>BUY</zero-option>
            <zero-option value='SELL'>SELL</zero-option>
        </zero-select>
        <zero-text-field type="text" :value=${sync(x=> x.comment)}>
            <span>Comment</span>
        </zero-text-field>

        <zero-button @click=${x=> x.insertTradeData()}>Add Trade</zero-button>
    </zero-card>
`;
