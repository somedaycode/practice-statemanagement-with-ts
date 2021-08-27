import Component from '@src/core/Component';

import { getState, setState } from '@src/lib/observer';
import { AlarmItems, alarmItems } from '@src/store/alarmStore';
import { headerDateStore } from '@src/store/headerStore';
import { HeaderSetup } from '.';

type TIME = {
  text: string | null;
  timer: NodeJS.Timer | null;
};

export default class HeaderDate extends Component<HeaderSetup, TIME> {
  constructor($target: HTMLElement, props: HeaderSetup) {
    super($target, props);
    this.keys = [headerDateStore, alarmItems];
    this.subscribe();
  }

  template() {
    const { text } = getState<TIME>(headerDateStore);
    return `${text}`;
  }

  setup() {
    const { isSetup } = this.props;
    isSetup && this.showDate();
  }

  showDate() {
    const currentTime = getState<TIME>(headerDateStore);
    const setDate = setState<TIME>(headerDateStore);

    const { year, month, day, hour, minute, second } = this.getTime();
    const text = `${year}년 ${month}월 ${day}일 ${hour}시 ${minute}분 ${second}초`;

    let timer = setTimeout(() => {
      clearTimeout(currentTime?.timer as NodeJS.Timer);
      if (currentTime?.text != null) {
        setDate({ ...currentTime, text, timer });
        this.showDate();
      }
    }, 1000);

    this.checkAlarm(hour, minute);
  }

  checkAlarm(hour: number, minute: number) {
    const alarmList = getState<AlarmItems>(alarmItems);
    const setAlarmList = setState(alarmItems);

    let dayText = hour > 12 ? '오후' : '오전';
    let alarmHour = hour > 12 ? hour - 12 : hour;
    const alarm = `${dayText} ${alarmHour}시 ${minute}분`;
    const hasAlarm = alarmList.includes(alarm);

    if (hasAlarm) {
      window.alert('알람~~');
      const alarmListUpdated = alarmList.filter(a => a !== alarm);
      setAlarmList(alarmListUpdated);
      localStorage.setItem('alarm', JSON.stringify(alarmListUpdated));
    }
  }

  mounted() {}

  getTime() {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();
    return { year, month, day, hour, minute, second };
  }
}
