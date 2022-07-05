import { describe, expect, it } from 'vitest';
import { isNumber } from '../src/types';

describe('is', () => {
  it('should be true', () => {
    expect(isNumber(1)).toBe(true);
  });
});
