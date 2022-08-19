<script setup lang="ts">
  import { ref } from 'vue'

  const inputValue = ref('')
</script>
<template>
  <zz-input v-model="inputValue" placeholder="textarea...." disabled />
  <zz-popper>popper</zz-popper>
</template>
