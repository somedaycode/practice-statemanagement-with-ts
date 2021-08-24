import Component from '@src/core/Component';

export default class Header extends Component {
  template() {
    return `
    <button>back</button>
    <nav class="nav-date">날짜가 들어간다</nav>
    <button>new</button>
    `;
  }
}
