import { get, set } from 'lodash-unified';
import type { Entries } from 'type-fest';
import type { Arrayable } from './index';

export const keysOf = <T>(arr: T) => Object.keys(arr) as Array<keyof T>;
export const entriesOf = <T>(arr: T) => Object.entries(arr) as Entries<T>;

const hasOwnProperty = Object.prototype.hasOwnProperty;
export const hasOwn = (val: object, key: string | symbol): key is keyof typeof val =>
  hasOwnProperty.call(val, key);

export const getProp = <T = any>(
  obj: Record<string, any>,
  path: Arrayable<string>,
  defaultValue?: any
): { value: T } => {
  return {
    get value() {
      return get(obj, path, defaultValue);
    },
    set value(val: any) {
      set(obj, path, val);
    },
  };
};
