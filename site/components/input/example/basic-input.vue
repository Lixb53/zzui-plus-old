<script setup lang="ts">
  import { ref, watch } from 'vue'

  const inputValue = ref('')
  watch(inputValue, () => {
    console.log(inputValue.value)
  })
</script>
<template>
  <zz-input v-model="inputValue" placeholder="textarea...." size="small" clearable />
</template>
