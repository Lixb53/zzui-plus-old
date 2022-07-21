<script setup lang="ts">
  import { ref } from 'vue'

  const inputValue = ref('')
</script>
<template>
  <div>
    <zz-input v-model="inputValue" placeholder="textarea...." disabled />
  </div>
</template>
