<script setup>
import { computed } from 'vue'
import { useTranslation } from '../composables/useTranslation'

const { t } = useTranslation()

const langages = [
  { name: 'Java' , icon: 'devicon-java-plain colored' },
  { name: 'PHP' , icon: 'devicon-php-plain colored' },
  { name: 'JavaScript' , icon: 'devicon-javascript-plain colored' }
]

const frameworks = [
  { name: 'Spring Boot' , icon: 'devicon-spring-plain colored' },
  { name: 'Flight PHP' , icon: 'devicon-php-plain colored' },
  { name: 'VueJS' , icon: 'devicon-vuejs-plain colored' },
]

const basesDonnees = [
  { name: 'MySQL' , icon: 'devicon-mysql-plain colored' },
  { name: 'PostgreSQL' , icon: 'devicon-postgresql-plain colored' },
  { name: 'SQLite' , icon: 'devicon-sqlite-plain colored' },
]

const outils = [
  { name: 'Git' , icon: 'devicon-git-plain colored' },
  { name: 'GitHub' , icon: 'devicon-github-plain colored' },
  { name: 'Docker' , icon: 'devicon-docker-plain colored' },
  { name: 'Linux' , icon: 'devicon-linux-plain colored' },
  { name: 'Postman' , icon: 'devicon-postman-plain colored' },
  //{ name: 'Figma' , icon: 'devicon-figma-plain colored' }
]

const methodesArchitecture = [
  { name: 'API REST' },
  { name: 'POO' },
  { name: 'MVC' },
]

const techSections = computed(() => [
  { title: t('techs.languages'), items: langages },
  { title: 'Frameworks', items: frameworks },
  { title: t('techs.databases'), items: basesDonnees },
  { title: t('techs.methodsArchitecture'), items: methodesArchitecture },
  { title: t('techs.tools'), items: outils },
])
</script>

<template>
  <div class="tech-container">
    <span class="section-label">{{ t('techs.label') }}</span>
    <h1>{{ t('techs.title') }}</h1>
    <p>{{ t('techs.subtitle') }}</p>

    <div class="tech-grid">
      <div v-for="section in techSections" :key="section.title" class="tech-section">
        <h3>{{ section.title }}</h3>
        <ul class="tech-list">
          <li v-for="tech in section.items" :key="tech.name" class="tech-pill">
            <i v-if="tech.icon" :class="tech.icon" class="tech-icon"></i>
            <span v-else class="tech-dot" aria-hidden="true"></span>
            <span>{{ tech.name }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.tech-container {
  max-width: 1160px;
  margin: 0 auto;
  /*padding: 2rem 1.5rem;*/
}

.section-label {
  display: flex;
  width: fit-content;
  margin: 0 auto 0.75rem;
}

.tech-container h1,
.tech-container p {
  text-align: center;
}

.tech-container h1 {
  margin-bottom: 0.75rem;
}

.tech-container p {
  max-width: 42rem;
  margin: 0 auto 2.5rem;
  color: var(--text-muted);
}

.tech-grid {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  align-items: stretch;
}

.tech-section {
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 260px;
  padding: 1.35rem;
  border: 1px solid var(--border-color);
  border-radius: var(--radius-xl);
  /*background: linear-gradient(180deg, var(--color-surface-elevated), var(--color-surface));*/
  box-shadow: var(--shadow-sm);
}

.tech-section h3 {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  margin-bottom: 1rem;
  color: var(--text-primary);
  font-size: 1rem;
}

.tech-section h3::before {
  content: '';
  width: 0.75rem;
  height: 0.75rem;
  background: var(--gradient-primary);
  border-radius: 999px;
  flex: 0 0 auto;
  box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.08);
}

.tech-list {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.65rem;
  align-content: start;
  flex: 1;
}

.tech-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  width: 100%;
  min-height: 46px;
  padding: 0.75rem 0.95rem;
  border-radius: 20px;
  background: var(--color-bg-secondary);
  border: 1px solid var(--border-color);
  color: var(--text-primary);
  box-shadow: var(--shadow-sm);
  transition: transform var(--transition-fast), box-shadow var(--transition-fast), border-color var(--transition-fast);
}

.tech-pill:hover {
  transform: translateY(-2px);
  border-color: var(--color-primary);
  box-shadow: var(--shadow-md);
}

.tech-icon {
  font-size: 1.15rem;
  line-height: 1;
}

.tech-dot {
  width: 0.7rem;
  height: 0.7rem;
  border-radius: 999px;
  background: var(--gradient-primary);
  box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.08);
  flex: 0 0 auto;
}

@media (max-width: 1024px) {
  .tech-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 640px) {
  .tech-grid {
    grid-template-columns: 1fr;
  }

  .tech-list {
    grid-template-columns: 1fr;
  }
}
</style>
