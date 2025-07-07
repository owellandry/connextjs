export type DoomState<T> = {
    get: () => T;
    set: (value: T) => void;
    subscribe: (listener: (value: T) => void) => () => void;
};
export declare function createDoomState<T>(initial: T): DoomState<T>;
