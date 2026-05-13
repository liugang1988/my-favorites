<script setup>
defineProps({
  value: {
    type: String,
    default: '',
  },
});

const emit = defineEmits(['update:value', 'search']);

function handleInput(event) {
  emit('update:value', event.target.value);
}

function handleSearch(value) {
  emit('search', value);
}
</script>

<template>
  <a-input-search
    :value="value"
    size="large"
    allow-clear
    placeholder="搜索站点名称、地址或功能简介"
    class="search-bar"
    @input="handleInput"
    @search="handleSearch"
  />
</template>

<style scoped>
.search-bar {
  width: min(100%, 560px);
}
</style>
