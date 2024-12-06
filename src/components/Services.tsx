import { motion } from 'framer-motion'
import { Brain, Bot, Database, LineChart, Lock, Zap, ArrowRight } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription } from './ui/card'

interface ServicesProps {
  isDarkMode: boolean
}

const services = [
  {
    title: 'Machine Learning',
    description: 'Modelos de IA personalizados para tu negocio',
    icon: Brain
  },
  {
    title: 'Chatbots IA',
    description: 'Asistentes virtuales inteligentes 24/7',
    icon: Bot
  },
  {
    title: 'Análisis de Datos',
    description: 'Insights accionables para tu empresa',
    icon: LineChart
  },
  {
    title: 'Big Data',
    description: 'Procesamiento de datos a gran escala',
    icon: Database
  },
  {
    title: 'IA Segura',
    description: 'Máxima seguridad y privacidad',
    icon: Lock
  },
  {
    title: 'Automatización',
    description: 'Optimización de procesos con IA',
    icon: Zap
  }
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.4
    }
  }
}

export default function Services({ isDarkMode }: ServicesProps) {
  return (
    <section id="servicios" className={`pt-24 pb-32 relative overflow-hidden ${
      isDarkMode ? 'bg-[#0B1120]' : 'bg-white'
    }`}>
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0" 
          style={{
            backgroundImage: isDarkMode 
              ? 'radial-gradient(circle at 50% 0%, rgba(234, 179, 8, 0.08) 0%, rgba(11, 17, 32, 0) 50%)'
              : 'radial-gradient(circle at 50% 0%, rgba(234, 179, 8, 0.12) 0%, rgba(255, 255, 255, 0) 50%)'
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
            Soluciones Inteligentes para tu Empresa
          </h2>
          <p className={`text-xl ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Descubre cómo la IA puede transformar cada aspecto de tu negocio
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ 
                duration: 0.8, 
                delay: index * 0.1,
                ease: [0.22, 1, 0.36, 1]
              }}
            >
              <motion.div
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className={`h-full p-8 rounded-2xl backdrop-blur-sm ${
                  isDarkMode 
                    ? 'bg-gray-800/50 hover:bg-gray-800/70 border border-gray-700/50' 
                    : 'bg-white/50 hover:bg-white border border-gray-200/50'
                } shadow-lg hover:shadow-xl transition-all duration-300`}
              >
                <div className={`w-14 h-14 rounded-xl mb-6 flex items-center justify-center ${
                  isDarkMode ? 'bg-gray-700/50' : 'bg-gray-100/50'
                }`}>
                  <service.icon className={`w-7 h-7 ${
                    isDarkMode ? 'text-yellow-500' : 'text-yellow-600'
                  }`} />
                </div>
                
                <h3 className={`text-xl font-semibold mb-4 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {service.title}
                </h3>
                
                <p className={`mb-6 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  {service.description}
                </p>

                <motion.div
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                  className={`flex items-center text-sm font-medium ${
                    isDarkMode ? 'text-yellow-500' : 'text-yellow-600'
                  }`}
                >
                  Saber más
                  <ArrowRight className="w-4 h-4 ml-2" />
                </motion.div>
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
