<script setup>
import { ref, computed } from 'vue'
import { useTranslation } from '../composables/useTranslation'

const { t } = useTranslation()

const langages = ref([
  { name: 'Java' , icon: 'devicon-java-plain colored' },
  { name: 'PHP' , icon: 'devicon-php-plain colored' },
  { name: 'JavaScript' , icon: 'devicon-javascript-plain colored' }
])

const frameworks = ref([
  { name: 'Spring Boot' , icon: 'devicon-spring-plain colored' },
  { name: 'Flight PHP' , icon: 'devicon-php-plain colored' },
  { name: 'VueJS' , icon: 'devicon-vuejs-plain colored' },
])

const basesDonnees = ref([
  { name: 'MySQL' , icon: 'devicon-mysql-plain colored' },
  { name: 'PostgreSQL' , icon: 'devicon-postgresql-plain colored' },
  { name: 'SQLite' , icon: 'devicon-sqlite-plain colored' },
])

const outils = ref([
  { name: 'Git' , icon: 'devicon-git-plain colored' },
  { name: 'GitHub' , icon: 'devicon-github-plain colored' },
  { name: 'Docker' , icon: 'devicon-docker-plain colored' },
  { name: 'Linux' , icon: 'devicon-linux-plain colored' },
  { name: 'Postman' , icon: 'devicon-postman-plain colored' },
  //{ name: 'Figma' , icon: 'devicon-figma-plain colored' }
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
            <!--<small>{{t.level}}%</small>-->
          </div>
          <!--<div class="progress" aria-hidden>
            <i :style="{width: t.level + '%'}" :class="{
              'level-master': t.level > 80,
              'level-intermediate': t.level > 50 && t.level <= 80,
              'level-basic': t.level <= 50
            }"></i>
          </div>-->
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
            <!--<small>{{t.level}}%</small>-->
          </div>
          <!--<div class="progress" aria-hidden>
            <i :style="{width: t.level + '%'}" :class="{
              'level-master': t.level > 80,
              'level-intermediate': t.level > 50 && t.level <= 80,
              'level-basic': t.level <= 50
            }"></i>
          </div>-->
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
            <!--<small>{{t.level}}%</small>-->
          </div>
          <!--<div class="progress" aria-hidden>
            <i :style="{width: t.level + '%'}" :class="{
              'level-master': t.level > 80,
              'level-intermediate': t.level > 50 && t.level <= 80,
              'level-basic': t.level <= 50
            }"></i>
          </div>-->
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
            <!--<small>{{t.level}}%</small>-->
          </div>
          <!--<div class="progress" aria-hidden>
            <i :style="{width: t.level + '%'}" :class="{
              'level-master': t.level > 80,
              'level-intermediate': t.level > 50 && t.level <= 80,
              'level-basic': t.level <= 50
            }"></i>
          </div>-->
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
