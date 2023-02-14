<script lang="ts" setup>
  import { computed, nextTick, onMounted, onUpdated, provide, reactive, ref } from 'vue'
  import { useNamespace } from '@zzui/hooks'
  import { addUnit } from '@zzui/utils'
  import { scrollbarContextKey } from '@zzui/tokens'
  import { useScrollbarProps } from './scrollbar'
  import Bar from './bar.vue'
  import { GAP } from './utils'
  import type { StyleValue } from 'vue'
  import type { BarInstance } from './bar'

  defineOptions({
    name: 'ZzScrollbar',
  })

  const props = defineProps(useScrollbarProps)

  const ns = useNamespace('scrollbar')

  const scrollbar$ = ref<HTMLDivElement>()
  const wrap$ = ref<HTMLDivElement>()
  const resize$ = ref<HTMLDivElement>()

  const sizeHeight = ref('0')
  const sizeWidth = ref('0')
  const barRef = ref<BarInstance>()
  const ratioY = ref(1)
  const ratioX = ref(1)
  // const SCOPE = 'ZzScrollbar'

  const style = computed(() => {
    const style: StyleValue = {}
    if (props.height) style.height = addUnit(props.height)
    if (props.maxHeight) style.maxHeight = addUnit(props.maxHeight)

    return [props.wrapStyle, style]
  })

  const handleScroll = () => {
    if (wrap$.value) {
      barRef.value?.handleScroll(wrap$.value)
    }
  }

  const update = () => {
    if (!wrap$.value) return

    const offsetHeight = wrap$.value.offsetHeight - GAP
    const offsetWidth = wrap$.value.offsetWidth - GAP

    const originHeight = offsetHeight ** 2 / wrap$.value.scrollHeight
    const originWidth = offsetWidth ** 2 / wrap$.value.scrollWidth
    const height = Math.max(originHeight, props.minSize)
    const width = Math.max(originWidth, props.minSize)

    ratioY.value = originHeight / (offsetHeight - originHeight) / (height / (offsetHeight - height))
    ratioX.value = originWidth / (offsetWidth - originWidth) / (width / (offsetWidth - width))

    sizeHeight.value = height + GAP < offsetHeight ? `${height}px` : ''
    sizeWidth.value = width + GAP < offsetWidth ? `${width}px` : ''
  }

  provide(
    scrollbarContextKey,
    reactive({
      scrollbarElement: scrollbar$,
      wrapElement: wrap$,
    })
  )

  onMounted(() => {
    if (!props.native) nextTick(() => update())
  })

  onUpdated(() => update())

  defineExpose({
    wrap$,
    update,
    handleScroll,
  })
</script>

<template>
  <div ref="scrollbar$" :class="ns.b()">
    <div
      ref="wrap$"
      :class="[wrapClass, ns.e('wrap'), { [ns.em('wrap', 'hidden-default')]: !native }]"
      :style="style"
      @scroll="handleScroll"
    >
      <component :is="tag" ref="resize$" :class="[ns.e('view'), viewClass]" :style="viewStyle">
        <slot />
      </component>
    </div>
    <template v-if="!native">
      <bar
        ref="barRef"
        :height="sizeHeight"
        :width="sizeWidth"
        :always="always"
        :ratio-x="ratioX"
        :ratio-y="ratioY"
      />
    </template>
  </div>
</template>
