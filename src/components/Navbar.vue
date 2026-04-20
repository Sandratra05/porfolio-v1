<template>
  <nav class="nav-root" role="navigation">
    <div class="nav-inner">
      <a class="brand" href="#home" @click.prevent="goToSection('#home')">
        <span class="brand-icon">SR</span>
        <span>Sandratra Raben</span>
      </a>

      <div class="nav-links">
        <a 
          v-for="l in links" 
          :key="l.href" 
          :href="l.href"
          @click.prevent="goToSection(l.href)">
          {{ l.label }}
        </a>
        
        <!-- Language Selector -->
        <div class="lang-selector">
          <button class="lang-btn" @click="toggleLangMenu" aria-label="Change language">
            <span class="lang-flag">{{ currentLang.flag }}</span>
            <span class="lang-code">{{ currentLang.code.toUpperCase() }}</span>
            <svg class="lang-arrow" :class="{ 'open': isLangMenuOpen }" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
            </svg>
          </button>
          <div class="lang-dropdown" v-show="isLangMenuOpen">
            <button 
              v-for="lang in availableLanguages" 
              :key="lang.code"
              class="lang-option"
              :class="{ 'active': currentLanguage === lang.code }"
              @click="selectLanguage(lang.code)">
              <span class="lang-flag">{{ lang.flag }}</span>
              <span>{{ lang.name }}</span>
            </button>
          </div>
        </div>
        
        <!-- Theme Toggle Button -->
        <button class="theme-toggle" @click="$emit('toggle-theme')" :aria-label="isDark ? t('theme.light') : t('theme.dark')">
          <!-- Sun icon (shown in dark mode) -->
          <svg v-if="isDark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
          </svg>
          <!-- Moon icon (shown in light mode) -->
          <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path fill-rule="evenodd" d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z" clip-rule="evenodd" />
          </svg>
        </button>
      </div>

      <!-- Mobile Menu Button -->
      <button class="mobile-menu-btn" @click="toggleMobileMenu" aria-label="Menu">
        <svg v-if="!isMobileMenuOpen" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path fill-rule="evenodd" d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z" clip-rule="evenodd" />
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path fill-rule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clip-rule="evenodd" />
        </svg>
      </button>
    </div>

    <!-- Mobile Menu -->
    <div class="mobile-menu" :class="{ 'open': isMobileMenuOpen }">
      <a 
        v-for="l in links" 
        :key="l.href" 
        :href="l.href"
        @click.prevent="goToSection(l.href); isMobileMenuOpen = false">
        {{ l.label }}
      </a>
      
      <div class="mobile-controls">
        <!-- Mobile Language Selector -->
        <div class="mobile-lang-selector">
          <button 
            v-for="lang in availableLanguages" 
            :key="lang.code"
            class="mobile-lang-btn"
            :class="{ 'active': currentLanguage === lang.code }"
            @click="selectLanguage(lang.code)">
            <span>{{ lang.flag }}</span>
            <span>{{ lang.code.toUpperCase() }}</span>
          </button>
        </div>
        
        <!-- Mobile Theme Toggle -->
        <button class="mobile-theme-toggle" @click="$emit('toggle-theme')">
          <svg v-if="isDark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <!--<path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0z" />-->
            <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path fill-rule="evenodd" d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z" clip-rule="evenodd" />
          </svg>
          <span>{{ isDark ? t('theme.light') : t('theme.dark') }}</span>
        </button>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useTranslation } from '../composables/useTranslation'

const { t, currentLanguage, setLanguage, availableLanguages } = useTranslation()

defineProps({
  isDark: Boolean
})

defineEmits(['toggle-theme'])

const isMobileMenuOpen = ref(false)
const isLangMenuOpen = ref(false)

const links = computed(() => [
  { href: '#home', label: currentLanguage.value === 'fr' ? 'Accueil' : 'Home' },
  { href: '#about', label: t('nav.about') },
  { href: '#education', label: t('nav.education') },
  { href: '#tech', label: t('nav.techs') },
  { href: '#projects', label: t('nav.projects') }
])

const currentLang = computed(() => {
  return availableLanguages.find(l => l.code === currentLanguage.value) || availableLanguages[0]
})

const toggleMobileMenu = () => {
  if (isMobileMenuOpen.value) {
    // Fermeture avec animation
    const menu = document.querySelector('.mobile-menu')
    menu?.classList.add('closing')
    setTimeout(() => {
      isMobileMenuOpen.value = false
      menu?.classList.remove('closing')
    }, 300)
  } else {
    isMobileMenuOpen.value = true
  }
}

const toggleLangMenu = () => {
  isLangMenuOpen.value = !isLangMenuOpen.value
}

const selectLanguage = (code) => {
  setLanguage(code)
  isLangMenuOpen.value = false
}

const closeLangMenu = (e) => {
  if (!e.target.closest('.lang-selector')) {
    isLangMenuOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', closeLangMenu)
})

onUnmounted(() => {
  document.removeEventListener('click', closeLangMenu)
})

function goToSection(href) {
  const el = document.querySelector(href)
  
  if (el) {
    const navHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height') || '72')
    const top = el.getBoundingClientRect().top + window.pageYOffset - navHeight
    window.scrollTo({ top, behavior: 'smooth' })
  }
}
</script>

<style scoped>
.brand {
  font-size: 1rem;
  text-decoration: none;
  cursor: pointer;
}

.brand-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background: var(--gradient-primary);
  color: white;
  font-weight: 700;
  font-size: 0.875rem;
  border-radius: var(--radius-sm);
}

.nav-links a {
  cursor: pointer;
}

/* Language Selector */
.lang-selector {
  position: relative;
}

.lang-btn {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.5rem 0.75rem;
  background: var(--bg-tertiary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  color: var(--text-secondary);
  font-size: 0.8125rem;
  font-weight: 500;
  cursor: pointer;
  transition: all var(--transition-fast);
}

.lang-btn:hover {
  background: var(--bg-secondary);
  color: var(--text-primary);
  border-color: var(--primary);
}

.lang-flag {
  font-size: 1rem;
  line-height: 1;
}

.lang-code {
  font-size: 0.75rem;
}

.lang-arrow {
  width: 14px;
  height: 14px;
  transition: transform var(--transition-fast);
}

.lang-arrow.open {
  transform: rotate(180deg);
}

.lang-dropdown {
  position: absolute;
  top: calc(100% + 0.5rem);
  right: 0;
  min-width: 140px;
  background: var(--bg-primary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-lg);
  overflow: hidden;
  z-index: 100;
  animation: dropdownFade 0.2s ease;
}

@keyframes dropdownFade {
  from {
    opacity: 0;
    transform: translateY(-8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideInDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideOutUp {
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(-20px);
  }
}

.lang-option {
  display: flex;
  align-items: center;
  gap: 0.625rem;
  width: 100%;
  padding: 0.625rem 0.875rem;
  background: transparent;
  border: none;
  color: var(--text-secondary);
  font-size: 0.875rem;
  cursor: pointer;
  transition: all var(--transition-fast);
}

.lang-option:hover {
  background: var(--bg-secondary);
  color: var(--text-primary);
}

.lang-option.active {
  background: var(--primary-light);
  color: var(--primary);
  font-weight: 500;
}

/* Mobile Menu Button */
.mobile-menu-btn {
  display: none;
  padding: 0.5rem;
  background: transparent;
  border: none;
  color: var(--text-primary);
  cursor: pointer;
  z-index: 101;
  position: relative;
}

.mobile-menu-btn svg {
  width: 24px;
  height: 24px;
}

/* Mobile Menu */
.mobile-menu {
  display: none;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1rem;
  background: var(--bg-primary);
  border-top: 1px solid var(--border-color);
  z-index: 98;
}

.mobile-menu.open {
  background-color: var(--color-primary-dark);
  display: flex;
  animation: slideInDown 0.3s ease-out;
}

.mobile-menu.closing {
  animation: slideOutUp 0.3s ease-out;
  display: flex;
}

.mobile-menu.open a {
  color: white;
}

.mobile-menu.open a:hover {
  background: rgba(255, 255, 255, 0.2);
  color: white;
}

.mobile-menu a {
  padding: 0.75rem 1rem;
  color: var(--text-secondary);
  text-decoration: none;
  font-weight: 500;
  border-radius: var(--radius-md);
  transition: all var(--transition-fast);
}

.mobile-menu a:hover {
  background: var(--bg-secondary);
  color: var(--primary);
}

.mobile-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1rem;
  margin-top: 0.5rem;
  border-top: 1px solid var(--border-color);
}

.mobile-lang-selector {
  display: flex;
  gap: 0.5rem;
}

.mobile-lang-btn {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.5rem 0.75rem;
  background: var(--bg-tertiary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-sm);
  color: #8b9fbb;
  font-size: 0.75rem;
  cursor: pointer;
  transition: all var(--transition-fast);
}

.mobile-lang-btn.active {
  background: var(--primary);
  color: white;
  border-color: var(--primary);
}

.mobile-theme-toggle {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: var(--bg-tertiary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  /*color: var(--text-secondary);*/
  color: white;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all var(--transition-fast);
}

.mobile-theme-toggle svg {
  width: 18px;
  height: 18px;
}

.mobile-theme-toggle:hover {
  background: var(--bg-secondary);
  color: #fefefe;
}

@media (max-width: 768px) {
  .nav-links {
    display: none;
  }

  .mobile-menu-btn {
    display: block;
  }

  .mobile-menu {
    position: fixed;
    top: 72px;
    left: 0;
    right: 0;
    max-height: calc(100vh - 72px);
    overflow-y: auto;
    border-top: 1px solid var(--border-color);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  .mobile-menu.open {
    background-color: var(--color-primary-dark);
    display: flex;
  }

  .mobile-menu.open a {
    color: white;
  }

  .mobile-menu.open a:hover {
    background: rgba(255, 255, 255, 0.2);
    color: white;
  }
}
</style>
