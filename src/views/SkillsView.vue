<script setup>
import { computed, ref } from 'vue';
import { CodeOutlined, HomeOutlined } from '@ant-design/icons-vue';
import { frontendSkills, skillCategories } from '../data/frontendSkills';

const activeCategory = ref('全部');
const keyword = ref('');

const categoryOptions = computed(() => {
  return skillCategories.map((category) => ({
    label: category,
    value: category,
  }));
});

const filteredSkills = computed(() => {
  const normalizedKeyword = keyword.value.trim().toLowerCase();

  return frontendSkills.filter((skill) => {
    const matchesCategory = activeCategory.value === '全部' || skill.category === activeCategory.value;
    const searchableText = [skill.category, skill.name, skill.coreUse, skill.scenario].join(' ').toLowerCase();
    const matchesKeyword = !normalizedKeyword || searchableText.includes(normalizedKeyword);

    return matchesCategory && matchesKeyword;
  });
});

function handleSearch(value) {
  keyword.value = value;
}
</script>

<template>
  <main class="skills-page">
    <section class="skills-hero">
      <div>
        <a-tag color="processing" class="skills-kicker">
          <CodeOutlined />
          常用 Skills
        </a-tag>
        <h1>前端开发专用 AI Skills</h1>
        <p>覆盖通用规范、框架生态、样式工程、工程化、业务开发、跨端、性能、测试、安全和文档等常用场景。</p>
      </div>

      <a-button size="large">
        <RouterLink to="/">
          <HomeOutlined />
          返回导航站
        </RouterLink>
      </a-button>
    </section>

    <section class="skills-toolbar">
      <div class="skill-category-tabs" aria-label="Skills 分类">
        <a-segmented v-model:value="activeCategory" :options="categoryOptions" size="large" />
      </div>

      <a-input-search
        v-model:value="keyword"
        allow-clear
        size="large"
        placeholder="搜索 Skill 名称、核心作用或适用场景"
        class="skill-search"
        @search="handleSearch"
      />
    </section>

    <section class="skills-summary">
      <strong>{{ filteredSkills.length }}</strong>
      <span>/ {{ frontendSkills.length }} 个 Skills</span>
      <span> · {{ activeCategory }}</span>
    </section>

    <section class="skills-table-section">
      <div class="skills-table-wrap">
        <table class="skills-table">
          <thead>
            <tr>
              <th>分类</th>
              <th>Skill 名称</th>
              <th>核心作用</th>
              <th>适用开发场景</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="skill in filteredSkills" :key="skill.id">
              <td>
                <a-tag color="blue">{{ skill.category }}</a-tag>
              </td>
              <td class="skill-name">{{ skill.name }}</td>
              <td>{{ skill.coreUse }}</td>
              <td>{{ skill.scenario }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <a-empty
        v-if="filteredSkills.length === 0"
        description="没有找到匹配的 Skill"
        class="skills-empty"
      />
    </section>
  </main>
</template>

<style scoped>
.skills-page {
  min-height: 100vh;
  background:
    radial-gradient(circle at top left, rgba(82, 143, 255, 0.13), transparent 34%),
    linear-gradient(180deg, #f7faff 0%, #f5f7fb 42%, #ffffff 100%);
  color: #172033;
  padding-bottom: 56px;
}

.skills-hero,
.skills-toolbar,
.skills-summary,
.skills-table-section {
  width: min(1180px, calc(100% - 40px));
  margin: 0 auto;
}

.skills-hero {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 24px;
  padding: 48px 0 28px;
}

.skills-kicker {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 14px;
  border-radius: 6px;
}

.skills-hero h1 {
  margin: 0;
  color: #101828;
  font-size: 40px;
  line-height: 1.16;
  font-weight: 760;
}

.skills-hero p {
  max-width: 760px;
  margin: 14px 0 0;
  color: #5c667a;
  font-size: 16px;
  line-height: 1.8;
}

.skills-hero a {
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.skills-toolbar {
  display: flex;
  align-items: stretch;
  flex-direction: column;
  gap: 12px;
  padding-bottom: 16px;
}

.skill-category-tabs {
  min-width: 0;
  overflow-x: auto;
  padding-bottom: 2px;
}

.skill-category-tabs :deep(.ant-segmented) {
  min-width: max-content;
  background: #eef3f9;
  padding: 4px;
}

.skill-search {
  width: 100%;
}

.skill-search :deep(.ant-input-wrapper) {
  width: 100%;
}

.skills-summary {
  color: #647086;
  font-size: 14px;
  padding-bottom: 14px;
}

.skills-summary strong {
  color: #1f5fbf;
  font-size: 20px;
}

.skills-table-section {
  overflow: hidden;
  border: 1px solid #e5eaf2;
  border-radius: 8px;
  background: #ffffff;
  box-shadow: 0 14px 34px rgba(41, 86, 145, 0.08);
}

.skills-table-wrap {
  overflow-x: auto;
}

.skills-table {
  width: 100%;
  min-width: 920px;
  border-collapse: collapse;
}

.skills-table th {
  color: #334155;
  font-weight: 700;
  background: #f2f6fb;
  text-align: left;
}

.skills-table th,
.skills-table td {
  padding: 14px 16px;
  border-bottom: 1px solid #edf1f7;
  line-height: 1.7;
  vertical-align: top;
}

.skills-table tbody tr:hover {
  background: #f8fbff;
}

.skills-table tbody tr:last-child td {
  border-bottom: 0;
}

.skill-name {
  color: #1f5fbf;
  font-weight: 700;
  white-space: nowrap;
}

.skills-empty {
  min-height: 260px;
  display: grid;
  place-items: center;
}

@media (max-width: 760px) {
  .skills-hero,
  .skills-toolbar,
  .skills-summary,
  .skills-table-section {
    width: min(100% - 28px, 1180px);
  }

  .skills-hero {
    align-items: flex-start;
    flex-direction: column;
    padding-top: 34px;
  }

  .skills-hero h1 {
    font-size: 30px;
  }

  .skills-toolbar {
    gap: 10px;
  }

  .skill-search {
    width: 100%;
  }
}
</style>
