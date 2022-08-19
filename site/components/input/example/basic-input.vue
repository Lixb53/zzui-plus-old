<script setup lang="ts">
  import { ref } from 'vue'

  const inputValue = ref('')
</script>
<template>
  <zz-input v-model="inputValue" placeholder="textarea...." maxlength="20" show-word-limit />
</template>
