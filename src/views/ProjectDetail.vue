<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useProjects } from '../composables/useProjects'
import { useTranslation } from '../composables/useTranslation'

const route = useRoute()
const router = useRouter()
const { getProjectById } = useProjects()
const { t } = useTranslation()

const project = computed(() => getProjectById(route.params.id))

// Gallery state
const selectedImageIndex = ref(0)
const isLightboxOpen = ref(false)
let carouselInterval = null

const selectImage = (index) => {
  selectedImageIndex.value = index
}

const openLightbox = (index) => {
  selectedImageIndex.value = index
  isLightboxOpen.value = true
  document.body.style.overflow = 'hidden'

  // Start autoplay carousel if more than 4 images
  if (project.value && project.value.images && project.value.images.length > 4) {
    startCarousel()
  }
}

const closeLightbox = () => {
  isLightboxOpen.value = false
  document.body.style.overflow = ''
  stopCarousel()
}

const nextImage = () => {
  if (project.value && project.value.images) {
    selectedImageIndex.value = (selectedImageIndex.value + 1) % project.value.images.length
  }
}

const prevImage = () => {
  if (project.value && project.value.images) {
    selectedImageIndex.value = (selectedImageIndex.value - 1 + project.value.images.length) % project.value.images.length
  }
}

const startCarousel = () => {
  if (carouselInterval) stopCarousel()
  carouselInterval = setInterval(() => {
    nextImage()
  }, 2000)
}

const stopCarousel = () => {
  if (carouselInterval) {
    clearInterval(carouselInterval)
    carouselInterval = null
  }
}

const handleKeydown = (e) => {
  if (!isLightboxOpen.value) return
  if (e.key === 'Escape') closeLightbox()
  if (e.key === 'ArrowRight') nextImage()
  if (e.key === 'ArrowLeft') prevImage()
}

const goBack = () => {
  // Navigate with a query param to indicate instant scroll
  router.push({ path: '/', hash: '#projects', query: { instant: 'true' } })
}

onMounted(() => {
  if (!project.value) {
    router.push('/')
  }
  window.addEventListener('keydown', handleKeydown)
  
  // Force scroll to top with nextTick to ensure DOM is ready
  nextTick(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
  })
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
  document.body.style.overflow = ''
  stopCarousel()
})
</script>

<template>
  <main class="project-detail" v-if="project">
    <!-- Decorative Background -->
    <div class="page-bg">
      <div class="bg-gradient"></div>
      <div class="bg-grid"></div>
    </div>

    <!-- Header Section -->
    <section class="header-section">
      <div class="container">
        <button class="back-btn" @click="goBack">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path fill-rule="evenodd" d="M7.72 12.53a.75.75 0 010-1.06l7.5-7.5a.75.75 0 111.06 1.06L9.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5z" clip-rule="evenodd" />
          </svg>
          <span>{{ t('projectDetail.back') }}</span>
        </button>

        <div class="header-content">
          <div class="header-badge">
            <span class="badge-dot"></span>
            <span>{{ project.role }}</span>
          </div>

          <h1 class="header-title">{{ project.title }}</h1>
          
          <p class="header-description">{{ project.description }}</p>

          <div class="header-meta">
            <div class="meta-item">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z" clip-rule="evenodd" />
              </svg>
              <span>{{ project.duration }}</span>
            </div>
            
          </div>

          <div class="header-actions">
            <a v-if="project.link && project.link !== '#'" :href="project.link" target="_blank" class="btn btn-primary">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path fill-rule="evenodd" d="M15.75 2.25H21a.75.75 0 01.75.75v5.25a.75.75 0 01-1.5 0V4.81l-8.97 8.97a.75.75 0 01-1.06-1.06l8.97-8.97h-3.44a.75.75 0 010-1.5zm-10.5 4.5a1.5 1.5 0 00-1.5 1.5v10.5a1.5 1.5 0 001.5 1.5h10.5a1.5 1.5 0 001.5-1.5V10.5a.75.75 0 011.5 0v8.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V8.25a3 3 0 013-3h8.25a.75.75 0 010 1.5H5.25z" clip-rule="evenodd" />
              </svg>
              {{ t('projectDetail.viewLive') }}
            </a>
            <a v-if="project.repo && project.repo !== '#'" :href="project.repo" target="_blank" class="btn btn-secondary">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path fill-rule="evenodd" d="M3 6a3 3 0 013-3h12a3 3 0 013 3v12a3 3 0 01-3 3H6a3 3 0 01-3-3V6zm14.25 6a.75.75 0 01-.22.53l-2.25 2.25a.75.75 0 11-1.06-1.06L15.44 12l-1.72-1.72a.75.75 0 111.06-1.06l2.25 2.25c.141.14.22.331.22.53zm-10.28-.53a.75.75 0 000 1.06l2.25 2.25a.75.75 0 101.06-1.06L8.56 12l1.72-1.72a.75.75 0 10-1.06-1.06l-2.25 2.25z" clip-rule="evenodd" />
              </svg>
              {{ t('projectDetail.viewCode') }}
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Gallery Section -->
    <section class="gallery-section">
      <div class="container">
        <div class="section-header">
          <div class="section-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path fill-rule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clip-rule="evenodd" />
            </svg>
          </div>
          <h2>{{ t('projectDetail.gallery') }}</h2>
        </div>

        <div class="gallery-grid">
          <div 
            v-for="(image, index) in project.images" 
            :key="index"
            class="gallery-item"
            :class="{ 'active': selectedImageIndex === index }"
            @click="openLightbox(index)"
          >
            <img :src="image" :alt="`${project.title} - Image ${index + 1}`" />
            <div class="gallery-item-overlay">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z" />
              </svg>
            </div>
            <span class="gallery-item-number">{{ index + 1 }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Lightbox -->
    <Teleport to="body">
      <div class="lightbox" v-if="isLightboxOpen" @click.self="closeLightbox">
        <button class="lightbox-close" @click="closeLightbox">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
            <path fill-rule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clip-rule="evenodd" />
          </svg>
        </button>
        
        <button class="lightbox-nav lightbox-prev" @click="prevImage" v-if="project.images.length > 1">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
            <path fill-rule="evenodd" d="M7.72 12.53a.75.75 0 010-1.06l7.5-7.5a.75.75 0 111.06 1.06L9.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5z" clip-rule="evenodd" />
          </svg>
        </button>
        
        <img 
          :src="project.images[selectedImageIndex]" 
          :alt="`${project.title} - Image ${selectedImageIndex + 1}`"
          class="lightbox-image"
        />
        
        <button class="lightbox-nav lightbox-next" @click="nextImage" v-if="project.images.length > 1">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
            <path fill-rule="evenodd" d="M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 011.06-1.06l7.5 7.5z" clip-rule="evenodd" />
          </svg>
        </button>
        
        <div class="lightbox-counter">
          {{ selectedImageIndex + 1 }} / {{ project.images.length }}
        </div>
      </div>
    </Teleport>

    <!-- Content -->
    <div class="project-content">
      <!-- Technologies -->
      <section class="content-section tech-section">
        <h2>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
            <path fill-rule="evenodd" d="M14.447 3.027a.75.75 0 01.527.92l-4.5 16.5a.75.75 0 01-1.448-.394l4.5-16.5a.75.75 0 01.921-.526zM16.72 6.22a.75.75 0 011.06 0l5.25 5.25a.75.75 0 010 1.06l-5.25 5.25a.75.75 0 11-1.06-1.06L21.44 12l-4.72-4.72a.75.75 0 010-1.06zm-9.44 0a.75.75 0 010 1.06L2.56 12l4.72 4.72a.75.75 0 11-1.06 1.06L.97 12.53a.75.75 0 010-1.06l5.25-5.25a.75.75 0 011.06 0z" clip-rule="evenodd" />
          </svg>
          {{ t('projectDetail.technologies') }}
        </h2>
        <div class="tech-grid">
          <span v-for="tech in project.technologies" :key="tech" class="tech-badge">
            {{ tech }}
          </span>
        </div>
      </section>

      <!-- Two columns layout -->
      <div class="two-columns">
        <!-- Objectives -->
        <section class="content-section">
          <h2>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
              <path fill-rule="evenodd" d="M5.166 2.621v.858c-1.035.148-2.059.33-3.071.543a.75.75 0 00-.584.859 6.753 6.753 0 006.138 5.6 6.73 6.73 0 002.743 1.346A6.707 6.707 0 019.279 15H8.54c-1.036 0-1.875.84-1.875 1.875V19.5h-.75a2.25 2.25 0 00-2.25 2.25c0 .414.336.75.75.75h15a.75.75 0 00.75-.75 2.25 2.25 0 00-2.25-2.25h-.75v-2.625c0-1.036-.84-1.875-1.875-1.875h-.739a6.706 6.706 0 00-1.112-3.173 6.73 6.73 0 002.743-1.347 6.753 6.753 0 006.139-5.6.75.75 0 00-.585-.858 47.077 47.077 0 00-3.07-.543V2.62a.75.75 0 00-.658-.744 49.22 49.22 0 00-6.093-.377c-2.063 0-4.096.128-6.093.377a.75.75 0 00-.657.744zm0 2.629c0 1.196.312 2.32.857 3.294A5.266 5.266 0 013.16 5.337a45.6 45.6 0 012.006-.343v.256zm13.5 0v-.256c.674.1 1.343.214 2.006.343a5.265 5.265 0 01-2.863 3.207 6.72 6.72 0 00.857-3.294z" clip-rule="evenodd" />
            </svg>
            {{ t('projectDetail.objectives') }}
          </h2>
          <ul class="feature-list">
            <li v-for="(objective, index) in project.objectives" :key="index">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clip-rule="evenodd" />
              </svg>
              <span>{{ objective }}</span>
            </li>
          </ul>
        </section>

        <!-- Features -->
        <section class="content-section">
          <h2>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
              <path fill-rule="evenodd" d="M7.502 6h7.128A3.375 3.375 0 0118 9.375v9.375a3 3 0 003-3V6.108c0-1.505-1.125-2.811-2.664-2.94a48.972 48.972 0 00-.673-.05A3 3 0 0015 1.5h-1.5a3 3 0 00-2.663 1.618c-.225.015-.45.032-.673.05C8.662 3.295 7.554 4.542 7.502 6zM13.5 3A1.5 1.5 0 0012 4.5h4.5A1.5 1.5 0 0015 3h-1.5z" clip-rule="evenodd" />
              <path fill-rule="evenodd" d="M3 9.375C3 8.339 3.84 7.5 4.875 7.5h9.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 013 20.625V9.375zm9.586 4.594a.75.75 0 00-1.172-.938l-2.476 3.096-.908-.907a.75.75 0 00-1.06 1.06l1.5 1.5a.75.75 0 001.116-.062l3-3.75z" clip-rule="evenodd" />
            </svg>
            {{ t('projectDetail.features') }}
          </h2>
          <ul class="feature-list">
            <li v-for="(feature, index) in project.features" :key="index">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                <path fill-rule="evenodd" d="M9 4.5a.75.75 0 01.721.544l.813 2.846a3.75 3.75 0 002.576 2.576l2.846.813a.75.75 0 010 1.442l-2.846.813a3.75 3.75 0 00-2.576 2.576l-.813 2.846a.75.75 0 01-1.442 0l-.813-2.846a3.75 3.75 0 00-2.576-2.576l-2.846-.813a.75.75 0 010-1.442l2.846-.813A3.75 3.75 0 007.466 7.89l.813-2.846A.75.75 0 019 4.5zM18 1.5a.75.75 0 01.728.568l.258 1.036c.236.94.97 1.674 1.91 1.91l1.036.258a.75.75 0 010 1.456l-1.036.258c-.94.236-1.674.97-1.91 1.91l-.258 1.036a.75.75 0 01-1.456 0l-.258-1.036a2.625 2.625 0 00-1.91-1.91l-1.036-.258a.75.75 0 010-1.456l1.036-.258a2.625 2.625 0 001.91-1.91l.258-1.036A.75.75 0 0118 1.5zM16.5 15a.75.75 0 01.712.513l.394 1.183c.15.447.5.799.948.948l1.183.395a.75.75 0 010 1.422l-1.183.395c-.447.15-.799.5-.948.948l-.395 1.183a.75.75 0 01-1.422 0l-.395-1.183a1.5 1.5 0 00-.948-.948l-1.183-.395a.75.75 0 010-1.422l1.183-.395c.447-.15.799-.5.948-.948l.395-1.183A.75.75 0 0116.5 15z" clip-rule="evenodd" />
              </svg>
              <span>{{ feature }}</span>
            </li>
          </ul>
        </section>
      </div>

      <!-- Challenges -->
      <section class="content-section challenges-section">
        <h2>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
            <path fill-rule="evenodd" d="M12.963 2.286a.75.75 0 00-1.071-.136 9.742 9.742 0 00-3.539 6.177A7.547 7.547 0 016.648 6.61a.75.75 0 00-1.152.082A9 9 0 1015.68 4.534a7.46 7.46 0 01-2.717-2.248zM15.75 14.25a3.75 3.75 0 11-7.313-1.172c.628.465 1.35.81 2.133 1a5.99 5.99 0 011.925-3.545 3.75 3.75 0 013.255 3.717z" clip-rule="evenodd" />
          </svg>
          {{ t('projectDetail.challenges') }}
        </h2>
        <div class="challenges-grid">
          <div v-for="(challenge, index) in project.challenges" :key="index" class="challenge-card">
            <div class="challenge-number">{{ index + 1 }}</div>
            <p>{{ challenge }}</p>
          </div>
        </div>
      </section>

      <!-- Actions -->
      <section class="content-section actions-section">
        <a v-if="project.link && project.link !== '#'" :href="project.link" target="_blank" class="action-btn primary">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
            <path fill-rule="evenodd" d="M15.75 2.25H21a.75.75 0 01.75.75v5.25a.75.75 0 01-1.5 0V4.81l-8.97 8.97a.75.75 0 01-1.06-1.06l8.97-8.97h-3.44a.75.75 0 010-1.5zm-10.5 4.5a1.5 1.5 0 00-1.5 1.5v10.5a1.5 1.5 0 001.5 1.5h10.5a1.5 1.5 0 001.5-1.5V10.5a.75.75 0 011.5 0v8.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V8.25a3 3 0 013-3h8.25a.75.75 0 010 1.5H5.25z" clip-rule="evenodd" />
          </svg>
          {{ t('projectDetail.viewLive') }}
        </a>
        <a v-if="project.repo && project.repo !== '#'" :href="project.repo" target="_blank" class="action-btn secondary">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
            <path fill-rule="evenodd" d="M3 6a3 3 0 013-3h12a3 3 0 013 3v12a3 3 0 01-3 3H6a3 3 0 01-3-3V6zm14.25 6a.75.75 0 01-.22.53l-2.25 2.25a.75.75 0 11-1.06-1.06L15.44 12l-1.72-1.72a.75.75 0 111.06-1.06l2.25 2.25c.141.14.22.331.22.53zm-10.28-.53a.75.75 0 000 1.06l2.25 2.25a.75.75 0 101.06-1.06L8.56 12l1.72-1.72a.75.75 0 10-1.06-1.06l-2.25 2.25z" clip-rule="evenodd" />
          </svg>
          {{ t('projectDetail.viewCode') }}
        </a>
        <button @click="goBack" class="action-btn outline">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
            <path fill-rule="evenodd" d="M7.72 12.53a.75.75 0 010-1.06l7.5-7.5a.75.75 0 111.06 1.06L9.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5z" clip-rule="evenodd" />
          </svg>
          {{ t('projectDetail.backToProjects') }}
        </button>
      </section>
    </div>
  </main>
</template>

<style scoped>
/* ============================================
   PAGE LAYOUT
   ============================================ */
.project-detail {
  min-height: 100vh;
  padding-top: var(--nav-height);
  background: var(--color-bg);
  position: relative;
}

.container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

/* Decorative Background */
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
  height: 600px;
  background: 
    radial-gradient(ellipse 80% 50% at 50% -20%, rgba(37, 99, 235, 0.15) 0%, transparent 50%),
    radial-gradient(ellipse 60% 40% at 80% 0%, rgba(139, 92, 246, 0.1) 0%, transparent 50%),
    radial-gradient(ellipse 50% 30% at 20% 10%, rgba(6, 182, 212, 0.08) 0%, transparent 50%);
}

[data-theme="dark"] .bg-gradient {
  background: 
    radial-gradient(ellipse 80% 50% at 50% -20%, rgba(37, 99, 235, 0.2) 0%, transparent 50%),
    radial-gradient(ellipse 60% 40% at 80% 0%, rgba(139, 92, 246, 0.15) 0%, transparent 50%),
    radial-gradient(ellipse 50% 30% at 20% 10%, rgba(6, 182, 212, 0.1) 0%, transparent 50%);
}

.bg-grid {
  position: absolute;
  inset: 0;
  background-image: 
    linear-gradient(rgba(37, 99, 235, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(37, 99, 235, 0.03) 1px, transparent 1px);
  background-size: 60px 60px;
  mask-image: linear-gradient(to bottom, black 0%, transparent 50%);
}

/* ============================================
   HEADER SECTION
   ============================================ */
.header-section {
  position: relative;
  z-index: 1;
  padding: 3rem 0 0rem;
}

.back-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.625rem 1.25rem;
  background: var(--color-surface);
  border: 1px solid var(--border-color);
  border-radius: 100px;
  color: var(--text-secondary);
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-bottom: 2rem;
}

.back-btn svg {
  width: 18px;
  height: 18px;
}

.back-btn:hover {
  background: var(--color-primary);
  border-color: var(--color-primary);
  color: white;
  transform: translateX(-4px);
}

.header-content {
  max-width: 800px;
}

.header-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.625rem;
  padding: 0.5rem 1rem;
  background: rgba(37, 99, 235, 0.1);
  border: 1px solid rgba(37, 99, 235, 0.2);
  border-radius: 100px;
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--color-primary);
  margin-bottom: 1.25rem;
}

.badge-dot {
  width: 8px;
  height: 8px;
  background: var(--color-accent-emerald);
  border-radius: 50%;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.6; transform: scale(1.2); }
}

.header-title {
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 800;
  color: var(--text-primary);
  line-height: 1.15;
  margin-bottom: 1.25rem;
  letter-spacing: -0.02em;
}

.header-description {
  font-size: 1.125rem;
  color: var(--text-secondary);
  line-height: 1.75;
  margin-bottom: 1.5rem;
}

.header-meta {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 1.25rem;
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid var(--border-color);
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-muted);
  font-size: 0.9rem;
}

.meta-item svg {
  width: 18px;
  height: 18px;
  color: var(--color-primary);
}

.meta-techs {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.meta-tech {
  padding: 0.375rem 0.875rem;
  background: var(--color-bg-secondary);
  border-radius: 100px;
  font-size: 0.8rem;
  font-weight: 500;
  color: var(--text-secondary);
}

.meta-tech.more {
  background: var(--color-primary);
  color: white;
}

.header-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

/* ============================================
   BUTTONS
   ============================================ */
.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.875rem 1.5rem;
  font-size: 0.95rem;
  font-weight: 600;
  border-radius: 12px;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
}

.btn svg {
  width: 18px;
  height: 18px;
}

.btn-primary {
  background: var(--gradient-primary);
  color: white;
  box-shadow: 0 4px 14px rgba(37, 99, 235, 0.3);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(37, 99, 235, 0.4);
}

.btn-secondary {
  background: var(--color-surface);
  border: 1px solid var(--border-color);
  color: var(--text-primary);
}

.btn-secondary:hover {
  border-color: var(--color-primary);
  color: var(--color-primary);
  background: rgba(37, 99, 235, 0.05);
}

/* ============================================
   SECTION HEADERS
   ============================================ */
.section-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
}

.section-header h2 {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-primary);
}

.section-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  background: rgba(37, 99, 235, 0.1);
  border-radius: 12px;
  color: var(--color-primary);
}

.section-icon svg {
  width: 24px;
  height: 24px;
}

.section-icon.violet {
  background: rgba(139, 92, 246, 0.1);
  color: var(--color-accent-violet);
}

.section-icon.emerald {
  background: rgba(16, 185, 129, 0.1);
  color: var(--color-accent-emerald);
}

.section-icon.cyan {
  background: rgba(6, 182, 212, 0.1);
  color: var(--color-accent-cyan);
}

.section-icon.amber {
  background: rgba(245, 158, 11, 0.1);
  color: var(--color-accent-amber);
}

/* ============================================
   GALLERY SECTION
   ============================================ */
.gallery-section {
  position: relative;
  z-index: 1;
  padding: 3rem 0;
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

@media (min-width: 640px) {
  .gallery-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

.gallery-item {
  position: relative;
  aspect-ratio: 4/3;
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;
  background: var(--color-bg-secondary);
  border: 1px solid var(--border-color);
  transition: all 0.3s ease;
}

.gallery-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.gallery-item:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
  border-color: var(--color-primary);
}

.gallery-item:hover img {
  transform: scale(1.05);
}

.gallery-item-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.7) 0%, transparent 50%);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.gallery-item-overlay svg {
  width: 32px;
  height: 32px;
  color: white;
}

.gallery-item:hover .gallery-item-overlay {
  opacity: 1;
}

.gallery-item-number {
  position: absolute;
  bottom: 0.75rem;
  left: 0.75rem;
  width: 28px;
  height: 28px;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  border-radius: 8px;
  color: white;
  font-size: 0.8rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* ============================================
   LIGHTBOX
   ============================================ */
.lightbox {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.95);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}

.lightbox-close {
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  width: 48px;
  height: 48px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(8px);
  border: none;
  border-radius: 50%;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  z-index: 10;
}

.lightbox-close:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: scale(1.1);
}

.lightbox-image {
  max-width: 90%;
  max-height: 85vh;
  object-fit: contain;
  border-radius: 12px;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5);
}

.lightbox-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 56px;
  height: 56px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(8px);
  border: none;
  border-radius: 50%;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.lightbox-nav:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-50%) scale(1.1);
}

.lightbox-prev {
  left: 1.5rem;
}

.lightbox-next {
  right: 1.5rem;
}

.lightbox-counter {
  position: absolute;
  bottom: 1.5rem;
  left: 50%;
  transform: translateX(-50%);
  padding: 0.625rem 1.25rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(8px);
  border-radius: 100px;
  color: white;
  font-size: 0.9rem;
  font-weight: 500;
}

/* ============================================
   CONTENT SECTIONS
   ============================================ */
.project-content {
  position: relative;
  z-index: 1;
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 1.5rem 5rem;
}

.content-section {
  margin-bottom: 3rem;
}

.content-section h2 {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 1.5rem;
}

.content-section h2 svg {
  width: 24px;
  height: 24px;
  color: var(--color-primary);
}

/* Tech Section */
.tech-section h2 svg {
  color: var(--color-accent-violet);
}

.tech-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.tech-badge {
  display: inline-flex;
  align-items: center;
  padding: 0.75rem 1.5rem;
  background: var(--color-surface);
  border: 1px solid var(--border-color);
  border-radius: 100px;
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--text-primary);
  transition: all 0.2s ease;
}

.tech-badge:hover {
  border-color: var(--color-accent-violet);
  background: rgba(139, 92, 246, 0.1);
  transform: translateY(-2px);
}

/* Two columns */
.two-columns {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
}

@media (max-width: 768px) {
  .two-columns {
    grid-template-columns: 1fr;
  }
}

.two-columns .content-section {
  background: var(--color-surface);
  border: 1px solid var(--border-color);
  border-radius: 20px;
  padding: 1.75rem;
  margin-bottom: 0;
  transition: all 0.3s ease;
}

.two-columns .content-section:hover {
  border-color: transparent;
  box-shadow: var(--shadow-lg), 0 0 0 1px var(--border-color);
}

.two-columns .content-section h2 {
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--border-color);
  margin-bottom: 1.25rem;
}

/* Feature List */
.feature-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.875rem;
}

.feature-list li {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
}

.feature-list li svg {
  color: var(--color-accent-emerald);
  flex-shrink: 0;
  margin-top: 2px;
}

.feature-list li span {
  color: var(--text-secondary);
  line-height: 1.6;
  font-size: 0.95rem;
}

/* Challenges */
.challenges-section h2 svg {
  color: var(--color-accent-amber);
}

.challenges-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

@media (min-width: 640px) {
  .challenges-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

.challenge-card {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.5rem;
  background: var(--color-surface);
  border: 1px solid var(--border-color);
  border-radius: 16px;
  transition: all 0.2s ease;
}

.challenge-card:hover {
  border-color: var(--color-accent-amber);
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.challenge-number {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 36px;
  height: 36px;
  background: var(--gradient-primary);
  border-radius: 10px;
  color: white;
  font-weight: 700;
  font-size: 0.9rem;
}

.challenge-card p {
  color: var(--text-secondary);
  line-height: 1.6;
  margin: 0;
  font-size: 0.95rem;
}

/* Actions */
.actions-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 1.5rem;
  padding: 3rem;
  background: var(--color-surface);
  border: 1px solid var(--border-color);
  border-radius: 24px;
  margin-top: 2rem;
}

.actions-section::before {
  content: none;
}

.action-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.875rem 1.5rem;
  border-radius: 12px;
  font-size: 0.95rem;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
}

.action-btn.primary {
  background: var(--gradient-primary);
  color: white;
  box-shadow: 0 4px 14px rgba(37, 99, 235, 0.3);
}

.action-btn.primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(37, 99, 235, 0.4);
}

.action-btn.secondary {
  background: var(--color-surface);
  border: 1px solid var(--border-color);
  color: var(--text-primary);
}

.action-btn.secondary:hover {
  border-color: var(--color-primary);
  color: var(--color-primary);
}

.action-btn.outline {
  background: transparent;
  border: 1px solid var(--border-color);
  color: var(--text-secondary);
}

.action-btn.outline:hover {
  border-color: var(--text-primary);
  color: var(--text-primary);
}

/* ============================================
   RESPONSIVE
   ============================================ */
@media (max-width: 640px) {
  .header-section {
    padding: 2rem 0 3rem;
  }

  .header-actions {
    flex-direction: column;
  }

  .btn {
    width: 100%;
    justify-content: center;
  }

  .gallery-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .actions-section {
    padding: 2rem 1.5rem;
  }

  .actions-section .action-btn {
    width: 100%;
    justify-content: center;
  }

  .lightbox-nav {
    width: 44px;
    height: 44px;
  }

  .lightbox-prev {
    left: 0.75rem;
  }

  .lightbox-next {
    right: 0.75rem;
  }

  .project-content {
    padding: 0 1.5rem 4rem;
  }
}
</style>
