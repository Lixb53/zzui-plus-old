<script lang="ts">
  import { computed, defineComponent, provide, reactive } from 'vue'
  import { useNamespace } from '@zzui/hooks'
  import { clickOutside } from '@zzui/directives'
  import ZzTooltip from '@zzui/components/tooltip'
  import ZzInput from '@zzui/components/input'
  import ZzScrollbar from '@zzui/components/scrollbar'
  import ZzOption from './option.vue'
  import ZzSelectMenu from './select-dropdown.vue'
  import { useSelectEmits, useSelectProps } from './select'
  import { useSelect, useSelectStates } from './useSelect'
  import { selectKey } from './token'
  import type { SelectContext } from './token'

  export default defineComponent({
    name: 'ZzSelect',
    components: { ZzTooltip, ZzInput, ZzOption, ZzSelectMenu, ZzScrollbar },
    directives: { clickOutside },
    props: useSelectProps,
    emits: useSelectEmits,
    setup(props, ctx) {
      const states = useSelectStates()
      const {
        blur,

        iconComponent,
        selectWrapper,
        reference,
        tooltipRef,
        iconReverse,
        handleBlur,
        toggleMenu,
        handleFocus,
        handleClose,
      } = useSelect(props, states, ctx)

      const nsSelect = useNamespace('select')

      const wrapperKls = computed(() => {
        const classList = [nsSelect.b()]
        return classList
      })

      const popperPaneRef = computed(() => {
        return tooltipRef.value?.popperRef?.contentRef
      })

      provide(
        selectKey,
        reactive({
          props,
          selectWrapper,
        }) as unknown as SelectContext
      )

      return {
        blur,
        iconComponent,
        selectWrapper,
        reference,
        tooltipRef,
        iconReverse,
        handleBlur,
        toggleMenu,
        handleFocus,
        handleClose,
        nsSelect,
        popperPaneRef,
        states,
        wrapperKls,
      }
    },
  })
</script>

<template>
  <div
    ref="selectWrapper"
    v-click-outside:[popperPaneRef]="handleClose"
    :class="wrapperKls"
    @click.stop="toggleMenu"
  >
    <zz-tooltip ref="tooltipRef" trigger="click" :effect="effect" pure>
      <template #default>
        <div class="select-trigger">
          <div v-if="multiple"> multiple </div>
          <zz-input
            :id="id"
            ref="reference"
            :placeholder="placeholder"
            :class="[nsSelect.is('focus', states.visible)]"
            @focus="handleFocus"
            @blur="handleBlur"
          >
            <template #suffix>
              <zz-icon :class="[nsSelect.e('caret'), nsSelect.e('icon'), iconReverse]">
                <component :is="iconComponent" />
              </zz-icon>
            </template>
          </zz-input>
        </div>
      </template>
      <template #content>
        <zz-select-menu>
          <zz-scrollbar
            tag="ul"
            :wrap-class="nsSelect.be('dropdown', 'wrap')"
            :view-class="nsSelect.be('dropdown', 'list')"
          >
            <slot />
          </zz-scrollbar>
        </zz-select-menu>
      </template>
    </zz-tooltip>
  </div>
</template>
