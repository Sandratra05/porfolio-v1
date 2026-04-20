<template>
  <div class="hero-container">
    <div class="hero-inner">
      <div class="hero-badge">
        <span class="dot"></span>
        {{ t('hero.available') }}
      </div>
      
      <h1 class="hero-title">
        <span class="highlight">Sandratra</span><br>
        Rabenanahary
      </h1>
      
      <p class="hero-sub">
        {{ t('hero.description') }}
      </p>
      
      <div class="hero-actions">
        <a class="cta primary" :href="cv" download target="_blank" rel="noopener noreferrer">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
            <path d="M5 20h14v-2H5v2zM12 3v10.17l3.59-3.58L17 11l-5 5-5-5 1.41-1.41L11 13.17V3h1z"/>
          </svg>
          {{ t('hero.downloadCV') }}
        </a>
        <a
          class="social-icon social-github"
          href="https://github.com/Sandratra05"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          title="GitHub"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
            <path d="M12 .5C5.73.5.75 5.48.75 11.75c0 5.02 3.25 9.28 7.76 10.79.57.1.78-.25.78-.55v-2.11c-3.16.69-3.83-1.35-3.83-1.35-.52-1.32-1.28-1.67-1.28-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.75 1.18 1.75 1.18 1.02 1.76 2.69 1.25 3.35.95.1-.74.4-1.25.72-1.53-2.52-.29-5.17-1.26-5.17-5.6 0-1.24.44-2.25 1.17-3.04-.12-.29-.51-1.48.11-3.08 0 0 .96-.31 3.14 1.16a10.9 10.9 0 0 1 5.72 0c2.18-1.47 3.14-1.16 3.14-1.16.62 1.6.23 2.79.11 3.08.73.79 1.17 1.8 1.17 3.04 0 4.35-2.66 5.31-5.2 5.59.41.35.78 1.03.78 2.09V22c0 .3.2.66.79.55 4.5-1.52 7.74-5.77 7.74-10.79C23.25 5.48 18.27.5 12 .5Z"/>
          </svg>
          <span class="social-text">Sandratra05</span>
        </a>
        <a
          class="social-icon social-linkedin"
          href="https://linkedin.com/in/sandratra-raben"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          title="LinkedIn"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
            <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.95v5.66H9.35V9h3.41v1.56h.05c.48-.9 1.63-1.85 3.35-1.85 3.58 0 4.24 2.35 4.24 5.41v6.33ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.55V9h3.57v11.45ZM22.22 0H1.77C.8 0 0 .77 0 1.73v20.54C0 23.23.8 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z"/>
          </svg>
          <span class="social-text">Sandratra Rabenanahary</span>
        </a>
      </div>
    </div>
    
    <div class="hero-visual">
      <div class="photo-frame">
        <img src="../assets/images/sandratra.jpeg" alt="Sandratra Hasinarivelo" />
      </div>
      
      <!-- Decorative elements -->
      <div class="deco deco-1"></div>
      <div class="deco deco-2"></div>
      <div class="deco deco-3"></div>
    </div>
  </div>
</template>

<script setup>
import { useTranslation } from '../composables/useTranslation'
import cv from "../assets/cv/CV-Sandratra.pdf"

const { t } = useTranslation()
</script>

<style scoped>
.hero-container {
  display: flex;
  align-items: center;
  gap: 4rem;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 100%;
  max-width: var(--container-max);
}

.hero-inner {
  flex: 1;
  min-width: 320px;
}

.hero-visual {
  position: relative;
  flex-shrink: 0;
}

.social-actions {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.35rem;
  border-radius: var(--radius-lg);
  background: var(--color-bg-secondary);
  border: 1px solid var(--border-color-light);
}

.social-icon {
  width: 50px;
  height: 50px;
  border-radius: var(--radius-md);
  border: 1px solid var(--border-color);
  background: var(--color-surface-elevated);
  color: var(--text-secondary);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  box-shadow: var(--shadow-sm);
  transition: transform var(--transition-fast), box-shadow var(--transition-fast), border-color var(--transition-fast), color var(--transition-fast), background var(--transition-fast);
}

.social-text {
  display: none;
}

.social-icon:hover {
  transform: translateY(-2px);
  border-color: var(--color-primary);
  box-shadow: var(--shadow-md), var(--shadow-glow);
  color: var(--text-primary);
}

.social-icon:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

.social-github:hover {
  background: linear-gradient(135deg, var(--color-surface-elevated), var(--color-bg-tertiary));
}

.social-linkedin:hover {
  background: linear-gradient(135deg, var(--color-surface-elevated), var(--color-bg-secondary));
}

[data-theme="dark"] .social-actions {
  background: var(--color-surface);
}

[data-theme="dark"] .social-icon {
  border-color: var(--border-color-light);
}

.photo-frame {
  width: 380px;
  height: 380px;
  border-radius: var(--radius-xl);
  overflow: hidden;
  border: 4px solid var(--color-surface);
  box-shadow: var(--shadow-xl), var(--shadow-glow);
  position: relative;
  z-index: 2;
}

.photo-frame img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  display: block;
}

/* Decorative elements */
.deco {
  position: absolute;
  border-radius: 50%;
  z-index: 1;
}

.deco-1 {
  width: 120px;
  height: 120px;
  background: linear-gradient(135deg, var(--color-primary), var(--color-accent-violet));
  top: -30px;
  right: -30px;
  opacity: 0.6;
  animation: float 6s ease-in-out infinite;
}

.deco-2 {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, var(--color-accent-cyan), var(--color-accent-emerald));
  bottom: 40px;
  left: -40px;
  opacity: 0.5;
  animation: float 8s ease-in-out infinite reverse;
}

.deco-3 {
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, var(--color-accent-amber), var(--color-accent-rose));
  bottom: -20px;
  right: 60px;
  opacity: 0.4;
  animation: float 5s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-15px) rotate(5deg); }
}

/* Responsive */
@media (max-width: 900px) {
  .hero-container {
    flex-direction: column-reverse;
    text-align: center;
    gap: 3rem;
  }

  .hero-inner {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .hero-sub {
    text-align: center;
  }

  .photo-frame {
    width: 280px;
    height: 280px;
  }

  .deco-1 {
    width: 80px;
    height: 80px;
    top: -20px;
    right: -20px;
  }

  .deco-2 {
    width: 60px;
    height: 60px;
    left: -20px;
  }

  .deco-3 {
    width: 40px;
    height: 40px;
  }

  .social-icon {
    display: flex;
    width: 100%;
    height: auto;
    padding: 0.75rem 1.5rem;
    gap: 0.75rem;
  }

  .social-text {
    display: inline;
  }
}

@media (max-width: 480px) {
  .photo-frame {
    width: 220px;
    height: 220px;
  }
}
</style>
