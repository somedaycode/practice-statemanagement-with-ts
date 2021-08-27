import { router } from '@src/App';
import Component from '@src/core/Component';
import { getState } from '@src/lib/observer';
import { headerLocation } from '@src/store/headerStore';

export default class HeaderBtns extends Component {
  constructor($target: HTMLDivElement) {
    super($target);
    this.keys = [headerLocation];
    this.subscribe();
  }

  template() {
    const isMain = this.getHeaderLocation();
    return `
    ${
      isMain ? '<button class="btn-back">back</button><button>new</button>' : ''
    }
    `;
  }

  getHeaderLocation() {
    const { isMain } = getState(headerLocation);
    return isMain;
  }

  setEvent() {
    this.addEvent('click', '.btn-back', () => {
      router.pop();
    });
  }
}
