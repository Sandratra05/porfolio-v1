<script setup>
import { ref, computed } from 'vue'
import { useTranslation } from '../composables/useTranslation'

const { t } = useTranslation()

const langages = ref([
  { name: 'Java', level: 90, icon: 'devicon-java-plain colored' },
  { name: 'C#', level: 60, icon: 'devicon-csharp-plain colored' },
  { name: 'PHP', level: 80, icon: 'devicon-php-plain colored' },
  { name: 'JavaScript', level: 70, icon: 'devicon-javascript-plain colored' }
])

const frameworks = ref([
  { name: 'Spring Boot', level: 90, icon: 'devicon-spring-plain colored' },
  { name: 'ASP.NET', level: 60, icon: 'devicon-dot-net-plain colored' },
  { name: 'Flight PHP', level: 90, icon: 'devicon-php-plain colored' },
  { name: 'Laravel', level: 50, icon: 'devicon-laravel-plain colored' },
  { name: 'ReactJS', level: 50, icon: 'devicon-react-plain colored' },
  { name: 'VueJS', level: 60, icon: 'devicon-vuejs-plain colored' }
])

const basesDonnees = ref([
  { name: 'MySQL', level: 95, icon: 'devicon-mysql-plain colored' },
  { name: 'PostgreSQL', level: 90, icon: 'devicon-postgresql-plain colored' },
  { name: 'Oracle', level: 50, icon: 'devicon-oracle-plain colored' }
])

const outils = ref([
  { name: 'Git', level: 80, icon: 'devicon-git-plain colored' },
  { name: 'Docker', level: 70, icon: 'devicon-docker-plain colored' },
  { name: 'Linux', level: 90, icon: 'devicon-linux-plain colored' },
  { name: 'Postman', level: 70, icon: 'devicon-postman-plain colored' },
  { name: 'Figma', level: 60, icon: 'devicon-figma-plain colored' }
])
</script>

<template>
  <div class="tech-container">
    <span class="section-label">{{ t('techs.label') }}</span>
    <h1>{{ t('techs.title') }}</h1>
    <p>{{ t('techs.subtitle') }}</p>

    <!-- Langages -->
    <div class="tech-section">
      <h3>{{ t('techs.languages') }}</h3>
      <div class="tech-list">
        <div v-for="t in langages" :key="t.name" class="tech-item">
          <div class="tech-name">
            <span class="tech-label">
              <i :class="t.icon" class="tech-icon"></i>
              {{t.name}}
            </span>
            <small>{{t.level}}%</small>
          </div>
          <div class="progress" aria-hidden>
            <i :style="{width: t.level + '%'}" :class="{
              'level-master': t.level > 80,
              'level-intermediate': t.level > 50 && t.level <= 80,
              'level-basic': t.level <= 50
            }"></i>
          </div>
        </div>
      </div>
    </div>

    <!-- Frameworks -->
    <div class="tech-section">
      <h3>Frameworks</h3>
      <div class="tech-list">
        <div v-for="t in frameworks" :key="t.name" class="tech-item">
          <div class="tech-name">
            <span class="tech-label">
              <i :class="t.icon" class="tech-icon"></i>
              {{t.name}}
            </span>
            <small>{{t.level}}%</small>
          </div>
          <div class="progress" aria-hidden>
            <i :style="{width: t.level + '%'}" :class="{
              'level-master': t.level > 80,
              'level-intermediate': t.level > 50 && t.level <= 80,
              'level-basic': t.level <= 50
            }"></i>
          </div>
        </div>
      </div>
    </div>

    <!-- Bases de données -->
    <div class="tech-section">
      <h3>{{ t('techs.databases') }}</h3>
      <div class="tech-list">
        <div v-for="t in basesDonnees" :key="t.name" class="tech-item">
          <div class="tech-name">
            <span class="tech-label">
              <i :class="t.icon" class="tech-icon"></i>
              {{t.name}}
            </span>
            <small>{{t.level}}%</small>
          </div>
          <div class="progress" aria-hidden>
            <i :style="{width: t.level + '%'}" :class="{
              'level-master': t.level > 80,
              'level-intermediate': t.level > 50 && t.level <= 80,
              'level-basic': t.level <= 50
            }"></i>
          </div>
        </div>
      </div>
    </div>

    <!-- Outils -->
    <div class="tech-section">
      <h3>{{ t('techs.tools') }}</h3>
      <div class="tech-list">
        <div v-for="t in outils" :key="t.name" class="tech-item">
          <div class="tech-name">
            <span class="tech-label">
              <i :class="t.icon" class="tech-icon"></i>
              {{t.name}}
            </span>
            <small>{{t.level}}%</small>
          </div>
          <div class="progress" aria-hidden>
            <i :style="{width: t.level + '%'}" :class="{
              'level-master': t.level > 80,
              'level-intermediate': t.level > 50 && t.level <= 80,
              'level-basic': t.level <= 50
            }"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.section-label {
  display: flex;
  justify-content: center;
}

.tech-section h3 {
  text-align: left;
}

.tech-section h3::before {
  content: '';
  width: 4px;
  height: 20px;
  background: var(--gradient-primary);
  border-radius: 2px;
}
</style>
