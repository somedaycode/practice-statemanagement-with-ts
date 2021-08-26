import { initState } from '@src/lib/observer';

export type AlarmSet = {
  isAfternoon: boolean;
  hour: number | null;
  minute: 0 | 10 | 20 | 30 | 40 | 50 | null;
};

export type AlarmItems = string[];

const alarmSet = initState<AlarmSet>({
  key: 'alarmSet',
  value: {
    isAfternoon: false,
    hour: null,
    minute: null
  }
});

const alarmItems = initState<AlarmItems>({
  key: 'alarmItems',
  value: []
});

export { alarmSet, alarmItems };
