import { motion } from 'framer-motion'
import { Linkedin, Github, Twitter, Mail } from 'lucide-react'

interface TeamProps {
  isDarkMode: boolean
}

const team = [
  {
    name: 'Carlos Martínez',
    role: 'CEO & AI Architect',
    image: '/team/carlos.jpg',
    bio: 'Experto en IA con más de 10 años de experiencia en desarrollo de soluciones empresariales.',
    social: {
      linkedin: 'https://linkedin.com/',
      github: 'https://github.com/',
      twitter: 'https://twitter.com/',
      email: 'mailto:carlos@aisolutions.com'
    }
  },
  {
    name: 'Ana García',
    role: 'CTO',
    image: '/team/ana.jpg',
    bio: 'Especialista en arquitectura de sistemas y desarrollo de soluciones escalables.',
    social: {
      linkedin: 'https://linkedin.com/',
      github: 'https://github.com/',
      twitter: 'https://twitter.com/',
      email: 'mailto:ana@aisolutions.com'
    }
  },
  {
    name: 'David López',
    role: 'Lead Developer',
    image: '/team/david.jpg',
    bio: 'Desarrollador full-stack con experiencia en implementación de sistemas de IA.',
    social: {
      linkedin: 'https://linkedin.com/',
      github: 'https://github.com/',
      twitter: 'https://twitter.com/',
      email: 'mailto:david@aisolutions.com'
    }
  },
  {
    name: 'Laura Sánchez',
    role: 'AI Research Lead',
    image: '/team/laura.jpg',
    bio: 'Investigadora principal en machine learning y procesamiento de lenguaje natural.',
    social: {
      linkedin: 'https://linkedin.com/',
      github: 'https://github.com/',
      twitter: 'https://twitter.com/',
      email: 'mailto:laura@aisolutions.com'
    }
  }
]

export default function Team({ isDarkMode }: TeamProps) {
  return (
    <section id="equipo" className={`py-24 relative overflow-hidden ${
      isDarkMode ? 'bg-[#0B1120]' : 'bg-white'
    }`}>
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0" 
          style={{
            backgroundImage: isDarkMode 
              ? 'radial-gradient(circle at 50% 50%, rgba(234, 179, 8, 0.08) 0%, rgba(11, 17, 32, 0) 50%)'
              : 'radial-gradient(circle at 50% 50%, rgba(234, 179, 8, 0.12) 0%, rgba(255, 255, 255, 0) 50%)'
          }}
        />
      </div>

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Nuestro Equipo
          </h2>
          <p className={`text-xl ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Un equipo de expertos dedicados a transformar el futuro con IA
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.8, 
                delay: index * 0.1,
                ease: [0.22, 1, 0.36, 1]
              }}
            >
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
                className={`h-full rounded-2xl overflow-hidden ${
                  isDarkMode 
                    ? 'bg-gray-800/50 border border-gray-700/50' 
                    : 'bg-white border border-gray-200/50'
                } backdrop-blur-sm shadow-lg group`}
              >
                <div className="relative overflow-hidden">
                  <div className="aspect-w-3 aspect-h-4">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className={`absolute inset-0 bg-gradient-to-t ${
                    isDarkMode
                      ? 'from-gray-900/90 via-gray-900/40 to-transparent'
                      : 'from-black/80 via-black/40 to-transparent'
                  }`} />
                </div>

                <div className="p-6">
                  <h3 className={`text-xl font-semibold mb-2 ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    {member.name}
                  </h3>
                  <p className={`text-sm font-medium mb-3 ${
                    isDarkMode ? 'text-yellow-500' : 'text-yellow-600'
                  }`}>
                    {member.role}
                  </p>
                  <p className={`text-sm mb-6 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    {member.bio}
                  </p>

                  <div className="flex items-center space-x-4">
                    <motion.a
                      href={member.social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ y: -2 }}
                      transition={{ duration: 0.2 }}
                      className={`p-2 rounded-lg transition-colors duration-200 ${
                        isDarkMode
                          ? 'bg-gray-700/50 hover:bg-gray-700 text-gray-300 hover:text-white'
                          : 'bg-gray-100/50 hover:bg-gray-200 text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      <Linkedin className="w-4 h-4" />
                    </motion.a>
                    <motion.a
                      href={member.social.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ y: -2 }}
                      transition={{ duration: 0.2 }}
                      className={`p-2 rounded-lg transition-colors duration-200 ${
                        isDarkMode
                          ? 'bg-gray-700/50 hover:bg-gray-700 text-gray-300 hover:text-white'
                          : 'bg-gray-100/50 hover:bg-gray-200 text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      <Github className="w-4 h-4" />
                    </motion.a>
                    <motion.a
                      href={member.social.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ y: -2 }}
                      transition={{ duration: 0.2 }}
                      className={`p-2 rounded-lg transition-colors duration-200 ${
                        isDarkMode
                          ? 'bg-gray-700/50 hover:bg-gray-700 text-gray-300 hover:text-white'
                          : 'bg-gray-100/50 hover:bg-gray-200 text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      <Twitter className="w-4 h-4" />
                    </motion.a>
                    <motion.a
                      href={member.social.email}
                      whileHover={{ y: -2 }}
                      transition={{ duration: 0.2 }}
                      className={`p-2 rounded-lg transition-colors duration-200 ${
                        isDarkMode
                          ? 'bg-gray-700/50 hover:bg-gray-700 text-gray-300 hover:text-white'
                          : 'bg-gray-100/50 hover:bg-gray-200 text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      <Mail className="w-4 h-4" />
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Floating decorative elements */}
        <motion.div
          animate={{ 
            y: [0, -30, 0],
            rotate: [0, -5, 0]
          }}
          transition={{ 
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-20 left-10 w-40 h-40 opacity-20"
          style={{
            background: isDarkMode 
              ? 'radial-gradient(circle at 50% 50%, rgba(234, 179, 8, 0.2), transparent)'
              : 'radial-gradient(circle at 50% 50%, rgba(234, 179, 8, 0.3), transparent)'
          }}
        />
        <motion.div
          animate={{ 
            y: [0, 30, 0],
            rotate: [0, 5, 0]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute bottom-20 right-10 w-32 h-32 opacity-20"
          style={{
            background: isDarkMode 
              ? 'radial-gradient(circle at 50% 50%, rgba(234, 179, 8, 0.2), transparent)'
              : 'radial-gradient(circle at 50% 50%, rgba(234, 179, 8, 0.3), transparent)'
          }}
        />
      </div>
    </section>
  )
}
