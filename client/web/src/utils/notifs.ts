import * as icons from '../styles';

export const escapeHtml = (html) => {
  const div = document.createElement('div');
  div.textContent = html;
  return div.innerHTML;
};

export const notifySuccess = (message, type = 'success', duration = 2000): any => {
  const alert = Object.assign(document.createElement('sl-alert'), {
    type: type,
    closable: true,
    duration: duration,
    position: 'bottom',
    innerHTML: `  
          <div style="background-color: rgba(16, 124, 16,0.9); width: 400px; position: fixed; right: 10px; bottom: 10px;">
            <div style="display: flex; flex-direction: row; justify-content: space-between;">
                <div style="display: flex; flex-direction: row; align-items: center;">
                   <label></label>
                  <label style="margin-left: 10px; font-size: large; font-family: roboto-bold, Arial, Helvetica, sans-serif;">Success</label>
                </div>
            </div>
            <p style="color: black; margin-top: 0px; margin-left: 50px; height: 100%; font-family: roboto, Arial, Helvetica, sans-serif">   ${escapeHtml(message)}</p>
            <zero-divider style="margin-bottom: 10px"></zero-divider>
          </div>
          rgba(178, 75, 50,0.9)
          
        `,
  });
  document.body.append(alert);
  return alert.show();
};

export const notifyError = (message, type = 'error', duration = 2000): any => {
  const alert = Object.assign(document.createElement('sl-alert'), {
    type: type,
    closable: true,
    duration: duration,
    position: 'bottom',
    innerHTML: `  
          <div style="background-color: rgba(178, 75, 50,0.9); width: 400px; position: fixed; right: 10px; bottom: 10px;">
            <div style="display: flex; flex-direction: row; justify-content: space-between;">
                <div style="display: flex; flex-direction: row; align-items: center;">
                  <span style="font-size: large; margin-left: 10px;">&#9888;</span>
                  <label style="margin-left: 10px; font-size: large; font-family: roboto-bold, Arial, Helvetica, sans-serif;">Error</label>
                </div>
            </div>
            <p style="color: black; margin-top: 0px; margin-left: 50px; height: 100%; font-family: roboto, Arial, Helvetica, sans-serif">   ${escapeHtml(message)}</p>
            <zero-divider style="margin-bottom: 10px"></zero-divider>
          </div>
        `,
  });
  document.body.append(alert);
  return alert.toast();
};

export const notifyWarningChoices = (message, type = 'error'): any => {
  const alert = Object.assign(document.createElement('sl-alert'), {
    type: type,
    closable: true,
    position: 'bottom',
    innerHTML: `  
          <div id= "submitTradeConf" style="background-color: rgba(38,45,49,255); outline: 2px solid white; width: 400px; position: fixed; top: 40%; left: 40%;">
            <div style="display: flex; flex-direction: row; justify-content: space-between;">
                <div style="display: flex; flex-direction: row; align-items: center;">
                  <span style="color: white; font-size: large; margin-left: 10px;">&#9888;</span>
                  <label style="color: white; margin-left: 10px; font-size: large; font-family: roboto-bold, Arial, Helvetica, sans-serif;">WARNING</label>
                </div>
            </div>
            <p style="color: white; margin-top: 0px; margin-left: 20px;  margin-right: 20px; height: 100%; font-family: roboto, Arial, Helvetica, sans-serif">   ${escapeHtml(message)}</p>
            <zero-button id= "sendYesBtn" style= "width: 75px; margin-bottom: 10px; margin-left: 100px; background-color:green; color:white;">Yes</zero-button>
            <zero-button id= "sendNoBtn" style= "width: 75px; margin-bottom: 10px; margin-left: 50px; background-color:red; color:white;">No</zero-button>
          </div>
        `,
  });
  document.body.append(alert);
  return alert.toast();
};