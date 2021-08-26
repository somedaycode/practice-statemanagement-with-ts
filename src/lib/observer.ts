type GlobalStateType = {
  [key: string]: { _state: any; _observers: Map<string, Function> };
};

const globalState: GlobalStateType = {};

const subscribe = (key: string, observer: Function) =>
  globalState[key]._observers.set(key, observer);

const _notify = (key: string) =>
  globalState[key]._observers.forEach((observer: Function) => observer());

const initState = <T>({ key, value }: { key: string; value: T }): string => {
  if (key in globalState) throw Error('이미 존재하는 key값 입니다.');
  globalState[key] = {
    _state: value,
    _observers: new Map()
  };
  return key;
};

const getState = <T>(key: string): T => {
  if (!(key in globalState)) throw Error('존재하지 않는 key값 입니다.');
  return globalState[key]._state;
};

const setState =
  <T>(key: string) =>
  (newState: ((arg: T) => T) | T): void => {
    if (!(key in globalState)) throw Error('존재하지 않는 key값 입니다.');

    if (newState instanceof Function) {
      const state = getState<T>(key);
      globalState[key]._state = newState(state);
    } else {
      globalState[key]._state = newState;
    }
    _notify(key);
  };

export { subscribe, initState, getState, setState };
