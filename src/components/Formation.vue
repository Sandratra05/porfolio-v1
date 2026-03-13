<template>
  <div class="education">
    <span class="section-label">{{ t('education.label') }}</span>
    <h1>{{ t('education.title') }}</h1>
    <p>{{ t('education.subtitle') }}</p>

    <div class="education-timeline">

        <article class="education-item">
        <div class="timeline-dot" aria-hidden="true"></div>
        <div class="education-card">
            <div class="education-top">
            <div class="education-period">{{ t('education.license.period') }}</div>
            <span class="education-status current">{{ t('education.status.current') }}</span>
            </div>
            <h3>{{ t('education.license.degree') }}</h3>
            <p>{{ t('education.license.details') }}</p>
            <div class="education-school">{{ t('education.license.school') }}</div>
        </div>
        </article>
      <article class="education-item">
        <div class="timeline-dot" aria-hidden="true"></div>
        <div class="education-card">
          <div class="education-top">
            <div class="education-period">{{ t('education.baccalaureate.period') }}</div>
            <span class="education-status">{{ t('education.status.completed') }}</span>
          </div>
          <h3>{{ t('education.baccalaureate.degree') }}</h3>
          <p>{{ t('education.baccalaureate.details') }}</p>
          <div class="education-school">{{ t('education.baccalaureate.school') }}</div>
        </div>
      </article>
    </div>
  </div>
</template>

<script setup>
import { useTranslation } from '../composables/useTranslation'

const { t } = useTranslation()
</script>

<style scoped>
.education {
  width: 100%;
  max-width: var(--container-max);
}

.section-label {
  display: flex;
  justify-content: center;
}

.education h1 {
  text-align: center;
  font-size: clamp(1.75rem, 3vw, 2.5rem);
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
}

.education > p {
  text-align: center;
  color: var(--text-muted);
  margin-bottom: 3rem;
}

.education-timeline {
  position: relative;
  max-width: 860px;
  margin: 0 auto;
  display: grid;
  gap: 1.5rem;
}

.education-timeline::before {
  content: '';
  position: absolute;
  top: 0.5rem;
  bottom: 0.5rem;
  left: 0.75rem;
  width: 2px;
  background: linear-gradient(
    to bottom,
    rgba(37, 99, 235, 0.25),
    rgba(139, 92, 246, 0.2)
  );
  border-radius: 999px;
}

.education-item {
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: start;
  gap: 1rem;
}

.timeline-dot {
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 999px;
  margin-top: 1rem;
  background: var(--color-surface);
  border: 2px solid var(--color-primary);
  box-shadow: 0 0 0 5px rgba(37, 99, 235, 0.12);
  z-index: 1;
}

.education-card {
  background: var(--color-surface);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: 1.25rem 1.35rem;
  box-shadow: var(--shadow-sm);
  transition: all var(--transition-fast);
}

.education-item:hover .education-card {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
  border-color: var(--color-primary);
}

.education-top {
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  gap: 0.5rem;
  margin-bottom: 0.9rem;
}

.education-period {
  display: inline-flex;
  align-items: center;
  padding: 0.35rem 0.75rem;
  border-radius: 999px;
  background: rgba(37, 99, 235, 0.1);
  color: var(--color-primary);
  font-size: 0.8rem;
  font-weight: 700;
}

.education-status {
  display: inline-flex;
  align-items: center;
  padding: 0.3rem 0.65rem;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 700;
  background: rgba(16, 185, 129, 0.12);
  color: var(--color-accent-emerald);
}

.education-status.current {
  background: rgba(6, 182, 212, 0.12);
  color: var(--color-accent-cyan);
}

.education-card h3 {
  color: var(--text-primary);
  font-size: 1.05rem;
  margin-bottom: 0.5rem;
}

.education-card p {
  color: var(--text-secondary);
  margin-bottom: 0.75rem;
  line-height: 1.6;
}

.education-school {
  color: var(--text-muted);
  font-size: 0.95rem;
  font-weight: 600;
}

@media (max-width: 640px) {
  .education > p {
    margin-bottom: 2rem;
  }

  .education-item {
    gap: 0.75rem;
  }

  .timeline-dot {
    width: 1.2rem;
    height: 1.2rem;
    margin-top: 1.1rem;
    box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.1);
  }

  .education-card {
    padding: 1rem;
  }

  .education-top {
    flex-wrap: wrap;
  }
}
</style>