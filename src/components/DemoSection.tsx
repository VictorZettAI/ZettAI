import { motion, useScroll, useTransform } from 'framer-motion'
import { Play, CheckCircle, ArrowRight } from 'lucide-react'
import { useRef, useState } from 'react'

interface DemoSectionProps {
}

const features = [
  {
    title: 'Análisis Predictivo',
    description: 'Anticipa tendencias y comportamientos con precisión utilizando modelos avanzados de machine learning.',
    benefits: [
      'Predicciones precisas en tiempo real',
      'Modelos adaptativos auto-optimizados',
      'Visualización intuitiva de resultados'
    ]
  },
  {
    title: 'Automatización Inteligente',
    description: 'Optimiza procesos empresariales con automatización basada en IA que aprende y mejora continuamente.',
    benefits: [
      'Reducción significativa de tareas manuales',
      'Mejora continua del rendimiento',
      'Integración perfecta con sistemas existentes'
    ]
  },
  {
    title: 'Insights Accionables',
    description: 'Convierte datos complejos en insights claros y accionables para tomar mejores decisiones.',
    benefits: [
      'Dashboards personalizables en tiempo real',
      'Alertas inteligentes automatizadas',
      'Reportes detallados bajo demanda'
    ]
  }
]

export default function DemoSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])

  const handlePlayClick = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  return (
    <section 
      ref={containerRef}
      id="demo" 
      className="py-24 relative overflow-hidden bg-[#0B1120]"
    >
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <h2 className="text-4xl font-bold mb-8 text-white">
            Ve ZettAI en Acción
          </h2>
          <p className="text-xl leading-relaxed text-gray-300">
            Descubre cómo nuestra plataforma transforma datos en resultados tangibles
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
          {/* Video Demo */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative rounded-2xl overflow-hidden shadow-2xl"
          >
            <div className="aspect-video relative">
              <video
                ref={videoRef}
                className="w-full h-full object-cover"
                poster="/demo-poster.jpg"
                onEnded={() => setIsPlaying(false)}
              >
                <source src="/demo-video.mp4" type="video/mp4" />
                Tu navegador no soporta el elemento de video.
              </video>
              
              <motion.button
                onClick={handlePlayClick}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={`absolute inset-0 flex items-center justify-center ${
                  isPlaying ? 'bg-black/0' : 'bg-black/40'
                } transition-colors duration-300`}
              >
                {!isPlaying && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className={`w-20 h-20 rounded-full flex items-center justify-center bg-yellow-500 text-white`}
                  >
                    <Play className="w-8 h-8 ml-1" />
                  </motion.div>
                )}
              </motion.button>
            </div>
          </motion.div>

          {/* Features List */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="p-6 rounded-xl bg-gray-800/50 hover:bg-gray-800/70 border border-gray-700/50 transition-colors duration-300"
              >
                <h3 className="text-xl font-bold mb-3 text-white">
                  {feature.title}
                </h3>
                <p className="text-sm mb-4 text-gray-400">
                  {feature.description}
                </p>
                <ul className="space-y-2">
                  {feature.benefits.map((benefit, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.2 + i * 0.1 }}
                      className="flex items-start space-x-2"
                    >
                      <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0 text-yellow-500" />
                      <span className="text-sm text-gray-300">
                        {benefit}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}

            <motion.button
              whileHover={{ x: 5 }}
              className={`mt-8 inline-flex items-center px-6 py-3 rounded-lg text-sm font-medium transition-colors bg-yellow-500 hover:bg-yellow-400 text-gray-900`}
            >
              Solicitar Demo Personalizada
              <ArrowRight className="w-4 h-4 ml-2" />
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
