export function createDoomState(initial) {
    let value = initial;
    const listeners = new Set();
    const notify = () => {
        for (const l of listeners)
            l(value);
    };
    return {
        get: () => value,
        set: (v) => {
            value = v;
            notify();
        },
        subscribe: (listener) => {
            listeners.add(listener);
            listener(value);
            return () => listeners.delete(listener);
        }
    };
}
