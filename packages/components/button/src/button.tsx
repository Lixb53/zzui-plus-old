import { defineComponent, computed } from 'vue';
import { useNamespace, useSizeProp } from '@zzui/hooks';
import { buildProps, iconPropType } from '@zzui/utils';

const buttonTypes = [
  'deafult',
  'primary',
  'success',
  'danger',
  'warning',
  'info',
  'text',
  '',
] as const;
// const buttonNativeTypes = ['button', 'reset', 'reset'] as const;

const buttonProps = buildProps({
  size: useSizeProp,
  disabled: Boolean,
  type: {
    type: String,
    values: buttonTypes,
    default: '',
  },
  icon: {
    type: iconPropType,
    default: '',
  },
  plain: Boolean,
});

export default defineComponent({
  name: 'ZzButton',
  props: buttonProps,
  setup(props, { slots }) {
    const ns = useNamespace('button');
    const _type = computed(() => props.type || '');

    const cls = computed(() => [ns.b(), ns.m(_type.value), ns.is('plain', props.plain)]);

    return () => <button class={cls.value}>{slots.default && slots.default()}</button>;
  },
});
