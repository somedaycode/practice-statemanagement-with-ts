import './index.scss';

import App from '@src/App';
export const root = document.querySelector('#root') as HTMLElement;

function init() {
  new App(root);
}

init();
