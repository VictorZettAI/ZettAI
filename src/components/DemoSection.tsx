import { motion } from 'framer-motion'
import { Play, Code, Zap, BarChart } from 'lucide-react'

interface DemoSectionProps {
  isDarkMode: boolean
}

const features = [
  {
    icon: Code,
    title: 'Desarrollo Inteligente',
    description: 'IA que entiende tu código y sugiere mejoras en tiempo real'
  },
  {
    icon: Zap,
    title: 'Automatización Avanzada',
    description: 'Automatiza tareas repetitivas y optimiza tu flujo de trabajo'
  },
  {
    icon: BarChart,
    title: 'Análisis Predictivo',
    description: 'Anticipa tendencias y toma decisiones basadas en datos'
  }
]

export default function DemoSection({ isDarkMode }: DemoSectionProps) {
  return (
    <section id="demo" className={`py-24 relative overflow-hidden ${
      isDarkMode ? 'bg-[#0B1120]' : 'bg-gray-50'
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Demo Video/Image Section */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className={`relative rounded-2xl overflow-hidden ${
              isDarkMode ? 'bg-gray-800/50' : 'bg-white'
            } shadow-xl`}>
              <div className="aspect-w-16 aspect-h-9">
                <video
                  className="w-full h-full object-cover"
                  autoPlay
                  loop
                  muted
                  playsInline
                  poster="/demo-poster.jpg"
                >
                  <source src="/demo-video.mp4" type="video/mp4" />
                </video>
                <div className={`absolute inset-0 ${
                  isDarkMode 
                    ? 'bg-gradient-to-r from-gray-900/20 to-transparent'
                    : 'bg-gradient-to-r from-white/20 to-transparent'
                }`} />
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                  w-16 h-16 rounded-full flex items-center justify-center
                  ${isDarkMode ? 'bg-yellow-500' : 'bg-yellow-500'} 
                  text-white shadow-lg`}
              >
                <Play className="w-8 h-8" />
              </motion.button>
            </div>
          </motion.div>

          {/* Features Section */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-8"
          >
            <div>
              <h2 className={`text-4xl font-bold mb-6 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Experimenta el Poder de la IA
              </h2>
              <p className={`text-xl ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Descubre cómo nuestra tecnología puede transformar tu forma de trabajar
              </p>
            </div>

            <div className="space-y-6">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ 
                    duration: 0.5,
                    delay: index * 0.1
                  }}
                >
                  <div className={`p-6 rounded-xl ${
                    isDarkMode 
                      ? 'bg-gray-800/50 hover:bg-gray-800/70' 
                      : 'bg-white hover:bg-gray-50'
                    } transition-colors duration-200`}
                  >
                    <div className="flex items-start space-x-4">
                      <div className={`p-3 rounded-lg ${
                        isDarkMode ? 'bg-gray-700/50' : 'bg-gray-100'
                      }`}>
                        <feature.icon className={`w-6 h-6 ${
                          isDarkMode ? 'text-yellow-500' : 'text-yellow-600'
                        }`} />
                      </div>
                      <div>
                        <h3 className={`text-lg font-semibold mb-2 ${
                          isDarkMode ? 'text-white' : 'text-gray-900'
                        }`}>
                          {feature.title}
                        </h3>
                        <p className={`${
                          isDarkMode ? 'text-gray-300' : 'text-gray-600'
                        }`}>
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
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
