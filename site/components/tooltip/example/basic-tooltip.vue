<script lang="ts" setup>
  import { onBeforeMount, onMounted, reactive, toRefs } from 'vue'
</script>

<template>
  <zz-tooltip content="test content">
    <zz-button>test</zz-button>
  </zz-tooltip>
  <zz-tooltip content="test content1">
    <zz-button>test1</zz-button>
  </zz-tooltip>
  <div />
</template>
