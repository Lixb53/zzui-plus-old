<script setup lang="ts">
  import { ref } from 'vue'
  import { Calendar, Search } from '@element-plus/icons-vue'

  const inputValue = ref('')
  const inputValue1 = ref('')
</script>
<template>
  <zz-row :gutter="20">
    <zz-col :span="5"> using attributes </zz-col>
    <zz-col :span="8">
      <zz-input v-model="inputValue" placeholder="textarea...." :suffix-icon="Calendar" />
    </zz-col>
    <zz-col :span="8">
      <zz-input v-model="inputValue1" placeholder="textarea...." :prefix-icon="Search" />
    </zz-col>
  </zz-row>
  <zz-row :gutter="20" class="mt-2">
    <zz-col :span="5"> using slots </zz-col>
    <zz-col :span="8">
      <zz-input v-model="inputValue" placeholder="textarea....">
        <template #suffix>
          <zz-icon>
            <Calendar />
          </zz-icon>
        </template>
      </zz-input>
    </zz-col>
    <zz-col :span="8">
      <zz-input v-model="inputValue" placeholder="textarea....">
        <template #prefix>
          <zz-icon>
            <Search />
          </zz-icon>
        </template>
      </zz-input>
    </zz-col>
  </zz-row>
</template>
