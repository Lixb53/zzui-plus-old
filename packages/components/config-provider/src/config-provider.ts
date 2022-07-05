import { defineComponent, renderSlot } from 'vue';
import { buildProps } from '@zzui/utils';
import { provideGlobalConfig, useSizeProp } from '@zzui/hooks';
import type { ExtractPropTypes } from 'vue';
export const configProviderProps = buildProps({
  size: useSizeProp,
  namespace: {
    type: String,
    default: 'zz',
  },
} as const);
export type ConfigProviderProps = ExtractPropTypes<typeof configProviderProps>;

const ConfigProvider = defineComponent({
  name: 'ZzConfigProvider',
  props: configProviderProps,

  setup(props, { slots }) {
    const config = provideGlobalConfig(props);
    return () => renderSlot(slots, 'default', { config: config?.value });
  },
});
export type ConfigProviderInstance = InstanceType<typeof ConfigProvider>;

export default ConfigProvider;
