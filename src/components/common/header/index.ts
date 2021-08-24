import Component from '@src/core/Component';
import HeaderBtns from './HeaderBtns';
import HeaderDate from './HeaderDate';

export default class Header extends Component {
  template() {
    return `
    <div data-component="headerBtns" class="btns-container"></div>
    <nav data-component="headerDate" class="nav-date"></nav>
    `;
  }

  mountChildComponent() {
    const $btns = this.$target.querySelector('[data-component=headerBtns]');
    new HeaderBtns($btns as HTMLDivElement);

    const $nav = this.$target.querySelector('[data-component=headerDate]');
    new HeaderDate($nav as HTMLElement);
  }
}
