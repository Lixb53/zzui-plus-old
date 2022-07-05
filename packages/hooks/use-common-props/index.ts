import { buildProp } from '@zzui/utils';
import { componentSizes } from '@zzui/constants';

export const useSizeProp = buildProp({
  type: String,
  values: componentSizes,
  required: false,
} as const);
