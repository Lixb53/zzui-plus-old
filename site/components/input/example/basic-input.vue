<script setup lang="ts">
  import { ref } from 'vue'

  const placeholder = ref('abc')

  setTimeout(() => {
    placeholder.value = 'aaa'
  }, 2000)
</script>
<template>
  <div>
    <zz-input :placeholder="placeholder" disabled />
  </div>
</template>
