import Component from '@src/core/Component';

import Main from '@src/components/main';
import Header from '@src/components/common/header';

export default class Home extends Component {
  template() {
    return `
    <header class="header" data-component="header"></header>
    <main class="home-main" data-component="home"></main>
    `;
  }

  mountChildComponent() {
    const $header = this.$target.querySelector('[data-component=header]');
    const $home = this.$target.querySelector('[data-component=home]');
    new Header($header as HTMLElement, { isSetup: true });
    new Main($home as HTMLElement);
  }

  setEvent() {
    this.addEvent('dragover', '[data-component=home]', (e: DragEvent) => {
      e.preventDefault();
    });
  }
}
