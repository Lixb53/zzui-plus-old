<script setup lang="ts">
  import { ref } from 'vue'
  import { Calendar, Search } from '@element-plus/icons-vue'

  const inputValue = ref('')
  const inputValue1 = ref('')
</script>
<template>
  <div>
    <zz-input v-model="inputValue" placeholder="textarea...." :suffix-icon="Calendar" />
    <div class="mt-2" />
    <zz-input v-model="inputValue1" placeholder="textarea...." :prefix-icon="Search" />
  </div>
</template>
