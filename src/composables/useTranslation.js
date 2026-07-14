import { ref, computed } from 'vue'

const currentLanguage = ref(localStorage.getItem('language') || 'fr')

const translations = {
  fr: {
    // Navbar
    nav: {
      about: 'À propos',
      education: 'Formation',
      projects: 'Projets',
      techs: 'Technologies',
      contact: 'Contact',
      downloadCV: 'Télécharger CV'
    },
    // Hero
    hero: {
      available: 'Disponible pour missions & stages',
      description: 'Aspirant développeur logiciel et web, je me spécialise dans la création d\'applications robustes et d\'interfaces utilisateur intuitives. Je développe mes compétences à travers des projets concrets et innovants.',
      downloadCV: 'Télécharger mon CV',
      learnMore: 'En savoir plus'
    },
    // About
    about: {
      label: 'À Propos',
      title: 'Passionné par le développement et l\'innovation',
      description1: 'Je suis actuellement en 3ème année à l\'IT University Madagascar. Développeur surtout orienté backend, j\'aime concevoir des API robustes, scalables et faciles à maintenir.',
      description2: 'Je m\'intéresse aussi au frontend : créer des interfaces simples, accessibles et réactives. Mon objectif est de construire des solutions qui ont un réel impact.',
      cta: 'Ouvert aux missions freelance et aux stages — N\'hésitez pas à me contacter !'
    },
    // Education
    education: {
      label: 'Parcours',
      title: 'Formation',
      subtitle: 'Mon parcours académique',
      status: {
        completed: 'Terminé',
        current: 'En cours'
      },
      baccalaureate: {
        period: '2023',
        degree: 'Baccalauréat Série Scientifique',
        details: 'Obtenu avec Mention Assez Bien.',
        school: 'Lycée privé La Farandole'
      },
      license: {
        period: '2023 - 2026',
        degree: 'Licence en Informatique',
        details: 'Formation en cours, orientée développement logiciel et web.',
        school: 'IT University'
      }
    },
    // Projects
    projects: {
      title: 'Projets',
      subtitle: 'Quelques projets que j\'ai réalisés.',
      view: 'Voir'
    },
    // Project Detail
    projectDetail: {
      back: 'Retour',
      backToProjects: 'Retour aux projets',
      objectives: 'Objectifs',
      features: 'Fonctionnalités',
      technologies: 'Technologies utilisées',
      challenges: 'Défis relevés',
      viewLive: 'Voir le projet',
      viewCode: 'Voir le code',
      gallery: 'Galerie d\'images',
      clickToEnlarge: 'Cliquer pour agrandir'
    },
    // Techs
    techs: {
      label: 'Compétences',
      title: 'Technologies',
      subtitle: 'Voici quelques-unes des technologies que j\'utilise et mon niveau approximatif.',
      languages: 'Langages',
      databases: 'Bases de données',
      tools: 'Outils'
    },
    // Footer
    footer: {
      description: 'Développeur passionné, spécialisé dans la création d\'applications robustes et d\'interfaces utilisateur intuitives.',
      navigation: 'Navigation',
      home: 'Accueil',
      about: 'À propos',
      education: 'Formation',
      technologies: 'Technologies',
      projects: 'Projets',
      contact: 'Contact',
      rights: 'Tous droits réservés',
      legal: 'Mentions légales'
    },
    // Theme
    theme: {
      light: 'Clair',
      dark: 'Sombre'
    }
  },
  en: {
    // Navbar
    nav: {
      about: 'About',
      education: 'Education',
      projects: 'Projects',
      techs: 'Technologies',
      contact: 'Contact',
      downloadCV: 'Download CV'
    },
    // Hero
    hero: {
      available: 'Available for missions & internships',
      description: 'Aspiring software and web developer, I specialize in creating robust applications and intuitive user interfaces. I develop my skills through concrete and innovative projects.',
      downloadCV: 'Download my CV',
      learnMore: 'Learn more'
    },
    // About
    about: {
      label: 'About',
      title: 'Passionate about development and innovation',
      description1: 'I am currently in my 3rd year at IT University Madagascar. Mainly backend-oriented developer, I like designing robust, scalable and easy-to-maintain APIs.',
      description2: 'I am also interested in frontend: creating simple, accessible and responsive interfaces. My goal is to build solutions that have a real impact.',
      cta: 'Open to freelance missions and internships — Feel free to contact me!'
    },
    // Education
    education: {
      label: 'Background',
      title: 'Education',
      subtitle: 'My academic background',
      status: {
        completed: 'Completed',
        current: 'Ongoing'
      },
      baccalaureate: {
        period: '2023',
        degree: 'Scientific Baccalaureate',
        details: 'Obtained with honors.',
        school: 'La Farandole Private High School'
      },
      license: {
        period: '2023 - present',
        degree: 'Bachelor\'s Degree in Computer Science',
        details: 'Ongoing program focused on software and web development.',
        school: 'IT University'
      }
    },
    // Projects
    projects: {
      title: 'Projects',
      subtitle: 'Some recent projects I have completed.',
      view: 'View'
    },
    // Project Detail
    projectDetail: {
      back: 'Back',
      backToProjects: 'Back to projects',
      objectives: 'Objectives',
      features: 'Features',
      technologies: 'Technologies used',
      challenges: 'Challenges overcome',
      viewLive: 'View project',
      viewCode: 'View code',
      gallery: 'Image Gallery',
      clickToEnlarge: 'Click to enlarge'
    },
    // Techs
    techs: {
      label: 'Skills',
      title: 'Technologies',
      subtitle: 'Here are some of the technologies I use and my approximate level.',
      languages: 'Languages',
      databases: 'Databases',
      tools: 'Tools'
    },
    // Footer
    footer: {
      description: 'Passionate developer, specialized in creating robust applications and intuitive user interfaces.',
      navigation: 'Navigation',
      home: 'Home',
      about: 'About',
      education: 'Education',
      technologies: 'Technologies',
      projects: 'Projects',
      contact: 'Contact',
      rights: 'All rights reserved',
      legal: 'Legal notice'
    },
    // Theme
    theme: {
      light: 'Light',
      dark: 'Dark'
    }
  }
}

export function useTranslation() {
  const setLanguage = (lang) => {
    currentLanguage.value = lang
    localStorage.setItem('language', lang)
    document.documentElement.lang = lang
  }

  const t = (key) => {
    const keys = key.split('.')
    let value = translations[currentLanguage.value]
    
    for (const k of keys) {
      if (value && value[k]) {
        value = value[k]
      } else {
        return key
      }
    }
    
    return value
  }

  const availableLanguages = [
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'en', name: 'English', flag: '🇬🇧' }
  ]

  return {
    currentLanguage,
    setLanguage,
    t,
    availableLanguages
  }
}
