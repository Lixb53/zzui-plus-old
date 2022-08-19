<script setup lang="ts">
  import { ref } from 'vue'

  const inputValue = ref('')
</script>
<template>
  <zz-input v-model="inputValue" type="textarea" placeholder="textarea...." :rows="2" />
</template>
