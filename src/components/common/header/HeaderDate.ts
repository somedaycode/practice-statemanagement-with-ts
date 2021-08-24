import Component from '@src/core/Component';

import { getState, setState } from '@src/lib/observer';
import { headerDateStore } from '@src/store/dateStore';

type TIME = {
  text: string | null;
  timer: NodeJS.Timer | null;
};

export default class HeaderDate extends Component<void, TIME> {
  constructor($target: HTMLElement) {
    super($target);
    this.keys = [headerDateStore];
    this.subscribe();
  }

  template() {
    const { text } = getState<TIME>(headerDateStore);
    return `${text}`;
  }

  setup() {
    this.showDate();
  }

  showDate() {
    const currentTime = getState<TIME>(headerDateStore);
    const text = this.getText();
    let timer = setTimeout(() => {
      clearTimeout(currentTime?.timer as NodeJS.Timer);
      if (currentTime?.text != null) {
        setState<TIME>(headerDateStore, { ...currentTime, text, timer });
        this.showDate();
      }
    }, 1000);
  }

  mounted() {}

  getText() {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();
    return `${year}년 ${month}월 ${day}일 ${hour}시 ${minute}분 ${second}초`;
  }
}
