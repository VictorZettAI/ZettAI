import { motion } from 'framer-motion'
import { Github, Linkedin, Twitter } from 'lucide-react'

interface TeamMember {
  name: string
  role: string
  image: string
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
    image: "/team/ana.jpg",
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
    image: "/team/carlos.jpg",
    bio: "PhD en Machine Learning por el MIT, especializado en sistemas de IA escalables",
    social: {
      linkedin: "https://linkedin.com/in/carlosruiz",
      github: "https://github.com/carlosruiz"
    }
  },
  {
    name: "Laura García",
    role: "Directora de Producto",
    image: "/team/laura.jpg",
    bio: "Pionera en la implementación de soluciones de IA en el sector empresarial",
    social: {
      linkedin: "https://linkedin.com/in/lauragarcia",
      twitter: "https://twitter.com/lauragarcia"
    }
  },
  {
    name: "David Torres",
    role: "Lead Engineer",
    image: "/team/david.jpg",
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
      className="transform transition-colors duration-200 text-gray-400 hover:text-yellow-500"
    >
      <Icon className="w-5 h-5" />
    </motion.a>
  )
}

const Team = () => {
  return (
    <section className="relative py-20 overflow-hidden bg-[#0B1120]">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 text-white">
            Nuestro Equipo
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Expertos en IA y machine learning comprometidos con tu éxito
          </p>
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
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-700">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="relative mb-6 rounded-lg overflow-hidden"
                >
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.div>

                <h3 className="text-xl font-bold mb-2 text-white">
                  {member.name}
                </h3>
                <p className="text-yellow-500 mb-3">{member.role}</p>
                <p className="text-gray-300 mb-4">{member.bio}</p>

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
    </section>
  )
}

export default Team
