export type DoomState<T> = {
  get: () => T;
  set: (value: T) => void;
  subscribe: (listener: (value: T) => void) => () => void;
};

export function createDoomState<T>(initial: T): DoomState<T> {
  let value = initial;
  const listeners = new Set<(v: T) => void>();

  const notify = () => {
    for (const l of listeners) l(value);
  };

  return {
    get: () => value,
    set: (v: T) => {
      value = v;
      notify();
    },
    subscribe: (listener: (v: T) => void) => {
      listeners.add(listener);
      listener(value);
      return () => listeners.delete(listener);
    }
  };
}
