import { isNil } from 'lodash-unified'

export { isVNode } from 'vue'

export function is(val: unknown, type: string) {
  return toString.call(val) === `[object ${type}]`
}

export function isNumber(val: unknown): val is number {
  return is(val, 'Number')
}

export function isString(val: unknown): val is string {
  return is(val, 'String')
}

export function isBoolean(val: unknown): val is boolean {
  return is(val, 'Boolean')
}

export function isArray(val: any): val is Array<any> {
  return val && Array.isArray(val)
}

// eslint-disable-next-line @typescript-eslint/ban-types
export function isFunction(val: unknown): val is Function {
  return typeof val === 'function'
}

// eslint-disable-next-line @typescript-eslint/ban-types
export function isObject(val: any): val is Object {
  return val !== null && is(val, 'Object')
}

export function isDate(val: any): val is Date {
  return is(val, 'Date')
}

export function isPromise<T = any>(val: any): val is Promise<T> {
  return is(val, 'Promise') && isObject(val) && isFunction(val.then) && isFunction(val.catch)
}

export function isSymbol(val: any): val is symbol {
  return is(val, 'Symbol') && isObject(val)
}

export function isDef<T = unknown>(val?: T): val is T {
  return typeof val !== 'undefined'
}

export function isUnDef<T = unknown>(val?: T): val is T {
  return !isDef(val)
}

export function isEmpty<T = unknown>(val: T): val is T {
  if (isArray(val) || isString(val)) {
    return val.length === 0
  }

  if (val instanceof Map) {
    return val.size === 0
  }

  if (isObject(val)) {
    return Object.keys(val).length === 0
  }

  return false
}

export function isNull(val: unknown): val is null {
  return val === null
}

export function isRegExp(val: unknown): val is RegExp {
  return is(val, 'RegExp')
}

export function isMap(val: unknown): val is Map<any, any> {
  return is(val, 'Map')
}

export function isNullOrUnDef(val: unknown): val is null | undefined {
  return isNil(val) || isNull(val)
}

export function isValidKey(
  key: string | number | symbol,
  object: object
): key is keyof typeof object {
  return key in object
}
