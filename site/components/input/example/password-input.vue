<script lang="ts" setup>
  import { ref } from 'vue'

  const input = ref('')
</script>

<template>
  <zz-input v-model="input" placeholder="Please input" type="password" show-password />
</template>
