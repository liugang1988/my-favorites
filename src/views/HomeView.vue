<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { AppstoreOutlined } from '@ant-design/icons-vue';
import CategoryTabs from '../components/CategoryTabs.vue';
import SearchBar from '../components/SearchBar.vue';
import SiteCard from '../components/SiteCard.vue';
import { useSiteStore } from '../stores/siteStore';

const store = useSiteStore();
const router = useRouter();

const categoryLabelMap = computed(() => {
  return Object.fromEntries(store.categories.map((category) => [category.value, category.label]));
});

function handleSearch(value) {
  store.setSearchKeyword(value);
}

function handleCategoryChange(category) {
  if (category === 'common-skills') {
    router.push('/skills');
    return;
  }

  if (category === 'common-mcp') {
    router.push('/mcp');
    return;
  }

  store.setActiveCategory(category);
}
</script>

<template>
  <main class="home-page">
    <section class="hero-section">
      <div class="hero-copy">
        <a-tag color="processing" class="hero-kicker">
          <AppstoreOutlined />
          优站收藏
        </a-tag>
        <h1>优站导航</h1>
        <p>把值得反复打开的 AI、设计、开发、学习和效率站点收进一个清爽的分类入口。</p>
      </div>

      <SearchBar :value="store.searchKeyword" @update:value="store.setSearchKeyword" @search="handleSearch" />
    </section>

    <section class="toolbar-section">
      <CategoryTabs
        :categories="store.categories"
        :active-category="store.activeCategory"
        @change="handleCategoryChange"
      />

      <div class="result-meta">
        <strong>{{ store.filteredSites.length }}</strong>
        <span>/ {{ store.totalForActiveCategory }} 个站点</span>
        <span> · {{ store.currentCategoryLabel }}</span>
      </div>
    </section>

    <section class="site-section">
      <a-empty
        v-if="store.filteredSites.length === 0"
        description="没有找到匹配的站点"
        class="empty-state"
      />

      <div v-else class="site-grid">
        <SiteCard
          v-for="site in store.filteredSites"
          :key="site.id"
          :site="site"
          :category-label="categoryLabelMap[site.category]"
        />
      </div>
    </section>
  </main>
</template>

<style scoped>
.home-page {
  min-height: 100vh;
  background:
    radial-gradient(circle at top left, rgba(82, 143, 255, 0.13), transparent 34%),
    linear-gradient(180deg, #f7faff 0%, #f5f7fb 42%, #ffffff 100%);
  color: #172033;
}

.hero-section,
.toolbar-section,
.site-section {
  width: min(1180px, calc(100% - 40px));
  margin: 0 auto;
}

.hero-section {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 32px;
  padding: 56px 0 30px;
}

.hero-copy {
  max-width: 650px;
}

.hero-kicker {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 14px;
  border-radius: 6px;
}

.hero-copy h1 {
  margin: 0;
  color: #101828;
  font-size: 44px;
  line-height: 1.14;
  font-weight: 760;
}

.hero-copy p {
  max-width: 620px;
  margin: 14px 0 0;
  color: #5c667a;
  font-size: 16px;
  line-height: 1.8;
}

.toolbar-section {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  padding: 6px 0 24px;
}

.result-meta {
  flex: 0 0 auto;
  color: #647086;
  font-size: 14px;
  white-space: nowrap;
}

.result-meta strong {
  color: #1f5fbf;
  font-size: 20px;
}

.site-section {
  padding-bottom: 56px;
}

.site-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 22px;
}

.empty-state {
  display: grid;
  place-items: center;
  min-height: 320px;
  border: 1px dashed #d6dfeb;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.72);
}

@media (max-width: 980px) {
  .hero-section {
    align-items: flex-start;
    flex-direction: column;
  }

  .site-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 640px) {
  .hero-section,
  .toolbar-section,
  .site-section {
    width: min(100% - 28px, 1180px);
  }

  .hero-section {
    gap: 22px;
    padding-top: 34px;
  }

  .hero-copy h1 {
    font-size: 34px;
  }

  .toolbar-section {
    align-items: stretch;
    flex-direction: column;
    gap: 12px;
  }

  .result-meta {
    white-space: normal;
  }

  .site-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }
}
</style>
