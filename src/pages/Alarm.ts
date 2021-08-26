import Component from '@src/core/Component';
import { setState } from '@src/lib/observer';
import { headerLocation } from '@src/store/headerStore';

import Header from '@src/components/common/header';
import { AlarmLists, SettingAlarm } from '@src/components/alarm';

export default class Alarm extends Component {
  constructor($target: HTMLElement) {
    super($target);
    this.keys = [headerLocation];
    this.subscribe();
  }

  template() {
    return `
    <header class="header" data-component="header"></header>
    <main class="alarm">
      <div data-component="settingAlarm" class="alarm__select"></div>
      <ul data-component="alarmLists" class="alarm__lists"></ul>
    </main>`;
  }

  setup() {
    const setDate = setState(headerLocation);
    setDate({ isMain: true });
  }

  mountChildComponent() {
    const $header = this.$target.querySelector('[data-component=header]');
    const $settingAlarm = this.$target.querySelector(
      '[data-component=settingAlarm]'
    );
    const $alarmLists = this.$target.querySelector(
      '[data-component=alarmLists]'
    );

    new Header($header as HTMLElement);
    new SettingAlarm($settingAlarm as HTMLDivElement);
    new AlarmLists($alarmLists as HTMLUListElement);
  }
}
