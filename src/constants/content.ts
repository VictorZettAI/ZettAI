import { TestimonialProps, TeamMemberProps } from '../types/components';

export const TESTIMONIALS: TestimonialProps[] = [
  {
    name: 'María García',
    role: 'CEO de TechSolutions',
    content: 'ZettAI transformó completamente nuestra forma de trabajar. Su implementación de IA no solo mejoró nuestra eficiencia, sino que también nos ayudó a destacar en nuestro mercado.',
    rating: 5,
    image: '/images/team/maria.jpg'
  },
  {
    name: 'Carlos Rodríguez',
    role: 'Director de Innovación',
    content: 'La capacidad de ZettAI para entender nuestras necesidades y convertirlas en soluciones prácticas fue impresionante. Los resultados superaron nuestras expectativas.',
    rating: 5,
    image: '/images/team/carlos.jpg'
  },
  {
    name: 'Ana Martínez',
    role: 'CTO de DataCorp',
    content: 'Trabajar con ZettAI fue una experiencia excepcional. Su equipo no solo es técnicamente brillante, sino que también entiende perfectamente las necesidades empresariales.',
    rating: 5,
    image: '/images/team/ana.jpg'
  }
];

export const TEAM_MEMBERS: TeamMemberProps[] = [
  {
    name: 'David López',
    role: 'CEO & Fundador',
    bio: 'Experto en IA con más de 15 años de experiencia en el sector tecnológico.',
    image: '/images/team/david.jpg',
    social: {
      linkedin: 'https://linkedin.com/in/davidlopez',
      twitter: 'https://twitter.com/davidlopez',
      github: 'https://github.com/davidlopez'
    }
  },
  {
    name: 'Laura Sánchez',
    role: 'CTO',
    bio: 'Especialista en Machine Learning y arquitectura de sistemas IA.',
    image: '/images/team/laura.jpg',
    social: {
      linkedin: 'https://linkedin.com/in/laurasanchez',
      github: 'https://github.com/laurasanchez'
    }
  }
];

export const SERVICES = [
  {
    title: 'IA Personalizada',
    description: 'Desarrollamos soluciones de IA adaptadas a las necesidades específicas de tu empresa.',
    icon: 'Brain',
    link: '/servicios/ia-personalizada'
  },
  {
    title: 'Automatización',
    description: 'Optimiza tus procesos empresariales con nuestras soluciones de automatización inteligente.',
    icon: 'Cog',
    link: '/servicios/automatizacion'
  },
  {
    title: 'Análisis Predictivo',
    description: 'Toma decisiones informadas con nuestros modelos de análisis predictivo.',
    icon: 'ChartLine',
    link: '/servicios/analisis-predictivo'
  }
];
