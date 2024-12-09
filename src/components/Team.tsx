import { motion } from 'framer-motion'
import { Github, Linkedin, Twitter } from 'lucide-react'
import anaImage from '../assets/team/ana.jpg'
import carlosImage from '../assets/team/carlos.jpg'
import lauraImage from '../assets/team/laura.jpg'
import davidImage from '../assets/team/david.jpg'
import blackWavesBg from '../assets/backgrounds/black-waves.jpg'

interface TeamMember {
  name: string
  role: string
  image: any
  bio: string
  social: {
    twitter?: string
    linkedin?: string
    github?: string
  }
}

const teamMembers: TeamMember[] = [
  {
    name: "Ana Martínez",
    role: "CEO & Co-fundadora",
    image: anaImage,
    bio: "Experta en IA con más de 15 años de experiencia en empresas Fortune 500",
    social: {
      twitter: "https://twitter.com/anamartinez",
      linkedin: "https://linkedin.com/in/anamartinez",
      github: "https://github.com/anamartinez"
    }
  },
  {
    name: "Carlos Ruiz",
    role: "CTO",
    image: carlosImage,
    bio: "PhD en Machine Learning por el MIT, especializado en sistemas de IA escalables",
    social: {
      linkedin: "https://linkedin.com/in/carlosruiz",
      github: "https://github.com/carlosruiz"
    }
  },
  {
    name: "Laura García",
    role: "Directora de Producto",
    image: lauraImage,
    bio: "Pionera en la implementación de soluciones de IA en el sector empresarial",
    social: {
      linkedin: "https://linkedin.com/in/lauragarcia",
      twitter: "https://twitter.com/lauragarcia"
    }
  },
  {
    name: "David Torres",
    role: "Lead Engineer",
    image: davidImage,
    bio: "Experto en arquitecturas de ML y sistemas distribuidos a gran escala",
    social: {
      linkedin: "https://linkedin.com/in/davidtorres",
      github: "https://github.com/davidtorres",
      twitter: "https://twitter.com/davidtorres"
    }
  }
]

const SocialIcon = ({ platform, url }: { platform: string; url: string }) => {
  const icons = {
    linkedin: Linkedin,
    twitter: Twitter,
    github: Github
  }
  const Icon = icons[platform as keyof typeof icons]
  
  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="transform transition-colors duration-200 text-gray-400 hover:text-amber-400"
    >
      <Icon className="w-5 h-5" />
    </motion.a>
  )
}

const Team = () => {
  return (
    <section className="relative py-32 overflow-hidden bg-[#030407]">
      {/* Gradiente superior */}
      <div 
        className="absolute top-0 left-0 right-0 h-24 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.9), transparent)',
          zIndex: 1
        }}
      />

      {/* Sombra superior */}
      <div 
        className="absolute top-0 left-0 right-0 h-16 pointer-events-none"
        style={{
          background: 'linear-gradient(to top, transparent, rgba(0, 0, 0, 0.7))'
        }}
      />

      {/* Background Image */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${blackWavesBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: 1
        }}
      />
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at 20% 20%, rgba(251, 191, 36, 0.05) 0%, transparent 70%)',
          mixBlendMode: 'overlay'
        }}
      />
      <div 
        className="absolute inset-0 bg-[#030407]/30"
        style={{
          backdropFilter: 'blur(2px)'
        }}
      />
      
      <div className="container mx-auto px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mb-24"
        >
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="inline-block text-sm font-medium text-amber-200/80 uppercase tracking-wider mb-4"
          >
            Nuestros Expertos
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-6xl font-bold mb-6 text-white"
          >
            El Equipo Detrás
            <br />
            de la Innovación
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-xl leading-relaxed text-gray-400 max-w-2xl"
          >
            Un grupo de expertos apasionados por la IA y comprometidos con 
            transformar el futuro de los negocios a través de la innovación
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative group"
            >
              <div className="bg-white/[0.03] backdrop-blur-sm rounded-2xl p-6 border border-white/10 transition-all duration-300 hover:bg-white/[0.06]">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="relative mb-6 rounded-xl overflow-hidden bg-gradient-to-b from-amber-500/10 to-transparent p-1"
                >
                  <div className="rounded-lg overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-64 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </motion.div>

                <h3 className="text-xl font-bold mb-2 text-white group-hover:text-amber-200 transition-colors">
                  {member.name}
                </h3>
                <p className="text-amber-500/80 font-medium mb-3">{member.role}</p>
                <p className="text-gray-400 mb-4 text-sm leading-relaxed">{member.bio}</p>

                <div className="flex justify-center space-x-4">
                  {Object.entries(member.social).map(([platform, url]) => (
                    <SocialIcon key={platform} platform={platform} url={url} />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      {/* Sombra inferior mejorada */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
        style={{
          background: 'linear-gradient(to top, rgba(0, 0, 0, 0.9), transparent)',
          zIndex: 1
        }}
      />
    </section>
  )
}

export default Team
