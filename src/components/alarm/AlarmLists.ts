import Component from '@src/core/Component';
import { getState } from '@src/lib/observer';
import { alarmItems } from '@src/store/alarmStore';
import type { AlarmItems } from '@src/store/alarmStore';

export default class AlarmLists extends Component {
  constructor($target: HTMLElement) {
    super($target);
    this.keys = [alarmItems];
    this.subscribe();
  }

  template() {
    const alarms = getState<AlarmItems>(alarmItems);
    return `${alarms
      .map(
        (alarm: string) => `
      <li class="alarm__list">
      <span>${alarm}</span>
      <button class="delete-btn">삭제</button>
      </li>
    `
      )
      .join('')}`;
  }
}
