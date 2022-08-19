<script lang="ts" setup>
  import { ref } from 'vue'

  const text = ref('')
  const text1 = ref('')
</script>

<template>
  <zz-input v-model="text" type="textarea" placeholder="Please input" autosize />
  <div class="mt-2" />
  <zz-input
    v-model="text1"
    type="textarea"
    placeholder="Please input"
    :autosize="{ minRows: 2, maxRows: 4 }"
  />
</template>

<style lang="scss" scoped></style>
