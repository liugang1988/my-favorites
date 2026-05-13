<script setup>
import { computed } from 'vue';
import { ArrowRightOutlined, LinkOutlined } from '@ant-design/icons-vue';

const props = defineProps({
  site: {
    type: Object,
    required: true,
  },
  categoryLabel: {
    type: String,
    required: true,
  },
});

const initial = computed(() => props.site.name.slice(0, 1).toUpperCase());

function openSite() {
  window.open(props.site.url, '_blank', 'noopener,noreferrer');
}
</script>

<template>
  <a-card class="site-card" hoverable role="link" tabindex="0" @click="openSite" @keydown.enter="openSite">
    <div class="site-cover">
      <img v-if="site.image" :src="site.image" :alt="`${site.name} 网站图片`" loading="lazy" />
      <div v-else class="site-cover-fallback">{{ initial }}</div>
      <a-tag class="site-category" color="blue">{{ categoryLabel }}</a-tag>
    </div>

    <div class="site-content">
      <div class="site-heading">
        <h2>{{ site.name }}</h2>
        <ArrowRightOutlined class="site-arrow" />
      </div>

      <p class="site-description">{{ site.description }}</p>

      <div class="site-url">
        <LinkOutlined />
        <span>{{ site.url }}</span>
      </div>
    </div>
  </a-card>
</template>

<style scoped>
.site-card {
  height: 100%;
  overflow: hidden;
  border-radius: 8px;
  border: 1px solid #e5eaf2;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease,
    transform 0.2s ease;
}

.site-card:hover,
.site-card:focus-within {
  border-color: #6aa4ff;
  box-shadow: 0 14px 34px rgba(41, 86, 145, 0.12);
  transform: translateY(-2px);
}

.site-card :deep(.ant-card-body) {
  padding: 0;
  height: 100%;
}

.site-cover {
  position: relative;
  aspect-ratio: 16 / 9;
  background: linear-gradient(135deg, #eaf2ff, #f4f7fb 48%, #fff3e8);
  overflow: hidden;
}

.site-cover img {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
}

.site-cover-fallback {
  height: 100%;
  display: grid;
  place-items: center;
  color: #1f3b57;
  font-size: 48px;
  font-weight: 700;
}

.site-category {
  position: absolute;
  top: 12px;
  left: 12px;
  margin: 0;
  border-radius: 6px;
  backdrop-filter: blur(8px);
}

.site-content {
  min-height: 190px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 18px;
}

.site-heading {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
}

.site-heading h2 {
  margin: 0;
  color: #172033;
  font-size: 19px;
  line-height: 1.35;
  word-break: break-word;
}

.site-arrow {
  flex: 0 0 auto;
  margin-top: 5px;
  color: #477bd3;
}

.site-description {
  margin: 0;
  color: #546179;
  font-size: 14px;
  line-height: 1.7;
}

.site-url {
  margin-top: auto;
  display: flex;
  align-items: center;
  gap: 8px;
  color: #2468c9;
  font-size: 13px;
  line-height: 1.4;
}

.site-url span {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
