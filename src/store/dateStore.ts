import { initState } from '@src/lib/observer';

type TIME = {
  text: string | null;
  timer: NodeJS.Timer | null;
};

const headerDateStore = initState<TIME>({
  key: 'headerDate',
  value: { timer: null, text: '' }
});

export { headerDateStore };
