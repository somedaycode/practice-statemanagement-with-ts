import { initState } from '@src/lib/observer';

type TIME = {
  text: string | null;
  timer: NodeJS.Timer | null;
};

const headerDateStore = initState<TIME>({
  key: 'headerDate',
  value: { timer: null, text: '' }
});

const headerLocation = initState({
  key: 'headerLocation',
  value: { isMain: false }
});

export { headerDateStore, headerLocation };
