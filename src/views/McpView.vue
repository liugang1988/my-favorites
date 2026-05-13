<script setup>
import { computed, ref } from 'vue';
import { ApiOutlined, HomeOutlined } from '@ant-design/icons-vue';
import { frontendMcpTools, mcpCategories } from '../data/frontendMcpTools';

const activeCategory = ref('全部');
const keyword = ref('');

const categoryOptions = computed(() => {
  return mcpCategories.map((category) => ({
    label: category,
    value: category,
  }));
});

const filteredTools = computed(() => {
  const normalizedKeyword = keyword.value.trim().toLowerCase();

  return frontendMcpTools.filter((tool) => {
    const matchesCategory = activeCategory.value === '全部' || tool.category === activeCategory.value;
    const searchableText = [tool.category, tool.name, tool.description, tool.target].join(' ').toLowerCase();
    const matchesKeyword = !normalizedKeyword || searchableText.includes(normalizedKeyword);

    return matchesCategory && matchesKeyword;
  });
});

function handleSearch(value) {
  keyword.value = value;
}
</script>

<template>
  <main class="mcp-page">
    <section class="mcp-hero">
      <div>
        <a-tag color="processing" class="mcp-kicker">
          <ApiOutlined />
          常用 MCP
        </a-tag>
        <h1>前端 AI MCP 工具导航</h1>
        <p>按开发辅助、脚手架、文档检索、浏览器自动化、UI 设计、WebMCP 和项目管理分类整理常用 MCP 工具。</p>
      </div>

      <a-button size="large">
        <RouterLink to="/">
          <HomeOutlined />
          返回导航站
        </RouterLink>
      </a-button>
    </section>

    <section class="mcp-toolbar">
      <div class="mcp-category-tabs" aria-label="MCP 分类">
        <a-segmented v-model:value="activeCategory" :options="categoryOptions" size="large" />
      </div>

      <a-input-search
        v-model:value="keyword"
        allow-clear
        size="large"
        placeholder="搜索 MCP 名称、描述或安装方式"
        class="mcp-search"
        @search="handleSearch"
      />
    </section>

    <section class="mcp-summary">
      <strong>{{ filteredTools.length }}</strong>
      <span>/ {{ frontendMcpTools.length }} 个 MCP 工具</span>
      <span> · {{ activeCategory }}</span>
    </section>

    <section class="mcp-table-section">
      <div class="mcp-table-wrap">
        <table class="mcp-table">
          <thead>
            <tr>
              <th>分类</th>
              <th>名称</th>
              <th>描述</th>
              <th>适用场景</th>
              <th>站点 / 安装方式</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="tool in filteredTools" :key="tool.id">
              <td>
                <a-tag color="blue">{{ tool.category }}</a-tag>
              </td>
              <td class="tool-name">{{ tool.name }}</td>
              <td>{{ tool.description }}</td>
              <td>{{ tool.scenario }}</td>
              <td>
                <a
                  v-if="tool.type === 'link'"
                  :href="tool.target"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="tool-link"
                >
                  {{ tool.target }}
                </a>
                <code v-else-if="tool.type === 'command'" class="tool-command">{{ tool.target }}</code>
                <span v-else>{{ tool.target }}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <a-empty
        v-if="filteredTools.length === 0"
        description="没有找到匹配的 MCP 工具"
        class="mcp-empty"
      />
    </section>
  </main>
</template>

<style scoped>
.mcp-page {
  min-height: 100vh;
  background:
    radial-gradient(circle at top left, rgba(82, 143, 255, 0.13), transparent 34%),
    linear-gradient(180deg, #f7faff 0%, #f5f7fb 42%, #ffffff 100%);
  color: #172033;
  padding-bottom: 56px;
}

.mcp-hero,
.mcp-toolbar,
.mcp-summary,
.mcp-table-section {
  width: min(1180px, calc(100% - 40px));
  margin: 0 auto;
}

.mcp-hero {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 24px;
  padding: 48px 0 28px;
}

.mcp-kicker {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 14px;
  border-radius: 6px;
}

.mcp-hero h1 {
  margin: 0;
  color: #101828;
  font-size: 40px;
  line-height: 1.16;
  font-weight: 760;
}

.mcp-hero p {
  max-width: 760px;
  margin: 14px 0 0;
  color: #5c667a;
  font-size: 16px;
  line-height: 1.8;
}

.mcp-hero a {
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.mcp-toolbar {
  display: flex;
  align-items: stretch;
  flex-direction: column;
  gap: 12px;
  padding-bottom: 16px;
}

.mcp-category-tabs {
  min-width: 0;
  overflow-x: auto;
  padding-bottom: 2px;
}

.mcp-category-tabs :deep(.ant-segmented) {
  min-width: max-content;
  background: #eef3f9;
  padding: 4px;
}

.mcp-search {
  width: 100%;
}

.mcp-search :deep(.ant-input-wrapper) {
  width: 100%;
}

.mcp-summary {
  color: #647086;
  font-size: 14px;
  padding-bottom: 14px;
}

.mcp-summary strong {
  color: #1f5fbf;
  font-size: 20px;
}

.mcp-table-section {
  overflow: hidden;
  border: 1px solid #e5eaf2;
  border-radius: 8px;
  background: #ffffff;
  box-shadow: 0 14px 34px rgba(41, 86, 145, 0.08);
}

.mcp-table-wrap {
  overflow-x: auto;
}

.mcp-table {
  width: 100%;
  min-width: 980px;
  border-collapse: collapse;
}

.mcp-table th {
  color: #334155;
  font-weight: 700;
  background: #f2f6fb;
  text-align: left;
}

.mcp-table th,
.mcp-table td {
  padding: 14px 16px;
  border-bottom: 1px solid #edf1f7;
  line-height: 1.7;
  vertical-align: top;
}

.mcp-table tbody tr:hover {
  background: #f8fbff;
}

.mcp-table tbody tr:last-child td {
  border-bottom: 0;
}

.tool-name {
  color: #1f5fbf;
  font-weight: 700;
  white-space: nowrap;
}

.tool-link {
  color: #2468c9;
  word-break: break-all;
}

.tool-command {
  display: inline-block;
  max-width: 360px;
  padding: 3px 7px;
  border: 1px solid #d9e4f2;
  border-radius: 6px;
  background: #f6f9fd;
  color: #24415f;
  font-size: 13px;
  line-height: 1.6;
  white-space: normal;
  word-break: break-all;
}

.mcp-empty {
  min-height: 260px;
  display: grid;
  place-items: center;
}

@media (max-width: 760px) {
  .mcp-hero,
  .mcp-toolbar,
  .mcp-summary,
  .mcp-table-section {
    width: min(100% - 28px, 1180px);
  }

  .mcp-hero {
    align-items: flex-start;
    flex-direction: column;
    padding-top: 34px;
  }

  .mcp-hero h1 {
    font-size: 30px;
  }

  .mcp-toolbar {
    gap: 10px;
  }

  .mcp-search {
    width: 100%;
  }
}
</style>
