import {ExecutionContext, html, ref} from '@microsoft/fast-element';
import type {MainApplication} from './main';

function eventDetail<T = any>(ctx: ExecutionContext) {
  return (ctx.event as CustomEvent).detail as T;
}

export const DynamicTemplate = html<MainApplication>`
  <zero-design-system-provider with-defaults ${ref('provider')}>
    <div id="dynamic-template" @doing-something=${(x, c) => x.handleDoingSomething(eventDetail(c))}>${x => x.selectTemplate()}</div>
  </zero-design-system-provider>
`;

export const LoadingTemplate = html<MainApplication>`
  ...
`;

export const MainTemplate = html<MainApplication>`
  <fast-router :config=${x => x.config}></fast-router>
`;
