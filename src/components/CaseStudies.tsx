import { motion } from 'framer-motion'
import { ArrowRight, Brain, Bot, Database, LineChart } from 'lucide-react'

interface CaseStudiesProps {
  isDarkMode: boolean
}

const cases = [
  {
    title: 'Optimización de Procesos con IA',
    client: 'TechCorp Industries',
    description: 'Implementación de un sistema de IA que redujo los tiempos de procesamiento en un 75% y mejoró la precisión en un 95%.',
    image: '/cases/tech-optimization.jpg',
    icon: Brain,
    stats: [
      { label: 'Reducción de Costos', value: '45%' },
      { label: 'Mejora en Eficiencia', value: '75%' },
      { label: 'ROI', value: '300%' }
    ]
  },
  {
    title: 'Automatización Inteligente',
    client: 'LogisTech Solutions',
    description: 'Desarrollo de un sistema de automatización basado en IA que revolucionó la gestión de inventario y logística.',
    image: '/cases/automation.jpg',
    icon: Bot,
    stats: [
      { label: 'Tiempo Ahorrado', value: '60%' },
      { label: 'Precisión', value: '99.9%' },
      { label: 'Productividad', value: '+85%' }
    ]
  },
  {
    title: 'Análisis Predictivo Avanzado',
    client: 'DataVision Corp',
    description: 'Implementación de modelos predictivos que permitieron anticipar tendencias de mercado con una precisión sin precedentes.',
    image: '/cases/predictive.jpg',
    icon: LineChart,
    stats: [
      { label: 'Precisión Predictiva', value: '92%' },
      { label: 'Decisiones Mejoradas', value: '80%' },
      { label: 'Ahorro Anual', value: '2.5M€' }
    ]
  },
  {
    title: 'Big Data & Machine Learning',
    client: 'GlobalTech Solutions',
    description: 'Transformación de datos masivos en insights accionables mediante algoritmos avanzados de machine learning.',
    image: '/cases/bigdata.jpg',
    icon: Database,
    stats: [
      { label: 'Datos Procesados', value: '10TB' },
      { label: 'Velocidad', value: '+200%' },
      { label: 'Insights Generados', value: '+500%' }
    ]
  }
]

export default function CaseStudies({ isDarkMode }: CaseStudiesProps) {
  return (
    <section id="casos" className={`py-24 relative overflow-hidden ${
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
            Casos de Éxito
          </h2>
          <p className={`text-xl ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Descubre cómo hemos transformado empresas con soluciones de IA
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {cases.map((caseStudy, index) => (
            <motion.div
              key={caseStudy.title}
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
                    ? 'bg-gray-800/50 hover:bg-gray-800/70 border border-gray-700/50' 
                    : 'bg-white hover:bg-white border border-gray-200/50'
                } backdrop-blur-sm shadow-lg group`}
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={caseStudy.image}
                    alt={caseStudy.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${
                    isDarkMode
                      ? 'from-gray-900/90 via-gray-900/40 to-transparent'
                      : 'from-black/80 via-black/40 to-transparent'
                  }`} />
                  <div className="absolute bottom-6 left-6 flex items-center space-x-3">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      isDarkMode ? 'bg-gray-700/50' : 'bg-gray-100/50'
                    } backdrop-blur-sm`}>
                      <caseStudy.icon className={`w-6 h-6 ${
                        isDarkMode ? 'text-yellow-500' : 'text-yellow-600'
                      }`} />
                    </div>
                    <div>
                      <h3 className="text-white text-xl font-semibold">
                        {caseStudy.title}
                      </h3>
                      <p className="text-gray-300 text-sm">
                        {caseStudy.client}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <p className={`mb-6 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    {caseStudy.description}
                  </p>

                  <div className="grid grid-cols-3 gap-4 mb-6">
                    {caseStudy.stats.map((stat, statIndex) => (
                      <div key={statIndex} className="text-center">
                        <p className={`text-2xl font-bold mb-1 ${
                          isDarkMode ? 'text-yellow-500' : 'text-yellow-600'
                        }`}>
                          {stat.value}
                        </p>
                        <p className={`text-sm ${
                          isDarkMode ? 'text-gray-400' : 'text-gray-500'
                        }`}>
                          {stat.label}
                        </p>
                      </div>
                    ))}
                  </div>

                  <motion.button
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                    className={`w-full py-4 px-6 rounded-lg flex items-center justify-center space-x-2 ${
                      isDarkMode
                        ? 'bg-gray-700/50 hover:bg-gray-700 text-white'
                        : 'bg-gray-100/50 hover:bg-gray-200 text-gray-900'
                    } transition-colors duration-200`}
                  >
                    <span>Ver Caso Completo</span>
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>
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
