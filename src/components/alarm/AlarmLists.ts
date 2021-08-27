import Component from '@src/core/Component';
import { getState, setState } from '@src/lib/observer';
import { alarmItems } from '@src/store/alarmStore';
import type { AlarmItems } from '@src/store/alarmStore';

export default class AlarmLists extends Component {
  constructor($target: HTMLElement) {
    super($target);
    this.keys = [alarmItems];
    this.subscribe();
  }

  setup() {
    const localAlarm = localStorage.getItem('alarm');
    if (localAlarm !== null) {
      const setAlarms = setState(alarmItems);
      setAlarms(JSON.parse(localAlarm));
    }
  }

  template() {
    const alarms = getState<AlarmItems>(alarmItems);
    return `${
      alarms &&
      alarms
        .map(
          (alarm: string, idx: number) => `
      <li class="alarm__list">
      <span>${alarm}</span>
      <button class="delete-btn" data-idx=${idx}>삭제</button>
      </li>
    `
        )
        .join('')
    }`;
  }

  handleClickDeleteBtn(e: MouseEvent) {
    const target = e.target as HTMLButtonElement;
    const selectedIdx = Number(target.dataset.idx);
    const alarms = getState<AlarmItems>(alarmItems);
    const newAlarms = alarms.filter((_, i) => i !== selectedIdx);
    const setAlarms = setState(alarmItems);
    setAlarms(newAlarms);
    localStorage.setItem('alarm', JSON.stringify(newAlarms));
  }

  setEvent() {
    this.addEvent('click', '.delete-btn', this.handleClickDeleteBtn.bind(this));
  }
}
