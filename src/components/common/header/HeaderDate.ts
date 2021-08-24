import Component from '@src/core/Component';

type TIME = {
  text: string | null;
  timer: NodeJS.Timer | null;
};

export default class HeaderDate extends Component<void, TIME> {
  template() {
    const { text } = this.state as TIME;
    return `${text}`;
  }

  setup() {
    this.state = { timer: null, text: '' };
    this.showDate();
  }

  showDate() {
    if (this.state == null) return;
    const text = this.getText();
    let timer = setTimeout(() => {
      clearTimeout(this.state?.timer as NodeJS.Timer);
      if (this.state?.text != null) {
        this.setState({ ...this.state, text, timer });
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
