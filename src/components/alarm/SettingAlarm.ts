import Component from '@src/core/Component';
import { getState, setState } from '@src/lib/observer';
import { alarmItems, alarmSet } from '@src/store/alarmStore';
import type { AlarmItems, AlarmSet } from '@src/store/alarmStore';

export default class SettingAlarm extends Component {
  constructor($target: HTMLElement) {
    super($target);
    this.keys = [alarmSet];
    this.subscribe();
  }

  template() {
    const { isAfternoon, hour, minute } = getState<AlarmSet>(alarmSet);
    const isSelected = isAfternoon ? 'selected' : '';

    return `
    <div class="select__container">
      <select class="daySelect"}>
        <option ${isSelected} value="오전">오전</option>
        <option ${isSelected} value="오후">오후</option>
      </select>
      <input type="number" class="alarm-time input__hour" step="1" min="1" max="12" value=${hour} />
      <input type="number" class="alarm-time input__minute" step="10" min="0" max="60" value=${minute} />
    </div>
    <button class="save-btn">저장</button>
    `;
  }

  handleClickSaveAlarm(e: MouseEvent) {
    const { isAfternoon, hour, minute } = getState<AlarmSet>(alarmSet);
    const setAlarmTime = setState(alarmSet);
    const alarmList = getState<AlarmItems>(alarmItems);
    const setAlarmList = setState(alarmItems);

    const dayText = isAfternoon ? '오후' : '오전';
    const newAlarm = `${dayText} ${hour}시 ${minute}분`;
    setAlarmList([...alarmList, newAlarm]);
    setAlarmTime({
      isAfternoon: false,
      hour: null,
      minute: null
    });
  }

  handleSelectDay(e: Event) {
    const eventTarget = e.target as HTMLOptionElement;
    const value = eventTarget.value;
    const alarmTime = getState<AlarmSet>(alarmSet);
    const setAlarmTime = setState(alarmSet);

    setAlarmTime({
      ...alarmTime,
      isAfternoon: value === '오후' ? true : false
    });
  }

  handleChangeTime(e: Event) {
    const eventTarget = e.target as HTMLInputElement;
    const alarmTime = getState<AlarmSet>(alarmSet);
    const setAlarmTime = setState(alarmSet);

    if (eventTarget.classList.contains('input__hour')) {
      setAlarmTime({ ...alarmTime, hour: eventTarget.value });
    }
    if (eventTarget.classList.contains('input__minute')) {
      setAlarmTime({ ...alarmTime, minute: eventTarget.value });
    }
  }

  setEvent() {
    this.addEvent('change', '.alarm-time', this.handleChangeTime.bind(this));
    this.addEvent('change', '.daySelect', this.handleSelectDay.bind(this));
    this.addEvent('click', '.save-btn', this.handleClickSaveAlarm.bind(this));
  }
}
