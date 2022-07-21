<script setup lang="ts">
  import { ref } from 'vue'

  const inputValue = ref('')
</script>
<template>
  <div>
    <zz-input v-model="inputValue" placeholder="textarea....">
      <template #prepend>Http://</template>
    </zz-input>
    <div class="mt-2" />
    <zz-input v-model="inputValue" placeholder="textarea....">
      <template #append>.com</template>
    </zz-input>
  </div>
</template>
