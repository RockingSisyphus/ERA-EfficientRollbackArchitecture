<template>
  <section class="about-era-card" role="complementary" aria-label="关于 ERA">
    <h4 class="card-title">关于 ERA</h4>
    <div class="info-list">
      <ul>
        <li>
          <strong>ERA 项目地址:</strong>
          <a
            href="https://github.com/RockingSisyphus/ERA-EfficientRollbackArchitecture/tree/master"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </li>
        <li>
          <strong>ERA 介绍帖:</strong>
          <a
            href="https://discord.com/channels/1134557553011998840/1423319849400270928"
            target="_blank"
            rel="noopener noreferrer"
          >
            Discord
          </a>
        </li>
        <li><strong>作者:</strong> 世界的山田</li>
        <li><strong>ERA 框架交流群:</strong> 1006127516</li>
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts">
// This component is purely informational.
</script>

<style scoped>
.about-era-card {
  width: 100%;
  padding: 12px;
  background: var(--actions-bg-glass);
  border: 1px solid var(--border-strong);
  border-radius: 16px;
  backdrop-filter: blur(10px);
  box-shadow: var(--actions-shadow-card), var(--shadow-inset);
  display: flex;
  flex-direction: column;
  gap: 10px;
  transition:
    background 0.3s ease,
    border-color 0.3s ease;
}

.card-title {
  margin: 0 0 4px;
  font-size: 14px;
  font-weight: 800;
  letter-spacing: 0.3px;
  color: var(--text-title);
  transition: color 0.3s ease;
}

.info-list {
  font-size: 13px;
  color: var(--text-normal);
}

.info-list ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.info-list li {
  display: flex;
  justify-content: space-between;
}

.info-list a {
  color: var(--text-subtitle);
  text-decoration: none;
  font-weight: 600;
  transition: color 0.3s ease;
}

.info-list a:hover {
  color: var(--text-title);
  text-decoration: underline;
}
</style>
