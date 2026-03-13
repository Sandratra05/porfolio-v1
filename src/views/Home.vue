<script setup>
import Hero from '../components/Hero.vue'
import About from '../components/About.vue'
import Formation from '../components/Formation.vue'
import Techs from '../components/Techs.vue'
import Projects from '../components/Projects.vue'
</script>

<template>
  <main class="home-page">
    <!-- Decorative Background -->
    <div class="page-bg">
      <div class="bg-gradient"></div>
      <div class="bg-grid"></div>
    </div>

    <section id="home" class="section section-hero">
      <Hero />
    </section>

    <section id="about" class="section section-about">
      <About />
    </section>

    <section id="education" class="section section-education">
      <Formation />
    </section>

    <section id="tech" class="section section-techs">
      <Techs />
    </section>

    <section id="projects" class="section section-projects">
      <Projects />
    </section>
  </main>
</template>

<style scoped>
.home-page {
  position: relative;
}

.page-bg {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  overflow: hidden;
}

.bg-gradient {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 100%;
  background: 
    radial-gradient(ellipse 90% 60% at 50% -10%, rgba(37, 99, 235, 0.25) 0%, transparent 50%),
    radial-gradient(ellipse 70% 50% at 85% 5%, rgba(139, 92, 246, 0.18) 0%, transparent 50%),
    radial-gradient(ellipse 60% 40% at 15% 15%, rgba(6, 182, 212, 0.15) 0%, transparent 50%),
    radial-gradient(ellipse 70% 50% at 75% 55%, rgba(16, 185, 129, 0.1) 0%, transparent 50%),
    radial-gradient(ellipse 60% 40% at 10% 75%, rgba(139, 92, 246, 0.08) 0%, transparent 50%),
    radial-gradient(ellipse 50% 30% at 90% 85%, rgba(37, 99, 235, 0.1) 0%, transparent 50%);
}

[data-theme="dark"] .bg-gradient {
  background: 
    radial-gradient(ellipse 90% 60% at 50% -10%, rgba(37, 99, 235, 0.3) 0%, transparent 50%),
    radial-gradient(ellipse 70% 50% at 85% 5%, rgba(139, 92, 246, 0.2) 0%, transparent 50%),
    radial-gradient(ellipse 60% 40% at 15% 15%, rgba(6, 182, 212, 0.15) 0%, transparent 50%),
    radial-gradient(ellipse 70% 50% at 75% 55%, rgba(16, 185, 129, 0.12) 0%, transparent 50%),
    radial-gradient(ellipse 60% 40% at 10% 75%, rgba(139, 92, 246, 0.1) 0%, transparent 50%),
    radial-gradient(ellipse 50% 30% at 90% 85%, rgba(37, 99, 235, 0.12) 0%, transparent 50%);
}

.bg-grid {
  position: absolute;
  inset: 0;
  background-image: 
    linear-gradient(rgba(37, 99, 235, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(37, 99, 235, 0.05) 1px, transparent 1px);
  background-size: 60px 60px;
  mask-image: linear-gradient(to bottom, black 0%, transparent 60%);
}

.section {
  position: relative;
  z-index: 1;
}
</style>
