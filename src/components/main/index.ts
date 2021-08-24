import { root } from '../../../index';

import { router } from '@src/App';
import Component from '@src/core/Component';

type AppOrder = {
  component: string;
  title: string;
};

type AppLists = {
  appLists: AppOrder[];
};

export default class Main extends Component<void, AppLists> {
  template() {
    return (
      this.state?.appLists
        ?.map(({ title, component }, idx) => {
          return `
      <div data-component="${component}" data-idx="${idx}" class="main-app" draggable="true">${title}</div>
    `;
        })
        .join('') || ''
    );
  }

  setup() {
    const appLists = localStorage.getItem('mainApps');
    if (appLists) {
      this.setState({ appLists: JSON.parse(appLists) });
    } else {
      this.setState({
        appLists: [
          {
            component: 'alarm',
            title: '알람'
          },
          {
            component: 'memo',
            title: '메모'
          },
          {
            component: 'picture',
            title: '사진'
          },
          {
            component: 'picture',
            title: '사진2'
          },
          {
            component: 'picture',
            title: '사진3'
          }
        ]
      });
    }
  }

  handleClickSwitchPage(e: MouseEvent) {
    const eventTarget = e.target as HTMLDivElement;
    const component = eventTarget.dataset.component;
    if (component === 'alarm') router.push(root, '/alarm');
    if (component === 'memo') router.push(root, '/memo');
    if (component === 'picture') router.push(root, '/picture');
  }

  handleDragstart(e: DragEvent) {
    const eventTarget = e.target as HTMLDivElement;
    const data = eventTarget.dataset.idx;
    if (!data) return;
    e.dataTransfer?.setData('text', data);
    eventTarget.classList.add('dragstart');
  }

  handleDragend(e: MouseEvent) {
    const eventTarget = e.target as HTMLDivElement;
    eventTarget.classList.remove('dragstart');
  }

  handleDrop(e: DragEvent) {
    const currentState = [...this.state?.appLists!];
    const eventTarget = e.target as HTMLDivElement;
    const movingElIdx = Number(e.dataTransfer?.getData('text'));
    const eTargetIdx = Number(eventTarget.dataset.idx);
    const temp = currentState[eTargetIdx];
    currentState[eTargetIdx] = currentState[movingElIdx];
    currentState[movingElIdx] = temp;
    this.setState({ appLists: currentState });
    localStorage.setItem('mainApps', JSON.stringify(currentState));
  }

  setEvent() {
    this.addEvent('click', '.main-app', this.handleClickSwitchPage.bind(this));
    this.addEvent('dragstart', '.main-app', this.handleDragstart.bind(this));
    this.addEvent('dragend', '.main-app', this.handleDragend.bind(this));
    this.addEvent('drop', '.main-app', this.handleDrop.bind(this));
  }
}
