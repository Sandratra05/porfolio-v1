import { computed } from 'vue'
import { useTranslation } from './useTranslation'
import cafeDashboardImage from '../assets/images/cafe-dashboard-vente.png'
import cafeDashboardImage2 from '../assets/images/cafe-courbe-ensache.png'
import cafeDashboardImage3 from '../assets/images/details-ensachage.png'
import cafeDashboardImage4 from '../assets/images/vente-dashboard2.png'
import loginLycee from '../assets/images/nan-login.png'
import lycee1 from '../assets/images/nan-edt-classe.png'
import lycee2 from '../assets/images/nan-edt-genere.png'
import lycee3 from '../assets/images/nan-liste-classes.png'
import lycee4 from '../assets/images/nan-planification.png'
import ticketCRM from '../assets/images/ticketing.png'
import ticketCRM1 from '../assets/images/agent-dashboard.png'
import ticketCRM2 from '../assets/images/list-agent.png'
import ticketCRM3 from '../assets/images/client-msg.png'
import adoption from '../assets/images/adoptMe.png'
import adoption1 from '../assets/images/adopt-dashboard.png'
import adoption2 from '../assets/images/adopt-admin.png'
import adoption3 from '../assets/images/adopt-user.png'
import createUser from '../assets/images/create-user.png'
import listEditButton from '../assets/images/list-edit-button.png'
import listSignalement from '../assets/images/list-signalement.png'
import listEdit from '../assets/images/list-edit.png'
import login from '../assets/images/login.png'
import unblockSuccess from '../assets/images/unblock-success.png'
import unblockUser from '../assets/images/unblock-user.png'
import visiteur from '../assets/images/visiteur.png'
import creerSignalementTri from '../assets/images/creer-signalement-tri.jpg'
import creerSignalement from '../assets/images/creer-signalement.jpg'
import formCarte from '../assets/images/form-carte.jpg'
import formEnd from '../assets/images/form-end.jpg'
import formSelection from '../assets/images/form-selection.jpg'
import listSignalementVisiteur from '../assets/images/list-signalement-visiteur.jpg'
import selectionPoint from '../assets/images/selection-point.jpg'



// Données des projets avec plus de détails
// Note: Pour ajouter plus d'images, importer les images et les ajouter au tableau 'images'
const projectsData = {
  fr: [
    { 
      id: 'mutli-plateforme-gestion-routier',
      title: 'Multi-plateforme de gestion de travaux routiers', 
      shortDescription: 'Développement des plateformes de travaux routiers',
      description: 'Application web et mobile pour la gestion de travaux routiers, permettant de suivre les projets, les équipes et les ressources en temps réel. L\'application web offre un tableau de bord complet pour les gestionnaires, tandis que l\'application mobile permet aux équipes sur le terrain de mettre à jour l\'avancement et de signaler les problèmes.',
      image: login,
      images: [listSignalement, listEditButton, listEdit, visiteur, createUser, unblockUser, unblockSuccess, creerSignalement, creerSignalementTri, formCarte, formEnd, formSelection, listSignalementVisiteur, selectionPoint],
      technologies: ['Spring Boot', 'Ionic', 'PostgreSQL', 'Firebase', 'Docker'],
      link: '#',
      repo: '#',
      objectives: [
        'Centraliser la gestion des projets de travaux routiers',
        'Suivre en temps réel l\'avancement des travaux',
        'Améliorer la communication entre les équipes de terrain et les gestionnaires',
      ],
      features: [
        'Gestions des budgets et ressources',
        'Suivi de l\'avancement avec géolocalisation',
        'Système de signalement de problèmes en temps réel',
        'Rapports et analyses de performance',
        'Notifications et alertes personnalisables'
      ],
      role: 'Développeur Backend & Mobile',
      duration: '3 semaines',
      challenges: [
        'Conception d\'une architecture robuste pour la synchronisation des données entre les plateformes',
        'Création d\'interfaces mobiles intuitives pour les équipes sur le terrain'
      ]
    },
    { 
      id: 'coffee-production',
      title: 'Gestion de la production de café', 
      shortDescription: 'Gestion de la production de café avec tableau de bord interactif.',
      description: 'Application complète de gestion de la production de café avec tableau de bord interactif, permettant de suivre la production, de la torréfaction à la distribution, en temps réel.',
      image: cafeDashboardImage,
      images: [cafeDashboardImage, cafeDashboardImage2, cafeDashboardImage3, cafeDashboardImage4],
      technologies: ['Spring MVC', 'JavaScript', 'MySQL', 'Tailwind CSS', 'JSP'],
      link: '#',
      repo: '#',
      objectives: [
        'Centraliser la gestion de la production de café',
        'Suivre en temps réel les étapes de production',
        'Générer des rapports de ventes et de production',
        'Optimiser la chaîne de distribution'
      ],
      features: [
        'Tableau de bord interactif avec graphiques',
        'Gestion des stocks et inventaire',
        'Suivi de la torréfaction et qualité',
        'Rapports et statistiques de ventes',
        'Gestion des commandes et livraisons'
      ],
      role: 'Chef de projet & Développeur Backend',
      duration: '3 semaines',
      challenges: [
        'Conception d\'une architecture MVC robuste',
        'Création d\'interfaces responsives et intuitives'
      ]
    },
    { 
      id: 'schedule-management',
      title: 'Système de gestion d\'emploi du temps', 
      shortDescription: 'Application web pour gérer les emplois du temps du lycée Nanisana.',
      description: 'Contribution à la conception et à la réalisation d\'une application web complète pour gérer les emplois du temps du lycée Nanisana, incluant la gestion des professeurs, salles et matières.',
      image: loginLycee,
      images: [lycee1, lycee2, lycee3, lycee4],
      technologies: ['Spring Boot', 'JavaScript', 'PostgreSQL', 'Tailwind CSS', 'JSP'],
      link: '#',
      repo: '#',
      objectives: [
        'Automatiser la création des emplois du temps',
        'Éviter les conflits de salles et d\'horaires',
        'Faciliter la gestion administrative'
      ],
      features: [
        'Génération automatique d\'emplois du temps',
        'Gestion des professeurs et matières',
        'Système de détection de conflits',
        'Interface d\'administration complète',
        'Export PDF des emplois du temps'
      ],
      role: 'Développeur Backend',
      duration: '1 mois',
      challenges: [
        'Algorithme de génération sans conflits',
        'Gestion des contraintes multiples',
        'Optimisation des performances avec PostgreSQL'
      ]
    },
    { 
      id: 'ticketing-crm',
      title: 'Système de gestion de ticketing pour CRM', 
      shortDescription: 'Site web de ticketing facilitant la gestion CRM des clients.',
      description: 'Site web de ticketing dans une entreprise, facilitant la gestion CRM des clients, ainsi que le suivi des demandes et des résolutions au sein des équipes techniques.',
      image: ticketCRM,
      images: [ticketCRM, ticketCRM1, ticketCRM2, ticketCRM3],
      technologies: ['Flight PHP', 'JavaScript', 'CSS', 'PostgreSQL'],
      link: '#',
      repo: '#',
      objectives: [
        'Centraliser les demandes clients',
        'Améliorer le suivi des tickets',
        'Optimiser la communication entre équipes',
        'Analyser les performances du support'
      ],
      features: [
        'Création et suivi de tickets',
        'Attribution automatique aux équipes',
        'Système de priorités et SLA',
        'Historique complet des échanges',
        'Dashboard de statistiques'
      ],
      role: 'Développeur Full Stack',
      duration: '2 mois',
      challenges: [
        'Architecture API REST avec Flight PHP',
        'Système de notifications en temps réel',
        'Gestion des rôles et permissions',
        'Discussion sur l\'intégration d\'un système de chat en direct'
      ]
    },
    { 
      id: 'pet-adoption',
      title: 'Plateforme d\'adoption d\'animaux', 
      shortDescription: 'Application web permettant de parcourir et d\'adopter des animaux.',
      description: 'Une application web avec une interface moderne permettant aux utilisateurs de parcourir et d\'adopter des animaux de compagnie, avec système de matching et de suivi.',
      image: adoption,
      images: [adoption, adoption1, adoption2, adoption3],
      technologies: ['PHP', 'CSS', 'MySQL'],
      link: '#',
      repo: '#',
      objectives: [
        'Faciliter l\'adoption d\'animaux',
        'Réduire l\'abandon des animaux'
      ],
      features: [
        'Catalogue d\'animaux avec filtres',
        'Fiches détaillées des animaux'
      ],
      role: 'Développeur Full Stack',
      duration: '1 semaines',
      challenges: [
        'Design UX/UI attrayant et accessible',
        'Système de recherche avancée'
      ]
    }
  ],
  en: [
    {
      id: 'mutli-plateforme-gestion-routier',
      title: 'Multi-platform Road Construction Management',
      shortDescription: 'Development of road construction management platforms',
      description: 'Web and mobile application for managing road construction projects, allowing real-time tracking of projects, teams, and resources. The web application provides a comprehensive dashboard for managers, while the mobile application allows field teams to update progress and report issues.',
      image: login,
      images: [listSignalement, listEditButton, listEdit, visiteur, createUser, unblockUser, unblockSuccess, creerSignalement, creerSignalementTri, formCarte, formEnd, formSelection, listSignalementVisiteur, selectionPoint],
      technologies: ['Spring Boot', 'Ionic', 'PostgreSQL', 'Firebase', 'Docker'],
      link: '#',
      repo: '#',
      objectives: [
        'Centralize road construction project management',
        'Track project progress in real-time',
        'Improve communication between field teams and managers',
      ],
      features: [
        'Budget and resource management',
        'Progress tracking with geolocation',
        'Real-time issue reporting system',
        'Performance reports and analytics',
        'Customizable notifications and alerts'
      ],
      role: 'Backend & Mobile Developer',
      duration: '3 weeks',
      challenges: [
        'Designing a robust architecture for data synchronization across platforms',
        'Creating intuitive mobile interfaces for field teams'
      ]
    },
    {
      id: 'coffee-production',
      title: 'Coffee Production Management', 
      shortDescription: 'Coffee production management with interactive dashboard.',
      description: 'Complete coffee production management application with interactive dashboard, allowing real-time tracking from roasting to distribution.',
      image: cafeDashboardImage,
      images: [cafeDashboardImage, cafeDashboardImage2, cafeDashboardImage3, cafeDashboardImage4],
      technologies: ['Spring MVC', 'JavaScript', 'MySQL', 'Tailwind CSS', 'JSP'],
      link: '#',
      repo: '#',
      objectives: [
        'Centralize coffee production management',
        'Track production stages in real-time',
        'Generate sales and production reports',
        'Optimize distribution chain'
      ],
      features: [
        'Interactive dashboard with charts',
        'Stock and inventory management',
        'Roasting and quality tracking',
        'Sales reports and statistics',
        'Order and delivery management'
      ],
      role: 'Team Lead & Backend Developer',
      duration: '3 weeks',
      challenges: [
        'Designing a robust MVC architecture',
        'Creating responsive and intuitive interfaces'
      ]
    },
    { 
      id: 'schedule-management',
      title: 'Schedule Management System', 
      shortDescription: 'Web application to manage schedules for Nanisana high school.',
      description: 'Contribution to the design and development of a complete web application to manage schedules for Nanisana high school, including teacher, room, and subject management.',
      image: loginLycee,
      images: [lycee1, lycee2, lycee3, lycee4],
      technologies: ['Spring Boot', 'JavaScript', 'PostgreSQL', 'Tailwind CSS', 'JSP'],
      link: '#',
      repo: '#',
      objectives: [
        'Automate schedule creation',
        'Avoid room and time conflicts',
        'Facilitate administrative management'
      ],
      features: [
        'Automatic schedule generation',
        'Teacher and subject management',
        'Conflict detection system',
        'Complete admin interface',
        'PDF schedule export'
      ],
      role: 'Backend Developer',
      duration: '1 month',
      challenges: [
        'Conflict-free generation algorithm',
        'Managing multiple constraints',
        'PostgreSQL performance optimization'
      ]
    },
    { 
      id: 'ticketing-crm',
      title: 'CRM Ticketing Management System', 
      shortDescription: 'Ticketing website facilitating CRM management of clients.',
      description: 'Enterprise ticketing website, facilitating CRM management of clients, as well as tracking requests and resolutions within technical teams.',
      image: ticketCRM,
      images: [ticketCRM, ticketCRM1, ticketCRM2, ticketCRM3],
      technologies: ['Flight PHP', 'JavaScript', 'CSS', 'PostgreSQL'],
      link: '#',
      repo: '#',
      objectives: [
        'Centralize customer requests',
        'Improve ticket tracking',
        'Optimize team communication',
        'Analyze support performance'
      ],
      features: [
        'Ticket creation and tracking',
        'Automatic team assignment',
        'Priority and SLA system',
        'Complete exchange history',
        'Statistics dashboard'
      ],
      role: 'Full Stack Developer',
      duration: '2 months',
      challenges: [
        'REST API architecture with Flight PHP',
        'Real-time notification system',
        'Role and permission management',
        'Discussion on integrating a live chat system'
      ]
    },
    { 
      id: 'pet-adoption',
      title: 'Pet Adoption Platform', 
      shortDescription: 'Web application allowing users to browse and adopt pets.',
      description: 'A web application with a modern interface allowing users to browse and adopt pets, with matching and tracking system.',
      image: adoption,
      images: [adoption, adoption1, adoption2, adoption3],
      technologies: ['PHP', 'CSS', 'MySQL'],
      link: '#',
      repo: '#',
      objectives: [
        'Facilitate pet adoption',
        'Reduce pet abandonment'
      ],
      features: [
        'Pet catalog with filters',
        'Detailed pet profiles'
      ],
      role: 'Full Stack Developer',
      duration: '1 week',
      challenges: [
        'Attractive and accessible UX/UI design',
        'Image optimization',
        'Advanced search system'
      ]
    }
  ]
}

export function useProjects() {
  const { currentLanguage } = useTranslation()

  const projects = computed(() => {
    return projectsData[currentLanguage.value] || projectsData.fr
  })

  const getProjectById = (id) => {
    const currentProjects = projectsData[currentLanguage.value] || projectsData.fr
    return currentProjects.find(p => p.id === id)
  }

  return {
    projects,
    getProjectById
  }
}
