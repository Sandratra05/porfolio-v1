<template>
  <div class="about-content">
    <span class="section-label">{{ t('about.label') }}</span>
    <h2 class="section-title">{{ t('about.title') }}</h2>
    
    <p class="about-text">
      {{ t('about.description1') }}
    </p>
    
    <p class="about-text">
      {{ t('about.description2') }}
    </p>
    
    <!--<div class="about-highlight">
      <span class="icon">🚀</span>
      <span>{{ t('about.cta') }}</span>
    </div>-->
  </div>
</template>

<script setup>
import { useTranslation } from '../composables/useTranslation'

const { t } = useTranslation()
</script>

<style scoped>
</style>
