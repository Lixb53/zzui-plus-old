<script lang="ts" setup>
  import { ref } from 'vue'

  const input = ref('')
</script>

<template>
  <zz-row :gutter="10">
    <zz-col :span="8">
      <zz-input v-model="input" placeholder="Please input" size="large" />
    </zz-col>
    <zz-col :span="8">
      <zz-input v-model="input" placeholder="Please input" />
    </zz-col>
    <zz-col :span="8">
      <zz-input v-model="input" placeholder="Please input" size="small" />
    </zz-col>
  </zz-row>
</template>
