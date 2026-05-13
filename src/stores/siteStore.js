import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import { categories, sites } from '../data/sites';

export const useSiteStore = defineStore('siteStore', () => {
  const activeCategory = ref('all');
  const searchKeyword = ref('');

  const currentCategoryLabel = computed(() => {
    return categories.find((category) => category.value === activeCategory.value)?.label ?? '全部';
  });

  const filteredSites = computed(() => {
    const keyword = searchKeyword.value.trim().toLowerCase();

    return sites.filter((site) => {
      const matchesCategory = activeCategory.value === 'all' || site.category === activeCategory.value;
      const searchableText = [site.name, site.url, site.description].join(' ').toLowerCase();
      const matchesSearch = !keyword || searchableText.includes(keyword);

      return matchesCategory && matchesSearch;
    });
  });

  const totalForActiveCategory = computed(() => {
    if (activeCategory.value === 'all') {
      return sites.length;
    }

    return sites.filter((site) => site.category === activeCategory.value).length;
  });

  function setActiveCategory(category) {
    activeCategory.value = category;
  }

  function setSearchKeyword(keyword) {
    searchKeyword.value = keyword;
  }

  return {
    categories,
    sites,
    activeCategory,
    searchKeyword,
    currentCategoryLabel,
    filteredSites,
    totalForActiveCategory,
    setActiveCategory,
    setSearchKeyword,
  };
});
