<script setup>
defineProps({
  categories: {
    type: Array,
    required: true,
  },
  activeCategory: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(['change']);
</script>

<template>
  <div class="category-tabs" aria-label="站点分类">
    <a-segmented
      :value="activeCategory"
      :options="categories"
      size="large"
      @change="emit('change', $event)"
    />
  </div>
</template>

<style scoped>
.category-tabs {
  width: 100%;
  overflow-x: auto;
  padding-bottom: 2px;
}

.category-tabs :deep(.ant-segmented) {
  min-width: max-content;
  background: #eef3f9;
  padding: 4px;
}

.category-tabs :deep(.ant-segmented-item) {
  border-radius: 7px;
}
</style>
