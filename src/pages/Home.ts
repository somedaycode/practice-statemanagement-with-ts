import Header from '@src/components/common/header';
import Main from '@src/components/main';
import Component from '@src/core/Component';

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
    new Header($header as HTMLElement);
    new Main($home as HTMLElement);
  }

  setEvent() {
    this.addEvent('dragover', '[data-component=home]', (e: DragEvent) => {
      e.preventDefault();
    });
  }

  // setEvent() {
  //   this.addEvent('click', '.second', this.switchPage.bind(this));
  // }
}
